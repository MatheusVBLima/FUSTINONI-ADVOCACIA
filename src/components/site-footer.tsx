import Link from "next/link";

export function SiteFooter() {
  return (
    <>
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
              <span>Atuacao nacional</span>
            </div>
          </div>

          <div className="border-t border-black/15 p-6 sm:border-t-0 sm:p-8 lg:border-r lg:border-black/15">
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">Navegacao</div>
            <ul className="space-y-3 font-medium">
              <li>
                <Link href="/#services" className="transition-colors hover:text-black/60">
                  Equipe
                </Link>
              </li>
              <li>
                <Link href="/#process" className="transition-colors hover:text-black/60">
                  Modelos de Atuacao
                </Link>
              </li>
              <li>
                <Link href="/analise-credito" className="transition-colors hover:text-black/60">
                  Analise de Credito
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="transition-colors hover:text-black/60">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-t border-black/15 p-6 sm:col-span-2 sm:p-8 lg:col-span-1 lg:border-t-0">
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/50">Contato</div>
            <ul className="space-y-3 font-medium">
              <li>
                <span className="text-black/70">
                  Atendimento consultivo e contencioso para pessoas fisicas e juridicas
                </span>
              </li>
              <li>
                <span className="text-black/70">
                  Reunioes presenciais e remotas, conforme a necessidade do caso
                </span>
              </li>
              <li>
                <span className="text-black/70">
                  Consultas e informacoes mediante agendamento previo
                </span>
              </li>
              <li>
                <span className="text-black/70">Canal de contato disponibilizado no primeiro atendimento</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

