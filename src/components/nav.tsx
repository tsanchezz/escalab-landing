"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { NAV_LINKS } from "@/lib/site";
import { trackCta } from "@/lib/analytics";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = window.setTimeout(onScroll, 0); // posición restaurada al recargar a mitad de página
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // el botón flotante se esconde cuando el formulario ya está a la vista
  useEffect(() => {
    const el = document.getElementById("contacto");
    if (!el) return;
    const io = new IntersectionObserver(([e]) =>
      setAtContact(e.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const filled = solid || open;
  const link = filled
    ? "text-soft hover:text-ink"
    : "text-cream/90 hover:text-cream";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${filled ? "border-b border-line bg-cream" : "border-b border-transparent bg-transparent"}`}
      >
        <div className="page-m flex h-16 items-center gap-6">
          <a
            href="#top"
            aria-label="Escalab para inmobiliarias, inicio"
            className="inline-flex min-h-11 shrink-0 items-center"
          >
            <Logo light={!filled} />
          </a>

          <nav
            aria-label="Principal"
            className="ml-auto hidden items-center gap-8 lg:flex"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-[14px] font-semibold transition-colors ${link}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contacto"
            onClick={() =>
              trackCta("nav", "pedir_demo")
            }
            className="btn btn-primary ml-auto max-lg:hidden! !min-h-10 !px-5 !text-[13px] lg:ml-0"
          >
            Pedir una demo
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
            className={`-mr-2 ml-auto grid size-11 shrink-0 place-items-center rounded-full lg:hidden ${filled ? "text-ink" : "text-cream"}`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <nav
            id="menu-movil"
            aria-label="Secciones"
            className="page-m border-t border-line bg-cream pb-3 pt-1 lg:hidden"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center font-serif text-[22px] text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <a
        href="#contacto"
        onClick={() =>
          trackCta("fab", "pedir_demo")
        }
        aria-hidden={!solid || atContact || undefined}
        tabIndex={!solid || atContact ? -1 : undefined}
        className={`btn btn-primary fixed bottom-4 right-4 z-40 !min-h-12 shadow-[0_8px_24px_rgb(43_33_28/0.28)] transition-[opacity,transform] duration-300 lg:hidden! ${solid && !atContact ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      >
        Pedir una demo
      </a>
    </>
  );
}
