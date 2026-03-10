const FALLBACK_SITE_URL = "https://fustinoni-advocacia.vercel.app";

export const SITE_NAME = "FUSTINONI ADVOCACIA";
export const SITE_DESCRIPTION =
  "Assessoria jurídica consultiva e contenciosa para pessoas físicas e jurídicas, com atuação estratégica, técnica e personalizada em múltiplas áreas do Direito.";
export const SITE_OG_IMAGE = "/og-home-hero-header.png";

export function getSiteUrl(): string {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL;
  return rawUrl.replace(/\/+$/, "");
}
