import type { Metadata } from "next";

import { OpticsButton } from "@/components/optics/optics-button";
import {
  OpticsCard,
  OpticsCardAction,
  OpticsCardContent,
  OpticsCardDescription,
  OpticsCardFooter,
  OpticsCardHeader,
  OpticsCardTitle,
} from "@/components/optics/optics-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatedList } from "@/components/ui/animated-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SITE_NAME, SITE_OG_IMAGE, getSiteUrl } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const siteUrl = getSiteUrl();
const pagePath = "/analise-credito";
const pageUrl = `${siteUrl}${pagePath}`;
const BCB_REPORT_URL =
  "https://www.bcb.gov.br/meubc/relatorioemprestimofinanciamento";
const pageTitle =
  "Análise jurídica de histórico bancário e acesso ao crédito | FUSTINONI ADVOCACIA";
const pageDescription =
  "Recusa de crédito, financiamento, limite bancário ou aprovação cadastral pode envolver informação desatualizada, distorcida ou indevida. O escritório realiza análise técnica e define a medida jurídica cabível.";

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
    question: "Ter o nome limpo significa que meu histórico bancário está regular?",
    answer:
      "Não necessariamente. É possível inexistir negativação clássica e, ainda assim, subsistirem informações bancárias ou cadastrais que influenciem a análise de crédito realizada pelas instituições financeiras.",
  },
  {
    question: "Toda recusa de crédito é ilegal?",
    answer:
      "Não. A concessão de crédito envolve critérios internos das instituições. Contudo, quando a negativa decorre de dado indevido, inexato, desatualizado ou mantido sem respaldo, pode haver providência jurídica cabível.",
  },
  {
    question: "O escritório analisa a documentação antes de propor qualquer medida?",
    answer:
      "Sim. A atuação parte de análise técnica da documentação, justamente para aferir a viabilidade jurídica do caso e definir a estratégia adequada. Para triagem inicial, o relatório de Empréstimos e Financiamentos do Banco Central é um documento relevante.",
  },
  {
    question: "É possível pleitear indenização?",
    answer:
      "Em hipóteses juridicamente configuradas, sim. Isso dependerá da natureza da irregularidade, da extensão do prejuízo e dos elementos probatórios disponíveis.",
  },
  {
    question: "O atendimento pode ser remoto?",
    answer:
      "Sim. O escritório realiza atendimentos remotos e presenciais, conforme a necessidade do caso.",
  },
  {
    question: "O caso pode exigir medida urgente?",
    answer:
      "Pode. Em determinadas situações, sobretudo quando há operação financeira em curso ou prejuízo iminente, pode ser necessária tutela de urgência, a depender da análise documental.",
  },
];

const heroTags = [
  "Atendimento sigiloso",
  "Análise documental individualizada",
  "Atuação consultiva e contenciosa",
];

const heroPreliminarItems = [
  {
    text: "Recusa reiterada de crédito sem justificativa clara",
    tone: "default" as const,
    order: 1,
  },
  {
    text: "Financiamento negado apesar de nome aparentemente regular",
    tone: "default" as const,
    order: 2,
  },
  { text: "Redução ou bloqueio de limite bancário", tone: "default" as const, order: 3 },
  { text: "Dados bancários desatualizados ou controvertidos", tone: "default" as const, order: 4 },
  {
    text: "A análise jurídica permite distinguir recusa creditícia legítima de restrição fundada em informação irregular, inexata ou desatualizada.",
    tone: "inverse" as const,
    order: 5,
  },
];

export default function AnaliseCreditoPage() {
  const whatsappUrlHero = buildWhatsAppUrl(
    undefined,
    "Olá! Gostaria de solicitar uma análise de apontamentos indevidos no meu CPF/CNPJ.",
  );
  const whatsappUrlCta = buildWhatsAppUrl(
    undefined,
    "Olá! Vim pelo site e quero agendar uma consulta sobre apontamentos indevidos no meu CPF/CNPJ.",
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

      <section className="border-b border-black/15 px-4 pt-16 pb-12 sm:px-6 sm:pt-20 md:px-10 md:pt-24">
        <div className="grid items-start gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0">
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-black/70">
              Análise jurídica de histórico bancário e acesso ao crédito
            </p>
            <h1 className="mb-8 max-w-3xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
              Crédito negado, mesmo sem negativação aparente?
            </h1>
            <p className="mb-5 max-w-3xl text-sm leading-7 text-black/70 sm:text-base">
              Recusas de crédito, financiamento e limite bancário podem decorrer de dados
              desatualizados ou indevidos em sistemas do mercado financeiro, inclusive no SCR.
            </p>
            <p className="mb-8 max-w-3xl text-sm leading-7 text-black/70 sm:text-base">
              O escritório realiza análise jurídica do histórico e da documentação para definir a
              medida cabível: correção de apontamentos, cessação de efeitos lesivos e
              responsabilização quando houver base legal.
            </p>

            <div className="mb-8 max-w-3xl border border-black/15 bg-neutral-50 px-4 py-3 text-left text-sm leading-6 text-black/70">
              <p className="font-medium text-black">Documento essencial para análise inicial</p>
              <a
                href={BCB_REPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block underline underline-offset-2"
              >
                Gerar Relatório de Empréstimos e Financiamentos (Banco Central)
              </a>
            </div>

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
                    SCR / Registrato
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

      <section id="problema" className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10">
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
              O problema
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Quando o nome parece regular, mas o mercado continua fechado
            </h2>
          </div>
          <div className="space-y-4 border-l border-black/15 pl-8 text-sm leading-7 text-black/70 sm:text-base">
            <p>
              Muitos clientes chegam com o nome aparentemente regular, mas com recusas repetidas em
              bancos e financeiras.
            </p>
            <p>
              Em vários casos, o bloqueio está ligado a registros bancários controvertidos ou
              desatualizados, afetando limite, financiamento e reputação negocial.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Recusa reiterada de crédito sem justificativa clara", index: "01" },
            { label: "Financiamento negado apesar de nome aparentemente regular", index: "02" },
            { label: "Redução ou bloqueio de limite bancário", index: "03" },
            { label: "Dados bancários desatualizados ou controvertidos", index: "04" },
            { label: "Dificuldade em operações empresariais e pessoais", index: "05" },
            { label: "Necessidade de correção e responsabilização jurídica", index: "06" },
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
              Atuação jurídica estruturada, com estratégia e precisão técnica
            </h2>
            <p className="mt-6 text-sm leading-7 text-black/65 sm:text-base">
              Cada caso exige leitura jurídica individual. Cruzamos relatórios, contratos e histórico
              bancário para definir a estratégia extrajudicial ou judicial mais adequada.
            </p>
            <p className="mt-4 text-sm leading-7 text-black/65 sm:text-base">
              Para triagem inicial, priorize a emissão do relatório oficial do Banco Central:{" "}
              <a
                href={BCB_REPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-2"
              >
                Relatório de Empréstimos e Financiamentos
              </a>
              .
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
                Do diagnóstico ao acompanhamento completo
              </OpticsCardTitle>
            </OpticsCardHeader>
            <div
              style={{ "--card": "black", "--muted": "rgb(255 255 255 / 0.15)" } as React.CSSProperties}
              className="h-10 w-full bg-[repeating-linear-gradient(45deg,var(--card),var(--card)_3px,var(--muted)_3px,var(--muted)_6px)]"
            />
            <OpticsCardContent className="px-0">
              <AnimatedList delay={400} newestOnTop={false} className="w-full items-stretch gap-2">
                {[
                  { step: "01", title: "Recebimento da documentação", description: "Relatórios, contratos e comprovantes essenciais, com prioridade ao relatório do Banco Central." },
                  { step: "02", title: "Diagnóstico jurídico", description: "Mapeamento de inconsistências e dados indevidos." },
                  { step: "03", title: "Definição da medida cabível", description: "Notificação, ação, tutela de urgência ou pedido indenizatório." },
                  { step: "04", title: "Acompanhamento completo", description: "Condução até a conclusão com discrição e estratégia." },
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

      <section
        id="irregularidade"
        className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10"
      >
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-start">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
              Quando há irregularidade
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              O que pode ser discutido juridicamente
            </h2>
            <p className="mt-6 text-sm leading-7 text-black/65 sm:text-base">
              Comprovada irregularidade, a atuação pode buscar correção cadastral, retirada de
              apontamentos, tutela de urgência e reparação indenizatória, conforme o caso.
            </p>
            <Card className="mt-6 rounded-none border-black/15 bg-neutral-50 p-4 text-sm leading-7 text-black/70 shadow-none">
              Não há fórmula única nem promessa de resultado: a estratégia depende da documentação
              e dos elementos jurídicos do caso concreto.
            </Card>
          </div>

          <OpticsCard
            decorations
            className="rounded-none border border-black/15 bg-white shadow-none ring-0 gap-0"
          >
            <OpticsCardHeader className="border-b border-black/15 pb-4">
              <OpticsCardDescription className="text-xs font-bold uppercase tracking-widest text-black/70">
                Providências possíveis
              </OpticsCardDescription>
              <OpticsCardTitle className="mt-1 font-serif text-xl font-normal leading-tight">
                O que pode ser buscado juridicamente
              </OpticsCardTitle>
            </OpticsCardHeader>
            <div
              style={{ "--card": "black", "--muted": "rgb(255 255 255 / 0.15)" } as React.CSSProperties}
              className="h-10 w-full bg-[repeating-linear-gradient(45deg,var(--card),var(--card)_3px,var(--muted)_3px,var(--muted)_6px)]"
            />
            <OpticsCardContent className="px-0">
              <AnimatedList delay={300} newestOnTop={false} className="w-full items-stretch gap-2">
                {[
                  "Correção ou exclusão da informação irregular",
                  "Adequação do histórico cadastral e bancário à realidade documental",
                  "Cessação dos efeitos lesivos sobre o acesso ao crédito",
                  "Tutela de urgência para impedir a perpetuação do dano",
                  "Reparação indenizatória, quando presentes os requisitos legais",
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

      <section id="publico" className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10">
        <div className="max-w-4xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
            Para quem é esta página
          </div>
          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            Atendimento para pessoas físicas, empresários e estruturas familiares
          </h2>
          <p className="mt-6 text-sm leading-7 text-black/65 sm:text-base">
A página foi pensada para atender clientes que, embora não identifiquem restrições
              evidentes, percebem efeitos concretos de bloqueio negocial no mercado.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-3">
          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Pessoas físicas com crédito pessoal ou financiamento recusado
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Empresários com dificuldade de obtenção de limite, capital de giro ou aprovação bancária
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Famílias em fase de aquisição imobiliária e clientes que revisam o histórico antes de nova operação
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Pessoas que suspeitam de manutenção indevida de informações após quitação
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

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
            Nosso diferencial está em separar recusa legítima de restrição irregular, com leitura
            jurídica técnica e estratégia proporcional a cada caso.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Rigor técnico
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                Análise documental criteriosa, sem generalizações ou atalhos.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Estratégia processual
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                Cada caso recebe estratégia proporcional — extrajudicial, judicial ou de urgência — conforme o que a situação exige.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Atendimento personalizado
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                Nenhum caso é tratado como padrão. A atuação é moldada ao perfil, ao histórico e aos objetivos de cada cliente.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Discrição absoluta
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                Sigilo total no tratamento de dados e informações sensíveis.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Atuação consultiva e contenciosa
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                Capacidade de atuar tanto na prevenção quanto no litígio, conforme o momento do caso.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Análise individual de alta complexidade
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                Casos que envolvem SCR, Registrato e histórico bancário exigem leitura técnica aprofundada — não apenas operacional.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

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

      <section className="relative border-b border-black/15 bg-black px-4 pt-16 pb-20 text-center sm:px-6 sm:pt-20 md:px-10 md:pt-24 overflow-hidden">
        <BackgroundBeams className="absolute inset-0 z-0" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-6 text-xs font-bold uppercase tracking-widest text-white/85">
            Agende sua consulta
          </div>
          <h2 className="mx-auto mb-6 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
            Fale com uma equipe preparada para examinar seu caso com seriedade técnica
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
            Se você enfrenta negativa de crédito sem justificativa clara, dificuldade de
            financiamento ou suspeita de informação bancária indevida, o primeiro passo é uma
            análise jurídica criteriosa da documentação. A estratégia correta começa com
            diagnóstico preciso.
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

