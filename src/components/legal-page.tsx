import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { CONTACT_EMAIL } from "@/lib/site";

export const LEGAL_UPDATED = "9 de noviembre de 2026";

const LINKS = [
  ["/privacidad", "Privacidad"],
  ["/terminos", "Términos"],
  ["/cookies", "Cookies"],
] as const;

/** Estructura común de las páginas legales: leyenda académica, contenido y navegación entre documentos. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main id="contenido" className="page-m py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/" aria-label="Volver al inicio" className="inline-flex min-h-11 items-center">
          <Logo />
        </Link>
        <h1 className="t-h2 mt-10 sm:mt-14">{title}</h1>
        <p className="mt-3 text-[14px] text-soft">Última actualización: {LEGAL_UPDATED}</p>

        <aside className="card mt-8 p-5 text-[15px] leading-relaxed text-ink">
          <strong>Proyecto académico.</strong> Escalab es una empresa ficticia creada para un trabajo práctico de la UADE. No tiene razón social, CUIT ni domicilio, no presta servicios reales y los precios que se muestran son ejemplos del proyecto académico.
        </aside>

        <div className="mt-8 grid gap-4 text-[17px] leading-relaxed text-soft sm:mt-10">{children}</div>

        {CONTACT_EMAIL && (
          <p className="mt-10 text-soft">
            Consultas sobre este documento:{" "}
            <a className="text-terracotta-deep underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        )}

        <nav aria-label="Documentos legales" className="mt-10 flex flex-wrap gap-x-6 border-t border-line pt-4">
          {LINKS.map(([href, label]) => (
            <Link key={href} href={href} className="inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4">
              {label}
            </Link>
          ))}
          <Link href="/" className="inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4">
            Volver al inicio
          </Link>
        </nav>
      </div>
    </main>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="t-h3 mt-4 text-ink">{children}</h2>;
}
