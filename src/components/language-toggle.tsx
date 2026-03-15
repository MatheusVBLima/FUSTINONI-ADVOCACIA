"use client";

import { Check, Globe } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";

import { routing, type AppLocale } from "@/i18n/routing";
import { getPathname, usePathname } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const LOCALE_LABEL_KEY: Record<AppLocale, string> = {
  pt: "portuguese",
  en: "english",
  es: "spanish",
  it: "italian",
};

export function LanguageToggle() {
  const t = useTranslations("language");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const hrefByLocale = useMemo(() => {
    return Object.fromEntries(
      routing.locales.map(option => [
        option,
        getPathname({
          href: pathname,
          locale: option,
          forcePrefix: option !== routing.defaultLocale,
        }),
      ]),
    ) as Record<AppLocale, string>;
  }, [pathname]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-none border-black/20 px-3 text-xs uppercase tracking-wider"
          aria-label={t("changeLanguage")}
        >
          <Globe className="mr-2 h-3.5 w-3.5" />
          {locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-44 rounded-none border-black/25 bg-white opacity-100 shadow-lg backdrop-blur-none"
      >
        {routing.locales.map(option =>
          option === locale ? (
            <DropdownMenuItem
              key={option}
              disabled
              className="rounded-none text-xs font-semibold uppercase tracking-wider text-black data-[disabled]:pointer-events-none data-[disabled]:opacity-100"
            >
              <span>{t(LOCALE_LABEL_KEY[option])}</span>
              <Check className="ml-2 h-3.5 w-3.5" />
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              key={option}
              asChild
              className="cursor-pointer rounded-none p-0 text-xs uppercase tracking-wider"
            >
              <Link
                href={hrefByLocale[option]}
                scroll={false}
                className="block w-full px-2 py-1.5"
              >
                {t(LOCALE_LABEL_KEY[option])}
              </Link>
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
