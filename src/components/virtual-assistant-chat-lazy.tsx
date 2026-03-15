"use client";

import dynamic from "next/dynamic";

import { type AppLocale } from "@/i18n/routing";

const VirtualAssistantChat = dynamic(
  () =>
    import("./virtual-assistant-chat").then(
      mod => mod.VirtualAssistantChat,
    ),
  { ssr: false },
);

type VirtualAssistantChatLazyProps = {
  locale: AppLocale;
  whatsappUrl: string;
  whatsappPhone: string;
};

export function VirtualAssistantChatLazy({
  locale,
  whatsappUrl,
  whatsappPhone,
}: VirtualAssistantChatLazyProps) {
  return (
    <VirtualAssistantChat
      locale={locale}
      whatsappUrl={whatsappUrl}
      whatsappPhone={whatsappPhone}
    />
  );
}
