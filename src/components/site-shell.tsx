import { ReactNode } from "react";

import { PRODUCT_NAV_ITEMS, HOME_NAV_ITEMS } from "@/lib/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { VirtualAssistantChat } from "./virtual-assistant-chat";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <div className="min-h-screen overflow-x-clip bg-grid-pattern text-black font-sans selection:bg-black selection:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col bg-white shadow-2xl sm:border-x sm:border-black/15">
        <SiteHeader
          homeNavItems={HOME_NAV_ITEMS}
          productNavItems={PRODUCT_NAV_ITEMS}
          whatsappUrl={whatsappUrl}
        />
        {children}
        <SiteFooter />
      </div>

      <VirtualAssistantChat whatsappUrl={whatsappUrl} />
    </div>
  );
}
