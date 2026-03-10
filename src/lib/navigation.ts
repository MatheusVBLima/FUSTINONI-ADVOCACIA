export type HomeNavItem = {
  href: string;
  label: string;
};

export type ProductNavItem = {
  href: string;
  label: string;
  status: "active" | "coming_soon";
};

export const HOME_NAV_ITEMS: HomeNavItem[] = [
  { href: "/#services", label: "Equipe" },
  { href: "/#process", label: "Atuação" },
  { href: "/#studio", label: "Escritório" },
  { href: "/#sectors", label: "Áreas" },
  { href: "/#faq", label: "FAQ" },
];

export const ANALISE_CREDITO_NAV_ITEMS: HomeNavItem[] = [
  { href: "/analise-credito#problema", label: "Problema" },
  { href: "/analise-credito#como-atuamos", label: "Atuação" },
  { href: "/analise-credito#irregularidade", label: "Irregularidade" },
  { href: "/analise-credito#publico", label: "Público" },
  { href: "/analise-credito#diferenciais", label: "Diferenciais" },
  { href: "/analise-credito#faq", label: "FAQ" },
];

export const FATOR_K_NAV_ITEMS: HomeNavItem[] = [
  { href: "/fator-k#problema", label: "Problema" },
  { href: "/fator-k#como-atuamos", label: "Atuação" },
  { href: "/fator-k#questionavel", label: "Questionável" },
  { href: "/fator-k#publico", label: "Público" },
  { href: "/fator-k#diferenciais", label: "Diferenciais" },
  { href: "/fator-k#faq", label: "FAQ" },
];

export const PRODUCT_NAV_ITEMS: ProductNavItem[] = [
  { href: "/analise-credito", label: "Análise de Apontamentos Indevidos", status: "active" },
  { href: "/fator-k", label: "Revisão de Fator K", status: "active" },
];
