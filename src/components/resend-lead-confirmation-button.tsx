"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

type ResendLeadConfirmationButtonProps = {
  leadId: string;
};

const ERROR_CODE_TO_KEY: Record<string, string> = {
  ALREADY_CONFIRMED: "errors.alreadyConfirmed",
  LEAD_NOT_FOUND: "errors.leadNotFound",
  RATE_LIMITED: "errors.rateLimited",
  UPDATE_FAILED: "errors.updateFailed",
  RESEND_FAILED: "errors.resendFailed",
  INVALID_REQUEST: "errors.invalidRequest",
  UNKNOWN: "errors.unknown",
};

export function ResendLeadConfirmationButton({
  leadId,
}: ResendLeadConfirmationButtonProps) {
  const t = useTranslations("resendConfirmation");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  async function handleResend() {
    setIsLoading(true);
    setMessage(null);
    setIsError(false);

    try {
      const response = await fetch("/api/leads/resend-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leadId }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { code?: string }
          | null;
        const code = payload?.code ?? "UNKNOWN";

        setIsError(true);
        setMessage(t(ERROR_CODE_TO_KEY[code] ?? ERROR_CODE_TO_KEY.UNKNOWN));
        return;
      }

      setMessage(t("success"));
    } catch {
      setIsError(true);
      setMessage(t("errors.network"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-2">
      <Button
        type="button"
        variant="outline"
        className="rounded-none"
        disabled={isLoading}
        onClick={handleResend}
      >
        {isLoading ? t("loading") : t("button")}
      </Button>

      {message && (
        <p className={`text-sm ${isError ? "text-destructive" : "text-black/70"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
