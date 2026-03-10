"use client";

import dynamic from "next/dynamic";

const VirtualAssistantChat = dynamic(
  () =>
    import("./virtual-assistant-chat").then(
      mod => mod.VirtualAssistantChat,
    ),
  { ssr: false },
);

type VirtualAssistantChatLazyProps = {
  whatsappUrl: string;
};

export function VirtualAssistantChatLazy({
  whatsappUrl,
}: VirtualAssistantChatLazyProps) {
  return <VirtualAssistantChat whatsappUrl={whatsappUrl} />;
}

