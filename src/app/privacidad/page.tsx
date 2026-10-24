import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidad y cookies",
  description: "Cómo usa Escalab Google Analytics y qué datos recibe el formulario de contacto.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <main className="page-m mx-auto max-w-3xl py-16">
      <Link href="/" aria-label="Volver al inicio">
        <Logo />
      </Link>
      <h1 className="t-h2 mt-14">Privacidad y cookies</h1>
      <div className="mt-10 grid gap-6 text-[17px] leading-relaxed">
        <p>
          Escalab es una empresa ficticia creada para un proyecto académico. Esta página explica, de todas formas, cómo se manejaría la información de quienes la visitan.
        </p>
        <h2 className="text-[24px] font-extrabold tracking-tight">Analítica</h2>
        <p>
          Usamos Google Analytics 4 para medir visitas, secciones alcanzadas y clics en los botones. Sólo se activa si aceptás en el aviso de cookies, y la IP se anonimiza. Podés cambiar tu decisión borrando los datos del sitio en tu navegador.
        </p>
        <h2 className="text-[24px] font-extrabold tracking-tight">Formulario de contacto</h2>
        <p>
          Guardamos tu nombre, email, negocio y plan de interés únicamente para responderte. No se venden ni se comparten con terceros.
        </p>
        <h2 className="text-[24px] font-extrabold tracking-tight">Contacto</h2>
        <p>
          Escribinos a{" "}
          <a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          .
        </p>
      </div>
      <Link href="/" className="btn btn-secondary mt-14">
        Volver al inicio
      </Link>
    </main>
  );
}
