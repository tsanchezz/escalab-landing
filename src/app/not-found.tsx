import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <main className="page-m grid min-h-svh place-content-center gap-8 py-16">
      <Logo />
      <h1 className="t-display">Nodo no encontrado.</h1>
      <p className="max-w-[36ch] text-[19px]">Esta ruta no existe en el workflow. Volvé al inicio y retomá desde el trigger.</p>
      <div>
        <Link href="/" className="btn btn-primary">
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
