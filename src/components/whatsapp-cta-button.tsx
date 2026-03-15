"use client";

import { Button } from "@/components/ui/button";
import { LeadCaptureDialog } from "@/components/lead-capture-dialog";

type WhatsAppCTAButtonProps = {
  whatsappPhone: string;
  whatsappBaseMessage?: string;
  className?: string;
  children: React.ReactNode;
};

export function WhatsAppCTAButton({
  whatsappPhone,
  whatsappBaseMessage,
  className,
  children,
}: WhatsAppCTAButtonProps) {
  return (
    <LeadCaptureDialog
      whatsappPhone={whatsappPhone}
      whatsappBaseMessage={whatsappBaseMessage}
    >
      <Button className={className}>{children}</Button>
    </LeadCaptureDialog>
  );
}
