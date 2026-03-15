import { getTranslations } from "next-intl/server";

import { ResendLeadConfirmationButton } from "@/components/resend-lead-confirmation-button";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type EmailConfirmedPageProps = {
  searchParams: Promise<{
    lead?: string;
    status?: string;
  }>;
};

const VALID_STATUSES = [
  "success",
  "already_confirmed",
  "expired",
  "invalid",
] as const;

type ConfirmationStatus = (typeof VALID_STATUSES)[number];

function toConfirmationStatus(value: string | undefined): ConfirmationStatus {
  if (!value) {
    return "invalid";
  }

  if (VALID_STATUSES.includes(value as ConfirmationStatus)) {
    return value as ConfirmationStatus;
  }

  return "invalid";
}

export default async function EmailConfirmedPage({
  searchParams,
}: EmailConfirmedPageProps) {
  const t = await getTranslations("emailConfirmed");
  const params = await searchParams;
  const status = toConfirmationStatus(params.status);
  const leadId = params.lead;
  const canResend = Boolean(leadId) && (status === "expired" || status === "invalid");
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="w-full border border-black/15 p-8 sm:p-10">
        <h1 className="font-serif text-3xl leading-tight sm:text-4xl">
          {t(`statuses.${status}.title`)}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-black/70 sm:text-base">
          {t(`statuses.${status}.description`)}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Button asChild className="rounded-none bg-black text-white hover:bg-black/90">
            <Link href="/">{t("backToSite")}</Link>
          </Button>

          <Button asChild variant="outline" className="rounded-none">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              {t("talkWhatsApp")}
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
