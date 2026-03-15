import { NextResponse } from "next/server";
import { z } from "zod/v4";

import {
  type ConfirmationStatus,
  tokensMatch,
} from "@/lib/lead-email-confirmation";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

type LeadConfirmationRow = {
  email_confirm_token_expires_at: string | null;
  email_confirm_token_hash: string | null;
  email_confirmed_at: string | null;
  id: string;
};

const confirmQuerySchema = z.object({
  lead: z.string().uuid(),
  token: z
    .string()
    .trim()
    .regex(/^[a-f0-9]{64}$/i),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = confirmQuerySchema.safeParse({
    lead: searchParams.get("lead"),
    token: searchParams.get("token"),
  });

  if (!parsed.success) {
    return redirectWithStatus(req.url, "invalid");
  }

  const { lead: leadId, token } = parsed.data;
  const supabase = getSupabaseAdminClient() as any;
  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, email_confirmed_at, email_confirm_token_hash, email_confirm_token_expires_at",
    )
    .eq("id", leadId)
    .maybeSingle();

  const lead = (data ?? null) as LeadConfirmationRow | null;

  if (error || !lead) {
    console.error("Lead confirm fetch error:", error);
    return redirectWithStatus(req.url, "invalid");
  }

  if (lead.email_confirmed_at) {
    return redirectWithStatus(req.url, "already_confirmed", leadId);
  }

  if (!lead.email_confirm_token_hash || !lead.email_confirm_token_expires_at) {
    return redirectWithStatus(req.url, "invalid", leadId);
  }

  const expiresAt = new Date(lead.email_confirm_token_expires_at);
  if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() < Date.now()) {
    return redirectWithStatus(req.url, "expired", leadId);
  }

  if (!tokensMatch(lead.email_confirm_token_hash, token)) {
    return redirectWithStatus(req.url, "invalid", leadId);
  }

  const nowIso = new Date().toISOString();
  const { error: updateError, data: updatedLead } = await supabase
    .from("leads")
    .update({
      email_confirmed_at: nowIso,
      email_confirm_token_hash: null,
      email_confirm_token_expires_at: null,
    })
    .eq("id", leadId)
    .is("email_confirmed_at", null)
    .eq("email_confirm_token_hash", lead.email_confirm_token_hash)
    .select("id")
    .maybeSingle();

  if (updateError || !updatedLead) {
    console.error("Lead confirm update error:", updateError);
    const { data: freshData } = await supabase
      .from("leads")
      .select("email_confirmed_at")
      .eq("id", leadId)
      .maybeSingle();
    const freshLead = (freshData ?? null) as
      | { email_confirmed_at: string | null }
      | null;

    if (freshLead?.email_confirmed_at) {
      return redirectWithStatus(req.url, "already_confirmed", leadId);
    }

    return redirectWithStatus(req.url, "invalid", leadId);
  }

  return redirectWithStatus(req.url, "success", leadId);
}

function redirectWithStatus(
  requestUrl: string,
  status: ConfirmationStatus,
  leadId?: string,
) {
  const redirectUrl = new URL("/email-confirmed", requestUrl);
  redirectUrl.searchParams.set("status", status);

  if (leadId) {
    redirectUrl.searchParams.set("lead", leadId);
  }

  return NextResponse.redirect(redirectUrl);
}
