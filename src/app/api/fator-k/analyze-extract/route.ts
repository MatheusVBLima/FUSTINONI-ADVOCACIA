import {
  createHash,
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";

import { google } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_BYTES = 10 * 1024 * 1024;
const STORAGE_BUCKET = "fator-k-extratos";
const ANALYSIS_TOKEN_TTL_MS = 30 * 60 * 1000;
const GEMINI_MODEL = google("gemini-3.1-flash-lite-preview");
const GEMINI_PROVIDER_OPTIONS = {
  google: {
    thinkingConfig: {
      thinkingBudget: 0,
    },
  },
} as const;

const leadIdSchema = z.string().uuid();
const analysisTokenPayloadSchema = z.object({
  v: z.literal(1),
  sha256: z.string().min(32),
  found: z.boolean(),
  exp: z.number().int().positive(),
});
const fatorKAnalysisSchema = z.object({
  found: z.boolean(),
  evidence: z.array(z.string()).default([]),
  extractedText: z.string().default(""),
});

type FatorKExtratoUploadEntry = {
  bucket: string;
  path: string;
  original_name: string;
  uploaded_at: string;
  fator_k_found: boolean | null;
  parse_ok: boolean;
};

type AnalysisTokenPayload = z.infer<typeof analysisTokenPayloadSchema>;

function normalizeForSearch(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function textIndicatesFatorK(text: string): boolean {
  const n = normalizeForSearch(text);
  if (/\bfator\s*k\b/.test(n)) return true;
  if (/\bfactor\s*k\b/.test(n)) return true;
  if (/\bfatork\b/.test(n)) return true;
  if (/\bend\s*[-:]?\s*fator\s*k\b/.test(n)) return true;
  if (/\bk\s*[:=]\s*\d+(?:[.,]\d+)?\b/.test(n)) return true;
  if (/\bcarga\s+poluidora\b/.test(n) && /\bk\s*[:=]\s*\d+(?:[.,]\d+)?\b/.test(n)) return true;
  if (n.includes("fator k")) return true;
  return false;
}

async function analyzePdfForFatorK(buffer: Buffer): Promise<{
  found: boolean;
  extractedText: string;
}> {
  const { object } = await generateObject({
    model: GEMINI_MODEL,
    schema: fatorKAnalysisSchema,
    temperature: 0,
    maxRetries: 0,
    providerOptions: GEMINI_PROVIDER_OPTIONS,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "file",
            data: buffer,
            mediaType: "application/pdf",
          },
          {
            type: "text",
            text: [
              "Analise este PDF de conta SABESP, mesmo se estiver escaneado, rotacionado ou sem texto nativo.",
              "Retorne um objeto com:",
              "- found: true somente se houver indicios consistentes de cobranca relacionada a Fator K.",
              "- evidence: trechos curtos encontrados no documento.",
              "- extractedText: o texto relevante identificado.",
              "Considere found=true quando aparecer qualquer um destes sinais:",
              "- 'Fator K', 'Factor K', 'END - Fator K' ou variacoes proximas.",
              "- padrao 'K = numero' ou 'K: numero'.",
              "- 'carga poluidora' quando vinculada ao padrao K = numero.",
            ].join("\n"),
          },
        ],
      },
    ],
  });

  const extractedText = [object.extractedText, ...object.evidence]
    .filter(Boolean)
    .join("\n")
    .trim();

  return {
    found: object.found || textIndicatesFatorK(extractedText),
    extractedText,
  };
}

async function extractPdfText(buffer: Buffer): Promise<string> {
  const result = await generateText({
    model: GEMINI_MODEL,
    temperature: 0,
    maxRetries: 0,
    providerOptions: GEMINI_PROVIDER_OPTIONS,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "file",
            data: buffer,
            mediaType: "application/pdf",
          },
          {
            type: "text",
            text:
              "Leia este PDF SABESP, inclusive se estiver escaneado ou rotacionado, e retorne apenas o texto visivel e relevante do documento, sem introducao.",
          },
        ],
      },
    ],
    maxOutputTokens: 4096,
  });

  return result.text;
}

function sanitizeOriginalName(name: string): string {
  const base = name.replace(/[/\\]/g, "").trim().slice(0, 200);
  return base || "document.pdf";
}

function sha256OfBuffer(buffer: Buffer): string {
  return createHash("sha256").update(buffer).digest("hex");
}

function getAnalysisTokenSecret(): string {
  const secret =
    process.env.FATOR_K_ANALYSIS_SECRET?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!secret) {
    throw new Error("Missing FATOR_K_ANALYSIS_SECRET or SUPABASE_SERVICE_ROLE_KEY");
  }

  return secret;
}

function encodeBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signAnalysisToken(payload: AnalysisTokenPayload): string {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = createHmac("sha256", getAnalysisTokenSecret())
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

function verifyAnalysisToken(
  token: string,
  expectedSha256: string,
): { found: boolean } | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedPayload, providedSignature] = parts;
  const expectedSignature = createHmac("sha256", getAnalysisTokenSecret())
    .update(encodedPayload)
    .digest("base64url");

  const provided = Buffer.from(providedSignature, "utf8");
  const expected = Buffer.from(expectedSignature, "utf8");
  if (provided.length !== expected.length) return null;
  if (!timingSafeEqual(provided, expected)) return null;

  const parsed = analysisTokenPayloadSchema.safeParse(
    JSON.parse(decodeBase64Url(encodedPayload)),
  );
  if (!parsed.success) return null;

  const payload = parsed.data;
  if (payload.exp < Date.now()) return null;
  if (payload.sha256 !== expectedSha256) return null;

  return { found: payload.found };
}

async function computeFatorKFromBuffer(buffer: Buffer): Promise<{
  found: boolean | null;
  parseOk: boolean;
  analysisToken: string | null;
}> {
  let extractedText = "";
  let parseOk = false;

  try {
    const analysis = await analyzePdfForFatorK(buffer);
    extractedText = analysis.extractedText;
    parseOk = true;
  } catch (analysisErr) {
    console.error("Gemini PDF Factor K analysis failed:", analysisErr);

    try {
      extractedText = await extractPdfText(buffer);
      parseOk = true;
    } catch (extractErr) {
      console.error("Gemini PDF extraction fallback failed:", extractErr);
    }
  }

  const found = parseOk ? textIndicatesFatorK(extractedText) : null;
  return {
    found,
    parseOk,
    analysisToken:
      parseOk && found !== null
        ? signAnalysisToken({
            v: 1,
            sha256: sha256OfBuffer(buffer),
            found,
            exp: Date.now() + ANALYSIS_TOKEN_TTL_MS,
          })
        : null,
  };
}

async function appendLeadUpload(
  supabase: ReturnType<typeof getSupabaseAdminClient>,
  leadId: string,
  entry: FatorKExtratoUploadEntry,
) {
  const db = supabase as any;
  const { data: row, error: selErr } = await db
    .from("leads")
    .select("fator_k_extrato_uploads")
    .eq("id", leadId)
    .single();

  if (selErr || !row) {
    console.error("appendLeadUpload select:", selErr);
    throw new Error("LEAD_FETCH_FAILED");
  }

  const raw = row.fator_k_extrato_uploads;
  const current = Array.isArray(raw) ? raw : [];
  const next = [...current, entry];

  const { error: upErr } = await db
    .from("leads")
    .update({ fator_k_extrato_uploads: next })
    .eq("id", leadId);

  if (upErr) {
    console.error("appendLeadUpload update:", upErr);
    throw new Error("LEAD_UPDATE_FAILED");
  }
}

export async function POST(req: Request) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ code: "INVALID_FORM" }, { status: 400 });
  }

  const leadIdRaw = formData.get("leadId");
  const leadIdStr =
    typeof leadIdRaw === "string" ? leadIdRaw.trim() : "";
  const analysisTokenRaw = formData.get("analysisToken");
  const analysisToken =
    typeof analysisTokenRaw === "string" ? analysisTokenRaw.trim() : "";

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ code: "FILE_REQUIRED" }, { status: 400 });
  }

  if (file.size === 0) {
    return NextResponse.json({ code: "FILE_EMPTY" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ code: "FILE_TOO_LARGE" }, { status: 413 });
  }

  const mime = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  const looksPdf =
    mime === "application/pdf" ||
    mime === "application/x-pdf" ||
    name.endsWith(".pdf");

  if (!looksPdf) {
    return NextResponse.json({ code: "NEEDS_PDF", found: null }, { status: 415 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileSha256 = sha256OfBuffer(buffer);

  if (!leadIdStr) {
    const { found, parseOk, analysisToken } = await computeFatorKFromBuffer(buffer);
    if (!parseOk) {
      return NextResponse.json({ code: "PARSE_FAILED" }, { status: 422 });
    }
    return NextResponse.json({ found: Boolean(found), analysisToken });
  }

  const leadIdParsed = leadIdSchema.safeParse(leadIdStr);
  if (!leadIdParsed.success) {
    return NextResponse.json({ code: "LEAD_ID_INVALID" }, { status: 400 });
  }
  const leadId = leadIdParsed.data;

  const supabase = getSupabaseAdminClient();

  const { data: leadRowRaw, error: leadErr } = await supabase
    .from("leads")
    .select("id, origem")
    .eq("id", leadId)
    .single();

  if (leadErr || !leadRowRaw) {
    return NextResponse.json({ code: "LEAD_NOT_FOUND" }, { status: 404 });
  }

  const leadRow = leadRowRaw as { id: string; origem: string | null };

  if (leadRow.origem !== "fator_k_extrato") {
    return NextResponse.json({ code: "LEAD_NOT_ELIGIBLE" }, { status: 403 });
  }

  const originalName = sanitizeOriginalName(file.name);
  const objectPath = `${leadId}/${randomUUID()}.pdf`;

  const { error: uploadErr } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(objectPath, buffer, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (uploadErr) {
    console.error("Storage upload error:", uploadErr);
    return NextResponse.json(
      {
        code: "STORAGE_UPLOAD_FAILED",
        hint:
          "Create a private bucket named fator-k-extratos in Supabase Storage (PDF, max 10MB).",
      },
      { status: 500 },
    );
  }

  const uploadedAt = new Date().toISOString();
  const verifiedToken = analysisToken
    ? verifyAnalysisToken(analysisToken, fileSha256)
    : null;

  const { found, parseOk } = verifiedToken
    ? { found: verifiedToken.found, parseOk: true }
    : await computeFatorKFromBuffer(buffer);

  try {
    await appendLeadUpload(supabase, leadId, {
      bucket: STORAGE_BUCKET,
      path: objectPath,
      original_name: originalName,
      uploaded_at: uploadedAt,
      fator_k_found: found,
      parse_ok: parseOk,
    });
  } catch (e) {
    console.error("Failed to record upload on lead:", e);
  }

  if (!parseOk) {
    return NextResponse.json({ code: "PARSE_FAILED" }, { status: 422 });
  }

  return NextResponse.json({ found });
}
