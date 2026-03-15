import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { routing, type AppLocale } from "@/i18n/routing";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>;

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const typedLocale = locale as AppLocale;

  setRequestLocale(typedLocale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={typedLocale} messages={messages}>
      <SiteShell locale={typedLocale}>{children}</SiteShell>
    </NextIntlClientProvider>
  );
}
