import type { MetadataRoute } from "next";

import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const internalRoutes = ["/", "/analise-credito", "/fator-k"] as const;

  return internalRoutes.flatMap(route =>
    routing.locales.map(locale => {
      const localizedPath = getPathname({ href: route, locale });
      const languages = Object.fromEntries(
        routing.locales.map(itemLocale => [
          itemLocale,
          `${siteUrl}${getPathname({ href: route, locale: itemLocale })}`,
        ]),
      );

      return {
        url: `${siteUrl}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "/" ? 1 : 0.9,
        alternates: {
          languages,
        },
      };
    }),
  );
}
