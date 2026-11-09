import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <main className="page-m grid min-h-svh place-content-center gap-8 py-16">
      <Logo />
      <h1 className="t-display">
        Esta página <em>no existe.</em>
      </h1>
      <p className="t-lead max-w-[38ch]">La dirección que buscás no está disponible. Volvé al inicio para conocer cómo Escalab atiende las consultas de tu inmobiliaria.</p>
      <div>
        <Link href="/" className="btn btn-primary">
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
