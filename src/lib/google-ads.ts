export const GOOGLE_ADS_ID = "AW-18020571962";

const FATOR_K_LEAD_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_FATOR_K_LEAD_LABEL?.trim();

type Gtag = (
  command: "config" | "event" | "js",
  target: string | Date,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function trackFatorKLeadConversion(leadId: string) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "lead_fator_k_enviado", {
    event_category: "lead",
    event_label: "fator_k",
    lead_id: leadId,
  });

  if (!FATOR_K_LEAD_CONVERSION_LABEL) return;

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${FATOR_K_LEAD_CONVERSION_LABEL}`,
    transaction_id: leadId,
  });
}
