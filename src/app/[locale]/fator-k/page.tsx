import type { Metadata } from "next";
import React from "react";

import { Link } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";
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
import { FatorKExtratoCta } from "@/components/fator-k/fator-k-extrato-cta";
import { WhatsAppCTAButton } from "@/components/whatsapp-cta-button";
import { OG_LOCALE_BY_APP_LOCALE } from "@/lib/i18n";
import { getLocalizedHash } from "@/lib/navigation";
import { getAlternatesLanguages, getLocalizedUrl } from "@/lib/seo";
import { SITE_NAME, SITE_OG_IMAGE } from "@/lib/site";

const pagePath = "/fator-k";
const FATOR_K_TITLE_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Revisão jurídica de cobrança de Fator K da SABESP | FUSTINONI ADVOCACIA",
  en: "SABESP Factor K legal review and tariff strategy | FUSTINONI ADVOCACIA",
  es: "Revisión jurídica del Factor K de SABESP | FUSTINONI ADVOCACIA",
  it: "Revisione legale del Fattore K SABESP | FUSTINONI ADVOCACIA",
};

const FATOR_K_DESCRIPTION_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Empresas que pagam Fator K nas faturas SABESP podem ter direito a revisão tarifária e restituição de valores. O escritório realiza análise jurídica e técnica com estratégia extrajudicial ou judicial.",
  en: "Companies charged with SABESP Factor K may have grounds for tariff review and reimbursement. The firm provides legal and technical analysis with administrative or judicial strategy.",
  es: "Las empresas que pagan Factor K en facturas SABESP pueden tener derecho a revisión tarifaria y restitución de valores. El despacho realiza análisis jurídico y técnico con estrategia administrativa o judicial.",
  it: "Le aziende che pagano il Fattore K nelle fatture SABESP possono avere diritto a revisione tariffaria e rimborso. Lo studio svolge analisi legale e tecnica con strategia amministrativa o giudiziale.",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const title = FATOR_K_TITLE_BY_LOCALE[locale];
  const description = FATOR_K_DESCRIPTION_BY_LOCALE[locale];

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedUrl(pagePath, locale),
      languages: getAlternatesLanguages(pagePath),
    },
    openGraph: {
      type: "website",
      url: getLocalizedUrl(pagePath, locale),
      title,
      description,
      siteName: SITE_NAME,
      locale: OG_LOCALE_BY_APP_LOCALE[locale],
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
      title,
      description,
      images: [SITE_OG_IMAGE],
    },
  };
}

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

const whatsappPhone = process.env.WHATSAPP_PHONE_NUMBER ?? "";
const MSG_HERO_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Olá! Gostaria de solicitar uma análise jurídica sobre o Fator K na minha fatura da SABESP.",
  en: "Hello! I would like to request a legal review regarding Factor K on my SABESP invoice.",
  es: "¡Hola! Me gustaría solicitar un análisis jurídico sobre el Factor K en mi factura de SABESP.",
  it: "Buongiorno! Vorrei richiedere un'analisi legale sul Fattore K nella mia fattura SABESP.",
};

const MSG_CTA_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Olá! Vim pelo site e quero agendar uma consulta sobre o Fator K da SABESP.",
  en: "Hello! I came from the website and want to schedule a consultation about SABESP Factor K.",
  es: "¡Hola! Vengo del sitio y quiero agendar una consulta sobre el Factor K de SABESP.",
  it: "Buongiorno! Sono arrivato dal sito e voglio fissare una consulenza sul Fattore K di SABESP.",
};

type LocalizedFatorKCopy = {
  eyebrow: string;
  heroTitle: string;
  heroDescription1: string;
  heroDescription2: string;
  primaryCta: string;
  secondaryCta: string;
  problemTitle: string;
  problemDescription: string;
  howTitle: string;
  howItems: string[];
  questionableTitle: string;
  questionableItems: string[];
  audienceTitle: string;
  audienceItems: string[];
  differentialsTitle: string;
  differentialsItems: string[];
  faqTitle: string;
  finalTitle: string;
  finalDescription: string;
  finalCta: string;
  faqs: typeof productFaqs;
};

const FATOR_K_COPY_BY_LOCALE: Record<
  Exclude<AppLocale, "pt">,
  LocalizedFatorKCopy
> = {
  en: {
    eyebrow: "SABESP Factor K legal review",
    heroTitle: "Is your company paying Factor K to SABESP?",
    heroDescription1:
      "Factor K is a tariff item applied to certain business categories. In many cases, methodology and parameters are not transparent or audit-friendly.",
    heroDescription2:
      "The firm performs legal and technical invoice review to verify if classification and charged values have contractual and legal grounds, and structures the best challenge strategy when applicable.",
    primaryCta: "Request case review",
    secondaryCta: "Understand our approach",
    problemTitle: "Relevant charge with low transparency",
    problemDescription:
      "Many companies pay this charge for years without legal review of tariff classification, calculation memory and technical assumptions used by the utility.",
    howTitle: "How we operate",
    howItems: [
      "Collection of invoices, contracts and business documents",
      "Legal and technical diagnosis of classification and methodology",
      "Definition of administrative or judicial strategy",
      "Follow-up through full resolution and value recovery, when viable",
    ],
    questionableTitle: "When the charge may be questionable",
    questionableItems: [
      "Missing or incomplete monthly calculation memory",
      "Tariff category assigned without individualized verification",
      "Technical parameters applied without documentary support",
      "Long-term financial impact without legal audit",
    ],
    audienceTitle: "Who this service is for",
    audienceItems: [
      "Companies with recurring Factor K on SABESP invoices",
      "Businesses reviewing operating costs and utility exposure",
      "Operations with high water consumption and tariff complexity",
      "Organizations seeking reimbursement and future tariff correction",
    ],
    differentialsTitle: "Why legal review matters",
    differentialsItems: [
      "Integrated legal and technical analysis",
      "Proportional strategy for each business profile",
      "Confidential and personalized support",
      "Administrative and judicial capability when needed",
    ],
    faqTitle: "Frequently asked questions",
    finalTitle: "Review Factor K before sustaining avoidable losses",
    finalDescription:
      "Before bearing a relevant recurring cost indefinitely, assess with technical criteria whether the charge is correctly constituted and if there is viable legal action.",
    finalCta: "Schedule consultation",
    faqs: [
      {
        question: "Is every Factor K charge improper?",
        answer:
          "No. Some charges are legitimate. Legal review verifies if classification, applied parameters and calculation memory are adequate to the concrete case.",
      },
      {
        question: "My company has paid this for years. Can it still be reviewed?",
        answer:
          "Yes. Long-term charging often increases the relevance of legal-technical review and may support correction and reimbursement claims within legal limits.",
      },
      {
        question: "Can past payments be recovered?",
        answer:
          "Depending on the case, yes. Reimbursement may be claimed when improper payment is proven, observing applicable limitation periods.",
      },
      {
        question: "What documents are needed for the initial review?",
        answer:
          "Usually SABESP invoices, supply contract, company documents and registration data.",
      },
      {
        question: "Can this be challenged without filing a lawsuit?",
        answer:
          "Yes. Administrative challenge is often the first step and can be sufficient in many scenarios.",
      },
      {
        question: "Can assistance be remote?",
        answer:
          "Yes. The firm provides remote and in-person assistance with continuous communication.",
      },
    ],
  },
  es: {
    eyebrow: "Revisión jurídica del Factor K de SABESP",
    heroTitle: "¿Su empresa está pagando Factor K a SABESP?",
    heroDescription1:
      "El Factor K es una cobranza tarifaria aplicada a determinadas categorías empresariales. En muchos casos, la metodología y los parámetros no son transparentes.",
    heroDescription2:
      "El despacho realiza análisis jurídico y técnico de facturas para verificar si encuadre y valores cobrados tienen respaldo legal y contractual, y define la estrategia de impugnación adecuada.",
    primaryCta: "Solicitar análisis del caso",
    secondaryCta: "Entender la actuación",
    problemTitle: "Cobranza relevante con baja transparencia técnica",
    problemDescription:
      "Muchas empresas pagan este concepto durante años sin análisis jurídico del encuadre tarifario ni de la memoria de cálculo aplicada.",
    howTitle: "Cómo actuamos",
    howItems: [
      "Levantamiento de facturas, contratos y documentos societarios",
      "Diagnóstico jurídico y técnico del encuadre y metodología",
      "Definición de estrategia administrativa o judicial",
      "Seguimiento integral hasta resolución y eventual restitución",
    ],
    questionableTitle: "Cuando la cobranza puede ser cuestionable",
    questionableItems: [
      "Memoria de cálculo ausente o incompleta",
      "Categoría tarifaria aplicada sin verificación individual",
      "Parámetros técnicos sin soporte documental",
      "Impacto financiero prolongado sin auditoría jurídica",
    ],
    audienceTitle: "Para quién es este servicio",
    audienceItems: [
      "Empresas con cobranza recurrente de Factor K en SABESP",
      "Negocios en revisión de costos operativos",
      "Operaciones con alto consumo de agua y complejidad tarifaria",
      "Sociedades que buscan restitución y revisión futura de tarifa",
    ],
    differentialsTitle: "Por qué el análisis debe ser jurídico",
    differentialsItems: [
      "Lectura integrada jurídica y técnica",
      "Estrategia proporcional al perfil empresarial",
      "Atención confidencial y personalizada",
      "Capacidad administrativa y judicial cuando sea necesario",
    ],
    faqTitle: "Preguntas frecuentes",
    finalTitle: "Revise el Factor K antes de sostener pérdidas evitables",
    finalDescription:
      "Antes de asumir indefinidamente un costo relevante, conviene verificar con criterio técnico si la cobranza fue constituida correctamente y si existe medida jurídica viable.",
    finalCta: "Agendar consulta",
    faqs: [
      {
        question: "¿Toda cobranza de Factor K es indebida?",
        answer:
          "No. Puede ser legítima. El análisis verifica si encuadre, parámetros y memoria de cálculo son adecuados al caso concreto.",
      },
      {
        question: "Mi empresa paga este concepto hace años. ¿Aún puede analizarse?",
        answer:
          "Sí. La cobranza prolongada suele justificar revisión técnica y jurídica, con posibilidad de corrección y restitución dentro de límites legales.",
      },
      {
        question: "¿Es posible recuperar valores ya pagados?",
        answer:
          "Dependiendo del caso, sí. La repetición puede pedirse cuando se comprueba pago indebido, observando plazos aplicables.",
      },
      {
        question: "¿Qué documentos se requieren para análisis inicial?",
        answer:
          "Generalmente facturas SABESP, contrato de suministro, documentos societarios y datos registrales.",
      },
      {
        question: "¿Puede impugnarse sin demanda judicial?",
        answer:
          "Sí. La vía administrativa suele ser el primer paso y en muchos casos es suficiente.",
      },
      {
        question: "¿La atención puede ser remota?",
        answer:
          "Sí. El despacho atiende de forma remota o presencial con seguimiento continuo.",
      },
    ],
  },
  it: {
    eyebrow: "Revisione legale del Fattore K SABESP",
    heroTitle: "La tua azienda sta pagando il Fattore K a SABESP?",
    heroDescription1:
      "Il Fattore K è una voce tariffaria applicata ad alcune categorie d'impresa. In molti casi, metodologia e parametri non sono pienamente trasparenti.",
    heroDescription2:
      "Lo studio effettua analisi legale e tecnica delle fatture per verificare se inquadramento e importi hanno base contrattuale e normativa, definendo la strategia di contestazione più adeguata.",
    primaryCta: "Richiedi analisi del caso",
    secondaryCta: "Scopri come operiamo",
    problemTitle: "Voce rilevante con trasparenza tecnica limitata",
    problemDescription:
      "Molte aziende sostengono questa voce per anni senza revisione legale dell'inquadramento tariffario e della memoria di calcolo.",
    howTitle: "Come operiamo",
    howItems: [
      "Raccolta di fatture, contratti e documenti societari",
      "Diagnosi legale e tecnica di inquadramento e metodologia",
      "Definizione della strategia amministrativa o giudiziale",
      "Monitoraggio fino alla soluzione e possibile recupero importi",
    ],
    questionableTitle: "Quando la voce può essere contestabile",
    questionableItems: [
      "Memoria di calcolo assente o incompleta",
      "Categoria tariffaria senza verifica individuale",
      "Parametri tecnici senza supporto documentale",
      "Impatto economico protratto senza audit legale",
    ],
    audienceTitle: "A chi si rivolge il servizio",
    audienceItems: [
      "Aziende con addebito ricorrente di Fattore K in SABESP",
      "Imprese in revisione dei costi operativi",
      "Attività con consumo idrico elevato e tariffazione complessa",
      "Società che puntano a rimborso e revisione futura della tariffa",
    ],
    differentialsTitle: "Perché serve un'analisi legale",
    differentialsItems: [
      "Analisi integrata legale e tecnica",
      "Strategia proporzionata al profilo aziendale",
      "Assistenza riservata e personalizzata",
      "Capacità amministrativa e giudiziale quando necessaria",
    ],
    faqTitle: "Domande frequenti",
    finalTitle: "Verifica il Fattore K prima di sostenere perdite evitabili",
    finalDescription:
      "Prima di sopportare a tempo indeterminato un costo rilevante, è opportuno verificare con criterio tecnico se l'addebito è corretto e se esiste un'azione legale praticabile.",
    finalCta: "Prenota consulenza",
    faqs: [
      {
        question: "Ogni addebito di Fattore K è indebito?",
        answer:
          "No. Può essere legittimo. L'analisi verifica se inquadramento, parametri e memoria di calcolo sono adeguati al caso concreto.",
      },
      {
        question: "La mia azienda paga da anni: si può ancora analizzare?",
        answer:
          "Sì. La protrazione nel tempo rende la revisione spesso più rilevante e può supportare rettifica e recupero entro i limiti di legge.",
      },
      {
        question: "È possibile recuperare importi già pagati?",
        answer:
          "In base al caso, sì. Il recupero è valutabile quando il pagamento indebito è comprovato, nel rispetto dei termini applicabili.",
      },
      {
        question: "Quali documenti servono per la valutazione iniziale?",
        answer:
          "In generale fatture SABESP, contratto di fornitura, documenti societari e dati anagrafici aziendali.",
      },
      {
        question: "Si può contestare senza causa giudiziale?",
        answer:
          "Sì. La via amministrativa è spesso il primo passo e, in diversi casi, può essere sufficiente.",
      },
      {
        question: "L'assistenza può essere da remoto?",
        answer:
          "Sì. Lo studio segue il caso da remoto o in presenza con comunicazione continua.",
      },
    ],
  },
};

type PageProps = {
  params: Promise<{
    locale: AppLocale;
  }>;
};

export default async function FatorKPage({ params }: PageProps) {
  const { locale } = await params;
  const sectionHashes = {
    problema: getLocalizedHash(pagePath, "problema", locale),
    comoAtuamos: getLocalizedHash(pagePath, "como-atuamos", locale),
    questionavel: getLocalizedHash(pagePath, "questionavel", locale),
    publico: getLocalizedHash(pagePath, "publico", locale),
    diferenciais: getLocalizedHash(pagePath, "diferenciais", locale),
    faq: getLocalizedHash(pagePath, "faq", locale),
  };
  const msgHero = MSG_HERO_BY_LOCALE[locale] ?? MSG_HERO_BY_LOCALE.pt;
  const msgCta = MSG_CTA_BY_LOCALE[locale] ?? MSG_CTA_BY_LOCALE.pt;
  const copy = locale === "pt" ? null : FATOR_K_COPY_BY_LOCALE[locale] ?? null;
  const localizedFaqs = copy?.faqs ?? productFaqs;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localizedFaqs.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const heroEyebrow = copy?.eyebrow ?? "Revisão jurídica de cobrança de Fator K — SABESP";
  const heroTitle = copy?.heroTitle ?? "Sua empresa está pagando Fator K à SABESP?";
  const heroDescription1 =
    copy?.heroDescription1 ??
    "O Fator K é uma cobrança tarifária aplicada pela SABESP sobre determinadas categorias de empresas, calculada com base em parâmetros técnicos que nem sempre são transparentes ou auditáveis.";
  const heroDescription2 =
    copy?.heroDescription2 ??
    "O escritório realiza análise jurídica e técnica das faturas e do contrato de fornecimento para verificar se o enquadramento e os valores cobrados têm amparo legal e contratual — e, quando cabível, estrutura a impugnação adequada.";
  const heroPrimaryCta = copy?.primaryCta ?? "Solicitar análise do caso";
  const heroSecondaryCta = copy?.secondaryCta ?? "Entender a atuação";

  const sectionProblemEyebrow =
    locale === "en" ? "Problem" : locale === "es" ? "Problema" : locale === "it" ? "Problema" : "O problema";
  const sectionHowEyebrow =
    locale === "en" ? "How we operate" : locale === "es" ? "Cómo actuamos" : locale === "it" ? "Come operiamo" : "Como atuamos";
  const sectionQuestionableEyebrow =
    locale === "en"
      ? "When the charge is questionable"
      : locale === "es"
        ? "Cuando la cobranza es cuestionable"
        : locale === "it"
          ? "Quando l'addebito è contestabile"
          : "Quando a cobrança é questionável";
  const sectionAudienceEyebrow =
    locale === "en" ? "Who this page is for" : locale === "es" ? "Para quién es esta página" : locale === "it" ? "A chi è rivolta questa pagina" : "Para quem é esta página";
  const sectionDifferentialsEyebrow =
    locale === "en" ? "Firm differentiators" : locale === "es" ? "Diferenciales del despacho" : locale === "it" ? "Punti di forza dello studio" : "Diferenciais do escritório";

  const problemTitle = copy?.problemTitle ?? "Cobrança relevante, técnica opaca e sem auditoria regular";
  const problemParagraph1 =
    copy?.problemDescription ??
    "Muitas empresas pagam o Fator K há anos sem questionar o enquadramento tarifário ou verificar se os parâmetros aplicados pela SABESP correspondem à realidade operacional.";
  const problemParagraph2 =
    copy?.questionableItems?.[3] ??
    "A ausência de auditoria jurídica das faturas pode representar pagamento a maior durante anos, sem possibilidade de recuperação futura por decurso do prazo.";

  const problemCards = copy
    ? [...copy.questionableItems, ...copy.audienceItems]
        .slice(0, 6)
        .map((label, index) => ({ label, index: String(index + 1).padStart(2, "0") }))
    : [
        { label: "Cobrança calculada com base em parâmetros técnicos opacos e não auditados", index: "01" },
        { label: "Memória de cálculo ausente ou incompleta nas faturas mensais", index: "02" },
        { label: "Enquadramento em categorias tarifárias sem verificação individualizada", index: "03" },
        { label: "Aceitação passiva de valores sem análise jurídica prévia", index: "04" },
        { label: "Ausência de impugnação administrativa durante o prazo decadencial", index: "05" },
        { label: "Potencial de revisão e recuperação de valores pagos indevidamente", index: "06" },
      ];

  const heroTagsLocalized = copy
    ? locale === "en"
      ? ["Business advisory", "Document review", "Consulting and litigation"]
      : locale === "es"
        ? ["Atención empresarial", "Análisis documental", "Actuación consultiva y contenciosa"]
        : ["Assistenza aziendale", "Analisi documentale", "Attività consulenziale e contenziosa"]
    : heroTags;

  const heroPreliminarItemsLocalized = copy
    ? [
        { text: copy.questionableItems[0], tone: "default" as const, order: 1 },
        { text: copy.questionableItems[1], tone: "default" as const, order: 2 },
        { text: copy.questionableItems[2], tone: "default" as const, order: 3 },
        { text: copy.audienceItems[0], tone: "default" as const, order: 4 },
        { text: copy.problemDescription, tone: "inverse" as const, order: 5 },
      ]
    : heroPreliminarItems;

  const preliminarEyebrow =
    locale === "en" ? "Preliminary review" : locale === "es" ? "Evaluación preliminar" : locale === "it" ? "Valutazione preliminare" : "Avaliação preliminar";
  const preliminarTitle =
    locale === "en" ? "Signs that require technical review" : locale === "es" ? "Indicios que requieren análisis técnico" : locale === "it" ? "Indizi che richiedono analisi tecnica" : "Indícios que merecem exame técnico";
  const preliminarTag = locale === "en" ? "SABESP / Factor K" : locale === "es" ? "SABESP / Factor K" : locale === "it" ? "SABESP / Fattore K" : "SABESP / Fator K";

  const howTitle = copy?.howTitle ?? "Atuação jurídica estruturada, com análise técnica e estratégia proporcional";
  const howParagraph =
    copy?.heroDescription2 ??
    "Cada caso exige leitura individualizada das faturas, contratos e dados de consumo. Cruzamos informações técnicas e jurídicas para definir a estratégia mais adequada — administrativa ou judicial.";

  const howSteps = copy
    ? copy.howItems.slice(0, 4).map((item, index) => ({
        step: String(index + 1).padStart(2, "0"),
        title: item,
        description:
          locale === "en"
            ? "Execution aligned with legal and technical evidence in the specific case."
            : locale === "es"
              ? "Ejecución alineada con elementos jurídicos y técnicos del caso concreto."
              : "Esecuzione allineata agli elementi legali e tecnici del caso concreto.",
      }))
    : [
        { step: "01", title: "Levantamento documental", description: "Faturas, histórico de consumo, contratos, documentos societários e CNAE." },
        { step: "02", title: "Diagnóstico jurídico e técnico", description: "Avaliação do enquadramento tarifário, memória de cálculo e histórico de faturamento." },
        { step: "03", title: "Definição da estratégia", description: "Impugnação administrativa, ação revisional ou pleito de repetição de indébito, conforme o caso." },
        { step: "04", title: "Acompanhamento integral", description: "Condução do caso até a conclusão com discrição e precisão técnica." },
      ];

  const questionableTitle = copy?.questionableTitle ?? "O que pode ser discutido juridicamente";
  const questionableParagraph =
    copy?.finalDescription ??
    "Identificada irregularidade no enquadramento ou na metodologia de cálculo, a atuação pode buscar revisão tarifária, restituição de valores e compensação dos efeitos financeiros do pagamento indevido.";
  const questionableNote =
    locale === "en"
      ? "There is no single formula or guaranteed result: the strategy depends on available documentation and legal-technical elements of the concrete case."
      : locale === "es"
        ? "No existe una fórmula única ni promesa de resultado: la estrategia depende de la documentación disponible y de los elementos técnicos y jurídicos del caso concreto."
        : locale === "it"
          ? "Non esiste una formula unica né promessa di risultato: la strategia dipende dalla documentazione disponibile e dagli elementi tecnici e giuridici del caso concreto."
          : "Não há fórmula única nem promessa de resultado: a estratégia depende da documentação disponível e dos elementos técnicos e jurídicos do caso concreto.";
  const questionableList = copy
    ? copy.questionableItems
    : [
        "Enquadramento em categoria tarifária sem verificação individualizada da empresa",
        "Aplicação de parâmetros sem comprovação da metodologia de cálculo",
        "Ausência de memória de cálculo acessível e auditável nas faturas",
        "Majoração tarifária suportada por longo período sem base documental compreensível",
        "Necessidade de cessação ou revisão da cobrança futura",
        "Viabilidade de recuperação de valores pagos, quando juridicamente cabível",
      ];

  const audienceTitle = copy?.audienceTitle ?? "Empresas que pagam Fator K e nunca questionaram o enquadramento";
  const audienceParagraph =
    copy?.problemDescription ??
    "A página foi pensada para empresas que recebem cobrança de Fator K na fatura SABESP e nunca realizaram análise jurídica do enquadramento tarifário ou da metodologia aplicada.";
  const audienceCards = copy
    ? [...copy.audienceItems, ...copy.questionableItems].slice(0, 6)
    : [
        "Restaurantes, padarias e operações de alimentação com alto consumo de água",
        "Shoppings, condomínios comerciais e centros empresariais com múltiplos usuários",
        "Frigoríficos, lavanderias e prestadores de serviço com processo produtivo intensivo em água",
        "Empresas industriais que nunca auditaram suas faturas SABESP",
        "Negócios que pagam Fator K há anos sem impugnar ou questionar",
        "Sociedades em revisão de custos operacionais ou planejamento estratégico que identificaram a rubrica nas faturas",
      ];

  const differentialsTitle = copy?.differentialsTitle ?? "Por que a análise deve ser jurídica, e não apenas operacional";
  const differentialsParagraph =
    copy?.heroDescription2 ??
    "A revisão da cobrança do Fator K exige estruturação jurídica da tese, leitura regulatória, análise das faturas em série e definição da medida adequada — sempre à luz da documentação do caso.";

  const differentialsCards = copy
    ? [
        { title: copy.differentialsItems[0], description: copy.differentialsItems[0] },
        { title: copy.differentialsItems[1], description: copy.differentialsItems[1] },
        { title: copy.differentialsItems[2], description: copy.differentialsItems[2] },
        { title: copy.differentialsItems[3], description: copy.differentialsItems[3] },
        { title: copy.howItems[0], description: copy.howItems[1] ?? copy.howItems[0] },
        { title: copy.audienceItems[0], description: copy.audienceItems[1] ?? copy.audienceItems[0] },
      ]
    : [
        { title: "Análise técnica e jurídica integrada", description: "Avaliação da cobrança sob perspectiva regulatória, contratual e legal, sem atalhos." },
        { title: "Estratégia proporcional ao caso", description: "Cada empresa recebe encaminhamento adequado — impugnação administrativa, revisional ou pleito indenizatório — conforme o que os documentos suportam." },
        { title: "Atuação preventiva e contenciosa", description: "Capacidade de atuar antes do litígio, estruturando defesas administrativas, e na fase judicial quando necessário." },
        { title: "Sigilo absoluto", description: "Tratamento confidencial de dados operacionais, contratos e histórico de consumo." },
        { title: "Atendimento personalizado", description: "Nenhuma empresa é tratada como caso padrão. O porte, o setor e o histórico de cobrança determinam a estratégia." },
        { title: "Experiência em demandas regulatórias de alta complexidade", description: "Cobranças da SABESP envolvem metodologia técnica específica — a leitura jurídica exige domínio do marco regulatório do saneamento." },
      ];

  const faqHeading = copy?.faqTitle ?? "Perguntas frequentes antes do início da atuação jurídica";

  const ctaEyebrow =
    locale === "en" ? "Schedule your consultation" : locale === "es" ? "Agende su consulta" : locale === "it" ? "Prenoti la sua consulenza" : "Agende sua consulta";
  const ctaTitle = copy?.finalTitle ?? "Sua empresa paga Fator K e nunca verificou se a cobrança é exigível?";
  const ctaDescription =
    copy?.finalDescription ??
    "Antes de suportar indefinidamente um custo relevante, convém apurar com critério técnico se a cobrança foi corretamente constituída, se o enquadramento está adequado e se há medida jurídica viável para revisão, cessação ou restituição de valores.";
  const ctaButtonLabel = copy?.finalCta ?? "Agendar consulta";

  const ctaBadges =
    locale === "en"
      ? ["Scheduled service", "Individual legal review", "Nationwide practice"]
      : locale === "es"
        ? ["Atención con cita previa", "Análisis individual", "Actuación nacional"]
        : locale === "it"
          ? ["Assistenza su appuntamento", "Analisi individuale", "Operatività nazionale"]
          : ["Atendimento por agendamento", "Análise individualizada", "Atuação nacional"];

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
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-black/70">{heroEyebrow}</p>
            <h1 className="mb-8 max-w-3xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
              {heroTitle}
            </h1>
            <p className="mb-5 max-w-3xl text-sm leading-7 text-black/70 sm:text-base">{heroDescription1}</p>
            <p className="mb-8 max-w-3xl text-sm leading-7 text-black/70 sm:text-base">{heroDescription2}</p>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppCTAButton origem="fator_k"
                whatsappPhone={whatsappPhone}
                whatsappBaseMessage={msgHero}
                className="h-[42px] rounded-none border-black bg-black px-6 text-xs uppercase tracking-wider text-white hover:bg-black/85"
              >
                {heroPrimaryCta}
              </WhatsAppCTAButton>
              <Button
                asChild
                variant="outline"
                className="h-[42px] rounded-none border-black/30 px-6 text-xs uppercase tracking-wider"
              >
                <Link href={{ pathname: "/fator-k", hash: sectionHashes.comoAtuamos }}>
                  {heroSecondaryCta}
                </Link>
              </Button>
            </div>

            <div className="mb-8 w-full max-w-full overflow-hidden">
              <Marquee
                className="w-full max-w-full overflow-hidden [--duration:28s] [--gap:0.5rem] p-0"
                repeat={6}
              >
                {heroTagsLocalized.map(tag => (
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
                  {preliminarEyebrow}
                </OpticsCardDescription>
                <OpticsCardTitle className="mt-2 font-serif text-2xl leading-tight font-normal">
                  {preliminarTitle}
                </OpticsCardTitle>
                <OpticsCardAction>
                  <div className="border border-black/20 px-3 py-1 text-[11px] font-medium uppercase tracking-wider">
                    {preliminarTag}
                  </div>
                </OpticsCardAction>
              </OpticsCardHeader>

              <OpticsCardContent className="px-0">
                <AnimatedList delay={650} newestOnTop={false} className="w-full items-stretch gap-2">
                  {heroPreliminarItemsLocalized.map(item => (
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

      <FatorKExtratoCta whatsappPhone={whatsappPhone} />

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      {/* Problema */}
      <section id={sectionHashes.problema} className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10">
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
              {sectionProblemEyebrow}
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              {problemTitle}
            </h2>
          </div>
          <div className="space-y-4 border-l border-black/15 pl-8 text-sm leading-7 text-black/70 sm:text-base">
            <p>{problemParagraph1}</p>
            <p>{problemParagraph2}</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problemCards.map(item => (
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
        id={sectionHashes.comoAtuamos}
        className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10"
      >
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
              {sectionHowEyebrow}
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              {howTitle}
            </h2>
            <p className="mt-6 text-sm leading-7 text-black/65 sm:text-base">{howParagraph}</p>
          </div>

          <OpticsCard
            decorations
            className="rounded-none border border-black/15 bg-white shadow-none ring-0 gap-0"
          >
            <OpticsCardHeader className="border-b border-black/15 pb-4">
              <OpticsCardDescription className="text-xs font-bold uppercase tracking-widest text-black/70">
                {sectionHowEyebrow}
              </OpticsCardDescription>
              <OpticsCardTitle className="mt-1 font-serif text-xl font-normal leading-tight">
                {locale === "en"
                  ? "From diagnosis to full follow-up"
                  : locale === "es"
                    ? "Del diagnóstico al seguimiento integral"
                    : locale === "it"
                      ? "Dalla diagnosi al monitoraggio completo"
                      : "Do diagnóstico ao acompanhamento integral"}
              </OpticsCardTitle>
            </OpticsCardHeader>
            <div
              style={{ "--card": "black", "--muted": "rgb(255 255 255 / 0.15)" } as React.CSSProperties}
              className="h-10 w-full bg-[repeating-linear-gradient(45deg,var(--card),var(--card)_3px,var(--muted)_3px,var(--muted)_6px)]"
            />
            <OpticsCardContent className="px-0">
              <AnimatedList delay={400} newestOnTop={false} className="w-full items-stretch gap-2">
                {howSteps.map((item, i) => (
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
        id={sectionHashes.questionavel}
        className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10"
      >
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-start">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
              {sectionQuestionableEyebrow}
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              {questionableTitle}
            </h2>
            <p className="mt-6 text-sm leading-7 text-black/65 sm:text-base">
              {questionableParagraph}
            </p>
            <Card className="mt-6 rounded-none border-black/15 bg-neutral-50 p-4 text-sm leading-7 text-black/70 shadow-none">
              {questionableNote}
            </Card>
          </div>

          <OpticsCard
            decorations
            className="rounded-none border border-black/15 bg-white shadow-none ring-0 gap-0"
          >
            <OpticsCardHeader className="border-b border-black/15 pb-4">
              <OpticsCardDescription className="text-xs font-bold uppercase tracking-widest text-black/70">
                {locale === "en"
                  ? "Challenge scenarios"
                  : locale === "es"
                    ? "Supuestos de impugnación"
                    : locale === "it"
                      ? "Ipotesi di contestazione"
                      : "Hipóteses de questionamento"}
              </OpticsCardDescription>
              <OpticsCardTitle className="mt-1 font-serif text-xl font-normal leading-tight">
                {locale === "en"
                  ? "What can be legally challenged"
                  : locale === "es"
                    ? "Qué puede impugnarse jurídicamente"
                    : locale === "it"
                      ? "Cosa può essere contestato legalmente"
                      : "O que pode ser impugnado juridicamente"}
              </OpticsCardTitle>
            </OpticsCardHeader>
            <div
              style={{ "--card": "black", "--muted": "rgb(255 255 255 / 0.15)" } as React.CSSProperties}
              className="h-10 w-full bg-[repeating-linear-gradient(45deg,var(--card),var(--card)_3px,var(--muted)_3px,var(--muted)_6px)]"
            />
            <OpticsCardContent className="px-0">
              <AnimatedList delay={300} newestOnTop={false} className="w-full items-stretch gap-2">
                {questionableList.map((item, i) => (
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
      <section id={sectionHashes.publico} className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10">
        <div className="max-w-4xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
            {sectionAudienceEyebrow}
          </div>
          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {audienceTitle}
          </h2>
          <p className="mt-6 text-sm leading-7 text-black/65 sm:text-base">
            {audienceParagraph}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-3">
          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                {audienceCards[0]}
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                {audienceCards[1]}
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                {audienceCards[2]}
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                {audienceCards[3]}
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                {audienceCards[4]}
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                {audienceCards[5]}
              </OpticsCardTitle>
            </OpticsCardHeader>
          </OpticsCard>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      {/* Diferenciais */}
      <section
        id={sectionHashes.diferenciais}
        className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10"
      >
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
              {sectionDifferentialsEyebrow}
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              {differentialsTitle}
            </h2>
          </div>
          <p className="mt-[calc(1rem+1lh)] border-l border-black/15 pl-8 text-sm leading-7 text-black/65 sm:text-base">
            {differentialsParagraph}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                {differentialsCards[0].title}
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                {differentialsCards[0].description}
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                {differentialsCards[1].title}
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                {differentialsCards[1].description}
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                {differentialsCards[2].title}
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                {differentialsCards[2].description}
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                {differentialsCards[3].title}
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                {differentialsCards[3].description}
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-1">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                {differentialsCards[4].title}
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                {differentialsCards[4].description}
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>

          <OpticsCard decorations className="col-span-2 rounded-none border border-black/15 bg-white shadow-none ring-0 lg:col-span-2">
            <OpticsCardHeader>
              <OpticsCardTitle className="font-serif text-base font-normal leading-snug">
                {differentialsCards[5].title}
              </OpticsCardTitle>
              <OpticsCardDescription className="text-xs leading-relaxed text-black/70">
                {differentialsCards[5].description}
              </OpticsCardDescription>
            </OpticsCardHeader>
          </OpticsCard>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      {/* FAQ */}
      <section id={sectionHashes.faq} className="border-b border-black/15">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-black/15 p-8 sm:p-12 lg:border-r lg:border-b-0 lg:p-20">
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/70">FAQ</div>
            <h2 className="max-w-sm font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              {faqHeading}
            </h2>
          </div>

          <div className="flex flex-col">
            <Accordion type="single" collapsible className="w-full">
              {localizedFaqs.map((item, index) => (
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
            {ctaEyebrow}
          </div>
          <h2 className="mx-auto mb-6 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
            {ctaTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
            {ctaDescription}
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppCTAButton origem="fator_k"
              whatsappPhone={whatsappPhone}
              whatsappBaseMessage={msgCta}
              className="h-[42px] rounded-none border-white bg-white px-8 text-xs uppercase tracking-wider text-black hover:bg-white/90"
            >
              {ctaButtonLabel}
            </WhatsAppCTAButton>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-wider text-white/85">
            {ctaBadges.map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
