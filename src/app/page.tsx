import Image from "next/image";
import Link from "next/link";
import { Briefcase, Percent, Plus, Sparkles, Users, X } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#studio", label: "Studio" },
  { href: "#sectors", label: "Sectors" },
  { href: "#faq", label: "FAQ" },
];

const practiceAreas = [
  "Residences",
  "Interiors",
  "Workplaces",
  "Retail",
  "Hospitality",
  "Renovations",
];

const serviceHighlights = [
  {
    icon: Briefcase,
    title: "Residential architecture",
    description:
      "Homes and multi-unit residences designed around circulation, daylight, privacy, and the way people actually live.",
  },
  {
    icon: Users,
    title: "Collaborative design process",
    description:
      "We turn needs, references, routines, and constraints into clear design decisions your team can evaluate with confidence.",
  },
  {
    icon: Percent,
    title: "Budget-aware planning",
    description:
      "Every phase is developed with scope, priorities, and feasibility in view so the project stays ambitious without losing control.",
  },
  {
    icon: Sparkles,
    title: "Architecture plus interiors",
    description:
      "From spatial layout to materials, lighting, and built-ins, the project stays coherent down to the final layer of detail.",
  },
];

const processRows = [
  "Discovery workshop and brief alignment",
  "Concept layouts and spatial studies",
  "3D views and presentation material",
  "Material and finish direction",
  "Technical drawing set",
  "Permit and consultant coordination",
  "Interior detailing",
  "Site follow-up",
];

const faqs = [
  {
    question: "What happens in the first consultation?",
    answer:
      "We review your goals, the site or existing space, timeline, budget range, and design priorities. The outcome is a clearer project brief and the best next step.",
  },
  {
    question: "Do you work on renovations as well as new builds?",
    answer:
      "Yes. We work on new homes, apartment reconfigurations, interior renovations, and commercial spaces that need a stronger spatial strategy.",
  },
  {
    question: "Can you handle interiors too?",
    answer:
      "Yes. We can develop the project at the architectural level only or continue into interiors, material selection, lighting, and custom joinery.",
  },
  {
    question: "Do you coordinate with engineers and contractors?",
    answer:
      "Yes. We coordinate with the required consultants and can support the construction phase so decisions stay aligned with the approved design intent.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "It depends on scope, approvals, and complexity. Smaller interior renovations move faster, while full architectural projects require a longer development and coordination cycle.",
  },
  {
    question: "Can you work with clients in other cities?",
    answer:
      "Yes. We can run briefing, design reviews, and most approvals remotely, then organize local coordination when the project enters technical development or construction.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-grid-pattern text-black font-sans selection:bg-black selection:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col bg-white shadow-2xl sm:border-x sm:border-black/15">
        <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-black/15 bg-white/90 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-5 md:px-10">
          <div className="font-serif text-base leading-tight font-semibold tracking-[0.22em] uppercase sm:text-lg">
            LIGHT CITY STUDIO
          </div>

          <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-wider text-black/60 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-black">
                {item.label}
              </Link>
            ))}
          </nav>

          <Button className="shrink-0 rounded-none bg-black px-4 py-4 text-[11px] uppercase tracking-wider text-white hover:bg-black/80 sm:px-6 sm:py-5 sm:text-xs">
            Book a Consultation
          </Button>
        </header>

        <section className="relative flex flex-col items-center overflow-hidden border-b border-black/15 px-4 pt-16 pb-10 text-center sm:px-6 sm:pt-20 sm:pb-12 md:px-10 md:pt-24">
          <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">
            Architecture for homes, interiors, and spaces with purpose
          </div>

          <h1 className="mb-8 max-w-4xl text-balance font-serif text-4xl leading-[0.9] tracking-tight sm:mb-10 sm:text-5xl md:text-6xl lg:text-7xl">
            Architecture that brings <br className="hidden md:block" /> clarity, light, and lasting value
          </h1>

          <p className="mb-10 max-w-2xl text-sm leading-7 text-black/65 sm:text-base">
            We design residential and commercial spaces that feel calm to move through, precise in detail, and aligned with the way people live, work, and gather.
          </p>

          <Button className="z-10 mb-12 w-full max-w-xs rounded-none bg-black px-8 py-5 text-sm uppercase tracking-wider text-white hover:bg-black/80 sm:mb-16 sm:w-auto sm:py-6">
            Book a Consultation
          </Button>

          <div className="relative z-0 mx-auto mt-4 w-full max-w-4xl">
            <Image
              src="/bridge-sketch.png"
              alt="Architectural bridge sketch"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              className="h-auto w-full object-contain drop-shadow-sm mix-blend-multiply"
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
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">Services</div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Architecture services shaped around <br /> how people live and use space
            </h2>
          </div>

          <div className="grid grid-cols-1 border-t border-black/15 md:grid-cols-2">
            {serviceHighlights.map((service, index) => {
              const Icon = service.icon;

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
                    <Icon className="h-5 w-5" />
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
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">Studio</div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              A studio grounded in context, proportion, and atmosphere
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
              We believe strong architecture starts with listening well, simplifying what matters, and designing spaces that feel obvious once they exist.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-2xl px-4 pb-8 sm:px-6 sm:pb-10">
            <Image
              src="/globe-sketch.png"
              alt="Architectural studio perspective"
              width={1200}
              height={1200}
              className="h-auto w-full mix-blend-multiply"
            />
          </div>

          <div className="grid w-full grid-cols-2 border-t border-black/15 text-center text-sm font-medium sm:grid-cols-3 md:grid-cols-5 md:text-base">
            <div className="border-r border-b border-black/15 py-4 md:border-b-0">Homes</div>
            <div className="border-b border-black/15 py-4 sm:border-r md:border-b-0">Apartments</div>
            <div className="border-r border-b border-black/15 py-4 md:border-r md:border-b-0">Offices</div>
            <div className="border-b border-black/15 py-4 sm:border-r sm:border-b-0 md:border-r">Retail</div>
            <div className="col-span-2 py-4 sm:col-span-1">Interiors</div>
          </div>
        </section>

        <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

        <section id="process" className="scroll-mt-24 border-b border-black/15 sm:scroll-mt-28">
          <div className="border-b border-black/15 px-4 py-16 text-center sm:px-6 sm:py-20">
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">Process</div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Choose the level of support your project needs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col border-b border-black/15 md:border-r md:border-b-0">
              <div className="flex-1 p-6 sm:p-8 lg:p-12">
                <h3 className="mb-4 font-serif text-2xl">Architecture Design</h3>
                <p className="mb-8 leading-relaxed text-black/60">
                  Ideal for clients who need a strong concept, spatial definition, and a complete design direction for the next stage.
                </p>
                <Button className="w-full rounded-none bg-black py-6 text-xs uppercase tracking-wider text-white hover:bg-black/80">
                  Discuss Your Project
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
                <h3 className="mb-4 font-serif text-2xl">Full-Service Architecture</h3>
                <p className="mb-8 leading-relaxed text-black/60">
                  Best for clients who want the studio involved from early strategy through detailing, coordination, and site follow-up.
                </p>
                <Button className="w-full rounded-none bg-black py-6 text-xs uppercase tracking-wider text-white hover:bg-black/80">
                  Book a Consultation
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
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">Sectors</div>
            <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Spaces we design with clarity, character, and everyday usability
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col justify-between border-b border-black/15 p-6 sm:p-8 lg:border-r">
              <h3 className="mb-10 font-serif text-xl leading-snug sm:mb-16 sm:text-2xl">
                Private homes shaped around routine, comfort, and natural light.
              </h3>
              <div className="text-sm font-medium">Single-family homes and custom residences</div>
            </div>

            <div className="grid grid-rows-2 border-b border-black/15 lg:border-r">
              <div className="flex items-center justify-center border-b border-black/15 p-6 sm:p-8">
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-widest text-black/50">Project scale</div>
                  <div className="mt-3 font-serif text-3xl sm:text-4xl">From one room to full buildings</div>
                </div>
              </div>
              <div className="flex flex-col justify-end bg-neutral-50 p-6 sm:p-8">
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-black/50">Approach</div>
                <div className="font-serif text-3xl sm:text-4xl">Context first</div>
              </div>
            </div>

            <div className="flex flex-col justify-between border-b border-black/15 bg-white p-6 sm:p-8 lg:border-b-0">
              <h3 className="mb-10 font-serif text-xl leading-snug sm:mb-16 sm:text-2xl">
                Apartments and renovations that make existing square meters work harder.
              </h3>
              <div className="text-sm font-medium">Layouts, upgrades, and interior reconfigurations</div>
            </div>

            <div className="flex flex-col justify-end bg-neutral-50 p-6 sm:p-8 md:border-r md:border-black/15">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-black/50">Scope</div>
              <div className="font-serif text-3xl sm:text-4xl">Architecture + Interiors</div>
            </div>

            <div className="grid grid-rows-2 md:border-r md:border-black/15">
              <div className="flex items-center justify-center border-b border-black/15 p-6 sm:p-8">
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-widest text-black/50">Built for</div>
                  <div className="mt-3 font-serif text-3xl sm:text-4xl">Homes, retail, and workplaces</div>
                </div>
              </div>
              <div className="flex flex-col justify-end bg-neutral-50 p-6 sm:p-8">
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-black/50">Focus</div>
                <div className="font-serif text-3xl sm:text-4xl">Flow, light, materiality</div>
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8">
              <h3 className="mb-10 font-serif text-xl leading-snug sm:mb-16 sm:text-2xl">
                Commercial spaces that support operations while expressing a clear point of view.
              </h3>
              <div className="text-sm font-medium">Studios, offices, shops, and hospitality environments</div>
            </div>
          </div>
        </section>

        <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

        <section id="faq" className="scroll-mt-24 grid grid-cols-1 border-b border-black/15 sm:scroll-mt-28 lg:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-black/15 p-8 sm:p-12 lg:border-r lg:border-b-0 lg:p-20">
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">FAQ</div>
            <h2 className="max-w-sm font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              What clients usually want to know before the first meeting
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
          <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">Start Your Project</div>

          <h2 className="mx-auto mb-10 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Let&apos;s design a space that feels intentional from the first sketch
          </h2>

          <p className="mb-10 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
            If you&apos;re planning a home, a renovation, or a commercial interior, we can help turn the brief into a clear architectural direction.
          </p>

          <Button className="z-10 mb-10 w-full max-w-xs rounded-none bg-black px-8 py-5 text-sm uppercase tracking-wider text-white hover:bg-black/80 sm:w-auto sm:py-6">
            Book a Consultation
          </Button>

          <div className="relative top-1 mt-auto w-full">
            <Image
              src="/city-sketch.png"
              alt="City skyline sketch"
              width={1600}
              height={700}
              className="h-auto w-full max-h-[400px] object-cover object-bottom mix-blend-multiply opacity-90"
            />
          </div>
        </section>

        <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

        <footer className="border-b border-black/15 text-sm">
          <div className="grid grid-cols-1 border-t border-black/15 bg-white sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)_minmax(0,1.1fr)]">
            <div className="p-6 sm:border-r sm:border-black/15 sm:p-8">
              <div className="mb-10 font-serif text-lg font-semibold uppercase tracking-widest sm:mb-14">
                LIGHT CITY STUDIO
              </div>
              <p className="text-xs text-black/40">All rights reserved - Light City Studio</p>
              <div className="mt-10 flex flex-wrap gap-4 text-xs font-medium uppercase tracking-wider text-black/50 sm:mt-12">
                <Link href="#" className="transition-colors hover:text-black">
                  LinkedIn
                </Link>
                <Link href="#" className="transition-colors hover:text-black">
                  X/Twitter
                </Link>
                <Link href="#" className="transition-colors hover:text-black">
                  YouTube
                </Link>
              </div>
            </div>

            <div className="border-t border-black/15 p-6 sm:border-t-0 sm:p-8 lg:border-r lg:border-black/15">
              <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">Explore</div>
              <ul className="space-y-3 font-medium">
                <li>
                  <Link href="#services" className="transition-colors hover:text-black/60">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#process" className="transition-colors hover:text-black/60">
                    Process
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
              <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">Contact</div>
              <ul className="space-y-3 font-medium">
                <li>
                  <Link href="mailto:hello@lightcitystudio.com" className="transition-colors hover:text-black/60">
                    hello@lightcitystudio.com
                  </Link>
                </li>
                <li>
                  <span className="text-black/70">Architecture, interiors, and renovation planning</span>
                </li>
                <li>
                  <span className="text-black/70">Remote collaboration available</span>
                </li>
                <li>
                  <span className="text-black/70">Consultations by appointment</span>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
