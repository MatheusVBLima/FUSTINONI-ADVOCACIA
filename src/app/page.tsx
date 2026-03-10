import Image from "next/image";
import { Plus, X } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE, getSiteUrl } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const practiceAreas = [
  "Contencioso Estrategico",
  "Consultoria Empresarial",
  "Patrimonio e Sucessoes",
  "Direito Penal Empresarial",
  "Direito Imobiliario",
  "Compliance e Direito Digital",
];

const serviceHighlights = [
  {
    title: "Dr. Tiago Sales Fustinoni - OAB/SP 395.178",
    description:
      "Fundador do escritorio, com atuacao em Direito Penal e Processual Penal, nulidades processuais, planejamento e protecao patrimonial, alem de estrategias para satisfacao de execucao.",
  },
  {
    title: "Dr. Eduardo Torres de Freitas - OAB/SP 478.321",
    description:
      "Atua em Direito Penal, Civil, Consumidor e Previdenciario, com foco em gestao de riscos, estrategia processual e conducao ativa de litigios de alta complexidade.",
  },
  {
    title: "Dra. Melina Carneiro Rizzo - OAB/SP 391.137",
    description:
      "Especialista em Direito Imobiliario, Penal e Processual Penal, com experiencia em consultivo e contencioso imobiliario, due diligence estrategica e compliance de integridade.",
  },
  {
    title: "Dr. Marcio Eduardo Garcia Leite - OAB/SP 257.464",
    description:
      "Atuacao destacada em Direito Trabalhista, Civil e Administrativo, com forte experiencia em prevencao de litigios, negociacao, gestao de riscos e defesa de interesses corporativos.",
  },
];

const processRows = [
  "Diagnostico juridico e mapeamento de riscos",
  "Definicao de estrategia consultiva ou contenciosa",
  "Pareceres e orientacao para tomada de decisao",
  "Estruturacao documental e contratual",
  "Negociacao e conducao de tratativas",
  "Atuacao contenciosa em primeira instancia",
  "Recursos e sustentacoes orais",
  "Acompanhamento pos-decisao e execucao",
];

const faqs = [
  {
    question: "Como funciona a primeira consulta?",
    answer:
      "A primeira reuniao e dedicada ao entendimento completo do caso, dos objetivos e dos riscos envolvidos. A partir disso, apresentamos um direcionamento estrategico e o escopo recomendado.",
  },
  {
    question: "O escritorio atende pessoas fisicas e empresas?",
    answer:
      "Sim. Atuamos para pessoas, familias e empresas, com abordagem personalizada para demandas consultivas, preventivas e contenciosas.",
  },
  {
    question: "E possivel contratar somente consultoria preventiva?",
    answer:
      "Sim. A consultoria preventiva pode ser contratada de forma independente para reduzir riscos, estruturar decisoes e evitar litigios futuros.",
  },
  {
    question: "Voces atuam em casos urgentes e medidas liminares?",
    answer:
      "Sim. Em situacoes urgentes, avaliamos a viabilidade juridica imediata e estruturamos a atuacao necessaria para protecao celere dos direitos do cliente.",
  },
  {
    question: "O atendimento pode ser remoto?",
    answer:
      "Sim. O escritorio realiza atendimentos presenciais e remotos, com acompanhamento continuo e comunicacao transparente durante toda a conducao do caso.",
  },
  {
    question: "Como sao definidos honorarios e escopo?",
    answer:
      "Honorarios e escopo sao definidos conforme complexidade, volume de trabalho e objetivos do cliente, sempre com proposta clara e alinhada antes do inicio da atuacao.",
  },
];

const legalAreasSchema = [
  "Direito Civil",
  "Direito de Familia e Sucessoes",
  "Direito Tributario",
  "Direito Imobiliario",
  "Direito Trabalhista",
  "Direito Empresarial",
  "Direito da Saude",
  "Direito Administrativo",
  "Direito Internacional",
  "Direito Desportivo",
  "Direito Penal Empresarial",
  "Direito Digital e Compliance",
];

export default function Home() {
  const whatsappUrl = buildWhatsAppUrl();
  const siteUrl = getSiteUrl();
  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    name: SITE_NAME,
    url: siteUrl,
    description: SITE_DESCRIPTION,
    image: `${siteUrl}${SITE_OG_IMAGE}`,
    areaServed: "BR",
    availableLanguage: ["pt-BR"],
    serviceType: legalAreasSchema,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
      addressRegion: "SP",
      addressLocality: "Sao Paulo",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Portuguese",
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
    mainEntity: faqs.map(item => ({
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
        <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">
          FUSTINONI ADVOCACIA
        </div>

        <h1 className="mb-8 max-w-4xl text-balance font-serif text-4xl leading-[0.9] tracking-tight sm:mb-10 sm:text-5xl md:text-6xl lg:text-7xl">
          Assessoria juridica com <br className="hidden md:block" /> estrategia, discricao e precisao tecnica
        </h1>

        <p className="mb-10 max-w-2xl text-sm leading-7 text-black/65 sm:text-base">
          Atuacao consultiva e contenciosa para pessoas fisicas e juridicas, com foco em protecao patrimonial, mitigacao de riscos e defesa qualificada de interesses relevantes.
        </p>

        <Button asChild className="z-10 mb-12 w-full max-w-xs rounded-none bg-black px-8 py-5 text-sm uppercase tracking-wider text-white hover:bg-black/80 sm:mb-16 sm:w-auto sm:py-6">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Agendar Consulta
          </a>
        </Button>

        <div className="relative z-0 mx-auto mt-4 w-full max-w-4xl">
          <Image
            src="/hero-courthouse-notext.png"
            alt="Representacao institucional do escritorio"
            width={1600}
            height={900}
            priority
            sizes="(max-width: 768px) 100vw, 1024px"
            className="h-auto w-full object-contain mix-blend-multiply contrast-125"
          />
        </div>
      </section>

      <div className="grid grid-cols-2 border-b border-black/15 md:grid-cols-6">
        {practiceAreas.map((area, index) => (
          <div
            key={area}
            className={`flex items-center justify-center border-black/15 py-5 text-center font-serif text-sm font-semibold md:text-base ${
              index !== practiceAreas.length - 1 ? "border-r" : ""
            } ${index % 2 !== 0 ? "border-r-0 md:border-r" : ""}`}
          >
            {area}
          </div>
        ))}
      </div>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <section id="services" className="scroll-mt-24 border-b border-black/15 sm:scroll-mt-28">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 md:px-20 md:py-24">
          <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">Equipe</div>
          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            Advogados com formacao solida <br /> e atuacao multidisciplinar
          </h2>
        </div>

        <div className="grid grid-cols-1 border-t border-black/15 md:grid-cols-2">
          {serviceHighlights.map((service, index) => {
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
                <p className="text-sm leading-relaxed text-black/60 md:text-base">{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <section id="studio" className="scroll-mt-24 border-b border-black/15 sm:scroll-mt-28">
        <div className="px-4 py-16 text-center sm:px-6 sm:py-20">
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">Escritorio</div>
          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            Excelencia tecnica com visao estrategica para decisoes de alta relevancia
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
            Nossa atuacao combina rigor juridico, discricao absoluta e atendimento personalizado para transformar complexidade em solucoes seguras, eficazes e sustentaveis.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-2xl px-4 pb-8 sm:px-6 sm:pb-10">
          <Image
            src="/studio-elements-sketch.png"
            alt="Posicionamento institucional do escritorio"
            width={1200}
            height={1200}
            className="h-auto w-full mix-blend-multiply contrast-125"
          />
        </div>

        <div className="grid w-full grid-cols-2 border-t border-black/15 text-center text-sm font-medium sm:grid-cols-3 md:grid-cols-5 md:text-base">
          <div className="border-r border-b border-black/15 py-4 md:border-b-0">Rigor tecnico</div>
          <div className="border-b border-black/15 py-4 sm:border-r md:border-b-0">Estrategia processual</div>
          <div className="border-r border-b border-black/15 py-4 md:border-r md:border-b-0">Discricao absoluta</div>
          <div className="border-b border-black/15 py-4 sm:border-r sm:border-b-0 md:border-r">Atendimento personalizado</div>
          <div className="col-span-2 py-4 sm:col-span-1">Visao multidisciplinar</div>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <section id="process" className="scroll-mt-24 border-b border-black/15 sm:scroll-mt-28">
        <div className="border-b border-black/15 px-4 py-16 text-center sm:px-6 sm:py-20">
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">Modelos de Atuacao</div>
          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            Escolha o nivel de acompanhamento juridico que seu caso exige
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col border-b border-black/15 md:border-r md:border-b-0">
            <div className="flex-1 p-6 sm:p-8 lg:p-12">
              <h3 className="mb-4 font-serif text-2xl">Consultoria e Prevencao</h3>
              <p className="mb-8 leading-relaxed text-black/60">
                Ideal para quem busca orientacao estrategica, prevencao de passivos e estruturacao juridica antes do litigio.
              </p>
              <Button asChild className="w-full rounded-none bg-black py-6 text-xs uppercase tracking-wider text-white hover:bg-black/80">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Falar com a Equipe
                </a>
              </Button>
            </div>

            <div className="border-t border-black/15">
              {processRows.map((label, index) => (
                <div key={label} className="grid grid-cols-[1fr_2.75rem] border-b border-black/15 last:border-b-0 sm:grid-cols-[1fr_4rem]">
                  <div className="border-r border-black/15 p-3 text-sm leading-relaxed text-black/70 sm:p-4">{label}</div>
                  <div className="flex items-center justify-center bg-neutral-50 p-3 sm:p-4">
                    {index < 5 ? <Plus className="h-4 w-4 text-black/40" /> : <X className="h-4 w-4 text-black/40" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 p-6 sm:p-8 lg:p-12">
              <h3 className="mb-4 font-serif text-2xl">Atuacao Completa</h3>
              <p className="mb-8 leading-relaxed text-black/60">
                Recomendado para casos que exigem conducao integral, da estrategia inicial a atuacao contenciosa e fase de execucao.
              </p>
              <Button asChild className="w-full rounded-none bg-black py-6 text-xs uppercase tracking-wider text-white hover:bg-black/80">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Agendar Consulta
                </a>
              </Button>
            </div>

            <div className="border-t border-black/15">
              {processRows.map(label => (
                <div key={label} className="grid grid-cols-[1fr_2.75rem] border-b border-black/15 last:border-b-0 sm:grid-cols-[1fr_4rem]">
                  <div className="border-r border-black/15 p-3 text-sm leading-relaxed text-black/70 sm:p-4">{label}</div>
                  <div className="flex items-center justify-center bg-neutral-50 p-3 sm:p-4">
                    <Plus className="h-4 w-4 text-black/40" />
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
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">Areas de Atuacao</div>
          <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            Atuacao juridica abrangente em 12 frentes estrategicas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between border-b border-black/15 p-6 sm:p-8 lg:border-r">
            <h3 className="mb-10 font-serif text-xl leading-snug sm:mb-16 sm:text-2xl">
              Direito Civil e Direito de Familia e Sucessoes.
            </h3>
            <div className="text-sm font-medium">Contratos, responsabilidade civil, inventarios e planejamento patrimonial familiar.</div>
          </div>

          <div className="grid grid-rows-2 border-b border-black/15 lg:border-r">
            <div className="flex items-center justify-center border-b border-black/15 p-6 sm:p-8">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-black/50">Frente Patrimonial</div>
                <div className="mt-3 font-serif text-3xl sm:text-4xl">Direito Tributario + Direito Imobiliario</div>
              </div>
            </div>
            <div className="flex flex-col justify-end bg-neutral-50 p-6 sm:p-8">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-black/50">Planejamento</div>
              <div className="font-serif text-3xl sm:text-4xl">Estruturas e protecao de ativos</div>
            </div>
          </div>

          <div className="flex flex-col justify-between border-b border-black/15 bg-white p-6 sm:p-8 lg:border-b-0">
            <h3 className="mb-10 font-serif text-xl leading-snug sm:mb-16 sm:text-2xl">
              Direito Trabalhista e Direito Empresarial.
            </h3>
            <div className="text-sm font-medium">Consultoria preventiva, contratos estrategicos e defesa em litigios de alta exposicao.</div>
          </div>

          <div className="flex flex-col justify-end bg-neutral-50 p-6 sm:p-8 md:border-r md:border-black/15">
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-black/50">Setores Regulados</div>
            <div className="font-serif text-3xl sm:text-4xl">Direito da Saude + Direito Administrativo</div>
          </div>

          <div className="grid grid-rows-2 md:border-r md:border-black/15">
            <div className="flex items-center justify-center border-b border-black/15 p-6 sm:p-8">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-black/50">Ambito Internacional</div>
                <div className="mt-3 font-serif text-3xl sm:text-4xl">Direito Internacional + Direito Desportivo</div>
              </div>
            </div>
            <div className="flex flex-col justify-end bg-neutral-50 p-6 sm:p-8">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-black/50">Risco e Integridade</div>
              <div className="font-serif text-3xl sm:text-4xl">Direito Penal Empresarial + Direito Digital e Compliance</div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8">
            <h3 className="mb-10 font-serif text-xl leading-snug sm:mb-16 sm:text-2xl">
              Atuacao consultiva e contenciosa com estrategia sob medida para cada cliente.
            </h3>
            <div className="text-sm font-medium">Pessoas fisicas, familias e empresas com demandas de alta complexidade.</div>
          </div>
        </div>
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <section id="faq" className="scroll-mt-24 grid grid-cols-1 border-b border-black/15 sm:scroll-mt-28 lg:grid-cols-2">
        <div className="flex flex-col justify-center border-b border-black/15 p-8 sm:p-12 lg:border-r lg:border-b-0 lg:p-20">
          <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">FAQ</div>
          <h2 className="max-w-sm font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            Perguntas frequentes antes do inicio da atuacao juridica
          </h2>
        </div>

        <div className="flex flex-col">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`} className="border-b border-black/15 px-5 py-2 last:border-b-0 sm:px-8">
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
      </section>

      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <section className="flex flex-col items-center overflow-hidden border-b border-black/15 px-4 pt-16 text-center sm:px-6 sm:pt-20 md:pt-24">
        <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">Agende Sua Consulta</div>

        <h2 className="mx-auto mb-10 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Fale com uma equipe preparada para decisoes juridicas estrategicas
        </h2>

        <p className="mb-10 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
          Se voce precisa de consultoria preventiva ou representacao contenciosa, estruturamos a atuacao ideal para proteger seus interesses com seguranca juridica.
        </p>

        <Button asChild className="z-10 mb-10 w-full max-w-xs rounded-none bg-black px-8 py-5 text-sm uppercase tracking-wider text-white hover:bg-black/80 sm:w-auto sm:py-6">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Agendar Consulta
          </a>
        </Button>

        <div className="relative top-1 mt-auto w-full">
          <Image
            src="/footer-meeting-sketch.png"
            alt="Imagem institucional da advocacia"
            width={1600}
            height={700}
            className="h-auto w-full max-h-[400px] object-cover object-bottom mix-blend-multiply opacity-90 contrast-125"
          />
        </div>
      </section>
    </>
  );
}
