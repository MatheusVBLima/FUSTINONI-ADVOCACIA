import Link from "next/link";

export function SiteFooter() {
  return (
    <>
      <div className="h-16 w-full border-b border-black/15 bg-grid-pattern-small" />

      <footer className="border-b border-black/15 text-sm">
        <div className="grid grid-cols-1 border-t border-black/15 bg-white sm:grid-cols-2">
          <div className="p-6 sm:border-r sm:border-black/15 sm:p-8">
            <div className="mb-10 font-serif text-lg font-semibold uppercase tracking-widest sm:mb-14">
              FUSTINONI ADVOCACIA
            </div>
            <p className="text-xs text-black/60">
              FUSTINONI ADVOCACIA - Todos os direitos reservados
            </p>
            <div className="mt-10 flex flex-wrap gap-4 text-xs font-medium uppercase tracking-wider text-black/70 sm:mt-12">
              <span>Atendimento confidencial</span>
              <span>Consultas por agendamento</span>
              <span>Atuacao nacional</span>
            </div>
          </div>

          <div className="border-t border-black/15 p-6 sm:border-t-0 sm:p-8">
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/70">
              Navegacao
            </div>
            <ul className="space-y-3 font-medium">
              <li>
                <Link href="/#services" className="transition-colors hover:text-black/70">
                  Equipe
                </Link>
              </li>
              <li>
                <Link href="/#process" className="transition-colors hover:text-black/70">
                  Modelos de Atuacao
                </Link>
              </li>
              <li>
                <Link href="/analise-credito" className="transition-colors hover:text-black/70">
                  Analise de Apontamentos Indevidos
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="transition-colors hover:text-black/70">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
