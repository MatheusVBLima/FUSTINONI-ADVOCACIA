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
const pageTitle =
  "Analise juridica de historico bancario e acesso ao credito | FUSTINONI ADVOCACIA";
const pageDescription =
  "Recusa de credito, financiamento, limite bancario ou aprovacao cadastral pode envolver informacao desatualizada, distorcida ou indevida. O escritorio realiza analise tecnica e define a medida juridica cabivel.";

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
    question: "Ter o nome limpo significa que meu historico bancario esta regular?",
    answer:
      "Nao necessariamente. E possivel inexistir negativacao classica e, ainda assim, subsistirem informacoes bancarias ou cadastrais que influenciem a analise de credito realizada pelas instituicoes financeiras.",
  },
  {
    question: "Toda recusa de credito e ilegal?",
    answer:
      "Nao. A concessao de credito envolve criterios internos das instituicoes. Contudo, quando a negativa decorre de dado indevido, inexato, desatualizado ou mantido sem respaldo, pode haver providencia juridica cabivel.",
  },
  {
    question: "O escritorio analisa a documentacao antes de propor qualquer medida?",
    answer:
      "Sim. A atuacao parte de analise tecnica da documentacao, justamente para aferir a viabilidade juridica do caso e definir a estrategia adequada.",
  },
  {
    question: "E possivel pleitear indenizacao?",
    answer:
      "Em hipoteses juridicamente configuradas, sim. Isso dependera da natureza da irregularidade, da extensao do prejuizo e dos elementos probatorios disponiveis.",
  },
  {
    question: "O atendimento pode ser remoto?",
    answer:
      "Sim. O escritorio realiza atendimentos remotos e presenciais, conforme a necessidade do caso.",
  },
  {
    question: "O caso pode exigir medida urgente?",
    answer:
      "Pode. Em determinadas situacoes, sobretudo quando ha operacao financeira em curso ou prejuizo iminente, pode ser necessaria tutela de urgencia, a depender da analise documental.",
  },
];

const heroTags = [
  "Atendimento sigiloso",
  "Analise documental individualizada",
  "Atuacao consultiva e contenciosa",
];

const heroPreliminarItems = [
  {
    text: "Recusa reiterada de credito sem justificativa clara",
    tone: "default" as const,
    order: 1,
  },
  {
    text: "Financiamento negado apesar de nome aparentemente regular",
    tone: "default" as const,
    order: 2,
  },
  { text: "Reducao ou bloqueio de limite bancario", tone: "default" as const, order: 3 },
  { text: "Dados bancarios desatualizados ou controvertidos", tone: "default" as const, order: 4 },
  {
    text: "A analise juridica permite distinguir recusa crediticia legitima de restricao fundada em informacao irregular, inexata ou desatualizada.",
    tone: "inverse" as const,
    order: 5,
  },
];

export default function AnaliseCreditoPage() {
  const whatsappUrl = buildWhatsAppUrl();
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
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-black/50">
              Analise juridica de historico bancario e acesso ao credito
            </p>
            <h1 className="mb-8 max-w-3xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
              Credito negado, mesmo sem negativacao aparente?
            </h1>
            <p className="mb-5 max-w-3xl text-sm leading-7 text-black/70 sm:text-base">
              Recusas de credito, financiamento e limite bancario podem decorrer de dados
              desatualizados ou indevidos em sistemas do mercado financeiro, inclusive no SCR.
            </p>
            <p className="mb-8 max-w-3xl text-sm leading-7 text-black/60 sm:text-base">
              O escritorio realiza analise juridica do historico e da documentacao para definir a
              medida cabivel: correcao de apontamentos, cessacao de efeitos lesivos e
              responsabilizacao quando houver base legal.
            </p>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <OpticsButton
                render={
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />
                }
                variant="decorations"
                decorationColor="black"
                className="h-[42px] rounded-none border-black bg-black px-6 text-xs uppercase tracking-wider text-white hover:bg-black/85"
              >
                Solicitar analise do caso
              </OpticsButton>
              <Button
                asChild
                variant="outline"
                className="h-[42px] rounded-none border-black/30 px-6 text-xs uppercase tracking-wider"
              >
                <a href="#como-atuamos">Entender a atuacao</a>
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
                <OpticsCardDescription className="text-xs font-bold uppercase tracking-widest text-black/50">
                  Avaliacao preliminar
                </OpticsCardDescription>
                <OpticsCardTitle className="mt-2 font-serif text-2xl leading-tight font-normal">
                  Indicios que merecem exame tecnico
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
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">
              O problema
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Quando o nome parece regular, mas o mercado continua fechado
            </h2>
          </div>
          <div className="space-y-4 border-l border-black/15 pl-8 text-sm leading-7 text-black/60 sm:text-base">
            <p>
              Muitos clientes chegam com o nome aparentemente regular, mas com recusas repetidas em
              bancos e financeiras.
            </p>
            <p>
              Em varios casos, o bloqueio esta ligado a registros bancarios controvertidos ou
              desatualizados, afetando limite, financiamento e reputacao negocial.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Recusa reiterada de credito sem justificativa clara", index: "01" },
            { label: "Financiamento negado apesar de nome aparentemente regular", index: "02" },
            { label: "Reducao ou bloqueio de limite bancario", index: "03" },
            { label: "Dados bancarios desatualizados ou controvertidos", index: "04" },
            { label: "Dificuldade em operacoes empresariais e pessoais", index: "05" },
            { label: "Necessidade de correcao e responsabilizacao juridica", index: "06" },
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
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">
              Como atuamos
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Atuacao juridica estruturada, com estrategia e precisao tecnica
            </h2>
            <p className="mt-6 text-sm leading-7 text-black/65 sm:text-base">
              Cada caso exige leitura juridica individual. Cruzamos relatorios, contratos e historico
              bancario para definir a estrategia extrajudicial ou judicial mais adequada.
            </p>
          </div>

          <OpticsCard
            decorations
            className="rounded-none border border-black/15 bg-white shadow-none ring-0 gap-0"
          >
            <OpticsCardHeader className="border-b border-black/15 pb-4">
              <OpticsCardDescription className="text-xs font-bold uppercase tracking-widest text-black/50">
                Etapas da atuacao
              </OpticsCardDescription>
              <OpticsCardTitle className="mt-1 font-serif text-xl font-normal leading-tight">
                Do diagnostico ao acompanhamento completo
              </OpticsCardTitle>
            </OpticsCardHeader>
            <div
              style={{ "--card": "black", "--muted": "rgb(255 255 255 / 0.15)" } as React.CSSProperties}
              className="h-10 w-full bg-[repeating-linear-gradient(45deg,var(--card),var(--card)_3px,var(--muted)_3px,var(--muted)_6px)]"
            />
            <OpticsCardContent className="px-0">
              <AnimatedList delay={400} newestOnTop={false} className="w-full items-stretch gap-2">
                {[
                  { step: "01", title: "Recebimento da documentacao", description: "Relatorios, contratos e comprovantes essenciais." },
                  { step: "02", title: "Diagnostico juridico", description: "Mapeamento de inconsistencias e dados indevidos." },
                  { step: "03", title: "Definicao da medida cabivel", description: "Notificacao, acao, tutela de urgencia ou pedido indenizatorio." },
                  { step: "04", title: "Acompanhamento completo", description: "Conducao ate a conclusao com discricao e estrategia." },
                ].map((item, i) => (
                  <Card
                    key={item.step}
                    style={{ order: i + 1 }}
                    className="rounded-none border-black/15 p-3 shadow-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 border border-black/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black/40">
                        {item.step}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="mt-0.5 text-xs leading-relaxed text-black/55">{item.description}</div>
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
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">
              Quando ha irregularidade
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              O que pode ser discutido juridicamente
            </h2>
            <p className="mt-6 text-sm leading-7 text-black/65 sm:text-base">
              Comprovada irregularidade, a atuacao pode buscar correcao cadastral, retirada de
              apontamentos, tutela de urgencia e reparacao indenizatoria, conforme o caso.
            </p>
            <Card className="mt-6 rounded-none border-black/15 bg-neutral-50 p-4 text-sm leading-7 text-black/60 shadow-none">
              Nao ha formula unica nem promessa de resultado: a estrategia depende da documentacao
              e dos elementos juridicos do caso concreto.
            </Card>
          </div>

          <OpticsCard
            decorations
            className="rounded-none border border-black/15 bg-white shadow-none ring-0 gap-0"
          >
            <OpticsCardHeader className="border-b border-black/15 pb-4">
              <OpticsCardDescription className="text-xs font-bold uppercase tracking-widest text-black/50">
                Providencias possiveis
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
                  "Correcao ou exclusao da informacao irregular",
                  "Adequacao do historico cadastral e bancario a realidade documental",
                  "Cessacao dos efeitos lesivos sobre o acesso ao credito",
                  "Tutela de urgencia para impedir a perpetuacao do dano",
                  "Reparacao indenizatoria, quando presentes os requisitos legais",
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
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">
            Para quem e esta pagina
          </div>
          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            Atendimento para pessoas fisicas, empresarios e estruturas familiares
          </h2>
          <p className="mt-6 text-sm leading-7 text-black/65 sm:text-base">
            A pagina foi pensada para atender clientes que, embora nao identifiquem restricoes
            evidentes, percebem efeitos concretos de bloqueio negocial no mercado.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-3">
          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Pessoas fisicas com credito pessoal ou financiamento recusado
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Empresarios com dificuldade de obtencao de limite, capital de giro ou aprovacao bancaria
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Familias em fase de aquisicao imobiliaria e clientes que revisam o historico antes de nova operacao
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Pessoas que suspeitam de manutencao indevida de informacoes apos quitacao
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
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">
              Diferenciais do escritorio
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Por que a analise deve ser juridica, e nao apenas operacional
            </h2>
          </div>
          <p className="mt-[calc(1rem+1lh)] border-l border-black/15 pl-8 text-sm leading-7 text-black/65 sm:text-base">
            Nosso diferencial esta em separar recusa legitima de restricao irregular, com leitura
            juridica tecnica e estrategia proporcional a cada caso.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Rigor tecnico
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/55">
                Analise documental criteriosa, sem generalizacoes ou atalhos.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Estrategia processual
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/55">
                Cada caso recebe estrategia proporcional — extrajudicial, judicial ou de urgencia — conforme o que a situacao exige.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Atendimento personalizado
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/55">
                Nenhum caso e tratado como padrao. A atuacao e moldada ao perfil, ao historico e aos objetivos de cada cliente.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Discricao absoluta
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/55">
                Sigilo total no tratamento de dados e informacoes sensíveis.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Atuacao consultiva e contenciosa
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/55">
                Capacidade de atuar tanto na prevencao quanto no litígio, conforme o momento do caso.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                Analise individual de alta complexidade
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/55">
                Casos que envolvem SCR, Registrato e historico bancario exigem leitura tecnica aprofundada — nao apenas operacional.
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <section id="faq" className="border-b border-black/15">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-black/15 p-8 sm:p-12 lg:border-r lg:border-b-0 lg:p-20">
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">FAQ</div>
            <h2 className="max-w-sm font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Perguntas frequentes antes do inicio da atuacao juridica
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
                  <AccordionContent className="pb-6 leading-relaxed text-black/60">
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
          <div className="mb-6 text-xs font-bold uppercase tracking-widest text-white/70">
            Agende sua consulta
          </div>
          <h2 className="mx-auto mb-6 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
            Fale com uma equipe preparada para examinar seu caso com seriedade tecnica
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
            Se voce enfrenta negativa de credito sem justificativa clara, dificuldade de
            financiamento ou suspeita de informacao bancaria indevida, o primeiro passo e uma
            analise juridica criteriosa da documentacao. A estrategia correta comeca com
            diagnostico preciso.
          </p>
          <div className="mt-8 flex justify-center">
            <OpticsButton
              render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}
              variant="decorations"
              decorationColor="white"
              className="h-[42px] rounded-none border-white bg-white px-8 text-xs uppercase tracking-wider text-black hover:bg-white/90"
            >
              Agendar consulta
            </OpticsButton>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-wider text-white/65">
            <span>Atendimento por agendamento</span>
            <span>Analise individualizada</span>
            <span>Atuacao nacional</span>
          </div>
        </div>
      </section>
    </>
  );
}
