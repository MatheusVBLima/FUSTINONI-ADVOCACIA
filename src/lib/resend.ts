import "server-only";

import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getResendClient() {
  const resendApiKey =
    process.env.RESEND_API_KEY?.trim() || process.env.resend_api_key?.trim();

  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY não configurada.");
  }

  if (!resendClient) {
    resendClient = new Resend(resendApiKey);
  }

  return resendClient;
}

export function getResendFromEmail() {
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();

  if (!fromEmail) {
    throw new Error("RESEND_FROM_EMAIL não configurada.");
  }

  return fromEmail;
}
