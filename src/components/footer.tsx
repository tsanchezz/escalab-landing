import Link from "next/link";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

const COLS = [
  { title: "Servicio", links: [["#como-funciona", "Cómo funciona"], ["#servicios", "Qué automatizamos"], ["#ahorro", "Calculadora"]] },
  { title: "Comercial", links: [["#planes", "Planes"], ["#faq", "Preguntas"], ["#contacto", "Contacto"]] },
  { title: "Legal", links: [["/privacidad", "Privacidad y cookies"]] },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy-2 pb-8 pt-14">
      <div className="page-m">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo />
            <p className="t-micro mt-4 text-soft">{SITE.claim}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
            {COLS.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className="t-micro text-soft">{c.title}</p>
                <ul className="mt-4 grid gap-2.5 text-[14px]">
                  {c.links.map(([href, label]) => (
                    <li key={href}>
                      {href.startsWith("/") ? (
                        <Link href={href} className="transition-colors hover:text-lime">
                          {label}
                        </Link>
                      ) : (
                        <a href={href} className="transition-colors hover:text-lime">
                          {label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <address className="text-[14px] not-italic leading-relaxed text-soft lg:col-span-3">
            <a href={`mailto:${SITE.email}`} className="font-semibold text-ink hover:text-lime">
              {SITE.email}
            </a>
            <br />
            Remoto · Latinoamérica
          </address>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[13px] text-soft">
          <p>© {new Date().getFullYear()} Escalab. Proyecto académico: Escalab es una empresa ficticia.</p>
          <a href="#top" className="btn btn-secondary !min-h-10 !px-4 !text-[12px]">
            Volver arriba
          </a>
        </div>
      </div>
    </footer>
  );
}
