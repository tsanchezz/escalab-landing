import Link from "next/link";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

const COLS = [
  { title: "Producto", links: [["#como-funciona", "Cómo funciona"], ["#servicios", "Qué resuelve"], ["#ahorro", "Calculadora"]] },
  { title: "Comercial", links: [["#planes", "Planes"], ["#faq", "Preguntas"], ["#contacto", "Pedir una demo"]] },
  { title: "Legal", links: [["/privacidad", "Privacidad y cookies"]] },
] as const;

export function Footer() {
  return (
    <footer className="on-dark cv bg-night pb-8 pt-12 text-cream sm:pt-16 [--cv-m:861px] [--cv-d:475px]">
      <div className="page-m">
        <p className="font-serif text-[clamp(32px,5vw,64px)] leading-[1.02] tracking-[-0.02em]">{SITE.claim}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.18em] text-cream/60">{SITE.signature}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {COLS.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-cream/60">{c.title}</p>
                <ul className="mt-4 grid gap-1 text-[15px]">
                  {c.links.map(([href, label]) => (
                    <li key={href}>
                      {href.startsWith("/") ? (
                        <Link href={href} className="inline-flex min-h-9 items-center transition-colors hover:text-terracotta-soft">
                          {label}
                        </Link>
                      ) : (
                        <a href={href} className="inline-flex min-h-9 items-center transition-colors hover:text-terracotta-soft">
                          {label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <address className="text-[15px] not-italic leading-relaxed text-cream/80 lg:col-span-3">
            <a href={`mailto:${SITE.email}`} className="font-semibold text-cream hover:text-terracotta-soft">
              {SITE.email}
            </a>
            <br />
            Remoto · Argentina y Latinoamérica
          </address>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-cream/15 pt-6 text-[13px] text-cream/70">
          <p className="max-w-[70ch]">
            © {new Date().getFullYear()} Escalab. Proyecto académico: Escalab es una empresa ficticia. Las propiedades, direcciones y conversaciones son de ejemplo; las fotografías son de Unsplash.
          </p>
          <a href="#top" className="btn btn-light !min-h-10 !px-4 !text-[13px]">
            Volver arriba
          </a>
        </div>
      </div>
    </footer>
  );
}
