"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  ANALISE_CREDITO_NAV_ITEMS,
  FATOR_K_NAV_ITEMS,
  type HomeNavItem,
  type ProductNavItem,
} from "@/lib/navigation";
import { LeadCaptureDialog } from "@/components/lead-capture-dialog";

type SiteHeaderProps = {
  homeNavItems: HomeNavItem[];
  productNavItems: ProductNavItem[];
  whatsappUrl: string;
  whatsappPhone: string;
};

export function SiteHeader({
  homeNavItems,
  productNavItems,
  whatsappUrl,
  whatsappPhone,
}: SiteHeaderProps) {
  const mobileMenuId = "mobile-main-navigation";
  const mobileProductsId = "mobile-products-navigation";
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const activeNavItems =
    pathname === "/analise-credito"
      ? ANALISE_CREDITO_NAV_ITEMS
      : pathname === "/fator-k"
        ? FATOR_K_NAV_ITEMS
        : homeNavItems;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/15 bg-white/90 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-5 md:px-10">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-base leading-[1.05] font-semibold tracking-[0.22em] uppercase sm:text-lg"
          onClick={closeMobileMenu}
        >
          <span className="block">FUSTINONI</span>
          <span className="block">ADVOCACIA</span>
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-wider text-black/70 xl:flex">
          {activeNavItems.map(item => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-black">
              {item.label.toUpperCase()}
            </Link>
          ))}

          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto gap-1 rounded-none bg-transparent px-0 text-xs font-medium uppercase tracking-wider text-black/70 shadow-none hover:bg-transparent hover:text-black focus:bg-transparent data-[state=open]:bg-transparent data-active:bg-transparent">
                  SERVIÇOS ESPECÍFICOS
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-max min-w-56 rounded-none border border-black/15 bg-white p-2 shadow-xl">
                  <ul className="w-full">
                    {productNavItems.map(product =>
                      product.status === "active" ? (
                        <li key={product.href}>
                          <Link
                            href={product.href}
                            className="block whitespace-nowrap px-3 py-2 text-xs font-medium uppercase tracking-wider text-black/70 transition-colors hover:bg-neutral-100 hover:text-black"
                          >
                            {product.label.toUpperCase()}
                          </Link>
                        </li>
                      ) : (
                        <li key={product.href} className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-black/30">
                          {product.label.toUpperCase()}
                        </li>
                      ),
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-none border-black/20 xl:hidden"
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-controls={mobileMenuId}
          aria-haspopup="menu"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
        </Button>

        <LeadCaptureDialog whatsappPhone={whatsappPhone}>
          <Button
            className="hidden shrink-0 rounded-none bg-black px-4 py-4 text-[11px] uppercase tracking-wider text-white hover:bg-black/80 sm:px-6 sm:py-5 sm:text-xs xl:inline-flex"
          >
            Agendar Consulta
          </Button>
        </LeadCaptureDialog>
      </div>

      {isMobileMenuOpen && (
        <div className="mt-4 border-t border-black/15 pt-4 xl:hidden">
          <nav id={mobileMenuId} aria-label="Navegação principal" className="flex flex-col border border-black/15 bg-white">
            {activeNavItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-black/15 px-4 py-3 text-xs font-medium tracking-wider uppercase transition-colors hover:bg-neutral-50"
                onClick={closeMobileMenu}
              >
                {item.label.toUpperCase()}
              </Link>
            ))}

            <button
              type="button"
              className="flex items-center justify-between border-b border-black/15 px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-neutral-50"
              onClick={() => setIsMobileProductsOpen(prev => !prev)}
              aria-expanded={isMobileProductsOpen}
              aria-controls={mobileProductsId}
            >
              Serviços Específicos
              <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform duration-200 ${isMobileProductsOpen ? "rotate-180" : ""}`} />
            </button>
            <div id={mobileProductsId} className="flex flex-col">
              {isMobileProductsOpen && productNavItems.map(product =>
                product.status === "active" ? (
                  <Link
                    key={product.href}
                    href={product.href}
                    className="block w-full border-b border-black/15 bg-neutral-50 px-6 py-3 text-xs font-medium tracking-wider uppercase transition-colors hover:bg-neutral-100"
                    onClick={closeMobileMenu}
                  >
                    {product.label.toUpperCase()}
                  </Link>
                ) : (
                  <div
                    key={product.href}
                    className="block w-full border-b border-black/15 bg-neutral-50 px-6 py-3 text-xs font-medium tracking-wider uppercase text-black/70"
                  >
                    {product.label.toUpperCase()}
                  </div>
                ),
              )}
            </div>

            <div className="p-4">
              <LeadCaptureDialog whatsappPhone={whatsappPhone}>
                <Button className="w-full rounded-none bg-black text-xs tracking-wider uppercase text-white" onClick={closeMobileMenu}>
                  Agendar Consulta
                </Button>
              </LeadCaptureDialog>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

