import { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { PRODUCT_NAV_ITEMS, HOME_NAV_ITEMS } from "@/lib/navigation";
import { type AppLocale } from "@/i18n/routing";
import { buildWhatsAppUrl, getChatWhatsAppPrefillMessage } from "@/lib/whatsapp";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { VirtualAssistantChatLazy } from "./virtual-assistant-chat-lazy";

type SiteShellProps = {
  children: ReactNode;
  locale: AppLocale;
};

export async function SiteShell({ children, locale }: SiteShellProps) {
  const t = await getTranslations("siteShell");
  const whatsappPhone = process.env.WHATSAPP_PHONE_NUMBER ?? "";
  const whatsappUrl = buildWhatsAppUrl();
  const whatsappUrlChat = buildWhatsAppUrl(
    undefined,
    getChatWhatsAppPrefillMessage(locale),
  );

  return (
    <div className="min-h-screen overflow-x-clip bg-grid-pattern text-black font-sans selection:bg-black selection:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:bg-black focus:px-3 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-wider focus:text-white"
      >
        {t("skipToContent")}
      </a>

      <div className="mx-auto flex min-h-screen w-full max-w-[84rem] flex-col bg-white shadow-2xl sm:border-x sm:border-black/15">
        <SiteHeader
          homeNavItems={HOME_NAV_ITEMS}
          productNavItems={PRODUCT_NAV_ITEMS}
          whatsappPhone={whatsappPhone}
        />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </div>

      <VirtualAssistantChatLazy
        locale={locale}
        whatsappUrl={whatsappUrlChat}
        whatsappPhone={whatsappPhone}
      />
    </div>
  );
}
