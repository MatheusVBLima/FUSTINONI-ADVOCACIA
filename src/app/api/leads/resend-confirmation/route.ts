import { NextResponse } from "next/server";
import { z } from "zod/v4";

import {
  buildLeadConfirmationUrl,
  createLeadConfirmationToken,
  LEAD_RESEND_LIMIT_PER_WINDOW,
  LEAD_RESEND_WINDOW_MS,
} from "@/lib/lead-email-confirmation";
import { sendLeadConfirmationEmail } from "@/lib/lead-confirmation-email";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

type LeadForResend = {
  email: string;
  email_confirm_send_count: number | null;
  email_confirm_window_started_at: string | null;
  email_confirmed_at: string | null;
  id: string;
  nome: string;
};

const resendSchema = z.object({
  leadId: z.string().uuid(),
});

export async function POST(req: Request) {
  const payload = await req
    .json()
    .then(body => resendSchema.parse(body))
    .catch(() => null);

  if (!payload) {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient() as any;
  const { data, error: fetchError } = await supabase
    .from("leads")
    .select(
      "id, nome, email, email_confirmed_at, email_confirm_send_count, email_confirm_window_started_at",
    )
    .eq("id", payload.leadId)
    .maybeSingle();

  const lead = (data ?? null) as LeadForResend | null;

  if (fetchError || !lead) {
    console.error("Lead resend fetch error:", fetchError);
    return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
  }

  if (lead.email_confirmed_at) {
    return NextResponse.json(
      { error: "Este e-mail já foi confirmado." },
      { status: 409 },
    );
  }

  const now = Date.now();
  const windowStart =
    lead.email_confirm_window_started_at &&
    !Number.isNaN(new Date(lead.email_confirm_window_started_at).getTime())
      ? new Date(lead.email_confirm_window_started_at).getTime()
      : null;

  let sendCountInWindow = lead.email_confirm_send_count ?? 0;
  let nextWindowStart = new Date(now);

  if (windowStart && now - windowStart < LEAD_RESEND_WINDOW_MS) {
    nextWindowStart = new Date(windowStart);
  } else {
    sendCountInWindow = 0;
  }

  if (sendCountInWindow >= LEAD_RESEND_LIMIT_PER_WINDOW) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((nextWindowStart.getTime() + LEAD_RESEND_WINDOW_MS - now) / 1000),
    );

    return NextResponse.json(
      { error: "Você atingiu o limite de 3 reenvios por hora." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      },
    );
  }

  const { token, tokenHash, expiresAt } = createLeadConfirmationToken();
  const nextSendCount = sendCountInWindow + 1;
  const nowIso = new Date(now).toISOString();

  const { error: updateError } = await supabase
    .from("leads")
    .update({
      email_confirm_token_hash: tokenHash,
      email_confirm_token_expires_at: expiresAt.toISOString(),
      email_confirm_send_count: nextSendCount,
      email_confirm_window_started_at: nextWindowStart.toISOString(),
      email_confirm_last_sent_at: nowIso,
    })
    .eq("id", lead.id)
    .is("email_confirmed_at", null);

  if (updateError) {
    console.error("Lead resend update error:", updateError);
    return NextResponse.json(
      { error: "Não foi possível atualizar a confirmação." },
      { status: 500 },
    );
  }

  const confirmationUrl = buildLeadConfirmationUrl(lead.id, token);

  try {
    await sendLeadConfirmationEmail({
      to: lead.email,
      nome: lead.nome,
      confirmUrl: confirmationUrl,
      idempotencyKey: `lead-confirmation-resend/${lead.id}/${nextSendCount}`,
    });
  } catch (error) {
    console.error("Lead confirmation resend error:", error);
    return NextResponse.json(
      { error: "Não foi possível reenviar agora. Tente novamente." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
