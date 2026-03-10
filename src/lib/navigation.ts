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
  { href: "/#process", label: "Atuacao" },
  { href: "/#studio", label: "Escritorio" },
  { href: "/#sectors", label: "Areas" },
  { href: "/#faq", label: "FAQ" },
];

export const ANALISE_CREDITO_NAV_ITEMS: HomeNavItem[] = [
  { href: "/analise-credito#problema", label: "Problema" },
  { href: "/analise-credito#como-atuamos", label: "Atuacao" },
  { href: "/analise-credito#irregularidade", label: "Irregularidade" },
  { href: "/analise-credito#publico", label: "Publico" },
  { href: "/analise-credito#diferenciais", label: "Diferenciais" },
  { href: "/analise-credito#faq", label: "FAQ" },
];

export const PRODUCT_NAV_ITEMS: ProductNavItem[] = [
  { href: "/analise-credito", label: "Analise de Credito", status: "active" },
];
