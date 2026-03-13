import Link from "next/link";
import { Mail } from "lucide-react";

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
            <p className="text-xs text-black/60">
              FUSTINONI ADVOCACIA - Todos os direitos reservados
            </p>
            <div className="mt-10 flex flex-wrap gap-4 text-xs font-medium uppercase tracking-wider text-black/70 sm:mt-12">
              <span>Atendimento confidencial</span>
              <span>Consultas por agendamento</span>
              <span>Atuação nacional</span>
            </div>
          </div>

          <div className="border-t border-black/15 p-6 sm:border-t-0 sm:p-8 lg:border-r lg:border-black/15">
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/70">
              Navegação
            </div>
            <ul className="space-y-3 font-medium">
              <li>
                <Link href="/#services" className="transition-colors hover:text-black/70">
                  Equipe
                </Link>
              </li>
              <li>
                <Link href="/#process" className="transition-colors hover:text-black/70">
                  Modelos de Atuação
                </Link>
              </li>
              <li>
                <Link href="/analise-credito" className="transition-colors hover:text-black/70">
                  Análise de Apontamentos Indevidos
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="transition-colors hover:text-black/70">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-t border-black/15 p-6 sm:col-span-2 sm:p-8 lg:col-span-1 lg:border-t-0">
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-black/70">Contato</div>
            <a
              href="mailto:contato@fustinoni.adv.br"
              className="inline-flex items-center gap-2 text-sm font-medium text-black/80 transition-colors hover:text-black"
            >
              <Mail className="h-4 w-4" />
              contato@fustinoni.adv.br
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
