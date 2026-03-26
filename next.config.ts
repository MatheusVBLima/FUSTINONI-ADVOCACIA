import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdf-parse", "pdfjs-dist", "@napi-rs/canvas"],
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
        source: "/",
        destination: "/pt",
        permanent: true,
      },
      {
        source: "/analise-credito",
        destination: "/pt/analise-credito",
        permanent: true,
      },
      {
        source: "/fator-k",
        destination: "/pt/fator-k",
        permanent: true,
      },
      {
        source: "/email-confirmado",
        destination: "/pt/email-confirmado",
        permanent: true,
      },
      {
        source: "/email-confirmed",
        destination: "/pt/email-confirmado",
        permanent: true,
      },
      {
        source: "/en/email-confirmado",
        destination: "/en/email-confirmed",
        permanent: true,
      },
      {
        source: "/es/email-confirmado",
        destination: "/es/correo-confirmado",
        permanent: true,
      },
      {
        source: "/it/email-confirmado",
        destination: "/it/email-confermata",
        permanent: true,
      },
      {
        source: "/pt/email-confirmed",
        destination: "/pt/email-confirmado",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
