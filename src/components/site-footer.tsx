import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getLocalizedHash } from "@/lib/navigation";

type SiteFooterProps = {
  locale: AppLocale;
};

export async function SiteFooter({ locale }: SiteFooterProps) {
  const t = await getTranslations("siteFooter");

  return (
    <>
      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <footer className="border-b border-black/15 text-sm">
        <div className="grid grid-cols-1 border-t border-black/15 bg-white sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)_minmax(0,1.1fr)]">
          <div className="p-6 sm:border-r sm:border-black/15 sm:p-8">
            <div className="mb-10 font-serif text-lg font-semibold uppercase tracking-widest sm:mb-14">
              FUSTINONI ADVOCACIA
            </div>
            <p className="text-xs text-black/60">{t("rightsReserved")}</p>
            <div className="mt-10 flex flex-wrap gap-4 text-xs font-medium uppercase tracking-wider text-black/70 sm:mt-12">
              <span>{t("badges.confidential")}</span>
              <span>{t("badges.scheduled")}</span>
              <span>{t("badges.national")}</span>
            </div>
          </div>

          <div className="border-t border-black/15 p-6 sm:border-t-0 sm:p-8 lg:border-r lg:border-black/15">
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/70">
              {t("navigationTitle")}
            </div>
            <ul className="space-y-3 font-medium">
              <li>
                <Link
                  href={{
                    pathname: "/",
                    hash: getLocalizedHash("/", "services", locale),
                  }}
                  className="transition-colors hover:text-black/70"
                >
                  {t("links.team")}
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/",
                    hash: getLocalizedHash("/", "process", locale),
                  }}
                  className="transition-colors hover:text-black/70"
                >
                  {t("links.workModels")}
                </Link>
              </li>
              <li>
                <Link
                  href="/analise-credito"
                  className="transition-colors hover:text-black/70"
                >
                  {t("links.creditReview")}
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/",
                    hash: getLocalizedHash("/", "faq", locale),
                  }}
                  className="transition-colors hover:text-black/70"
                >
                  {t("links.faq")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-t border-black/15 p-6 sm:col-span-2 sm:p-8 lg:col-span-1 lg:border-t-0">
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/70">
              {t("contactTitle")}
            </div>
            <a
              href="mailto:contato@fustinoni.adv.br"
              className="inline-flex items-center gap-2 text-sm font-medium text-black/80 transition-colors hover:text-black"
            >
              <Mail className="h-4 w-4" />
              contato@fustinoni.adv.br
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
