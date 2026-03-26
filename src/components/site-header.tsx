"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { type MouseEvent, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { LeadCaptureDialog } from "@/components/lead-capture-dialog";
import { Link, usePathname } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";
import {
  ANALISE_CREDITO_NAV_ITEMS,
  FATOR_K_NAV_ITEMS,
  getLocalizedHash,
  type HomeNavItem,
  type ProductNavItem,
} from "@/lib/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type SiteHeaderProps = {
  homeNavItems: HomeNavItem[];
  productNavItems: ProductNavItem[];
  whatsappPhone: string;
};

export function SiteHeader({
  homeNavItems,
  productNavItems,
  whatsappPhone,
}: SiteHeaderProps) {
  const t = useTranslations("siteHeader");
  const locale = useLocale() as AppLocale;
  const mobileMenuId = "mobile-main-navigation";
  const mobileProductsId = "mobile-products-navigation";
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const safeProductNavItems = productNavItems ?? [];
  const activeNavItems =
    pathname === "/analise-credito"
      ? ANALISE_CREDITO_NAV_ITEMS
      : pathname === "/fator-k"
        ? FATOR_K_NAV_ITEMS
        : homeNavItems ?? [];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMobileMenu();

    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ctaLabel = t("scheduleConsultation");

  return (
    <header className="sticky top-0 z-50 border-b border-black/15 bg-white/90 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-5 md:px-10">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="font-serif text-base leading-[1.05] font-semibold tracking-[0.22em] uppercase sm:text-lg"
          onClick={handleLogoClick}
        >
          <span className="block">FUSTINONI</span>
          <span className="block">ADVOCACIA</span>
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-wider text-black/70 xl:flex">
          {activeNavItems.map(item => {
            const isSamePage = item.pathname === pathname;
            const localizedHash = getLocalizedHash(
              item.pathname,
              item.hash,
              locale,
            );
            return isSamePage ? (
              <a
                key={`${item.pathname}#${item.hash}`}
                href={`#${localizedHash}`}
                className="transition-colors hover:text-black"
              >
                {t(`nav.${item.labelKey}`)}
              </a>
            ) : (
              <Link
                key={`${item.pathname}#${item.hash}`}
                href={{ pathname: item.pathname, hash: localizedHash }}
                className="transition-colors hover:text-black"
              >
                {t(`nav.${item.labelKey}`)}
              </Link>
            );
          })}

          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto gap-1 rounded-none bg-transparent px-0 text-xs font-medium uppercase tracking-wider text-black/70 shadow-none hover:bg-transparent hover:text-black focus:bg-transparent data-[state=open]:bg-transparent data-active:bg-transparent">
                  {t("specificServices")}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-max min-w-56 rounded-none border border-black/15 bg-white p-2 shadow-xl">
                  <ul className="w-full">
                    {safeProductNavItems.map(product =>
                      product.status === "active" ? (
                        <li key={product.href}>
                          <Link
                            href={product.href}
                            className="block whitespace-nowrap px-3 py-2 text-xs font-medium uppercase tracking-wider text-black/70 transition-colors hover:bg-neutral-100 hover:text-black"
                          >
                            {t(`nav.${product.labelKey}`)}
                          </Link>
                        </li>
                      ) : (
                        <li
                          key={product.href}
                          className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-black/30"
                        >
                          {t(`nav.${product.labelKey}`)}
                        </li>
                      ),
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden xl:block">
            <LanguageToggle />
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="rounded-none border-black/20 xl:hidden"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileMenuId}
            aria-haspopup="menu"
            aria-label={
              isMobileMenuOpen ? t("closeMenuAria") : t("openMenuAria")
            }
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>

          <LeadCaptureDialog whatsappPhone={whatsappPhone} origem="cabecalho">
            <Button className="hidden h-10 shrink-0 rounded-none bg-black px-3 text-[10px] uppercase tracking-wide text-white hover:bg-black/80 sm:px-4 sm:text-[11px] xl:inline-flex">
              {ctaLabel}
            </Button>
          </LeadCaptureDialog>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mt-4 border-t border-black/15 pt-4 xl:hidden">
          <nav
            id={mobileMenuId}
            aria-label={t("primaryNavigationAria")}
            className="flex flex-col border border-black/15 bg-white"
          >
            <div className="border-b border-black/15 p-4">
              <LanguageToggle />
            </div>

            {activeNavItems.map(item => {
              const isSamePage = item.pathname === pathname;
              const localizedHash = getLocalizedHash(
                item.pathname,
                item.hash,
                locale,
              );
              return isSamePage ? (
                <a
                  key={`${item.pathname}#${item.hash}`}
                  href={`#${localizedHash}`}
                  className="border-b border-black/15 px-4 py-3 text-xs font-medium tracking-wider uppercase transition-colors hover:bg-neutral-50"
                  onClick={closeMobileMenu}
                >
                  {t(`nav.${item.labelKey}`)}
                </a>
              ) : (
                <Link
                  key={`${item.pathname}#${item.hash}`}
                  href={{ pathname: item.pathname, hash: localizedHash }}
                  className="border-b border-black/15 px-4 py-3 text-xs font-medium tracking-wider uppercase transition-colors hover:bg-neutral-50"
                  onClick={closeMobileMenu}
                >
                  {t(`nav.${item.labelKey}`)}
                </Link>
              );
            })}

            <button
              type="button"
              className="flex items-center justify-between border-b border-black/15 px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-neutral-50"
              onClick={() => setIsMobileProductsOpen(prev => !prev)}
              aria-expanded={isMobileProductsOpen}
              aria-controls={mobileProductsId}
            >
              {t("specificServices")}
              <ChevronDown
                aria-hidden="true"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${isMobileProductsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div id={mobileProductsId} className="flex flex-col">
              {isMobileProductsOpen &&
                safeProductNavItems.map(product =>
                  product.status === "active" ? (
                    <Link
                      key={product.href}
                      href={product.href}
                      className="block w-full border-b border-black/15 bg-neutral-50 px-6 py-3 text-xs font-medium tracking-wider uppercase transition-colors hover:bg-neutral-100"
                      onClick={closeMobileMenu}
                    >
                      {t(`nav.${product.labelKey}`)}
                    </Link>
                  ) : (
                    <div
                      key={product.href}
                      className="block w-full border-b border-black/15 bg-neutral-50 px-6 py-3 text-xs font-medium tracking-wider uppercase text-black/70"
                    >
                      {t(`nav.${product.labelKey}`)}
                    </div>
                  ),
                )}
            </div>

            <div className="p-4">
              <LeadCaptureDialog whatsappPhone={whatsappPhone} origem="cabecalho">
                <Button
                  className="w-full rounded-none bg-black text-xs tracking-wider uppercase text-white"
                  onClick={closeMobileMenu}
                >
                  {ctaLabel}
                </Button>
              </LeadCaptureDialog>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
