import { ReactNode } from "react";

import { PRODUCT_NAV_ITEMS, HOME_NAV_ITEMS } from "@/lib/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { VirtualAssistantChatLazy } from "./virtual-assistant-chat-lazy";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const whatsappUrl = buildWhatsAppUrl();
  const whatsappUrlChat = buildWhatsAppUrl(
    undefined,
    "Olá! Estava usando o assistente virtual do site e gostaria de falar com um atendente da FUSTINONI ADVOCACIA.",
  );

  return (
    <div className="min-h-screen overflow-x-clip bg-grid-pattern text-black font-sans selection:bg-black selection:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:bg-black focus:px-3 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-wider focus:text-white"
      >
        Pular para o conteudo principal
      </a>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col bg-white shadow-2xl sm:border-x sm:border-black/15">
        <SiteHeader
          homeNavItems={HOME_NAV_ITEMS}
          productNavItems={PRODUCT_NAV_ITEMS}
          whatsappUrl={whatsappUrl}
        />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>

      <VirtualAssistantChatLazy whatsappUrl={whatsappUrlChat} />
    </div>
  );
}
