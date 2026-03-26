"use client";

import { Button } from "@/components/ui/button";
import { LeadCaptureDialog } from "@/components/lead-capture-dialog";

type WhatsAppCTAButtonProps = {
  whatsappPhone: string;
  whatsappBaseMessage?: string;
  origem?: string;
  className?: string;
  children: React.ReactNode;
};

export function WhatsAppCTAButton({
  whatsappPhone,
  whatsappBaseMessage,
  origem,
  className,
  children,
}: WhatsAppCTAButtonProps) {
  return (
    <LeadCaptureDialog
      whatsappPhone={whatsappPhone}
      whatsappBaseMessage={whatsappBaseMessage}
      origem={origem}
    >
      <Button className={className}>{children}</Button>
    </LeadCaptureDialog>
  );
}
