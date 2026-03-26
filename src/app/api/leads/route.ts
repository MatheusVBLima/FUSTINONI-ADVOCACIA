import { NextResponse } from "next/server";
import { z } from "zod/v4";

import { type AppLocale } from "@/i18n/routing";
import {
  buildLeadConfirmationUrl,
  createLeadConfirmationToken,
} from "@/lib/lead-email-confirmation";
import { sendLeadConfirmationEmail } from "@/lib/lead-confirmation-email";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

type InsertedLeadRow = {
  email: string;
  id: string;
  locale: AppLocale;
  nome: string;
};

const createLeadSchema = z.object({
  nome: z.string().trim().min(2).max(120),
  telefone: z.string().trim().min(8).max(40),
  email: z.string().trim().email().max(320),
  resumo: z.string().trim().max(4000).optional().default(""),
  locale: z.enum(["pt", "en", "es", "it"]).optional().default("pt"),
  origem: z.string().trim().max(120).optional(),
});

export async function POST(req: Request) {
  const payload = await req
    .json()
    .then(body => createLeadSchema.parse(body))
    .catch(() => null);

  if (!payload) {
    return NextResponse.json({ code: "INVALID_DATA" }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient() as any;
  const normalizedEmail = payload.email.toLowerCase();

  // Check if this email was already confirmed on a previous lead
  const { data: existingConfirmed } = await supabase
    .from("leads")
    .select("id")
    .eq("email", normalizedEmail)
    .not("email_confirmed_at", "is", null)
    .limit(1)
    .maybeSingle();

  const alreadyConfirmed = !!existingConfirmed;
  const nowIso = new Date().toISOString();

  const insertRow: Record<string, unknown> = {
    nome: payload.nome,
    telefone: payload.telefone,
    email: normalizedEmail,
    resumo: payload.resumo || null,
    locale: payload.locale,
    email_confirmed_at: alreadyConfirmed ? nowIso : null,
    email_confirm_token_hash: null,
    email_confirm_token_expires_at: null,
    email_confirm_send_count: 0,
    email_confirm_window_started_at: null,
    email_confirm_last_sent_at: null,
  };
  if (payload.origem) {
    insertRow.origem = payload.origem;
  }

  // Only generate confirmation token if email is not yet confirmed
  let token: string | null = null;
  if (!alreadyConfirmed) {
    const confirmation = createLeadConfirmationToken();
    token = confirmation.token;
    insertRow.email_confirm_token_hash = confirmation.tokenHash;
    insertRow.email_confirm_token_expires_at = confirmation.expiresAt.toISOString();
    insertRow.email_confirm_last_sent_at = nowIso;
  }

  const { data, error: insertError } = await supabase
    .from("leads")
    .insert(insertRow)
    .select("id, nome, email, locale")
    .single();

  const lead = (data ?? null) as InsertedLeadRow | null;

  if (insertError || !lead) {
    console.error("Lead insert error:", insertError);
    return NextResponse.json({ code: "INSERT_FAILED" }, { status: 500 });
  }

  // Skip confirmation email if already confirmed
  if (alreadyConfirmed) {
    return NextResponse.json(
      { ok: true, leadId: lead.id, emailSent: false, alreadyConfirmed: true },
      { status: 200 },
    );
  }

  const confirmationUrl = buildLeadConfirmationUrl(lead.id, token!, lead.locale);

  try {
    await sendLeadConfirmationEmail({
      to: lead.email,
      nome: lead.nome,
      locale: lead.locale,
      confirmUrl: confirmationUrl,
      idempotencyKey: `lead-confirmation/${lead.id}`,
    });
  } catch (error) {
    console.error("Lead confirmation email send error:", error);
    return NextResponse.json(
      { ok: true, leadId: lead.id, emailSent: false },
      { status: 200 },
    );
  }

  return NextResponse.json(
    { ok: true, leadId: lead.id, emailSent: true },
    { status: 200 },
  );
}
