import Link from "next/link";

import { ResendLeadConfirmationButton } from "@/components/resend-lead-confirmation-button";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type EmailConfirmedPageProps = {
  searchParams: Promise<{
    lead?: string;
    status?: string;
  }>;
};

const CONTENT_BY_STATUS = {
  success: {
    title: "E-mail confirmado com sucesso",
    description:
      "Seu e-mail foi validado. Nossa equipe poderá seguir com o contato normalmente.",
  },
  already_confirmed: {
    title: "Este e-mail já foi confirmado",
    description:
      "Seu cadastro já estava validado. Se precisar, você pode falar com nossa equipe agora.",
  },
  expired: {
    title: "Link expirado",
    description:
      "O link de confirmação venceu. Você pode solicitar um novo envio agora mesmo.",
  },
  invalid: {
    title: "Link inválido",
    description:
      "Não foi possível validar este link. Solicite um novo e-mail de confirmação.",
  },
} as const;

type ConfirmationStatus = keyof typeof CONTENT_BY_STATUS;

function toConfirmationStatus(value: string | undefined): ConfirmationStatus {
  if (!value) return "invalid";
  if (value in CONTENT_BY_STATUS) {
    return value as ConfirmationStatus;
  }
  return "invalid";
}

export default async function EmailConfirmedPage({
  searchParams,
}: EmailConfirmedPageProps) {
  const params = await searchParams;
  const status = toConfirmationStatus(params.status);
  const leadId = params.lead;
  const content = CONTENT_BY_STATUS[status];
  const canResend =
    Boolean(leadId) && (status === "expired" || status === "invalid");
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="w-full border border-black/15 p-8 sm:p-10">
        <h1 className="font-serif text-3xl leading-tight sm:text-4xl">
          {content.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-black/70 sm:text-base">
          {content.description}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Button asChild className="rounded-none bg-black text-white hover:bg-black/90">
            <Link href="/">Voltar para o site</Link>
          </Button>

          <Button asChild variant="outline" className="rounded-none">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp
            </a>
          </Button>
        </div>

        {canResend && leadId ? (
          <div className="mt-6 border-t border-black/15 pt-6">
            <ResendLeadConfirmationButton leadId={leadId} />
          </div>
        ) : null}
      </div>
    </main>
  );
}
