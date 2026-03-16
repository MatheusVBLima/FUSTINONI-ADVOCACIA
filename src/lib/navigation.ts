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
