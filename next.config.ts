import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/(.*)\\.(png|jpg|jpeg|webp|avif|svg|ico|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/email-confirmed",
        destination: "/email-confirmado",
        permanent: true,
      },
      {
        source: "/:locale(en|es|it)/email-confirmado",
        destination: "/:locale/email-confirmed",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/", destination: "/pt" },
      { source: "/analise-credito", destination: "/pt/analise-credito" },
      { source: "/fator-k", destination: "/pt/fator-k" },
      { source: "/email-confirmado", destination: "/pt/email-confirmado" },
      {
        source: "/en/credit-record-review",
        destination: "/en/analise-credito",
      },
      {
        source: "/es/analisis-registro-crediticio",
        destination: "/es/analise-credito",
      },
      {
        source: "/it/analisi-registro-creditizio",
        destination: "/it/analise-credito",
      },
      {
        source: "/en/sabesp-factor-k-review",
        destination: "/en/fator-k",
      },
      {
        source: "/es/revision-factor-k-sabesp",
        destination: "/es/fator-k",
      },
      {
        source: "/it/revisione-fattore-k-sabesp",
        destination: "/it/fator-k",
      },
      {
        source: "/en/email-confirmed",
        destination: "/en/email-confirmado",
      },
      {
        source: "/es/correo-confirmado",
        destination: "/es/email-confirmado",
      },
      {
        source: "/it/email-confermata",
        destination: "/it/email-confirmado",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
