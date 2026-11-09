"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { useWorkflow } from "@/components/workflow";
import { NAV_LINKS } from "@/lib/site";
import { track } from "@/lib/analytics";

export function Nav() {
  const { active, total, label, finished } = useWorkflow();
  const [open, setOpen] = useState(false);
  const status = finished ? "Ejecución exitosa" : active >= 0 ? `Ejecutando · nodo ${active + 1} de ${total}` : "Listo para ejecutar";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="glass glass-liquid fixed inset-x-0 top-0 z-50 !rounded-none !border-x-0 !border-t-0 !bg-navy/55">
      <div className="page-m flex h-16 items-center gap-6">
        <a href="#top" aria-label="Escalab, inicio" className="inline-flex min-h-11 shrink-0 items-center">
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
          className="btn btn-primary btn-port ml-auto !min-h-10 whitespace-nowrap !px-3 !text-[12px] sm:!px-4 sm:!text-[13px] lg:ml-0"
        >
          Escalar ahora
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 grid size-11 shrink-0 place-items-center rounded-xl text-ink lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Secciones" className="page-m border-t border-white/10 pb-3 pt-1 lg:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center text-[16px] font-semibold text-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
