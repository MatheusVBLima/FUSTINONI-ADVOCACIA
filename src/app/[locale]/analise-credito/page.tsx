import type { Metadata } from "next";

import { Link } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";
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
import { WhatsAppCTAButton } from "@/components/whatsapp-cta-button";
import { OG_LOCALE_BY_APP_LOCALE } from "@/lib/i18n";
import { getLocalizedHash } from "@/lib/navigation";
import { getAlternatesLanguages, getLocalizedUrl } from "@/lib/seo";
import { SITE_NAME, SITE_OG_IMAGE } from "@/lib/site";

const pagePath = "/analise-credito";
const BCB_REPORT_URL =
  "https://www.bcb.gov.br/meubc/relatorioemprestimofinanciamento";
const ANALISE_TITLE_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Análise jurídica de histórico bancário e acesso ao crédito | FUSTINONI ADVOCACIA",
  en: "Credit record legal review and credit access strategy | FUSTINONI ADVOCACIA",
  es: "Análisis jurídico del historial bancario y acceso al crédito | FUSTINONI ADVOCACIA",
  it: "Analisi legale dello storico bancario e accesso al credito | FUSTINONI ADVOCACIA",
};

const ANALISE_DESCRIPTION_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Recusa de crédito, financiamento, limite bancário ou aprovação cadastral pode envolver informação desatualizada, distorcida ou indevida. O escritório realiza análise técnica e define a medida jurídica cabível.",
  en: "Credit denial, financing refusal or limit reduction may involve outdated or improper banking data. The firm performs technical legal review and defines the proper legal strategy.",
  es: "El rechazo de crédito, financiación o límite bancario puede involucrar información desactualizada o indebida. El despacho realiza análisis técnico-jurídico y define la medida aplicable.",
  it: "Il rifiuto del credito, del finanziamento o la riduzione del limite può dipendere da dati bancari non aggiornati o indebiti. Lo studio esegue analisi tecnico-legale e definisce la misura adeguata.",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const title = ANALISE_TITLE_BY_LOCALE[locale];
  const description = ANALISE_DESCRIPTION_BY_LOCALE[locale];

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

const whatsappPhone = process.env.WHATSAPP_PHONE_NUMBER ?? "";
const MSG_HERO_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Olá! Gostaria de solicitar uma análise de apontamentos indevidos no meu CPF/CNPJ.",
  en: "Hello! I would like to request a legal review of improper entries in my tax ID history.",
  es: "¡Hola! Me gustaría solicitar un análisis jurídico de registros indebidos en mi historial crediticio.",
  it: "Buongiorno! Vorrei richiedere un'analisi legale di segnalazioni indebite nel mio storico creditizio.",
};

const MSG_CTA_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Olá! Vim pelo site e quero agendar uma consulta sobre apontamentos indevidos no meu CPF/CNPJ.",
  en: "Hello! I came from the website and want to schedule a consultation about improper credit listings.",
  es: "¡Hola! Vengo del sitio y quiero agendar una consulta sobre registros indebidos de crédito.",
  it: "Buongiorno! Sono arrivato dal sito e voglio fissare una consulenza su segnalazioni indebite di credito.",
};

type LocalizedAnaliseCopy = {
  eyebrow: string;
  heroTitle: string;
  heroDescription1: string;
  heroDescription2: string;
  docLabel: string;
  docCta: string;
  primaryCta: string;
  secondaryCta: string;
  problemTitle: string;
  problemDescription: string;
  howTitle: string;
  howItems: string[];
  irregularityTitle: string;
  irregularityItems: string[];
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

const ANALISE_COPY_BY_LOCALE: Record<
  Exclude<AppLocale, "pt">,
  LocalizedAnaliseCopy
> = {
  en: {
    eyebrow: "Credit record legal review and credit access",
    heroTitle: "Credit denied even without visible default records?",
    heroDescription1:
      "Repeated denials of credit, financing or banking limits may come from outdated or improper entries in financial systems, including SCR data.",
    heroDescription2:
      "The firm reviews your records and documents to define the proper measure: correction of entries, interruption of harmful effects and accountability when legally applicable.",
    docLabel: "Key document for initial review",
    docCta: "Generate Loans and Financing Report (Central Bank)",
    primaryCta: "Request case review",
    secondaryCta: "Understand our approach",
    problemTitle: "When your name looks clear, but the market still blocks you",
    problemDescription:
      "Many clients arrive with no classic blacklist record, but still face repeated credit denials. In many situations, controversial or outdated banking data affects limits, financing and business reputation.",
    howTitle: "How we act",
    howItems: [
      "Document intake and legal-technical screening",
      "Identification of inconsistent, outdated or improper entries",
      "Definition of extrajudicial or judicial strategy",
      "Follow-up until correction or legal resolution",
    ],
    irregularityTitle: "Indicators of potential irregularity",
    irregularityItems: [
      "Repeated credit denial without clear grounds",
      "Limit reduction or blocking without transparent basis",
      "Financing refusal despite regular payment history",
      "Operational losses caused by restricted credit access",
    ],
    audienceTitle: "Who this service is for",
    audienceItems: [
      "Individuals with denied personal credit or financing",
      "Entrepreneurs facing banking approval barriers",
      "Families preparing for major financing operations",
      "Clients suspecting persistence of data after debt settlement",
    ],
    differentialsTitle: "Why choose legal review instead of operational review only",
    differentialsItems: [
      "Technical legal analysis focused on evidence",
      "Strategy proportional to each concrete case",
      "Confidential and personalized handling",
      "Advisory and litigation capability when necessary",
    ],
    faqTitle: "Frequently asked questions",
    finalTitle: "Talk to a team ready to review your case with technical rigor",
    finalDescription:
      "If you are facing unexplained credit denials, financing barriers or suspected improper banking data, the first step is a careful legal document review.",
    finalCta: "Schedule consultation",
    faqs: [
      {
        question: "Does a clean name always mean my banking history is regular?",
        answer:
          "Not always. You may have no classic default listing and still face banking records that negatively influence credit analysis.",
      },
      {
        question: "Is every credit denial illegal?",
        answer:
          "No. Credit decisions involve internal criteria. However, when denial is based on improper, inaccurate or outdated data, legal action may be applicable.",
      },
      {
        question: "Does the firm review documents before any legal action?",
        answer:
          "Yes. Technical document review is the starting point to assess feasibility and define the proper strategy.",
      },
      {
        question: "Can compensation be requested?",
        answer:
          "In legally supported scenarios, yes. It depends on the irregularity, the damage and available evidence.",
      },
      {
        question: "Can assistance be remote?",
        answer:
          "Yes. The firm provides remote and in-person assistance according to case needs.",
      },
      {
        question: "Can urgent relief be necessary?",
        answer:
          "Yes. In some cases, especially with imminent financial harm, urgent judicial relief may be required.",
      },
    ],
  },
  es: {
    eyebrow: "Análisis jurídico del historial bancario y acceso al crédito",
    heroTitle: "¿Crédito rechazado incluso sin negativación aparente?",
    heroDescription1:
      "Los rechazos reiterados de crédito, financiación o límite bancario pueden derivar de datos desactualizados o indebidos en sistemas financieros, incluido el SCR.",
    heroDescription2:
      "El despacho analiza historial y documentación para definir la medida adecuada: corrección de registros, cese de efectos lesivos y responsabilidad cuando exista base legal.",
    docLabel: "Documento esencial para análisis inicial",
    docCta: "Generar Informe de Préstamos y Financiaciones (Banco Central)",
    primaryCta: "Solicitar análisis del caso",
    secondaryCta: "Entender la actuación",
    problemTitle: "Cuando el nombre parece regular, pero el mercado sigue cerrado",
    problemDescription:
      "Muchos clientes no identifican restricción clásica y, aun así, sufren rechazos reiterados. En varios casos, datos bancarios controvertidos o desactualizados afectan límite, financiación y reputación comercial.",
    howTitle: "Cómo actuamos",
    howItems: [
      "Recepción documental y análisis técnico-jurídico",
      "Identificación de registros inconsistentes o indebidos",
      "Definición de estrategia extrajudicial o judicial",
      "Seguimiento hasta la corrección o solución jurídica",
    ],
    irregularityTitle: "Indicios de posible irregularidad",
    irregularityItems: [
      "Rechazo reiterado sin justificación clara",
      "Reducción o bloqueo de límite sin fundamento transparente",
      "Financiación negada pese a historial regular",
      "Perjuicios operativos por restricción de acceso al crédito",
    ],
    audienceTitle: "Para quién es este servicio",
    audienceItems: [
      "Personas con crédito personal o financiación rechazada",
      "Empresarios con barreras de aprobación bancaria",
      "Familias en preparación para operaciones de financiación",
      "Clientes que sospechan mantenimiento indebido tras pago",
    ],
    differentialsTitle: "Por qué el análisis debe ser jurídico",
    differentialsItems: [
      "Rigor técnico-jurídico basado en evidencia",
      "Estrategia proporcional al caso concreto",
      "Atención confidencial y personalizada",
      "Capacidad consultiva y contenciosa cuando sea necesario",
    ],
    faqTitle: "Preguntas frecuentes",
    finalTitle: "Hable con un equipo preparado para evaluar su caso con rigor técnico",
    finalDescription:
      "Si enfrenta rechazo de crédito sin motivo claro, dificultad de financiación o sospecha de datos bancarios indebidos, el primer paso es una revisión jurídica cuidadosa de la documentación.",
    finalCta: "Agendar consulta",
    faqs: [
      {
        question: "¿Nombre limpio significa historial bancario regular?",
        answer:
          "No siempre. Puede no existir negativación clásica y aun así haber datos bancarios que afecten el análisis de crédito.",
      },
      {
        question: "¿Todo rechazo de crédito es ilegal?",
        answer:
          "No. La concesión de crédito tiene criterios internos. Pero si la negativa se basa en datos indebidos o desactualizados, puede existir medida jurídica.",
      },
      {
        question: "¿El despacho analiza documentos antes de actuar?",
        answer:
          "Sí. El análisis documental técnico es la base para evaluar viabilidad y definir estrategia.",
      },
      {
        question: "¿Se puede reclamar indemnización?",
        answer:
          "Sí, cuando exista fundamento jurídico y prueba suficiente del perjuicio.",
      },
      {
        question: "¿La atención puede ser remota?",
        answer:
          "Sí. La atención puede ser remota o presencial, según necesidad del caso.",
      },
      {
        question: "¿Puede requerirse medida urgente?",
        answer:
          "Sí. En casos con daño inminente, puede ser necesaria tutela de urgencia.",
      },
    ],
  },
  it: {
    eyebrow: "Analisi legale dello storico bancario e accesso al credito",
    heroTitle: "Credito negato anche senza segnalazioni apparenti?",
    heroDescription1:
      "Rifiuti ripetuti di credito, finanziamento o limiti bancari possono derivare da dati non aggiornati o indebiti nei sistemi finanziari, incluso lo SCR.",
    heroDescription2:
      "Lo studio analizza storico e documenti per definire la misura corretta: rettifica delle segnalazioni, cessazione degli effetti dannosi e responsabilità quando prevista dalla legge.",
    docLabel: "Documento essenziale per la valutazione iniziale",
    docCta: "Genera Report Prestiti e Finanziamenti (Banca Centrale)",
    primaryCta: "Richiedi analisi del caso",
    secondaryCta: "Scopri come operiamo",
    problemTitle: "Quando il profilo appare regolare, ma il mercato resta chiuso",
    problemDescription:
      "Molti clienti non risultano formalmente segnalati e tuttavia subiscono rifiuti ripetuti. In diversi casi, dati bancari controversi o non aggiornati incidono su limiti, finanziamenti e reputazione commerciale.",
    howTitle: "Come operiamo",
    howItems: [
      "Raccolta documentale e screening tecnico-legale",
      "Identificazione di dati incoerenti o indebiti",
      "Definizione della strategia stragiudiziale o giudiziale",
      "Monitoraggio fino alla rettifica o soluzione legale",
    ],
    irregularityTitle: "Indicatori di possibile irregolarità",
    irregularityItems: [
      "Rifiuto reiterato senza motivazione chiara",
      "Riduzione o blocco del limite senza base trasparente",
      "Finanziamento negato nonostante storico regolare",
      "Danni operativi causati da restrizioni al credito",
    ],
    audienceTitle: "A chi si rivolge il servizio",
    audienceItems: [
      "Privati con credito o finanziamento negato",
      "Imprenditori con ostacoli all'approvazione bancaria",
      "Famiglie in fase di nuove operazioni finanziarie",
      "Clienti che sospettano persistenza di dati dopo estinzione",
    ],
    differentialsTitle: "Perché serve un'analisi legale, non solo operativa",
    differentialsItems: [
      "Analisi tecnico-legale basata su prove",
      "Strategia proporzionata al caso concreto",
      "Gestione riservata e personalizzata",
      "Assistenza consulenziale e contenziosa quando necessario",
    ],
    faqTitle: "Domande frequenti",
    finalTitle: "Parla con un team pronto a valutare il tuo caso con rigore tecnico",
    finalDescription:
      "Se affronti rifiuti di credito senza motivazione chiara, difficoltà di finanziamento o sospetto di dati bancari indebiti, il primo passo è una revisione legale accurata dei documenti.",
    finalCta: "Prenota consulenza",
    faqs: [
      {
        question: "Nome pulito significa sempre storico bancario regolare?",
        answer:
          "Non sempre. È possibile non avere segnalazioni classiche e comunque subire effetti negativi da dati bancari.",
      },
      {
        question: "Ogni rifiuto di credito è illegittimo?",
        answer:
          "No. Le banche adottano criteri interni. Tuttavia, se il rifiuto deriva da dati indebiti o non aggiornati, può essere azionabile legalmente.",
      },
      {
        question: "Lo studio analizza i documenti prima di agire?",
        answer:
          "Sì. L'analisi documentale è il punto di partenza per verificare la fattibilità e definire la strategia.",
      },
      {
        question: "Si può richiedere risarcimento?",
        answer:
          "Sì, nei casi giuridicamente fondati con elementi probatori adeguati.",
      },
      {
        question: "L'assistenza può essere da remoto?",
        answer:
          "Sì. Lo studio assiste da remoto e in presenza in base alle necessità del caso.",
      },
      {
        question: "Può servire una misura urgente?",
        answer:
          "Sì. In caso di pregiudizio imminente può essere necessaria tutela d'urgenza.",
      },
    ],
  },
};

type PageProps = {
  params: Promise<{
    locale: AppLocale;
  }>;
};

export default async function AnaliseCreditoPage({ params }: PageProps) {
  const { locale } = await params;
  const sectionHashes = {
    problema: getLocalizedHash(pagePath, "problema", locale),
    comoAtuamos: getLocalizedHash(pagePath, "como-atuamos", locale),
    irregularidade: getLocalizedHash(pagePath, "irregularidade", locale),
    publico: getLocalizedHash(pagePath, "publico", locale),
    diferenciais: getLocalizedHash(pagePath, "diferenciais", locale),
    faq: getLocalizedHash(pagePath, "faq", locale),
  };
  const msgHero = MSG_HERO_BY_LOCALE[locale] ?? MSG_HERO_BY_LOCALE.pt;
  const msgCta = MSG_CTA_BY_LOCALE[locale] ?? MSG_CTA_BY_LOCALE.pt;
  const copy = locale === "pt" ? null : ANALISE_COPY_BY_LOCALE[locale] ?? null;
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

  const heroEyebrow = copy?.eyebrow ?? "Análise jurídica de histórico bancário e acesso ao crédito";
  const heroTitle = copy?.heroTitle ?? "Crédito negado, mesmo sem negativação aparente?";
  const heroDescription1 =
    copy?.heroDescription1 ??
    "Recusas de crédito, financiamento e limite bancário podem decorrer de dados desatualizados ou indevidos em sistemas do mercado financeiro, inclusive no SCR.";
  const heroDescription2 =
    copy?.heroDescription2 ??
    "O escritório realiza análise jurídica do histórico e da documentação para definir a medida cabível: correção de apontamentos, cessação de efeitos lesivos e responsabilização quando houver base legal.";
  const docLabel = copy?.docLabel ?? "Documento essencial para análise inicial";
  const docCta = copy?.docCta ?? "Gerar Relatório de Empréstimos e Financiamentos (Banco Central)";
  const heroPrimaryCta = copy?.primaryCta ?? "Solicitar análise do caso";
  const heroSecondaryCta = copy?.secondaryCta ?? "Entender a atuação";

  const sectionProblemEyebrow =
    locale === "en" ? "Problem" : locale === "es" ? "Problema" : locale === "it" ? "Problema" : "O problema";
  const sectionHowEyebrow =
    locale === "en" ? "How we operate" : locale === "es" ? "Cómo actuamos" : locale === "it" ? "Come operiamo" : "Como atuamos";
  const sectionIrregularityEyebrow =
    locale === "en"
      ? "When there is irregularity"
      : locale === "es"
        ? "Cuando hay irregularidad"
        : locale === "it"
          ? "Quando c'è irregolarità"
          : "Quando há irregularidade";
  const sectionAudienceEyebrow =
    locale === "en" ? "Who this page is for" : locale === "es" ? "Para quién es esta página" : locale === "it" ? "A chi è rivolta questa pagina" : "Para quem é esta página";
  const sectionDifferentialsEyebrow =
    locale === "en" ? "Firm differentiators" : locale === "es" ? "Diferenciales del despacho" : locale === "it" ? "Punti di forza dello studio" : "Diferenciais do escritório";

  const problemTitle = copy?.problemTitle ?? "Quando o nome parece regular, mas o mercado continua fechado";
  const problemParagraph1 =
    copy?.problemDescription ??
    "Muitos clientes chegam com o nome aparentemente regular, mas com recusas repetidas em bancos e financeiras.";
  const problemParagraph2 =
    copy?.irregularityItems?.[3] ??
    "Em vários casos, o bloqueio está ligado a registros bancários controvertidos ou desatualizados, afetando limite, financiamento e reputação negocial.";

  const problemCards = copy
    ? [...copy.irregularityItems, ...copy.audienceItems]
        .slice(0, 6)
        .map((label, index) => ({ label, index: String(index + 1).padStart(2, "0") }))
    : [
        { label: "Recusa reiterada de crédito sem justificativa clara", index: "01" },
        { label: "Financiamento negado apesar de nome aparentemente regular", index: "02" },
        { label: "Redução ou bloqueio de limite bancário", index: "03" },
        { label: "Dados bancários desatualizados ou controvertidos", index: "04" },
        { label: "Dificuldade em operações empresariais e pessoais", index: "05" },
        { label: "Necessidade de correção e responsabilização jurídica", index: "06" },
      ];

  const heroTagsLocalized = copy
    ? locale === "en"
      ? ["Confidential service", "Document review", "Consulting and litigation"]
      : locale === "es"
        ? ["Atención confidencial", "Análisis documental", "Actuación consultiva y contenciosa"]
        : ["Assistenza riservata", "Analisi documentale", "Attività consulenziale e contenziosa"]
    : heroTags;

  const heroPreliminarItemsLocalized = copy
    ? [
        { text: copy.irregularityItems[0], tone: "default" as const, order: 1 },
        { text: copy.irregularityItems[1], tone: "default" as const, order: 2 },
        { text: copy.irregularityItems[2], tone: "default" as const, order: 3 },
        { text: copy.audienceItems[0], tone: "default" as const, order: 4 },
        { text: copy.problemDescription, tone: "inverse" as const, order: 5 },
      ]
    : heroPreliminarItems;

  const preliminarEyebrow =
    locale === "en" ? "Preliminary review" : locale === "es" ? "Evaluación preliminar" : locale === "it" ? "Valutazione preliminare" : "Avaliação preliminar";
  const preliminarTitle =
    locale === "en" ? "Signs that require technical review" : locale === "es" ? "Indicios que requieren análisis técnico" : locale === "it" ? "Indizi che richiedono analisi tecnica" : "Indícios que merecem exame técnico";
  const preliminarTag = locale === "en" ? "SCR / Registrato" : locale === "es" ? "SCR / Registrato" : locale === "it" ? "SCR / Registrato" : "SCR / Registrato";

  const howTitle = copy?.howTitle ?? "Atuação jurídica estruturada, com estratégia e precisão técnica";
  const howParagraph =
    copy?.heroDescription2 ??
    "Cada caso exige leitura jurídica individual. Cruzamos relatórios, contratos e histórico bancário para definir a estratégia extrajudicial ou judicial mais adequada.";
  const howDocLinePrefix =
    locale === "en"
      ? "For initial screening, prioritize the official Central Bank report:"
      : locale === "es"
        ? "Para la revisión inicial, priorice el informe oficial del Banco Central:"
        : locale === "it"
          ? "Per la valutazione iniziale, dia priorità al report ufficiale della Banca Centrale:"
          : "Para triagem inicial, priorize a emissão do relatório oficial do Banco Central:";

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
        { step: "01", title: "Recebimento da documentação", description: "Relatórios, contratos e comprovantes essenciais, com prioridade ao relatório do Banco Central." },
        { step: "02", title: "Diagnóstico jurídico", description: "Mapeamento de inconsistências e dados indevidos." },
        { step: "03", title: "Definição da medida cabível", description: "Notificação, ação, tutela de urgência ou pedido indenizatório." },
        { step: "04", title: "Acompanhamento completo", description: "Condução até a conclusão com discrição e estratégia." },
      ];

  const irregularityTitle = copy?.irregularityTitle ?? "O que pode ser discutido juridicamente";
  const irregularityParagraph =
    copy?.finalDescription ??
    "Comprovada irregularidade, a atuação pode buscar correção cadastral, retirada de apontamentos, tutela de urgência e reparação indenizatória, conforme o caso.";
  const irregularityNote =
    locale === "en"
      ? "There is no single formula or guaranteed result: the strategy depends on available documentation and legal elements of the concrete case."
      : locale === "es"
        ? "No existe una fórmula única ni promesa de resultado: la estrategia depende de la documentación disponible y de los elementos jurídicos del caso concreto."
        : locale === "it"
          ? "Non esiste una formula unica né promessa di risultato: la strategia dipende dalla documentazione disponibile e dagli elementi giuridici del caso concreto."
          : "Não há fórmula única nem promessa de resultado: a estratégia depende da documentação e dos elementos jurídicos do caso concreto.";
  const irregularityList = copy
    ? copy.irregularityItems
    : [
        "Correção ou exclusão da informação irregular",
        "Adequação do histórico cadastral e bancário à realidade documental",
        "Cessação dos efeitos lesivos sobre o acesso ao crédito",
        "Tutela de urgência para impedir a perpetuação do dano",
        "Reparação indenizatória, quando presentes os requisitos legais",
      ];

  const audienceTitle = copy?.audienceTitle ?? "Atendimento para pessoas físicas, empresários e estruturas familiares";
  const audienceParagraph =
    copy?.problemDescription ??
    "A página foi pensada para atender clientes que, embora não identifiquem restrições evidentes, percebem efeitos concretos de bloqueio negocial no mercado.";
  const audienceCards = copy
    ? copy.audienceItems
    : [
        "Pessoas físicas com crédito pessoal ou financiamento recusado",
        "Empresários com dificuldade de obtenção de limite, capital de giro ou aprovação bancária",
        "Famílias em fase de aquisição imobiliária e clientes que revisam o histórico antes de nova operação",
        "Pessoas que suspeitam de manutenção indevida de informações após quitação",
      ];

  const differentialsTitle = copy?.differentialsTitle ?? "Por que a análise deve ser jurídica, e não apenas operacional";
  const differentialsParagraph =
    copy?.heroDescription2 ??
    "Nosso diferencial está em separar recusa legítima de restrição irregular, com leitura jurídica técnica e estratégia proporcional a cada caso.";

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
        { title: "Rigor técnico", description: "Análise documental criteriosa, sem generalizações ou atalhos." },
        { title: "Estratégia processual", description: "Cada caso recebe estratégia proporcional - extrajudicial, judicial ou de urgência - conforme o que a situação exige." },
        { title: "Atendimento personalizado", description: "Nenhum caso é tratado como padrão. A atuação é moldada ao perfil, ao histórico e aos objetivos de cada cliente." },
        { title: "Discrição absoluta", description: "Sigilo total no tratamento de dados e informações sensíveis." },
        { title: "Atuação consultiva e contenciosa", description: "Capacidade de atuar tanto na prevenção quanto no litígio, conforme o momento do caso." },
        { title: "Análise individual de alta complexidade", description: "Casos que envolvem SCR, Registrato e histórico bancário exigem leitura técnica aprofundada - não apenas operacional." },
      ];

  const faqHeading = copy?.faqTitle ?? "Perguntas frequentes antes do início da atuação jurídica";

  const ctaEyebrow =
    locale === "en" ? "Schedule your consultation" : locale === "es" ? "Agende su consulta" : locale === "it" ? "Prenoti la sua consulenza" : "Agende sua consulta";
  const ctaTitle = copy?.finalTitle ?? "Fale com uma equipe preparada para examinar seu caso com seriedade técnica";
  const ctaDescription =
    copy?.finalDescription ??
    "Se você enfrenta negativa de crédito sem justificativa clara, dificuldade de financiamento ou suspeita de informação bancária indevida, o primeiro passo é uma análise jurídica criteriosa da documentação. A estratégia correta começa com diagnóstico preciso.";
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

      <section className="border-b border-black/15 px-4 pt-16 pb-12 sm:px-6 sm:pt-20 md:px-10 md:pt-24">
        <div className="grid items-start gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0">
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-black/70">
              {heroEyebrow}
            </p>
            <h1 className="mb-8 max-w-3xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
              {heroTitle}
            </h1>
            <p className="mb-5 max-w-3xl text-sm leading-7 text-black/70 sm:text-base">
              {heroDescription1}
            </p>
            <p className="mb-8 max-w-3xl text-sm leading-7 text-black/70 sm:text-base">
              {heroDescription2}
            </p>

            <div className="mb-8 max-w-3xl border border-black/15 bg-neutral-50 px-4 py-3 text-left text-sm leading-6 text-black/70">
              <p className="font-medium text-black">{docLabel}</p>
              <a
                href={BCB_REPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block underline underline-offset-2"
              >
                {docCta}
              </a>
            </div>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppCTAButton
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
                <Link
                  href={{ pathname: "/analise-credito", hash: sectionHashes.comoAtuamos }}
                >
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

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

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
            <p className="mt-4 text-sm leading-7 text-black/65 sm:text-base">
              {howDocLinePrefix}{" "}
              <a
                href={BCB_REPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-2"
              >
                {docCta}
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
                {sectionHowEyebrow}
              </OpticsCardDescription>
              <OpticsCardTitle className="mt-1 font-serif text-xl font-normal leading-tight">
                {locale === "en"
                  ? "From diagnosis to full follow-up"
                  : locale === "es"
                    ? "Del diagnóstico al seguimiento integral"
                    : locale === "it"
                      ? "Dalla diagnosi al monitoraggio completo"
                      : "Do diagnóstico ao acompanhamento completo"}
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

      <section
        id={sectionHashes.irregularidade}
        className="border-b border-black/15 px-4 py-16 sm:px-6 sm:py-20 md:px-10"
      >
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-start">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
              {sectionIrregularityEyebrow}
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              {irregularityTitle}
            </h2>
            <p className="mt-6 text-sm leading-7 text-black/65 sm:text-base">
              {irregularityParagraph}
            </p>
            <Card className="mt-6 rounded-none border-black/15 bg-neutral-50 p-4 text-sm leading-7 text-black/70 shadow-none">
              {irregularityNote}
            </Card>
          </div>

          <OpticsCard
            decorations
            className="rounded-none border border-black/15 bg-white shadow-none ring-0 gap-0"
          >
            <OpticsCardHeader className="border-b border-black/15 pb-4">
              <OpticsCardDescription className="text-xs font-bold uppercase tracking-widest text-black/70">
                {locale === "en"
                  ? "Available legal actions"
                  : locale === "es"
                    ? "Medidas posibles"
                    : locale === "it"
                      ? "Misure possibili"
                      : "Providências possíveis"}
              </OpticsCardDescription>
              <OpticsCardTitle className="mt-1 font-serif text-xl font-normal leading-tight">
                {locale === "en"
                  ? "What can be legally pursued"
                  : locale === "es"
                    ? "Qué puede buscarse jurídicamente"
                    : locale === "it"
                      ? "Cosa può essere richiesto legalmente"
                      : "O que pode ser buscado juridicamente"}
              </OpticsCardTitle>
            </OpticsCardHeader>
            <div
              style={{ "--card": "black", "--muted": "rgb(255 255 255 / 0.15)" } as React.CSSProperties}
              className="h-10 w-full bg-[repeating-linear-gradient(45deg,var(--card),var(--card)_3px,var(--muted)_3px,var(--muted)_6px)]"
            />
            <OpticsCardContent className="px-0">
              <AnimatedList delay={300} newestOnTop={false} className="w-full items-stretch gap-2">
                {irregularityList.map((item, i) => (
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
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

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
            <WhatsAppCTAButton
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
