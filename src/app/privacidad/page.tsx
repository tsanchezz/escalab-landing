import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidad y cookies",
  description:
    "Cómo usa Escalab Google Analytics y qué datos recibe el formulario de contacto para inmobiliarias.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <main id="contenido" className="page-m py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          aria-label="Volver al inicio"
          className="inline-flex min-h-11 items-center"
        >
          <Logo />
        </Link>
        <h1 className="t-h2 mt-10 sm:mt-14">Privacidad y cookies</h1>
        <div className="mt-8 grid gap-6 text-[17px] leading-relaxed text-soft sm:mt-10">
          <p>
            Escalab es una empresa ficticia creada para un proyecto académico.
            Esta página explica, de todas formas, cómo se manejaría la
            información de quienes la visitan.
          </p>
          <h2 className="t-h3 text-ink">Analítica</h2>
          <p>
            Usamos Google Analytics 4 para medir visitas, secciones alcanzadas y
            clics en los botones. Sólo se activa si aceptás en el aviso de
            cookies, y la IP se anonimiza. Podés cambiar tu decisión borrando
            los datos del sitio en tu navegador.
          </p>
          <h2 className="t-h3 text-ink">Formulario de contacto</h2>
          <p>
            Guardamos tu nombre, email, inmobiliaria, teléfono (si lo indicás),
            tamaño del equipo, plan de interés y el mensaje únicamente para
            responderte y coordinar la demo. No se venden ni se comparten con
            terceros.
          </p>
          <h2 className="t-h3 text-ink">Fotografías</h2>
          <p>
            Las fotografías de esta web son de Unsplash y se usan bajo su
            licencia. Las propiedades y conversaciones que se muestran son
            ejemplos.
          </p>
          <h2 className="t-h3 text-ink">Contacto</h2>
          <p>
            Escribinos a{" "}
            <a
              className="text-terracotta-deep underline underline-offset-4"
              href={`mailto:${SITE.email}`}
            >
              {SITE.email}
            </a>
            .
          </p>
        </div>
        <Link href="/" className="btn btn-outline mt-12 sm:mt-14">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
