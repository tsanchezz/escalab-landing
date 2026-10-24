"use client";

import { Logo } from "@/components/logo";
import { useWorkflow } from "@/components/workflow";
import { NAV_LINKS } from "@/lib/site";
import { track } from "@/lib/analytics";

export function Nav() {
  const { active, total, label, finished } = useWorkflow();
  const status = finished ? "Ejecución exitosa" : active >= 0 ? `Ejecutando · nodo ${active + 1} de ${total}` : "Listo para ejecutar";
  return (
    <header className="glass glass-liquid fixed inset-x-0 top-0 z-50 !rounded-none !border-x-0 !border-t-0 !bg-navy/55">
      <div className="page-m flex h-16 items-center gap-6">
        <a href="#top" aria-label="Escalab, inicio" className="shrink-0">
          <Logo />
        </a>

        <p
          className="t-small hidden min-w-0 flex-1 items-center justify-center gap-3 whitespace-nowrap text-soft xl:flex"
          aria-live="off"
        >
          <span
            className="size-2 rounded-full"
            style={{ background: finished ? "var(--escalab-green)" : "var(--escalab-cyan)", animation: finished ? undefined : "wf-pulse 1.1s ease-in-out infinite" }}
          />
          <span className="font-semibold text-ink">{status}</span>
          {label && !finished && <span className="hidden truncate 2xl:inline">{label}</span>}
        </p>

        <nav aria-label="Principal" className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="t-small font-semibold text-soft transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          onClick={() => track("cta_click", { location: "nav", label: "escalar_ahora" })}
          className="btn btn-primary btn-port ml-auto !min-h-10 !px-4 !text-[13px] lg:ml-0"
        >
          Escalar ahora
        </a>
      </div>
    </header>
  );
}
