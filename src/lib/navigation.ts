import { type AppLocale } from "@/i18n/routing";

export type NavPathname = "/" | "/analise-credito" | "/fator-k";

export type HomeNavItem = {
  hash: string;
  labelKey: string;
  pathname: NavPathname;
};

export type ProductNavItem = {
  href: "/analise-credito" | "/fator-k";
  labelKey: string;
  status: "active" | "coming_soon";
};

export const HOME_NAV_ITEMS: HomeNavItem[] = [
  { pathname: "/", hash: "services", labelKey: "home.services" },
  { pathname: "/", hash: "process", labelKey: "home.process" },
  { pathname: "/", hash: "firm", labelKey: "home.studio" },
  { pathname: "/", hash: "sectors", labelKey: "home.sectors" },
  { pathname: "/", hash: "faq", labelKey: "home.faq" },
];

export const ANALISE_CREDITO_NAV_ITEMS: HomeNavItem[] = [
  {
    pathname: "/analise-credito",
    hash: "problema",
    labelKey: "shared.problem",
  },
  {
    pathname: "/analise-credito",
    hash: "como-atuamos",
    labelKey: "shared.howWeAct",
  },
  {
    pathname: "/analise-credito",
    hash: "irregularidade",
    labelKey: "shared.irregularity",
  },
  {
    pathname: "/analise-credito",
    hash: "publico",
    labelKey: "shared.audience",
  },
  {
    pathname: "/analise-credito",
    hash: "diferenciais",
    labelKey: "shared.differentials",
  },
  {
    pathname: "/analise-credito",
    hash: "faq",
    labelKey: "shared.faq",
  },
];

export const FATOR_K_NAV_ITEMS: HomeNavItem[] = [
  { pathname: "/fator-k", hash: "problema", labelKey: "shared.problem" },
  { pathname: "/fator-k", hash: "como-atuamos", labelKey: "shared.howWeAct" },
  { pathname: "/fator-k", hash: "questionavel", labelKey: "shared.questionable" },
  { pathname: "/fator-k", hash: "publico", labelKey: "shared.audience" },
  {
    pathname: "/fator-k",
    hash: "diferenciais",
    labelKey: "shared.differentials",
  },
  { pathname: "/fator-k", hash: "faq", labelKey: "shared.faq" },
];

export const PRODUCT_NAV_ITEMS: ProductNavItem[] = [
  {
    href: "/analise-credito",
    labelKey: "products.creditReview",
    status: "active",
  },
  { href: "/fator-k", labelKey: "products.factorKReview", status: "active" },
];

const LOCALIZED_HASHES = {
  "/": {
    services: {
      pt: "equipe",
      en: "team",
      es: "equipo",
      it: "team",
    },
    process: {
      pt: "atuacao",
      en: "approach",
      es: "actuacion",
      it: "attuazione",
    },
    firm: {
      pt: "escritorio",
      en: "firm",
      es: "despacho",
      it: "studio",
    },
    sectors: {
      pt: "areas",
      en: "practice-areas",
      es: "areas",
      it: "aree",
    },
    faq: {
      pt: "faq",
      en: "faq",
      es: "faq",
      it: "faq",
    },
  },
  "/analise-credito": {
    problema: {
      pt: "problema",
      en: "problem",
      es: "problema",
      it: "problema",
    },
    "como-atuamos": {
      pt: "atuacao",
      en: "approach",
      es: "actuacion",
      it: "attuazione",
    },
    irregularidade: {
      pt: "irregularidade",
      en: "irregularity",
      es: "irregularidad",
      it: "irregolarita",
    },
    publico: {
      pt: "publico",
      en: "audience",
      es: "publico",
      it: "pubblico",
    },
    diferenciais: {
      pt: "diferenciais",
      en: "differentials",
      es: "diferenciales",
      it: "differenziali",
    },
    faq: {
      pt: "faq",
      en: "faq",
      es: "faq",
      it: "faq",
    },
  },
  "/fator-k": {
    problema: {
      pt: "problema",
      en: "problem",
      es: "problema",
      it: "problema",
    },
    "como-atuamos": {
      pt: "atuacao",
      en: "approach",
      es: "actuacion",
      it: "attuazione",
    },
    questionavel: {
      pt: "questionavel",
      en: "questionable",
      es: "cuestionable",
      it: "contestabile",
    },
    publico: {
      pt: "publico",
      en: "audience",
      es: "publico",
      it: "pubblico",
    },
    diferenciais: {
      pt: "diferenciais",
      en: "differentials",
      es: "diferenciales",
      it: "differenziali",
    },
    faq: {
      pt: "faq",
      en: "faq",
      es: "faq",
      it: "faq",
    },
  },
} as const satisfies Record<string, Record<string, Record<AppLocale, string>>>;

export function getLocalizedHash(
  pathname: string,
  hash: string,
  locale: AppLocale,
) {
  const hashesByPathname =
    LOCALIZED_HASHES[pathname as keyof typeof LOCALIZED_HASHES];

  if (!hashesByPathname) {
    return hash;
  }

  const localizedHash = hashesByPathname[hash as keyof typeof hashesByPathname];

  return localizedHash?.[locale] ?? hash;
}

export function getInternalHash(
  pathname: string,
  hash: string,
  locale: AppLocale,
) {
  const hashesByPathname =
    LOCALIZED_HASHES[pathname as keyof typeof LOCALIZED_HASHES];

  if (!hashesByPathname) {
    return hash;
  }

  if (hash in hashesByPathname) {
    return hash;
  }

  for (const [internalHash, localizedHashes] of Object.entries(hashesByPathname)) {
    if (localizedHashes[locale] === hash) {
      return internalHash;
    }
  }

  return hash;
}
