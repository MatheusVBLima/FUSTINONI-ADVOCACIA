import type { Metadata } from "next";
import React from "react";

import { OpticsButton } from "@/components/optics/optics-button";
import {
  OpticsCard,
  OpticsCardAction,
  OpticsCardContent,
  OpticsCardDescription,
  OpticsCardHeader,
  OpticsCardTitle,
} from "@/components/optics/optics-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatedList } from "@/components/ui/animated-list";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { SITE_NAME, SITE_OG_IMAGE, getSiteUrl } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const siteUrl = getSiteUrl();
const pagePath = "/fator-k";
const pageUrl = `${siteUrl}${pagePath}`;
const pageTitle =
  "Revisão jurídica de cobrança de Fator K da SABESP | FUSTINONI ADVOCACIA";
const pageDescription =
  "Empresas que pagam Fator K nas faturas SABESP podem ter direito a revisão tarifária e restituição de valores. O escritório realiza análise jurídica e técnica com estratégia extrajudicial ou judicial.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
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
    title: pageTitle,
    description: pageDescription,
    images: [SITE_OG_IMAGE],
  },
};

const productFaqs = [
  {
    question: "Toda cobrança de Fator K é indevida?",
    answer:
      "Não. A cobrança pode ser legítima. A análise jurídica visa identificar se o enquadramento, os parâmetros aplicados e a memória de cálculo são adequados ao caso concreto — e se há base para impugnação.",
  },
  {
    question: "Minha empresa paga essa rubrica há anos. Ainda assim o caso pode ser analisado?",
    answer:
      "Sim. Justamente nos casos de cobrança prolongada a análise costuma ser mais relevante, pois permite examinar a origem do enquadramento, a evolução das faturas, a coerência da classificação adotada e a eventual viabilidade de repetição de valores pagos indevidamente, observados os limites legais aplicáveis.",
  },
  {
    question: "É possível recuperar valores já pagos?",
    answer:
      "Dependendo do caso, sim. A repetição de indébito pode ser pleiteada quando comprovado pagamento indevido, observados os prazos prescricionais aplicáveis.",
  },
  {
    question: "Quais documentos são necessários para a análise inicial?",
    answer:
      "Em geral, faturas SABESP dos últimos anos, contrato de fornecimento, documentos societários e dados cadastrais da empresa. A partir disso, o escritório realiza o diagnóstico de viabilidade.",
  },
  {
    question: "A impugnação pode ser feita sem ação judicial?",
    answer:
      "Sim. Em muitos casos, a via administrativa é o primeiro passo — e pode ser suficiente para a revisão dos valores. A medida judicial é adotada quando necessária ou mais eficiente.",
  },
  {
    question: "O atendimento pode ser remoto?",
    answer:
      "Sim. O escritório realiza atendimentos remotos e presenciais, com acompanhamento contínuo e comunicação transparente durante toda a condução do caso.",
  },
];

const heroTags = [
  "Atendimento empresarial",
  "Análise documental individualizada",
  "Atuação consultiva e contenciosa",
];

const heroPreliminarItems = [
  {
    text: "Fatura SABESP com cobrança de Fator K sem memória de cálculo clara",
    tone: "default" as const,
    order: 1,
  },
  {
    text: "Empresa enquadrada em categoria tarifária sem verificação individualizada",
    tone: "default" as const,
    order: 2,
  },
  {
    text: "Parâmetros técnicos aplicados sem comprovação documental adequada",
    tone: "default" as const,
    order: 3,
  },
  {
    text: "Impacto financeiro relevante em contas empresariais ao longo de meses ou anos",
    tone: "default" as const,
    order: 4,
  },
  {
    text: "A análise jurídica permite aferir se o enquadramento e os valores cobrados têm respaldo técnico e legal.",
    tone: "inverse" as const,
    order: 5,
  },
];

export default function FatorKPage() {
  const whatsappUrlHero = buildWhatsAppUrl(
    undefined,
    "Olá! Gostaria de solicitar uma análise jurídica sobre o Fator K na minha fatura da SABESP.",
  );
  const whatsappUrlCta = buildWhatsAppUrl(
    undefined,
    "Olá! Vim pelo site e quero agendar uma consulta sobre o Fator K da SABESP.",
  );
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: productFaqs.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="border-b border-black/15 px-4 pt-16 pb-12 sm:px-6 sm:pt-20 md:px-10 md:pt-24">
        <div className="grid items-start gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0">
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-black/70">
              Revisão jurídica de cobrança de Fator K — SABESP
            </p>
            <h1 className="mb-8 max-w-3xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
              Sua empresa está pagando Fator K à SABESP?
            </h1>
            <p className="mb-5 max-w-3xl text-sm leading-7 text-black/70 sm:text-base">
              O Fator K é uma cobrança tarifária aplicada pela SABESP sobre determinadas categorias
              de empresas, calculada com base em parâmetros técnicos que nem sempre são
              transparentes ou auditáveis.
            </p>
            <p className="mb-8 max-w-3xl text-sm leading-7 text-black/70 sm:text-base">
              O escritório realiza análise jurídica e técnica das faturas e do contrato de
              fornecimento para verificar se o enquadramento e os valores cobrados têm amparo legal
              e contratual — e, quando cabível, estrutura a impugnação adequada.
            </p>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <OpticsButton
                render={
                  <a href={whatsappUrlHero} target="_blank" rel="noopener noreferrer" />
                }
                variant="decorations"
                decorationColor="black"
                className="h-[42px] rounded-none border-black bg-black px-6 text-xs uppercase tracking-wider text-white hover:bg-black/85"
              >
                Solicitar análise do caso
              </OpticsButton>
              <Button
                asChild
                variant="outline"
                className="h-[42px] rounded-none border-black/30 px-6 text-xs uppercase tracking-wider"
              >
                <a href="#como-atuamos">Entender a atuação</a>
              </Button>
            </div>

            <div className="mb-8 w-full max-w-full overflow-hidden">
              <Marquee
                className="w-full max-w-full overflow-hidden [--duration:28s] [--gap:0.5rem] p-0"
                repeat={6}
              >
                {heroTags.map(tag => (
                  <Card
                    key={tag}
                    className="min-w-56 shrink-0 rounded-none border-black/15 px-4 py-3 text-xs font-medium shadow-none"
                  >
                    {tag}
                  </Card>
                ))}
              </Marquee>
            </div>
          </div>

          <div className="min-w-0">
            <OpticsCard
              decorations
              className="rounded-none border border-black/15 ring-0 bg-white p-6 shadow-none"
            >
              <OpticsCardHeader className="mb-6 border-b border-black/15 pb-4">
                <OpticsCardDescription className="text-xs font-bold uppercase tracking-widest text-black/70">
                  Avaliação preliminar
                </OpticsCardDescription>
                <OpticsCardTitle className="mt-2 font-serif text-2xl leading-tight font-normal">
                  Indícios que merecem exame técnico
                </OpticsCardTitle>
                <OpticsCardAction>
                  <div className="border border-black/20 px-3 py-1 text-[11px] font-medium uppercase tracking-wider">
                    SABESP / Fator K
                  </div>
                </OpticsCardAction>
              </OpticsCardHeader>

              <OpticsCardContent className="px-0">
                <AnimatedList delay={650} newestOnTop={false} className="w-full items-stretch gap-2">
                  {heroPreliminarItems.map(item => (
                    <Card
                      key={item.text}
                      style={{ order: item.order }}
                      className={
                        item.tone === "inverse"
                          ? "rounded-none border-black bg-black p-3 text-sm text-white shadow-none"
                          : "rounded-none border-black/15 p-3 text-sm shadow-none"
                      }
                    >
                      {item.text}
                    </Card>
                  ))}
                </AnimatedList>
              </OpticsCardContent>
            </OpticsCard>
          </div>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      {/* Problema */}
      <section id="problema" className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10">
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
              O problema
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Cobrança relevante, técnica opaca e sem auditoria regular
            </h2>
          </div>
          <div className="space-y-4 border-l border-black/15 pl-8 text-sm leading-7 text-black/70 sm:text-base">
            <p>
              Muitas empresas pagam o Fator K há anos sem questionar o enquadramento tarifário ou
              verificar se os parâmetros aplicados pela SABESP correspondem à realidade operacional.
            </p>
            <p>
              A ausência de auditoria jurídica das faturas pode representar pagamento a maior
              durante anos, sem possibilidade de recuperação futura por decurso do prazo.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Cobrança calculada com base em parâmetros técnicos opacos e não auditados", index: "01" },
            { label: "Memória de cálculo ausente ou incompleta nas faturas mensais", index: "02" },
            { label: "Enquadramento em categorias tarifárias sem verificação individualizada", index: "03" },
            { label: "Aceitação passiva de valores sem análise jurídica prévia", index: "04" },
            { label: "Ausência de impugnação administrativa durante o prazo decadencial", index: "05" },
            { label: "Potencial de revisão e recuperação de valores pagos indevidamente", index: "06" },
          ].map(item => (
            <OpticsCard
              key={item.label}
              decorations
              className="rounded-none border border-black/15 bg-white shadow-none ring-0"
            >
              <OpticsCardHeader>
                <OpticsCardDescription className="font-bold text-black/30">{item.index}</OpticsCardDescription>
                <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                  {item.label}
                </OpticsCardTitle>
              </OpticsCardHeader>
            </OpticsCard>
          ))}
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      {/* Como Atuamos */}
      <section
        id="como-atuamos"
        className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10"
      >
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
              Como atuamos
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Atuação jurídica estruturada, com análise técnica e estratégia proporcional
            </h2>
            <p className="mt-6 text-sm leading-7 text-black/65 sm:text-base">
              Cada caso exige leitura individualizada das faturas, contratos e dados de consumo.
              Cruzamos informações técnicas e jurídicas para definir a estratégia mais adequada —
              administrativa ou judicial.
            </p>
          </div>

          <OpticsCard
            decorations
            className="rounded-none border border-black/15 bg-white shadow-none ring-0 gap-0"
          >
            <OpticsCardHeader className="border-b border-black/15 pb-4">
              <OpticsCardDescription className="text-xs font-bold uppercase tracking-widest text-black/70">
                Etapas da atuação
              </OpticsCardDescription>
              <OpticsCardTitle className="mt-1 font-serif text-xl font-normal leading-tight">
                Do diagnóstico ao acompanhamento integral
              </OpticsCardTitle>
            </OpticsCardHeader>
            <div
              style={{ "--card": "black", "--muted": "rgb(255 255 255 / 0.15)" } as React.CSSProperties}
              className="h-10 w-full bg-[repeating-linear-gradient(45deg,var(--card),var(--card)_3px,var(--muted)_3px,var(--muted)_6px)]"
            />
            <OpticsCardContent className="px-0">
              <AnimatedList delay={400} newestOnTop={false} className="w-full items-stretch gap-2">
                {[
                  { step: "01", title: "Levantamento documental", description: "Faturas, histórico de consumo, contratos, documentos societários e CNAE." },
                  { step: "02", title: "Diagnóstico jurídico e técnico", description: "Avaliação do enquadramento tarifário, memória de cálculo e histórico de faturamento." },
                  { step: "03", title: "Definição da estratégia", description: "Impugnação administrativa, ação revisional ou pleito de repetição de indébito, conforme o caso." },
                  { step: "04", title: "Acompanhamento integral", description: "Condução do caso até a conclusão com discrição e precisão técnica." },
                ].map((item, i) => (
                  <Card
                    key={item.step}
                    style={{ order: i + 1 }}
                    className="rounded-none border-black/15 p-3 shadow-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 border border-black/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black/60">
                        {item.step}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="mt-0.5 text-xs leading-relaxed text-black/70">{item.description}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </AnimatedList>
            </OpticsCardContent>
          </OpticsCard>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      {/* Questionavel */}
      <section
        id="questionavel"
        className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10"
      >
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-start">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
              Quando a cobrança é questionável
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              O que pode ser discutido juridicamente
            </h2>
            <p className="mt-6 text-sm leading-7 text-black/65 sm:text-base">
              Identificada irregularidade no enquadramento ou na metodologia de cálculo, a atuação
              pode buscar revisão tarifária, restituição de valores e compensação dos efeitos
              financeiros do pagamento indevido.
            </p>
            <Card className="mt-6 rounded-none border-black/15 bg-neutral-50 p-4 text-sm leading-7 text-black/70 shadow-none">
              Não há fórmula única nem promessa de resultado: a estratégia depende da documentação
              disponível e dos elementos técnicos e jurídicos do caso concreto.
            </Card>
          </div>

          <OpticsCard
            decorations
            className="rounded-none border border-black/15 bg-white shadow-none ring-0 gap-0"
          >
            <OpticsCardHeader className="border-b border-black/15 pb-4">
              <OpticsCardDescription className="text-xs font-bold uppercase tracking-widest text-black/70">
                Hipóteses de questionamento
              </OpticsCardDescription>
              <OpticsCardTitle className="mt-1 font-serif text-xl font-normal leading-tight">
                O que pode ser impugnado juridicamente
              </OpticsCardTitle>
            </OpticsCardHeader>
            <div
              style={{ "--card": "black", "--muted": "rgb(255 255 255 / 0.15)" } as React.CSSProperties}
              className="h-10 w-full bg-[repeating-linear-gradient(45deg,var(--card),var(--card)_3px,var(--muted)_3px,var(--muted)_6px)]"
            />
            <OpticsCardContent className="px-0">
              <AnimatedList delay={300} newestOnTop={false} className="w-full items-stretch gap-2">
                {[
                  "Enquadramento em categoria tarifária sem verificação individualizada da empresa",
                  "Aplicação de parâmetros sem comprovação da metodologia de cálculo",
                  "Ausência de memória de cálculo acessível e auditável nas faturas",
                  "Majoração tarifária suportada por longo período sem base documental compreensível",
                  "Necessidade de cessação ou revisão da cobrança futura",
                  "Viabilidade de recuperação de valores pagos, quando juridicamente cabível",
                ].map((item, i) => (
                  <Card
                    key={item}
                    style={{ order: i + 1 }}
                    className="rounded-none border-black/15 p-3 text-sm leading-6 shadow-none"
                  >
                    {item}
                  </Card>
                ))}
              </AnimatedList>
            </OpticsCardContent>
          </OpticsCard>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      {/* Para Quem */}
      <section id="publico" className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10">
        <div className="max-w-4xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
            Para quem é esta página
          </div>
          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            Empresas que pagam Fator K e nunca questionaram o enquadramento
          </h2>
          <p className="mt-6 text-sm leading-7 text-black/65 sm:text-base">
            A página foi pensada para empresas que recebem cobrança de Fator K na fatura SABESP e
            nunca realizaram análise jurídica do enquadramento tarifário ou da metodologia aplicada.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-3">
          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Restaurantes, padarias e operações de alimentação com alto consumo de água
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Shoppings, condomínios comerciais e centros empresariais com múltiplos usuários
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Frigoríficos, lavanderias e prestadores de serviço com processo produtivo intensivo em água
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Empresas industriais que nunca auditaram suas faturas SABESP
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Negócios que pagam Fator K há anos sem impugnar ou questionar
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Sociedades em revisão de custos operacionais ou planejamento estratégico que identificaram a rubrica nas faturas
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      {/* Diferenciais */}
      <section
        id="diferenciais"
        className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10"
      >
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
              Diferenciais do escritório
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Por que a análise deve ser jurídica, e não apenas operacional
            </h2>
          </div>
          <p className="mt-[calc(1rem+1lh)] border-l border-black/15 pl-8 text-sm leading-7 text-black/65 sm:text-base">
            A revisão da cobrança do Fator K exige estruturação jurídica da tese, leitura
            regulatória, análise das faturas em série e definição da medida adequada — sempre à
            luz da documentação do caso.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Análise técnica e jurídica integrada
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                Avaliação da cobrança sob perspectiva regulatória, contratual e legal, sem atalhos.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Estratégia proporcional ao caso
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                Cada empresa recebe encaminhamento adequado — impugnação administrativa, revisional ou pleito indenizatório — conforme o que os documentos suportam.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Atuação preventiva e contenciosa
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                Capacidade de atuar antes do litígio, estruturando defesas administrativas, e na fase judicial quando necessário.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Sigilo absoluto
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                Tratamento confidencial de dados operacionais, contratos e histórico de consumo.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Atendimento personalizado
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                Nenhuma empresa é tratada como caso padrão. O porte, o setor e o histórico de cobrança determinam a estratégia.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Experiência em demandas regulatórias de alta complexidade
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                Cobranças da SABESP envolvem metodologia técnica específica — a leitura jurídica exige domínio do marco regulatório do saneamento.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      {/* FAQ */}
      <section id="faq" className="border-b border-black/15">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-black/15 p-8 sm:p-12 lg:border-r lg:border-b-0 lg:p-20">
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/70">FAQ</div>
            <h2 className="max-w-sm font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Perguntas frequentes antes do início da atuação jurídica
            </h2>
          </div>

          <div className="flex flex-col">
            <Accordion type="single" collapsible className="w-full">
              {productFaqs.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`item-${index}`}
                  className="border-b border-black/15 px-5 py-2 last:border-b-0 sm:px-8"
                >
                  <AccordionTrigger className="py-6 text-left text-sm font-medium hover:no-underline md:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 leading-relaxed text-black/70">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      {/* CTA */}
      <section className="relative border-b border-black/15 bg-black px-4 pt-16 pb-20 text-center sm:px-6 sm:pt-20 md:px-10 md:pt-24 overflow-hidden">
        <BackgroundBeams className="absolute inset-0 z-0" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-6 text-xs font-bold uppercase tracking-widest text-white/85">
            Agende sua consulta
          </div>
          <h2 className="mx-auto mb-6 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
            Sua empresa paga Fator K e nunca verificou se a cobrança é exigível?
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
            Antes de suportar indefinidamente um custo relevante, convém apurar com critério técnico
            se a cobrança foi corretamente constituída, se o enquadramento está adequado e se há
            medida jurídica viável para revisão, cessação ou restituição de valores.
          </p>
          <div className="mt-8 flex justify-center">
            <OpticsButton
              render={<a href={whatsappUrlCta} target="_blank" rel="noopener noreferrer" />}
              variant="decorations"
              decorationColor="white"
              className="h-[42px] rounded-none border-white bg-white px-8 text-xs uppercase tracking-wider text-black hover:bg-white/90"
            >
              Agendar consulta
            </OpticsButton>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-wider text-white/85">
            <span>Atendimento por agendamento</span>
            <span>Análise individualizada</span>
            <span>Atuação nacional</span>
          </div>
        </div>
      </section>
    </>
  );
}

