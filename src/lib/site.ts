const FALLBACK_SITE_URL = "https://fustinoni-advocacia.vercel.app";

export const SITE_NAME = "FUSTINONI ADVOCACIA";
export const SITE_DESCRIPTION =
  "Assessoria juridica consultiva e contenciosa para pessoas fisicas e juridicas, com atuacao estrategica, tecnica e personalizada em multiplas areas do Direito.";
export const SITE_OG_IMAGE = "/og-home-hero-header.png";

export function getSiteUrl(): string {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL;
  return rawUrl.replace(/\/+$/, "");
}
