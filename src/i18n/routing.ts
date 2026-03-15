import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en", "es", "it"],
  defaultLocale: "pt",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/analise-credito": {
      pt: "/analise-credito",
      en: "/credit-record-review",
      es: "/analisis-registro-crediticio",
      it: "/analisi-registro-creditizio",
    },
    "/fator-k": {
      pt: "/fator-k",
      en: "/sabesp-factor-k-review",
      es: "/revision-factor-k-sabesp",
      it: "/revisione-fattore-k-sabesp",
    },
    "/email-confirmado": {
      pt: "/email-confirmado",
      en: "/email-confirmed",
      es: "/correo-confirmado",
      it: "/email-confermata",
    },
  },
});

export type AppLocale = (typeof routing.locales)[number];
