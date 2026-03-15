import "server-only";

import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

import { getSiteUrl } from "@/lib/site";

export const LEAD_CONFIRMATION_TTL_MS = 24 * 60 * 60 * 1000;
export const LEAD_RESEND_WINDOW_MS = 60 * 60 * 1000;
export const LEAD_RESEND_LIMIT_PER_WINDOW = 3;

export type ConfirmationStatus =
  | "success"
  | "invalid"
  | "expired"
  | "already_confirmed";

export function createLeadConfirmationToken() {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashLeadConfirmationToken(token);
  const expiresAt = new Date(Date.now() + LEAD_CONFIRMATION_TTL_MS);

  return { token, tokenHash, expiresAt };
}

export function hashLeadConfirmationToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function tokensMatch(storedTokenHash: string, token: string) {
  if (!storedTokenHash) {
    return false;
  }

  try {
    const expected = Buffer.from(storedTokenHash, "hex");
    const actual = Buffer.from(hashLeadConfirmationToken(token), "hex");

    if (expected.length === 0 || expected.length !== actual.length) {
      return false;
    }

    return timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

export function buildLeadConfirmationUrl(leadId: string, token: string) {
  const url = new URL("/api/leads/confirm", getSiteUrl());
  url.searchParams.set("lead", leadId);
  url.searchParams.set("token", token);
  return url.toString();
}
