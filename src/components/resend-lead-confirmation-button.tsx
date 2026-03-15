"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

type ResendLeadConfirmationButtonProps = {
  leadId: string;
};

export function ResendLeadConfirmationButton({
  leadId,
}: ResendLeadConfirmationButtonProps) {
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
          | { error?: string }
          | null;

        setIsError(true);
        setMessage(
          payload?.error ?? "Não foi possível reenviar agora. Tente novamente.",
        );
        return;
      }

      setMessage("Novo e-mail de confirmação enviado com sucesso.");
    } catch {
      setIsError(true);
      setMessage("Erro de conexão ao tentar reenviar.");
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
        {isLoading ? "Reenviando..." : "Reenviar confirmação"}
      </Button>

      {message && (
        <p className={`text-sm ${isError ? "text-destructive" : "text-black/70"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
