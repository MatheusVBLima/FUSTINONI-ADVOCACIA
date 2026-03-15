import { NextResponse } from "next/server";
import { z } from "zod/v4";

import { getPathname } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";
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
  locale: AppLocale | null;
};

const confirmQuerySchema = z.object({
  lead: z.string().uuid(),
  token: z
    .string()
    .trim()
    .regex(/^[a-f0-9]{64}$/i),
  locale: z.enum(["pt", "en", "es", "it"]).optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = confirmQuerySchema.safeParse({
    lead: searchParams.get("lead"),
    token: searchParams.get("token"),
    locale: searchParams.get("locale") ?? undefined,
  });

  if (!parsed.success) {
    const fallbackLocale =
      searchParams.get("locale") === "en" ||
      searchParams.get("locale") === "es" ||
      searchParams.get("locale") === "it"
        ? (searchParams.get("locale") as AppLocale)
        : "pt";
    return redirectWithStatus(req.url, "invalid", fallbackLocale);
  }

  const { lead: leadId, token, locale: requestedLocale } = parsed.data;
  const supabase = getSupabaseAdminClient() as any;
  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, locale, email_confirmed_at, email_confirm_token_hash, email_confirm_token_expires_at",
    )
    .eq("id", leadId)
    .maybeSingle();

  const lead = (data ?? null) as LeadConfirmationRow | null;
  const locale = lead?.locale ?? requestedLocale ?? "pt";

  if (error || !lead) {
    console.error("Lead confirm fetch error:", error);
    return redirectWithStatus(req.url, "invalid", locale);
  }

  if (lead.email_confirmed_at) {
    return redirectWithStatus(req.url, "already_confirmed", locale, leadId);
  }

  if (!lead.email_confirm_token_hash || !lead.email_confirm_token_expires_at) {
    return redirectWithStatus(req.url, "invalid", locale, leadId);
  }

  const expiresAt = new Date(lead.email_confirm_token_expires_at);
  if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() < Date.now()) {
    return redirectWithStatus(req.url, "expired", locale, leadId);
  }

  if (!tokensMatch(lead.email_confirm_token_hash, token)) {
    return redirectWithStatus(req.url, "invalid", locale, leadId);
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
      return redirectWithStatus(req.url, "already_confirmed", locale, leadId);
    }

    return redirectWithStatus(req.url, "invalid", locale, leadId);
  }

  return redirectWithStatus(req.url, "success", locale, leadId);
}

function redirectWithStatus(
  requestUrl: string,
  status: ConfirmationStatus,
  locale: AppLocale,
  leadId?: string,
) {
  const localizedPath = getPathname({
    locale,
    href: "/email-confirmado",
  });
  const redirectUrl = new URL(localizedPath, requestUrl);
  redirectUrl.searchParams.set("status", status);

  if (leadId) {
    redirectUrl.searchParams.set("lead", leadId);
  }

  return NextResponse.redirect(redirectUrl);
}
