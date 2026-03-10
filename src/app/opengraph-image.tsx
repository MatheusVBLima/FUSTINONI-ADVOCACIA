import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FUSTINONI ADVOCACIA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          fontFamily: "serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "28px 56px",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontFamily: "serif",
              color: "#000",
            }}
          >
            FUSTINONI ADVOCACIA
          </div>

          <div
            style={{
              display: "flex",
              gap: 32,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.5)",
              fontFamily: "sans-serif",
            }}
          >
            <span>Equipe</span>
            <span>Atuação</span>
            <span>Escritório</span>
            <span>Áreas</span>
          </div>

          <div
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "12px 24px",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            Agendar Consulta
          </div>
        </div>

        {/* Hero */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 80px 40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.45)",
              marginBottom: 28,
              fontFamily: "sans-serif",
            }}
          >
            FUSTINONI ADVOCACIA
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "#000",
              maxWidth: 900,
              marginBottom: 32,
              fontFamily: "serif",
            }}
          >
            Assessoria jurídica com estratégia, discrição e precisão técnica
          </div>

          <div
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "rgba(0,0,0,0.6)",
              maxWidth: 680,
              marginBottom: 40,
              fontFamily: "sans-serif",
            }}
          >
            Atuação consultiva e contenciosa para pessoas físicas e jurídicas, com foco em proteção patrimonial, mitigação de riscos e defesa qualificada.
          </div>

          <div
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "14px 40px",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            Agendar Consulta
          </div>
        </div>

        {/* Bottom bar — practice areas */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(0,0,0,0.15)",
          }}
        >
          {[
            "Contencioso Estratégico",
            "Consultoria Empresarial",
            "Patrimônio e Sucessões",
            "Direito Penal Empresarial",
            "Direito Imobiliário",
            "Compliance e Direito Digital",
          ].map((area, i) => (
            <div
              key={area}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 8px",
                fontSize: 11,
                fontWeight: 600,
                textAlign: "center",
                fontFamily: "serif",
                color: "#000",
                borderRight: i < 5 ? "1px solid rgba(0,0,0,0.15)" : "none",
              }}
            >
              {area}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
