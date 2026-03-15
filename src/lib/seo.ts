import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

type LocalizedPathname = "/" | "/analise-credito" | "/fator-k" | "/email-confirmado";

export function getLocalizedUrl(pathname: LocalizedPathname, locale: AppLocale) {
  const localizedPath = getPathname({ href: pathname, locale });
  return `${siteUrl}${localizedPath}`;
}

export function getAlternatesLanguages(pathname: LocalizedPathname) {
  const languages = Object.fromEntries(
    routing.locales.map(locale => [locale, getLocalizedUrl(pathname, locale)]),
  );

  return {
    ...languages,
    "x-default": getLocalizedUrl(pathname, routing.defaultLocale),
  };
}
