import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "streamdown/styles.css";
import "./globals.css";

import { SiteShell } from "@/components/site-shell";
import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE, getSiteUrl } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

const siteUrl = getSiteUrl();
const isProduction = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "pt_BR",
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  robots: isProduction
    ? {
        index: true,
        follow: true,
      }
    : {
        index: false,
        follow: false,
        nocache: true,
      },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} antialiased`}
      >
        <SiteShell>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
