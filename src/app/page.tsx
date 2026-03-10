import Image from "next/image";
import Link from "next/link";
import { Plus, X } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { VirtualAssistantChat } from "@/components/virtual-assistant-chat";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const navItems = [
  { href: "#services", label: "Equipe" },
  { href: "#process", label: "Atuação" },
  { href: "#studio", label: "Escritório" },
  { href: "#sectors", label: "Áreas" },
  { href: "#faq", label: "FAQ" },
];

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
    question: "O escritório atende pessoas físicas e empresas?",
    answer:
      "Sim. Atuamos para pessoas, famílias e empresas, com abordagem personalizada para demandas consultivas, preventivas e contenciosas.",
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

export default function Home() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <div className="min-h-screen overflow-x-clip bg-grid-pattern text-black font-sans selection:bg-black selection:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col bg-white shadow-2xl sm:border-x sm:border-black/15">
        <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-black/15 bg-white/90 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-5 md:px-10">
          <div className="font-serif text-base leading-tight font-semibold tracking-[0.22em] uppercase sm:text-lg">
            FUSTINONI ADVOCACIA
          </div>

          <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-wider text-black/60 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-black">
                {item.label}
              </Link>
            ))}
          </nav>

          <Button asChild className="shrink-0 rounded-none bg-black px-4 py-4 text-[11px] uppercase tracking-wider text-white hover:bg-black/80 sm:px-6 sm:py-5 sm:text-xs">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Agendar Consulta
            </a>
          </Button>
        </header>

        <section className="relative flex flex-col items-center overflow-hidden border-b border-black/15 px-4 pt-16 pb-10 text-center sm:px-6 sm:pt-20 sm:pb-12 md:px-10 md:pt-24">
          <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">
            FUSTINONI ADVOCACIA
          </div>

          <h1 className="mb-8 max-w-4xl text-balance font-serif text-4xl leading-[0.9] tracking-tight sm:mb-10 sm:text-5xl md:text-6xl lg:text-7xl">
            Assessoria jurídica com <br className="hidden md:block" /> estratégia, discrição e precisão técnica
          </h1>

          <p className="mb-10 max-w-2xl text-sm leading-7 text-black/65 sm:text-base">
            Atuação consultiva e contenciosa para pessoas físicas e jurídicas, com foco em proteção patrimonial, mitigação de riscos e defesa qualificada de interesses relevantes.
          </p>

          <Button asChild className="z-10 mb-12 w-full max-w-xs rounded-none bg-black px-8 py-5 text-sm uppercase tracking-wider text-white hover:bg-black/80 sm:mb-16 sm:w-auto sm:py-6">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Agendar Consulta
            </a>
          </Button>

          <div className="relative z-0 mx-auto mt-4 w-full max-w-4xl">
            <Image
              src="/hero-courthouse-notext.png"
              alt="Representação institucional do escritório"
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
              Advogados com formação sólida <br /> e atuação multidisciplinar
            </h2>
          </div>

          <div className="grid grid-cols-1 border-t border-black/15 md:grid-cols-2">
            {serviceHighlights.map((service, index) => {
              return (
                <div
                  key={service.title}
                  className={`p-6 transition-colors hover:bg-neutral-50 sm:p-8 md:p-10 ${
                    index === 0 ? "border-b border-black/15 md:border-r md:border-b-0" : ""
                  } ${index === 1 ? "" : ""} ${
                    index === 2 ? "border-t border-black/15 md:border-r" : ""
                  } ${index === 3 ? "border-t border-black/15" : ""}`}
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
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">Escritório</div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Excelência técnica com visão estratégica para decisões de alta relevância
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
              Nossa atuação combina rigor jurídico, discrição absoluta e atendimento personalizado para transformar complexidade em soluções seguras, eficazes e sustentáveis.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-2xl px-4 pb-8 sm:px-6 sm:pb-10">
            <Image
              src="/studio-elements-sketch.png"
              alt="Posicionamento institucional do escritório"
              width={1200}
              height={1200}
              className="h-auto w-full mix-blend-multiply contrast-125"
            />
          </div>

          <div className="grid w-full grid-cols-2 border-t border-black/15 text-center text-sm font-medium sm:grid-cols-3 md:grid-cols-5 md:text-base">
            <div className="border-r border-b border-black/15 py-4 md:border-b-0">Rigor técnico</div>
            <div className="border-b border-black/15 py-4 sm:border-r md:border-b-0">Estratégia processual</div>
            <div className="border-r border-b border-black/15 py-4 md:border-r md:border-b-0">Discrição absoluta</div>
            <div className="border-b border-black/15 py-4 sm:border-r sm:border-b-0 md:border-r">Atendimento personalizado</div>
            <div className="col-span-2 py-4 sm:col-span-1">Visão multidisciplinar</div>
          </div>
        </section>

        <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

        <section id="process" className="scroll-mt-24 border-b border-black/15 sm:scroll-mt-28">
          <div className="border-b border-black/15 px-4 py-16 text-center sm:px-6 sm:py-20">
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">Modelos de Atuação</div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Escolha o nível de acompanhamento jurídico que seu caso exige
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col border-b border-black/15 md:border-r md:border-b-0">
              <div className="flex-1 p-6 sm:p-8 lg:p-12">
                <h3 className="mb-4 font-serif text-2xl">Consultoria e Prevenção</h3>
                <p className="mb-8 leading-relaxed text-black/60">
                  Ideal para quem busca orientação estratégica, prevenção de passivos e estruturação jurídica antes do litígio.
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
                <h3 className="mb-4 font-serif text-2xl">Atuação Completa</h3>
                <p className="mb-8 leading-relaxed text-black/60">
                  Recomendado para casos que exigem condução integral, da estratégia inicial à atuação contenciosa e fase de execução.
                </p>
                <Button asChild className="w-full rounded-none bg-black py-6 text-xs uppercase tracking-wider text-white hover:bg-black/80">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Agendar Consulta
                  </a>
                </Button>
              </div>

              <div className="border-t border-black/15">
                {processRows.map((label) => (
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
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">Áreas de Atuação</div>
            <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Atuação jurídica abrangente em 12 frentes estratégicas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col justify-between border-b border-black/15 p-6 sm:p-8 lg:border-r">
              <h3 className="mb-10 font-serif text-xl leading-snug sm:mb-16 sm:text-2xl">
                Direito Civil e Direito de Família e Sucessões.
              </h3>
              <div className="text-sm font-medium">Contratos, responsabilidade civil, inventários e planejamento patrimonial familiar.</div>
            </div>

            <div className="grid grid-rows-2 border-b border-black/15 lg:border-r">
              <div className="flex items-center justify-center border-b border-black/15 p-6 sm:p-8">
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-widest text-black/50">Frente Patrimonial</div>
                  <div className="mt-3 font-serif text-3xl sm:text-4xl">Direito Tributário + Direito Imobiliário</div>
                </div>
              </div>
              <div className="flex flex-col justify-end bg-neutral-50 p-6 sm:p-8">
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-black/50">Planejamento</div>
                <div className="font-serif text-3xl sm:text-4xl">Estruturas e proteção de ativos</div>
              </div>
            </div>

            <div className="flex flex-col justify-between border-b border-black/15 bg-white p-6 sm:p-8 lg:border-b-0">
              <h3 className="mb-10 font-serif text-xl leading-snug sm:mb-16 sm:text-2xl">
                Direito Trabalhista e Direito Empresarial.
              </h3>
              <div className="text-sm font-medium">Consultoria preventiva, contratos estratégicos e defesa em litígios de alta exposição.</div>
            </div>

            <div className="flex flex-col justify-end bg-neutral-50 p-6 sm:p-8 md:border-r md:border-black/15">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-black/50">Setores Regulados</div>
              <div className="font-serif text-3xl sm:text-4xl">Direito da Saúde + Direito Administrativo</div>
            </div>

            <div className="grid grid-rows-2 md:border-r md:border-black/15">
              <div className="flex items-center justify-center border-b border-black/15 p-6 sm:p-8">
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-widest text-black/50">Âmbito Internacional</div>
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
                Atuação consultiva e contenciosa com estratégia sob medida para cada cliente.
              </h3>
              <div className="text-sm font-medium">Pessoas físicas, famílias e empresas com demandas de alta complexidade.</div>
            </div>
          </div>
        </section>

        <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

        <section id="faq" className="scroll-mt-24 grid grid-cols-1 border-b border-black/15 sm:scroll-mt-28 lg:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-black/15 p-8 sm:p-12 lg:border-r lg:border-b-0 lg:p-20">
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">FAQ</div>
            <h2 className="max-w-sm font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Perguntas frequentes antes do início da atuação jurídica
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
            Fale com uma equipe preparada para decisões jurídicas estratégicas
          </h2>

          <p className="mb-10 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
            Se você precisa de consultoria preventiva ou representação contenciosa, estruturamos a atuação ideal para proteger seus interesses com segurança jurídica.
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

        <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

        <footer className="border-b border-black/15 text-sm">
          <div className="grid grid-cols-1 border-t border-black/15 bg-white sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)_minmax(0,1.1fr)]">
            <div className="p-6 sm:border-r sm:border-black/15 sm:p-8">
              <div className="mb-10 font-serif text-lg font-semibold uppercase tracking-widest sm:mb-14">
                FUSTINONI ADVOCACIA
              </div>
              <p className="text-xs text-black/40">FUSTINONI ADVOCACIA - Todos os direitos reservados</p>
              <div className="mt-10 flex flex-wrap gap-4 text-xs font-medium uppercase tracking-wider text-black/50 sm:mt-12">
                <span>Atendimento confidencial</span>
                <span>Consultas por agendamento</span>
                <span>Atuação nacional</span>
              </div>
            </div>

            <div className="border-t border-black/15 p-6 sm:border-t-0 sm:p-8 lg:border-r lg:border-black/15">
              <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">Navegação</div>
              <ul className="space-y-3 font-medium">
                <li>
                  <Link href="#services" className="transition-colors hover:text-black/60">
                    Equipe
                  </Link>
                </li>
                <li>
                  <Link href="#process" className="transition-colors hover:text-black/60">
                    Modelos de Atuação
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="transition-colors hover:text-black/60">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="border-t border-black/15 p-6 sm:col-span-2 sm:p-8 lg:col-span-1 lg:border-t-0">
              <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">Contato</div>
              <ul className="space-y-3 font-medium">
                <li>
                  <span className="text-black/70">Atendimento consultivo e contencioso para pessoas físicas e jurídicas</span>
                </li>
                <li>
                  <span className="text-black/70">Reuniões presenciais e remotas, conforme a necessidade do caso</span>
                </li>
                <li>
                  <span className="text-black/70">Consultas e informações mediante agendamento prévio</span>
                </li>
                <li>
                  <span className="text-black/70">Canal de contato disponibilizado no primeiro atendimento</span>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>

      <VirtualAssistantChat whatsappUrl={whatsappUrl} />
    </div>
  );
}
