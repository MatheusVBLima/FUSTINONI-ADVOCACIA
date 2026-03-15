import type { Metadata } from "next";
import Image from "next/image";
import { Plus, X } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { WhatsAppCTAButton } from "@/components/whatsapp-cta-button";
import { OG_LOCALE_BY_APP_LOCALE } from "@/lib/i18n";
import { getAlternatesLanguages, getLocalizedUrl } from "@/lib/seo";
import { SITE_OG_IMAGE, SITE_NAME, getSiteUrl } from "@/lib/site";

type HomePageProps = {
  params: Promise<{
    locale: AppLocale;
  }>;
};

const HOME_TITLE_BY_LOCALE: Record<AppLocale, string> = {
  pt: SITE_NAME,
  en: `${SITE_NAME} | Strategic legal advisory`,
  es: `${SITE_NAME} | Asesoría jurídica estratégica`,
  it: `${SITE_NAME} | Consulenza legale strategica`,
};

const HOME_DESCRIPTION_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Assessoria jurídica consultiva e contenciosa para pessoas físicas e jurídicas, com atuação estratégica, técnica e personalizada em múltiplas áreas do Direito.",
  en: "Strategic legal advisory and litigation support for individuals and companies, with technical precision and personalized service.",
  es: "Asesoría jurídica consultiva y contenciosa para personas y empresas, con actuación estratégica, técnica y personalizada.",
  it: "Consulenza legale, preventiva e contenziosa, per persone e imprese con approccio strategico, tecnico e personalizzato.",
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const title = HOME_TITLE_BY_LOCALE[locale];
  const description = HOME_DESCRIPTION_BY_LOCALE[locale];

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedUrl("/", locale),
      languages: getAlternatesLanguages("/"),
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE_BY_APP_LOCALE[locale],
      url: getLocalizedUrl("/", locale),
      title,
      description,
      siteName: SITE_NAME,
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

const practiceAreas = [
  "Contencioso Estratégico",
  "Consultoria Empresarial",
  "Patrimônio e Sucessões",
  "Direito Penal Empresarial",
  "Direito Imobiliário",
  "Compliance e Direito Digital",
];

const serviceHighlights = [
  {
    title: "Dr. Tiago Sales Fustinoni - OAB/SP 395.178",
    description:
      "Fundador do escritório, com atuação em Direito Penal e Processual Penal, nulidades processuais, planejamento e proteção patrimonial, além de estratégias para satisfação de execução.",
  },
  {
    title: "Dr. Eduardo Torres de Freitas - OAB/SP 478.321",
    description:
      "Atua em Direito Penal, Civil, Consumidor e Previdenciário, com foco em gestão de riscos, estratégia processual e condução ativa de litígios de alta complexidade.",
  },
  {
    title: "Dra. Melina Carneiro Rizzo - OAB/SP 391.137",
    description:
      "Especialista em Direito Imobiliário, Penal e Processual Penal, com experiência em consultivo e contencioso imobiliário, due diligence estratégica e compliance de integridade.",
  },
  {
    title: "Dr. Marcio Eduardo Garcia Leite - OAB/SP 257.464",
    description:
      "Atuação destacada em Direito Trabalhista, Civil e Administrativo, com forte experiência em prevenção de litígios, negociação, gestão de riscos e defesa de interesses corporativos.",
  },
];

const processRows = [
  "Diagnóstico jurídico e mapeamento de riscos",
  "Definição de estratégia consultiva ou contenciosa",
  "Pareceres e orientação para tomada de decisão",
  "Estruturação documental e contratual",
  "Negociação e condução de tratativas",
  "Atuação contenciosa em primeira instância",
  "Recursos e sustentações orais",
  "Acompanhamento pós-decisão e execução",
];

const faqs = [
  {
    question: "Como funciona a primeira consulta?",
    answer:
      "A primeira reunião é dedicada ao entendimento completo do caso, dos objetivos e dos riscos envolvidos. A partir disso, apresentamos um direcionamento estratégico e o escopo recomendado.",
  },
  {
    question: "O escritório atende pessoa física e pessoa jurídica?",
    answer:
      "Sim. Atuamos para pessoa física e pessoa jurídica, com abordagem personalizada para demandas consultivas, preventivas e contenciosas.",
  },
  {
    question: "É possível contratar somente consultoria preventiva?",
    answer:
      "Sim. A consultoria preventiva pode ser contratada de forma independente para reduzir riscos, estruturar decisões e evitar litígios futuros.",
  },
  {
    question: "Vocês atuam em casos urgentes e medidas liminares?",
    answer:
      "Sim. Em situações urgentes, avaliamos a viabilidade jurídica imediata e estruturamos a atuação necessária para proteção célere dos direitos do cliente.",
  },
  {
    question: "O atendimento pode ser remoto?",
    answer:
      "Sim. O escritório realiza atendimentos presenciais e remotos, com acompanhamento contínuo e comunicação transparente durante toda a condução do caso.",
  },
  {
    question: "Como são definidos honorários e escopo?",
    answer:
      "Honorários e escopo são definidos conforme complexidade, volume de trabalho e objetivos do cliente, sempre com proposta clara e alinhada antes do início da atuação.",
  },
];

const legalAreasSchema = [
  "Direito Civil",
  "Direito de Família e Sucessões",
  "Direito Tributário",
  "Direito Imobiliário",
  "Direito Trabalhista",
  "Direito Empresarial",
  "Direito da Saúde",
  "Direito Administrativo",
  "Direito Internacional",
  "Direito Desportivo",
  "Direito Penal Empresarial",
  "Direito Digital e Compliance",
];

const specificServices = [
  {
    title: "Direito à Saúde",
    description:
      "Convênio médico que nega cobertura ou home care. Estado que deixa de oferecer tratamento necessário. O escritório atua em face de operadoras privadas e do poder público, com estratégia voltada a provimentos urgentes e reparação de danos.",
    layoutType: "full_text" as const,
    subCards: [
      {
        title: "Convênio Médico",
        bullets: [
          "Negativa de cobertura de cirurgia ou procedimento prescrito",
          "Recusa de internação ou alta antecipada indevida",
          "Negativa de tratamento oncológico ou de alta complexidade",
          "Exclusão indevida de medicamentos ou insumos necessários",
          "Limitação de sessões abaixo do prescrito",
          "Cobertura recusada por cláusula abusiva ou interpretação indevida",
        ],
        href: "/direito-saude#convenio",
        ctaLabel: "Agendar Consulta",
      },
      {
        title: "Home Care pelo Estado",
        bullets: [
          "Paciente com alta hospitalar dependente de cuidados contínuos",
          "Impossibilidade de locomoção ou internação domiciliar prescrita",
          "Estado que nega ou retarda o fornecimento do serviço",
          "Necessidade de equipamentos, medicamentos e equipe de saúde",
          "Crianças ou idosos sem atendimento adequado garantido pelo SUS",
          "Tutela de urgência para garantia imediata do tratamento",
        ],
        href: "/direito-saude#home-care",
        ctaLabel: "Agendar Consulta",
      },
    ],
  },
  {
    title: "Análise de Apontamentos Indevidos",
    description:
      "Análise jurídica de histórico bancário para casos de recusa de crédito, limite ou financiamento, com estratégia consultiva e contenciosa.",
    href: "/analise-credito",
    ctaLabel: "Acessar Serviço",
    disabled: false,
    layoutType: "card" as const,
  },
  {
    title: "Revisão de Fator K",
    description:
      "Análise jurídica e técnica das faturas SABESP para empresas que pagam Fator K, com estratégia de impugnação administrativa ou judicial e pleito de restituição quando cabível.",
    href: "/fator-k",
    ctaLabel: "Acessar Serviço",
    disabled: false,
    layoutType: "card" as const,
  },
];

type NonDefaultLocale = Exclude<AppLocale, "pt">;

const PRACTICE_AREAS_BY_LOCALE: Record<NonDefaultLocale, typeof practiceAreas> = {
  en: [
    "Strategic Litigation",
    "Business Advisory",
    "Wealth and Succession",
    "Corporate Criminal Law",
    "Real Estate Law",
    "Compliance and Digital Law",
  ],
  es: [
    "Litigio Estratégico",
    "Consultoría Empresarial",
    "Patrimonio y Sucesiones",
    "Derecho Penal Empresarial",
    "Derecho Inmobiliario",
    "Compliance y Derecho Digital",
  ],
  it: [
    "Contenzioso Strategico",
    "Consulenza Aziendale",
    "Patrimonio e Successioni",
    "Diritto Penale d'Impresa",
    "Diritto Immobiliare",
    "Compliance e Diritto Digitale",
  ],
};

const SERVICE_HIGHLIGHTS_BY_LOCALE: Record<
  NonDefaultLocale,
  typeof serviceHighlights
> = {
  en: [
    {
      title: "Dr. Tiago Sales Fustinoni - OAB/SP 395.178",
      description:
        "Founder of the firm, practicing in Criminal and Criminal Procedure Law, procedural nullities, wealth planning and protection, as well as enforcement-oriented legal strategies.",
    },
    {
      title: "Dr. Eduardo Torres de Freitas - OAB/SP 478.321",
      description:
        "Practices in Criminal, Civil, Consumer and Social Security Law, with a focus on risk management, procedural strategy and active litigation leadership in complex disputes.",
    },
    {
      title: "Dra. Melina Carneiro Rizzo - OAB/SP 391.137",
      description:
        "Specialist in Real Estate, Criminal and Criminal Procedure Law, with experience in advisory and litigation matters, strategic due diligence and integrity compliance.",
    },
    {
      title: "Dr. Marcio Eduardo Garcia Leite - OAB/SP 257.464",
      description:
        "Recognized practice in Labor, Civil and Administrative Law, with strong experience in dispute prevention, negotiation, risk management and corporate defense.",
    },
  ],
  es: [
    {
      title: "Dr. Tiago Sales Fustinoni - OAB/SP 395.178",
      description:
        "Fundador del despacho, con actuación en Derecho Penal y Procesal Penal, nulidades procesales, planificación y protección patrimonial, además de estrategias para satisfacción de ejecución.",
    },
    {
      title: "Dr. Eduardo Torres de Freitas - OAB/SP 478.321",
      description:
        "Actúa en Derecho Penal, Civil, del Consumidor y Previsional, con foco en gestión de riesgos, estrategia procesal y conducción activa de litigios de alta complejidad.",
    },
    {
      title: "Dra. Melina Carneiro Rizzo - OAB/SP 391.137",
      description:
        "Especialista en Derecho Inmobiliario, Penal y Procesal Penal, con experiencia en consultivo y contencioso inmobiliario, due diligence estratégica y compliance de integridad.",
    },
    {
      title: "Dr. Marcio Eduardo Garcia Leite - OAB/SP 257.464",
      description:
        "Actuación destacada en Derecho Laboral, Civil y Administrativo, con amplia experiencia en prevención de litigios, negociación, gestión de riesgos y defensa de intereses corporativos.",
    },
  ],
  it: [
    {
      title: "Dr. Tiago Sales Fustinoni - OAB/SP 395.178",
      description:
        "Fondatore dello studio, con attività in Diritto Penale e Processuale Penale, nullità processuali, pianificazione e protezione patrimoniale, oltre a strategie per l'esecuzione delle decisioni.",
    },
    {
      title: "Dr. Eduardo Torres de Freitas - OAB/SP 478.321",
      description:
        "Opera nel Diritto Penale, Civile, dei Consumatori e Previdenziale, con focus su gestione del rischio, strategia processuale e conduzione attiva di contenziosi complessi.",
    },
    {
      title: "Dra. Melina Carneiro Rizzo - OAB/SP 391.137",
      description:
        "Specialista in Diritto Immobiliare, Penale e Processuale Penale, con esperienza in consulenza e contenzioso immobiliare, due diligence strategica e compliance d'integrità.",
    },
    {
      title: "Dr. Marcio Eduardo Garcia Leite - OAB/SP 257.464",
      description:
        "Attività di rilievo in Diritto del Lavoro, Civile e Amministrativo, con forte esperienza in prevenzione del contenzioso, negoziazione, gestione dei rischi e tutela di interessi aziendali.",
    },
  ],
};

const PROCESS_ROWS_BY_LOCALE: Record<NonDefaultLocale, typeof processRows> = {
  en: [
    "Legal diagnosis and risk mapping",
    "Definition of advisory or litigation strategy",
    "Legal opinions and decision support",
    "Document and contract structuring",
    "Negotiation and management of discussions",
    "Litigation in first-instance courts",
    "Appeals and oral arguments",
    "Post-decision and enforcement follow-up",
  ],
  es: [
    "Diagnóstico jurídico y mapeo de riesgos",
    "Definición de estrategia consultiva o contenciosa",
    "Dictámenes y orientación para la toma de decisiones",
    "Estructuración documental y contractual",
    "Negociación y conducción de tratativas",
    "Actuación contenciosa en primera instancia",
    "Recursos y alegatos orales",
    "Seguimiento posterior a la decisión y ejecución",
  ],
  it: [
    "Diagnosi legale e mappatura dei rischi",
    "Definizione della strategia consulenziale o contenziosa",
    "Pareri legali e supporto decisionale",
    "Strutturazione documentale e contrattuale",
    "Negoziazione e gestione delle trattative",
    "Assistenza nel contenzioso di primo grado",
    "Impugnazioni e discussioni orali",
    "Monitoraggio post-decisione ed esecuzione",
  ],
};

const FAQS_BY_LOCALE: Record<NonDefaultLocale, typeof faqs> = {
  en: [
    {
      question: "How does the first consultation work?",
      answer:
        "The first meeting is focused on fully understanding the case, objectives and risks involved. From there, we present strategic guidance and the recommended scope of work.",
    },
    {
      question: "Does the firm serve both individuals and companies?",
      answer:
        "Yes. We represent individuals and companies with a tailored approach to advisory, preventive and litigation matters.",
    },
    {
      question: "Can I hire only preventive advisory services?",
      answer:
        "Yes. Preventive advisory can be hired independently to reduce risks, structure decisions and avoid future disputes.",
    },
    {
      question: "Do you handle urgent cases and injunctions?",
      answer:
        "Yes. In urgent situations, we assess immediate legal feasibility and structure the necessary action for swift protection of the client's rights.",
    },
    {
      question: "Can consultations be remote?",
      answer:
        "Yes. The firm provides in-person and remote consultations, with continuous follow-up and transparent communication throughout the case.",
    },
    {
      question: "How are fees and scope defined?",
      answer:
        "Fees and scope are set according to complexity, workload and client objectives, always with a clear proposal aligned before engagement starts.",
    },
  ],
  es: [
    {
      question: "¿Cómo funciona la primera consulta?",
      answer:
        "La primera reunión se dedica a comprender de forma integral el caso, los objetivos y los riesgos involucrados. A partir de ello, presentamos una orientación estratégica y el alcance recomendado.",
    },
    {
      question: "¿El despacho atiende a personas físicas y jurídicas?",
      answer:
        "Sí. Actuamos para personas físicas y jurídicas, con un enfoque personalizado para demandas consultivas, preventivas y contenciosas.",
    },
    {
      question: "¿Es posible contratar solo consultoría preventiva?",
      answer:
        "Sí. La consultoría preventiva puede contratarse de forma independiente para reducir riesgos, estructurar decisiones y evitar litigios futuros.",
    },
    {
      question: "¿Actúan en casos urgentes y medidas cautelares?",
      answer:
        "Sí. En situaciones urgentes, evaluamos la viabilidad jurídica inmediata y estructuramos la actuación necesaria para proteger con celeridad los derechos del cliente.",
    },
    {
      question: "¿La atención puede ser remota?",
      answer:
        "Sí. El despacho realiza atenciones presenciales y remotas, con seguimiento continuo y comunicación transparente durante toda la conducción del caso.",
    },
    {
      question: "¿Cómo se definen honorarios y alcance?",
      answer:
        "Honorarios y alcance se definen según complejidad, volumen de trabajo y objetivos del cliente, siempre con propuesta clara y alineada antes del inicio de la actuación.",
    },
  ],
  it: [
    {
      question: "Come funziona la prima consulenza?",
      answer:
        "Il primo incontro è dedicato alla piena comprensione del caso, degli obiettivi e dei rischi coinvolti. Da lì presentiamo un indirizzo strategico e l'ambito di attività raccomandato.",
    },
    {
      question: "Lo studio assiste persone fisiche e aziende?",
      answer:
        "Sì. Assistiamo persone fisiche e giuridiche con un approccio personalizzato per esigenze consulenziali, preventive e contenziose.",
    },
    {
      question: "È possibile contrattare solo consulenza preventiva?",
      answer:
        "Sì. La consulenza preventiva può essere attivata in modo indipendente per ridurre i rischi, strutturare decisioni ed evitare futuri contenziosi.",
    },
    {
      question: "Gestite casi urgenti e misure cautelari?",
      answer:
        "Sì. Nelle situazioni urgenti valutiamo la fattibilità giuridica immediata e strutturiamo l'azione necessaria per una tutela rapida dei diritti del cliente.",
    },
    {
      question: "L'assistenza può essere da remoto?",
      answer:
        "Sì. Lo studio offre assistenza in presenza e da remoto, con monitoraggio continuo e comunicazione trasparente durante tutta la gestione del caso.",
    },
    {
      question: "Come vengono definiti compensi e perimetro?",
      answer:
        "Compensi e perimetro sono definiti in base a complessità, volume di lavoro e obiettivi del cliente, sempre con proposta chiara e condivisa prima dell'avvio.",
    },
  ],
};

const LEGAL_AREAS_SCHEMA_BY_LOCALE: Record<
  NonDefaultLocale,
  typeof legalAreasSchema
> = {
  en: [
    "Civil Law",
    "Family and Succession Law",
    "Tax Law",
    "Real Estate Law",
    "Labor Law",
    "Business Law",
    "Health Law",
    "Administrative Law",
    "International Law",
    "Sports Law",
    "Corporate Criminal Law",
    "Digital Law and Compliance",
  ],
  es: [
    "Derecho Civil",
    "Derecho de Familia y Sucesiones",
    "Derecho Tributario",
    "Derecho Inmobiliario",
    "Derecho Laboral",
    "Derecho Empresarial",
    "Derecho de la Salud",
    "Derecho Administrativo",
    "Derecho Internacional",
    "Derecho Deportivo",
    "Derecho Penal Empresarial",
    "Derecho Digital y Compliance",
  ],
  it: [
    "Diritto Civile",
    "Diritto di Famiglia e Successioni",
    "Diritto Tributario",
    "Diritto Immobiliare",
    "Diritto del Lavoro",
    "Diritto d'Impresa",
    "Diritto Sanitario",
    "Diritto Amministrativo",
    "Diritto Internazionale",
    "Diritto Sportivo",
    "Diritto Penale d'Impresa",
    "Diritto Digitale e Compliance",
  ],
};

const SPECIFIC_SERVICES_BY_LOCALE: Record<
  NonDefaultLocale,
  typeof specificServices
> = {
  en: [
    {
      title: "Health Law",
      description:
        "When private health insurance denies coverage or home care, or the State fails to provide necessary treatment, the firm acts against private operators and public entities with strategy focused on urgent relief and compensation.",
      layoutType: "full_text" as const,
      subCards: [
        {
          title: "Private Health Insurance",
          bullets: [
            "Denied coverage for surgery or prescribed procedures",
            "Denied hospitalization or improper early discharge",
            "Denied oncology or high-complexity treatment",
            "Improper exclusion of required medicines or supplies",
            "Session limits below what was medically prescribed",
            "Coverage denied based on abusive clauses or improper interpretation",
          ],
          href: "/direito-saude#convenio",
          ctaLabel: "Schedule Consultation",
        },
        {
          title: "State-Funded Home Care",
          bullets: [
            "Patient discharged but still dependent on continuous care",
            "Reduced mobility or medically prescribed home hospitalization",
            "State refusal or delay in providing the service",
            "Need for equipment, medication and healthcare team",
            "Children or older adults without adequate care guaranteed by SUS",
            "Urgent relief to secure immediate treatment",
          ],
          href: "/direito-saude#home-care",
          ctaLabel: "Schedule Consultation",
        },
      ],
    },
    {
      title: "Improper Listing Review",
      description:
        "Legal review of banking history for credit denial, limit reduction or financing refusal, with advisory and litigation strategy.",
      href: "/analise-credito",
      ctaLabel: "Access Service",
      disabled: false,
      layoutType: "card" as const,
    },
    {
      title: "Factor K Review",
      description:
        "Legal and technical review of SABESP invoices for companies charged with Factor K, including administrative or judicial challenge strategy and reimbursement claims when applicable.",
      href: "/fator-k",
      ctaLabel: "Access Service",
      disabled: false,
      layoutType: "card" as const,
    },
  ],
  es: [
    {
      title: "Derecho a la Salud",
      description:
        "Cuando un seguro médico niega cobertura u hospitalización domiciliaria, o el Estado no ofrece el tratamiento necesario, el despacho actúa frente a operadoras privadas y poder público, con estrategia orientada a medidas urgentes y reparación de daños.",
      layoutType: "full_text" as const,
      subCards: [
        {
          title: "Seguro Médico",
          bullets: [
            "Negativa de cobertura de cirugía o procedimiento prescrito",
            "Negativa de internación o alta anticipada indebida",
            "Negativa de tratamiento oncológico o de alta complejidad",
            "Exclusión indebida de medicamentos o insumos necesarios",
            "Limitación de sesiones por debajo de lo prescrito",
            "Cobertura rechazada por cláusula abusiva o interpretación indebida",
          ],
          href: "/direito-saude#convenio",
          ctaLabel: "Agendar Consulta",
        },
        {
          title: "Home Care por el Estado",
          bullets: [
            "Paciente con alta hospitalaria que depende de cuidados continuos",
            "Imposibilidad de movilidad o internación domiciliaria prescrita",
            "Estado que niega o retrasa la prestación del servicio",
            "Necesidad de equipos, medicamentos y equipo de salud",
            "Niños o adultos mayores sin atención adecuada garantizada por el SUS",
            "Medida urgente para garantizar atención inmediata",
          ],
          href: "/direito-saude#home-care",
          ctaLabel: "Agendar Consulta",
        },
      ],
    },
    {
      title: "Análisis de Registros Indebidos",
      description:
        "Análisis jurídico del historial bancario para casos de rechazo de crédito, límite o financiación, con estrategia consultiva y contenciosa.",
      href: "/analise-credito",
      ctaLabel: "Acceder al Servicio",
      disabled: false,
      layoutType: "card" as const,
    },
    {
      title: "Revisión de Factor K",
      description:
        "Análisis jurídico y técnico de facturas SABESP para empresas que pagan Factor K, con estrategia de impugnación administrativa o judicial y solicitud de restitución cuando corresponda.",
      href: "/fator-k",
      ctaLabel: "Acceder al Servicio",
      disabled: false,
      layoutType: "card" as const,
    },
  ],
  it: [
    {
      title: "Diritto alla Salute",
      description:
        "Quando l'assicurazione sanitaria nega copertura o assistenza domiciliare, o lo Stato non fornisce il trattamento necessario, lo studio agisce contro operatori privati ed enti pubblici con strategia orientata a misure urgenti e risarcimento.",
      layoutType: "full_text" as const,
      subCards: [
        {
          title: "Assicurazione Sanitaria",
          bullets: [
            "Diniego di copertura per chirurgia o procedura prescritta",
            "Rifiuto del ricovero o dimissione anticipata impropria",
            "Diniego di trattamenti oncologici o ad alta complessità",
            "Esclusione impropria di farmaci o presidi necessari",
            "Limitazione delle sedute al di sotto di quanto prescritto",
            "Copertura negata per clausole abusive o interpretazione impropria",
          ],
          href: "/direito-saude#convenio",
          ctaLabel: "Prenota Consulenza",
        },
        {
          title: "Home Care da Parte dello Stato",
          bullets: [
            "Paziente dimesso ma dipendente da assistenza continuativa",
            "Impossibilità di mobilità o ricovero domiciliare prescritto",
            "Stato che nega o ritarda l'erogazione del servizio",
            "Necessità di dispositivi, farmaci e team sanitario",
            "Bambini o anziani senza assistenza adeguata garantita dal SUS",
            "Tutela urgente per garantire assistenza immediata",
          ],
          href: "/direito-saude#home-care",
          ctaLabel: "Prenota Consulenza",
        },
      ],
    },
    {
      title: "Analisi di Segnalazioni Indebite",
      description:
        "Analisi legale dello storico bancario in caso di rifiuto del credito, riduzione del limite o diniego di finanziamento, con strategia consulenziale e contenziosa.",
      href: "/analise-credito",
      ctaLabel: "Vai al Servizio",
      disabled: false,
      layoutType: "card" as const,
    },
    {
      title: "Revisione del Fattore K",
      description:
        "Analisi legale e tecnica delle fatture SABESP per aziende che pagano il Fattore K, con strategia di impugnazione amministrativa o giudiziale e richiesta di rimborso quando applicabile.",
      href: "/fator-k",
      ctaLabel: "Vai al Servizio",
      disabled: false,
      layoutType: "card" as const,
    },
  ],
};

type HomeTextCopy = {
  heroTitle: string;
  heroDescription: string;
  heroCta: string;
  heroImageAlt: string;
  teamLabel: string;
  teamTitle: string;
  studioLabel: string;
  studioTitle: string;
  studioDescription: string;
  studioImageAlt: string;
  studioPillars: [string, string, string, string, string];
  processLabel: string;
  processTitle: string;
  consultingTitle: string;
  consultingDescription: string;
  consultingCta: string;
  fullActingTitle: string;
  fullActingDescription: string;
  fullActingCta: string;
  sectorsLabel: string;
  sectorsTitle: string;
  sectorCard1Title: string;
  sectorCard1Description: string;
  sectorPatrimonialLabel: string;
  sectorPatrimonialTitle: string;
  sectorPlanningLabel: string;
  sectorPlanningTitle: string;
  sectorCard3Title: string;
  sectorCard3Description: string;
  sectorRegulatedLabel: string;
  sectorRegulatedTitle: string;
  sectorInternationalLabel: string;
  sectorInternationalTitle: string;
  sectorRiskLabel: string;
  sectorRiskTitle: string;
  sectorClosingTitle: string;
  sectorClosingDescription: string;
  specificServicesLabel: string;
  specificServicesTitle: string;
  specificServicesDescription: string;
  faqTitle: string;
  finalLabel: string;
  finalTitle: string;
  finalDescription: string;
};

const HOME_TEXT_BY_LOCALE: Record<AppLocale, HomeTextCopy> = {
  pt: {
    heroTitle: "Assessoria jurídica com estratégia, discrição e precisão técnica",
    heroDescription:
      "Atuação consultiva e contenciosa para pessoas físicas e jurídicas, com foco em proteção patrimonial, mitigação de riscos e defesa qualificada de interesses relevantes.",
    heroCta: "Agendar Consulta",
    heroImageAlt: "Representação institucional do escritório",
    teamLabel: "Equipe",
    teamTitle: "Advogados com formação sólida e atuação multidisciplinar",
    studioLabel: "Escritório",
    studioTitle:
      "Excelência técnica com visão estratégica para decisões de alta relevância",
    studioDescription:
      "Nossa atuação combina rigor jurídico, discrição absoluta e atendimento personalizado para transformar complexidade em soluções seguras, eficazes e sustentáveis.",
    studioImageAlt: "Posicionamento institucional do escritório",
    studioPillars: [
      "Rigor técnico",
      "Estratégia processual",
      "Discrição absoluta",
      "Atendimento personalizado",
      "Visão multidisciplinar",
    ],
    processLabel: "Modelos de Atuação",
    processTitle: "Escolha o nível de acompanhamento jurídico que seu caso exige",
    consultingTitle: "Consultoria e Prevenção",
    consultingDescription:
      "Ideal para quem busca orientação estratégica, prevenção de passivos e estruturação jurídica antes do litígio.",
    consultingCta: "Falar com a Equipe",
    fullActingTitle: "Atuação Completa",
    fullActingDescription:
      "Recomendado para casos que exigem condução integral, da estratégia inicial à atuação contenciosa e fase de execução.",
    fullActingCta: "Agendar Consulta",
    sectorsLabel: "Áreas de Atuação",
    sectorsTitle: "Atuação jurídica abrangente em 12 frentes estratégicas",
    sectorCard1Title: "Direito Civil e Direito de Família e Sucessões.",
    sectorCard1Description:
      "Contratos, responsabilidade civil, inventários e planejamento patrimonial familiar.",
    sectorPatrimonialLabel: "Frente Patrimonial",
    sectorPatrimonialTitle: "Direito Tributário + Direito Imobiliário",
    sectorPlanningLabel: "Planejamento",
    sectorPlanningTitle: "Estruturas e proteção de ativos",
    sectorCard3Title: "Direito Trabalhista e Direito Empresarial.",
    sectorCard3Description:
      "Consultoria preventiva, contratos estratégicos e defesa em litígios de alta exposição.",
    sectorRegulatedLabel: "Setores Regulados",
    sectorRegulatedTitle: "Direito da Saúde + Direito Administrativo",
    sectorInternationalLabel: "Âmbito Internacional",
    sectorInternationalTitle: "Direito Internacional + Direito Desportivo",
    sectorRiskLabel: "Risco e Integridade",
    sectorRiskTitle: "Direito Penal Empresarial + Direito Digital e Compliance",
    sectorClosingTitle:
      "Atuação consultiva e contenciosa com estratégia sob medida para cada cliente.",
    sectorClosingDescription:
      "Pessoas físicas, famílias e empresas com demandas de alta complexidade.",
    specificServicesLabel: "Serviços Específicos",
    specificServicesTitle: "Soluções dedicadas para demandas jurídicas específicas",
    specificServicesDescription:
      "Conheça frentes específicas de atuação com escopo claro, abordagem técnica e acompanhamento estratégico.",
    faqTitle: "Perguntas frequentes antes do início da atuação jurídica",
    finalLabel: "Agende Sua Consulta",
    finalTitle: "Fale com uma equipe preparada para decisões jurídicas estratégicas",
    finalDescription:
      "Se você precisa de consultoria preventiva ou representação contenciosa, estruturamos a atuação ideal para proteger seus interesses com segurança jurídica.",
  },
  en: {
    heroTitle: "Legal advisory with strategy, discretion and technical precision",
    heroDescription:
      "Advisory and litigation services for individuals and companies, focused on asset protection, risk mitigation and qualified legal defense for high-stakes matters.",
    heroCta: "Schedule Consultation",
    heroImageAlt: "Institutional representation of the law firm",
    teamLabel: "Team",
    teamTitle: "Lawyers with strong academic training and multidisciplinary practice",
    studioLabel: "Firm",
    studioTitle:
      "Technical excellence with strategic vision for high-relevance decisions",
    studioDescription:
      "Our practice combines legal rigor, absolute discretion and personalized service to turn complexity into safe, effective and sustainable solutions.",
    studioImageAlt: "Institutional positioning of the law firm",
    studioPillars: [
      "Technical rigor",
      "Procedural strategy",
      "Absolute discretion",
      "Personalized service",
      "Multidisciplinary vision",
    ],
    processLabel: "Engagement Models",
    processTitle: "Choose the level of legal support your case requires",
    consultingTitle: "Advisory and Prevention",
    consultingDescription:
      "Ideal for those seeking strategic guidance, liability prevention and legal structuring before litigation.",
    consultingCta: "Talk to the Team",
    fullActingTitle: "Full Representation",
    fullActingDescription:
      "Recommended for matters that require end-to-end handling, from initial strategy to litigation and enforcement.",
    fullActingCta: "Schedule Consultation",
    sectorsLabel: "Practice Areas",
    sectorsTitle: "Comprehensive legal practice across 12 strategic fronts",
    sectorCard1Title: "Civil Law and Family & Succession Law.",
    sectorCard1Description:
      "Contracts, civil liability, probate and family wealth planning.",
    sectorPatrimonialLabel: "Asset Front",
    sectorPatrimonialTitle: "Tax Law + Real Estate Law",
    sectorPlanningLabel: "Planning",
    sectorPlanningTitle: "Structures and asset protection",
    sectorCard3Title: "Labor Law and Business Law.",
    sectorCard3Description:
      "Preventive advisory, strategic contracts and defense in high-exposure disputes.",
    sectorRegulatedLabel: "Regulated Sectors",
    sectorRegulatedTitle: "Health Law + Administrative Law",
    sectorInternationalLabel: "International Scope",
    sectorInternationalTitle: "International Law + Sports Law",
    sectorRiskLabel: "Risk and Integrity",
    sectorRiskTitle: "Corporate Criminal Law + Digital Law and Compliance",
    sectorClosingTitle:
      "Advisory and litigation services with strategy tailored to each client.",
    sectorClosingDescription:
      "Individuals, families and companies with high-complexity demands.",
    specificServicesLabel: "Specific Services",
    specificServicesTitle: "Dedicated solutions for specific legal demands",
    specificServicesDescription:
      "Explore focused legal services with clear scope, technical approach and strategic follow-up.",
    faqTitle: "Frequently asked questions before legal representation starts",
    finalLabel: "Schedule Your Consultation",
    finalTitle: "Speak with a team prepared for strategic legal decisions",
    finalDescription:
      "If you need preventive advisory or litigation representation, we structure the ideal approach to protect your interests with legal certainty.",
  },
  es: {
    heroTitle: "Asesoría jurídica con estrategia, discreción y precisión técnica",
    heroDescription:
      "Actuación consultiva y contenciosa para personas y empresas, con foco en protección patrimonial, mitigación de riesgos y defensa cualificada de intereses relevantes.",
    heroCta: "Agendar Consulta",
    heroImageAlt: "Representación institucional del despacho",
    teamLabel: "Equipo",
    teamTitle: "Abogados con formación sólida y actuación multidisciplinaria",
    studioLabel: "Despacho",
    studioTitle:
      "Excelencia técnica con visión estratégica para decisiones de alta relevancia",
    studioDescription:
      "Nuestra actuación combina rigor jurídico, discreción absoluta y atención personalizada para transformar complejidad en soluciones seguras, eficaces y sostenibles.",
    studioImageAlt: "Posicionamiento institucional del despacho",
    studioPillars: [
      "Rigor técnico",
      "Estrategia procesal",
      "Discreción absoluta",
      "Atención personalizada",
      "Visión multidisciplinaria",
    ],
    processLabel: "Modelos de Actuación",
    processTitle: "Elija el nivel de acompañamiento jurídico que su caso exige",
    consultingTitle: "Consultoría y Prevención",
    consultingDescription:
      "Ideal para quienes buscan orientación estratégica, prevención de pasivos y estructuración jurídica antes del litigio.",
    consultingCta: "Hablar con el Equipo",
    fullActingTitle: "Actuación Completa",
    fullActingDescription:
      "Recomendado para casos que exigen conducción integral, desde la estrategia inicial hasta la actuación contenciosa y etapa de ejecución.",
    fullActingCta: "Agendar Consulta",
    sectorsLabel: "Áreas de Actuación",
    sectorsTitle: "Actuación jurídica integral en 12 frentes estratégicos",
    sectorCard1Title: "Derecho Civil y Derecho de Familia y Sucesiones.",
    sectorCard1Description:
      "Contratos, responsabilidad civil, sucesiones y planificación patrimonial familiar.",
    sectorPatrimonialLabel: "Frente Patrimonial",
    sectorPatrimonialTitle: "Derecho Tributario + Derecho Inmobiliario",
    sectorPlanningLabel: "Planificación",
    sectorPlanningTitle: "Estructuras y protección de activos",
    sectorCard3Title: "Derecho Laboral y Derecho Empresarial.",
    sectorCard3Description:
      "Consultoría preventiva, contratos estratégicos y defensa en litigios de alta exposición.",
    sectorRegulatedLabel: "Sectores Regulados",
    sectorRegulatedTitle: "Derecho de la Salud + Derecho Administrativo",
    sectorInternationalLabel: "Ámbito Internacional",
    sectorInternationalTitle: "Derecho Internacional + Derecho Deportivo",
    sectorRiskLabel: "Riesgo e Integridad",
    sectorRiskTitle: "Derecho Penal Empresarial + Derecho Digital y Compliance",
    sectorClosingTitle:
      "Actuación consultiva y contenciosa con estrategia a medida para cada cliente.",
    sectorClosingDescription:
      "Personas físicas, familias y empresas con demandas de alta complejidad.",
    specificServicesLabel: "Servicios Específicos",
    specificServicesTitle: "Soluciones dedicadas para demandas jurídicas específicas",
    specificServicesDescription:
      "Conozca frentes específicas de actuación con alcance claro, enfoque técnico y seguimiento estratégico.",
    faqTitle: "Preguntas frecuentes antes del inicio de la actuación jurídica",
    finalLabel: "Agende Su Consulta",
    finalTitle: "Hable con un equipo preparado para decisiones jurídicas estratégicas",
    finalDescription:
      "Si necesita consultoría preventiva o representación contenciosa, estructuramos la actuación ideal para proteger sus intereses con seguridad jurídica.",
  },
  it: {
    heroTitle: "Consulenza legale con strategia, discrezione e precisione tecnica",
    heroDescription:
      "Attività consulenziale e contenziosa per persone e imprese, con focus su protezione patrimoniale, mitigazione dei rischi e tutela qualificata di interessi rilevanti.",
    heroCta: "Prenota Consulenza",
    heroImageAlt: "Rappresentazione istituzionale dello studio",
    teamLabel: "Team",
    teamTitle: "Avvocati con formazione solida e attività multidisciplinare",
    studioLabel: "Studio",
    studioTitle:
      "Eccellenza tecnica con visione strategica per decisioni di alta rilevanza",
    studioDescription:
      "La nostra attività unisce rigore giuridico, discrezione assoluta e assistenza personalizzata per trasformare la complessità in soluzioni sicure, efficaci e sostenibili.",
    studioImageAlt: "Posizionamento istituzionale dello studio",
    studioPillars: [
      "Rigore tecnico",
      "Strategia processuale",
      "Discrezione assoluta",
      "Assistenza personalizzata",
      "Visione multidisciplinare",
    ],
    processLabel: "Modelli di Assistenza",
    processTitle: "Scegli il livello di assistenza legale richiesto dal tuo caso",
    consultingTitle: "Consulenza e Prevenzione",
    consultingDescription:
      "Ideale per chi cerca orientamento strategico, prevenzione delle passività e strutturazione giuridica prima del contenzioso.",
    consultingCta: "Parla con il Team",
    fullActingTitle: "Assistenza Completa",
    fullActingDescription:
      "Consigliata per casi che richiedono conduzione integrale, dalla strategia iniziale al contenzioso e alla fase esecutiva.",
    fullActingCta: "Prenota Consulenza",
    sectorsLabel: "Aree di Attività",
    sectorsTitle: "Attività legale completa in 12 fronti strategici",
    sectorCard1Title: "Diritto Civile e Diritto di Famiglia e Successioni.",
    sectorCard1Description:
      "Contratti, responsabilità civile, successioni e pianificazione patrimoniale familiare.",
    sectorPatrimonialLabel: "Area Patrimoniale",
    sectorPatrimonialTitle: "Diritto Tributario + Diritto Immobiliare",
    sectorPlanningLabel: "Pianificazione",
    sectorPlanningTitle: "Strutture e protezione degli asset",
    sectorCard3Title: "Diritto del Lavoro e Diritto d'Impresa.",
    sectorCard3Description:
      "Consulenza preventiva, contratti strategici e difesa in contenziosi ad alta esposizione.",
    sectorRegulatedLabel: "Settori Regolati",
    sectorRegulatedTitle: "Diritto Sanitario + Diritto Amministrativo",
    sectorInternationalLabel: "Ambito Internazionale",
    sectorInternationalTitle: "Diritto Internazionale + Diritto Sportivo",
    sectorRiskLabel: "Rischio e Integrità",
    sectorRiskTitle: "Diritto Penale d'Impresa + Diritto Digitale e Compliance",
    sectorClosingTitle:
      "Attività consulenziale e contenziosa con strategia su misura per ogni cliente.",
    sectorClosingDescription:
      "Persone, famiglie e imprese con esigenze di alta complessità.",
    specificServicesLabel: "Servizi Specifici",
    specificServicesTitle: "Soluzioni dedicate per esigenze legali specifiche",
    specificServicesDescription:
      "Scopri linee di attività specifiche con ambito chiaro, approccio tecnico e monitoraggio strategico.",
    faqTitle: "Domande frequenti prima dell'avvio dell'assistenza legale",
    finalLabel: "Prenota la Tua Consulenza",
    finalTitle: "Parla con un team preparato per decisioni legali strategiche",
    finalDescription:
      "Se hai bisogno di consulenza preventiva o rappresentanza contenziosa, strutturiamo l'approccio ideale per proteggere i tuoi interessi con certezza giuridica.",
  },
};

const whatsappPhone = process.env.WHATSAPP_PHONE_NUMBER ?? "";
const MSG_CONSULTA_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Olá! Gostaria de agendar uma consulta com a equipe da FUSTINONI ADVOCACIA.",
  en: "Hello! I would like to schedule a consultation with the FUSTINONI ADVOCACIA team.",
  es: "¡Hola! Me gustaría agendar una consulta con el equipo de FUSTINONI ADVOCACIA.",
  it: "Buongiorno! Vorrei fissare una consulenza con il team di FUSTINONI ADVOCACIA.",
};

const MSG_CONSULTORIA_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Olá! Quero falar com a equipe da FUSTINONI ADVOCACIA sobre meu caso.",
  en: "Hello! I want to talk to the FUSTINONI ADVOCACIA team about my case.",
  es: "¡Hola! Quiero hablar con el equipo de FUSTINONI ADVOCACIA sobre mi caso.",
  it: "Buongiorno! Vorrei parlare con il team di FUSTINONI ADVOCACIA del mio caso.",
};

const MSG_SAUDE_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Olá! Gostaria de agendar uma consulta sobre Direito à Saúde (convênio médico ou home care).",
  en: "Hello! I would like to schedule a consultation on Health Law (insurance coverage or home care).",
  es: "¡Hola! Me gustaría agendar una consulta sobre Derecho a la Salud (seguro médico u hospitalización domiciliaria).",
  it: "Buongiorno! Vorrei fissare una consulenza su Diritto alla Salute (assicurazione sanitaria o assistenza domiciliare).",
};

const SCHEMA_LANGUAGE_BY_LOCALE: Record<AppLocale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
  it: "it",
};

const SCHEMA_LANGUAGE_LABEL_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Portuguese",
  en: "English",
  es: "Spanish",
  it: "Italian",
};

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const msgConsulta = MSG_CONSULTA_BY_LOCALE[locale];
  const msgConsultoria = MSG_CONSULTORIA_BY_LOCALE[locale];
  const msgSaude = MSG_SAUDE_BY_LOCALE[locale];
  const text = HOME_TEXT_BY_LOCALE[locale];
  const localizedPracticeAreas =
    locale === "pt" ? practiceAreas : PRACTICE_AREAS_BY_LOCALE[locale];
  const localizedServiceHighlights =
    locale === "pt"
      ? serviceHighlights
      : SERVICE_HIGHLIGHTS_BY_LOCALE[locale];
  const localizedProcessRows =
    locale === "pt" ? processRows : PROCESS_ROWS_BY_LOCALE[locale];
  const localizedFaqs = locale === "pt" ? faqs : FAQS_BY_LOCALE[locale];
  const localizedLegalAreas =
    locale === "pt" ? legalAreasSchema : LEGAL_AREAS_SCHEMA_BY_LOCALE[locale];
  const localizedSpecificServices =
    locale === "pt" ? specificServices : SPECIFIC_SERVICES_BY_LOCALE[locale];
  const pageDescription = HOME_DESCRIPTION_BY_LOCALE[locale];
  const siteUrl = getSiteUrl();
  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    name: SITE_NAME,
    url: siteUrl,
    description: pageDescription,
    image: `${siteUrl}${SITE_OG_IMAGE}`,
    areaServed: "BR",
    availableLanguage: [SCHEMA_LANGUAGE_BY_LOCALE[locale]],
    serviceType: localizedLegalAreas,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
      addressRegion: "SP",
      addressLocality: "São Paulo",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: SCHEMA_LANGUAGE_LABEL_BY_LOCALE[locale],
    },
    employee: [
      {
        "@type": "Person",
        name: "Dr. Tiago Sales Fustinoni",
        jobTitle: "Advogado",
        description: "OAB/SP 395.178",
      },
      {
        "@type": "Person",
        name: "Dr. Eduardo Torres de Freitas",
        jobTitle: "Advogado",
        description: "OAB/SP 478.321",
      },
      {
        "@type": "Person",
        name: "Dra. Melina Carneiro Rizzo",
        jobTitle: "Advogada",
        description: "OAB/SP 391.137",
      },
      {
        "@type": "Person",
        name: "Dr. Marcio Eduardo Garcia Leite",
        jobTitle: "Advogado",
        description: "OAB/SP 257.464",
      },
    ],
  };
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative flex flex-col items-center overflow-hidden border-b border-black/15 px-4 pt-16 pb-10 text-center sm:px-6 sm:pt-20 sm:pb-12 md:px-10 md:pt-24">
        <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/70">
          FUSTINONI ADVOCACIA
        </div>

        <h1 className="mb-8 max-w-4xl text-balance font-serif text-4xl leading-[0.9] tracking-tight sm:mb-10 sm:text-5xl md:text-6xl lg:text-7xl">
          {text.heroTitle}
        </h1>

        <p className="mb-10 max-w-2xl text-sm leading-7 text-black/65 sm:text-base">
          {text.heroDescription}
        </p>

        <WhatsAppCTAButton
          whatsappPhone={whatsappPhone}
          whatsappBaseMessage={msgConsulta}
          className="z-10 mb-12 w-full max-w-xs rounded-none bg-black px-8 py-5 text-sm uppercase tracking-wider text-white hover:bg-black/80 sm:mb-16 sm:w-auto sm:py-6"
        >
          {text.heroCta}
        </WhatsAppCTAButton>

        <div className="relative z-0 mx-auto mt-4 w-full max-w-4xl">
          <Image
            src="/hero-courthouse-notext.png"
            alt={text.heroImageAlt}
            width={1600}
            height={900}
            priority
            sizes="(max-width: 768px) 100vw, 1024px"
            className="h-auto w-full object-contain mix-blend-multiply contrast-125"
          />
        </div>
      </section>

      <div className="grid grid-cols-2 border-b border-black/15 md:grid-cols-6">
        {localizedPracticeAreas.map((area, index) => (
          <div
            key={area}
            className={`flex items-center justify-center border-black/15 py-5 text-center font-serif text-sm font-semibold md:text-base ${
              index !== localizedPracticeAreas.length - 1 ? "border-r" : ""
            } ${index % 2 !== 0 ? "border-r-0 md:border-r" : ""}`}
          >
            {area}
          </div>
        ))}
      </div>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <section id="services" className="scroll-mt-24 border-b border-black/15 sm:scroll-mt-28">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 md:px-20 md:py-24">
          <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/70">
            {text.teamLabel}
          </div>
          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {text.teamTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 border-t border-black/15 md:grid-cols-2">
          {localizedServiceHighlights.map((service, index) => {
            return (
              <div
                key={service.title}
                className={`p-6 transition-colors hover:bg-neutral-50 sm:p-8 md:p-10 ${
                  index === 0 ? "border-b border-black/15 md:border-r md:border-b-0" : ""
                } ${index === 2 ? "border-t border-black/15 md:border-r" : ""} ${
                  index === 3 ? "border-t border-black/15" : ""
                }`}
              >
                <div className="mb-8 flex items-center gap-3 border-b border-black/15 pb-4">
                  <h3 className="font-serif text-xl sm:text-2xl">{service.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-black/70 md:text-base">{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <section id="studio" className="scroll-mt-24 border-b border-black/15 sm:scroll-mt-28">
        <div className="px-4 py-16 text-center sm:px-6 sm:py-20">
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
            {text.studioLabel}
          </div>
          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {text.studioTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-black/70 sm:text-base">
            {text.studioDescription}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-2xl px-4 pb-8 sm:px-6 sm:pb-10">
          <Image
            src="/studio-elements-sketch.png"
            alt={text.studioImageAlt}
            width={1200}
            height={1200}
            className="h-auto w-full mix-blend-multiply contrast-125"
          />
        </div>

        <div className="grid w-full grid-cols-2 border-t border-black/15 text-center text-sm font-medium sm:grid-cols-3 md:grid-cols-5 md:text-base">
          <div className="border-r border-b border-black/15 py-4 md:border-b-0">{text.studioPillars[0]}</div>
          <div className="border-b border-black/15 py-4 sm:border-r md:border-b-0">{text.studioPillars[1]}</div>
          <div className="border-r border-b border-black/15 py-4 md:border-r md:border-b-0">{text.studioPillars[2]}</div>
          <div className="border-b border-black/15 py-4 sm:border-r sm:border-b-0 md:border-r">{text.studioPillars[3]}</div>
          <div className="col-span-2 py-4 sm:col-span-1">{text.studioPillars[4]}</div>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <section id="process" className="scroll-mt-24 border-b border-black/15 sm:scroll-mt-28">
        <div className="border-b border-black/15 px-4 py-16 text-center sm:px-6 sm:py-20">
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
            {text.processLabel}
          </div>
          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {text.processTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col border-b border-black/15 md:border-r md:border-b-0">
            <div className="flex-1 p-6 sm:p-8 lg:p-12">
              <h3 className="mb-4 font-serif text-2xl">{text.consultingTitle}</h3>
              <p className="mb-8 leading-relaxed text-black/70">
                {text.consultingDescription}
              </p>
              <WhatsAppCTAButton
                whatsappPhone={whatsappPhone}
                whatsappBaseMessage={msgConsultoria}
                className="w-full rounded-none bg-black py-6 text-xs uppercase tracking-wider text-white hover:bg-black/80"
              >
                {text.consultingCta}
              </WhatsAppCTAButton>
            </div>

            <div className="border-t border-black/15">
              {localizedProcessRows.map((label, index) => (
                <div key={label} className="grid grid-cols-[1fr_2.75rem] border-b border-black/15 last:border-b-0 sm:grid-cols-[1fr_4rem]">
                  <div className="border-r border-black/15 p-3 text-sm leading-relaxed text-black/70 sm:p-4">{label}</div>
                  <div className="flex items-center justify-center bg-neutral-50 p-3 sm:p-4">
                    {index < 5 ? <Plus className="h-4 w-4 text-black/60" /> : <X className="h-4 w-4 text-black/60" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 p-6 sm:p-8 lg:p-12">
              <h3 className="mb-4 font-serif text-2xl">{text.fullActingTitle}</h3>
              <p className="mb-8 leading-relaxed text-black/70">
                {text.fullActingDescription}
              </p>
              <WhatsAppCTAButton
                whatsappPhone={whatsappPhone}
                whatsappBaseMessage={msgConsulta}
                className="w-full rounded-none bg-black py-6 text-xs uppercase tracking-wider text-white hover:bg-black/80"
              >
                {text.fullActingCta}
              </WhatsAppCTAButton>
            </div>

            <div className="border-t border-black/15">
              {localizedProcessRows.map(label => (
                <div key={label} className="grid grid-cols-[1fr_2.75rem] border-b border-black/15 last:border-b-0 sm:grid-cols-[1fr_4rem]">
                  <div className="border-r border-black/15 p-3 text-sm leading-relaxed text-black/70 sm:p-4">{label}</div>
                  <div className="flex items-center justify-center bg-neutral-50 p-3 sm:p-4">
                    <Plus className="h-4 w-4 text-black/60" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <section id="sectors" className="scroll-mt-24 border-b border-black/15 sm:scroll-mt-28">
        <div className="border-b border-black/15 px-4 py-16 text-center sm:px-6 sm:py-20">
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
            {text.sectorsLabel}
          </div>
          <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {text.sectorsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between border-b border-black/15 p-6 sm:p-8 lg:border-r">
            <h3 className="mb-10 font-serif text-xl leading-snug sm:mb-16 sm:text-2xl">
              {text.sectorCard1Title}
            </h3>
            <div className="text-sm font-medium">{text.sectorCard1Description}</div>
          </div>

          <div className="grid grid-rows-2 border-b border-black/15 lg:border-r">
            <div className="flex items-center justify-center border-b border-black/15 p-6 sm:p-8">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-black/70">{text.sectorPatrimonialLabel}</div>
                <div className="mt-3 font-serif text-3xl sm:text-4xl">{text.sectorPatrimonialTitle}</div>
              </div>
            </div>
            <div className="flex flex-col justify-end bg-neutral-50 p-6 sm:p-8">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-black/70">{text.sectorPlanningLabel}</div>
              <div className="font-serif text-3xl sm:text-4xl">{text.sectorPlanningTitle}</div>
            </div>
          </div>

          <div className="flex flex-col justify-between border-b border-black/15 bg-white p-6 sm:p-8 lg:border-b-0">
            <h3 className="mb-10 font-serif text-xl leading-snug sm:mb-16 sm:text-2xl">
              {text.sectorCard3Title}
            </h3>
            <div className="text-sm font-medium">{text.sectorCard3Description}</div>
          </div>

          <div className="flex flex-col justify-end bg-neutral-50 p-6 sm:p-8 md:border-r md:border-black/15">
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-black/70">{text.sectorRegulatedLabel}</div>
            <div className="font-serif text-3xl sm:text-4xl">{text.sectorRegulatedTitle}</div>
          </div>

          <div className="grid grid-rows-2 md:border-r md:border-black/15">
            <div className="flex items-center justify-center border-b border-black/15 p-6 sm:p-8">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-black/70">{text.sectorInternationalLabel}</div>
                <div className="mt-3 font-serif text-3xl sm:text-4xl">{text.sectorInternationalTitle}</div>
              </div>
            </div>
            <div className="flex flex-col justify-end bg-neutral-50 p-6 sm:p-8">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-black/70">{text.sectorRiskLabel}</div>
              <div className="font-serif text-3xl sm:text-4xl">{text.sectorRiskTitle}</div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8">
            <h3 className="mb-10 font-serif text-xl leading-snug sm:mb-16 sm:text-2xl">
              {text.sectorClosingTitle}
            </h3>
            <div className="text-sm font-medium">{text.sectorClosingDescription}</div>
          </div>
        </div>
      </section>

      <section id="specific-services" className="scroll-mt-24 border-b border-black/15 sm:scroll-mt-28">
        <div className="border-b border-black/15 px-4 py-16 text-center sm:px-6 sm:py-20">
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/70">
            {text.specificServicesLabel}
          </div>
          <h2 className="mx-auto max-w-3xl font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {text.specificServicesTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-black/70 sm:text-base">
            {text.specificServicesDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 border-b border-black/15 md:grid-cols-2">
          {localizedSpecificServices
            .filter(service => service.layoutType === "card")
            .map((service, index) => (
              <article
                key={service.title}
                className={`flex flex-col p-6 sm:p-8 ${index === 0 ? "border-b border-black/15 md:border-r md:border-b-0" : ""}`}
              >
                <div className="flex-1">
                  <h3 className="mb-4 font-serif text-2xl leading-tight">{service.title}</h3>
                  <p className="mb-8 text-sm leading-7 text-black/70 sm:text-base">{service.description}</p>
                </div>

                {service.href && !service.disabled ? (
                  <Button asChild className="w-full rounded-none bg-black py-6 text-xs uppercase tracking-wider text-white hover:bg-black/80">
                    <Link href={service.href as "/analise-credito" | "/fator-k"}>
                      {service.ctaLabel}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="w-full rounded-none border border-black/20 bg-neutral-200 py-6 text-xs uppercase tracking-wider text-black/60 hover:bg-neutral-200"
                  >
                    {service.ctaLabel}
                  </Button>
                )}
              </article>

            ))}
        </div>

        {localizedSpecificServices
          .filter(service => service.layoutType === "full_text")
          .map(service => (
            <article key={service.title} className="border-t border-black/15 px-6 py-12 text-center sm:px-8 sm:py-16 md:px-10">
              <h3 className="mb-4 font-serif text-2xl leading-tight sm:text-3xl">{service.title}</h3>
              <p className="mx-auto mb-10 max-w-2xl text-sm leading-7 text-black/70 sm:text-base">{service.description}</p>
              {"subCards" in service && service.subCards && (
                <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
                  {service.subCards.map(sub => (
                    <div key={sub.title} className="flex flex-col justify-between border border-black/15 p-5 sm:p-6">
                      <div>
                        <h4 className="mb-3 font-serif text-xl leading-snug">{sub.title}</h4>
                        <ul className="mb-6 space-y-2">
                          {sub.bullets.map(bullet => (
                            <li key={bullet} className="flex items-start gap-2 text-sm leading-6 text-black/70">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-black/30" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <WhatsAppCTAButton
                        whatsappPhone={whatsappPhone}
                        whatsappBaseMessage={msgSaude}
                        className="w-full rounded-none bg-black py-5 text-xs uppercase tracking-wider text-white hover:bg-black/80"
                      >
                        {sub.ctaLabel}
                      </WhatsAppCTAButton>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <section id="faq" className="scroll-mt-24 grid grid-cols-1 border-b border-black/15 sm:scroll-mt-28 lg:grid-cols-2">
        <div className="flex flex-col justify-center border-b border-black/15 p-8 sm:p-12 lg:border-r lg:border-b-0 lg:p-20">
          <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/70">FAQ</div>
          <h2 className="max-w-sm font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {text.faqTitle}
          </h2>
        </div>

        <div className="flex flex-col">
          <Accordion type="single" collapsible className="w-full">
            {localizedFaqs.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`} className="border-b border-black/15 px-5 py-2 last:border-b-0 sm:px-8">
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
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <section className="flex flex-col items-center overflow-hidden border-b border-black/15 px-4 pt-16 text-center sm:px-6 sm:pt-20 md:pt-24">
        <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/70">
          {text.finalLabel}
        </div>

        <h2 className="mx-auto mb-10 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {text.finalTitle}
        </h2>

        <p className="mb-10 max-w-2xl text-sm leading-7 text-black/70 sm:text-base">
          {text.finalDescription}
        </p>

        <WhatsAppCTAButton
          whatsappPhone={whatsappPhone}
          whatsappBaseMessage={msgConsulta}
          className="z-10 mb-10 w-full max-w-xs rounded-none bg-black px-8 py-5 text-sm uppercase tracking-wider text-white hover:bg-black/80 sm:w-auto sm:py-6"
        >
          {text.heroCta}
        </WhatsAppCTAButton>

        <div className="relative top-1 mt-auto w-full">
          <Image
            src="/footer-meeting-sketch.png"
            alt={text.heroImageAlt}
            width={1600}
            height={700}
            className="h-auto w-full max-h-[400px] object-cover object-bottom mix-blend-multiply opacity-90 contrast-125"
          />
        </div>
      </section>
    </>
  );
}
