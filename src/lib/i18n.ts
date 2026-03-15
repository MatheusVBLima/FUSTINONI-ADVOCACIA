import { routing, type AppLocale } from "@/i18n/routing";

export const DEFAULT_LOCALE: AppLocale = routing.defaultLocale;

export const OG_LOCALE_BY_APP_LOCALE: Record<AppLocale, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
  it: "it_IT",
};

export const LANGUAGE_NAME_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Portuguese",
  en: "English",
  es: "Spanish",
  it: "Italian",
};
