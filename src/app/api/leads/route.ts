import { NextResponse } from "next/server";
import { z } from "zod/v4";

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
  nome: string;
};

const createLeadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  telefone: z.string().trim().min(8, "Informe um telefone válido").max(40),
  email: z.string().trim().email("Informe um e-mail válido").max(320),
  resumo: z.string().trim().max(4000).optional().default(""),
});

export async function POST(req: Request) {
  const payload = await req
    .json()
    .then(body => createLeadSchema.parse(body))
    .catch(() => null);

  if (!payload) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient() as any;
  const { token, tokenHash, expiresAt } = createLeadConfirmationToken();
  const nowIso = new Date().toISOString();

  const { data, error: insertError } = await supabase
    .from("leads")
    .insert({
      nome: payload.nome,
      telefone: payload.telefone,
      email: payload.email.toLowerCase(),
      resumo: payload.resumo || null,
      email_confirmed_at: null,
      email_confirm_token_hash: tokenHash,
      email_confirm_token_expires_at: expiresAt.toISOString(),
      email_confirm_send_count: 0,
      email_confirm_window_started_at: null,
      email_confirm_last_sent_at: nowIso,
    })
    .select("id, nome, email")
    .single();

  const lead = (data ?? null) as InsertedLeadRow | null;

  if (insertError || !lead) {
    console.error("Lead insert error:", insertError);
    return NextResponse.json(
      { error: "Não foi possível registrar seu contato agora." },
      { status: 500 },
    );
  }

  const confirmationUrl = buildLeadConfirmationUrl(lead.id, token);

  try {
    await sendLeadConfirmationEmail({
      to: lead.email,
      nome: lead.nome,
      confirmUrl: confirmationUrl,
      idempotencyKey: `lead-confirmation/${lead.id}`,
    });
  } catch (error) {
    console.error("Lead confirmation email send error:", error);
    return NextResponse.json(
      {
        ok: true,
        leadId: lead.id,
        emailSent: false,
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      leadId: lead.id,
      emailSent: true,
    },
    { status: 200 },
  );
}
