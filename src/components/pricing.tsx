"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { track } from "@/lib/analytics";
import { PLANS } from "@/lib/plans";

export function Pricing() {
  // scroll_pricing: una vez, cuando la sección de planes entra en pantalla
  useEffect(() => {
    const el = document.getElementById("planes");
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        track("scroll_pricing", { section: "planes" });
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="planes" aria-labelledby="planes-title" className="section cv border-y border-line bg-linen [--cv-m:1849px] [--cv-d:967px]">
      <div className="page-m">
        <p className="t-eyebrow">Planes</p>
        <Reveal as="h2" className="t-h2 mt-4 max-w-[20ch]">
          <span id="planes-title">
            Para cada tamaño de <em>inmobiliaria.</em>
          </span>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-3">
          {PLANS.map((p, i) => {
            const featured = p.id === "inmobiliaria";
            return (
              <Reveal as="li" key={p.id} delay={i * 0.08} className="flex">
                <div
                  className={`card flex w-full flex-col p-6 sm:p-7 ${featured ? "border-t-[3px] !border-t-terracotta" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="t-h3">{p.name}</h3>
                      <p className="mt-1 text-[14px] text-soft">{p.who}</p>
                    </div>
                    {featured && <span className="chip !bg-terracotta !text-linen">Recomendado</span>}
                  </div>

                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="text-[14px] font-semibold text-soft">USD</span>
                    <span className="font-serif text-[48px] leading-none tracking-[-0.02em]">{p.price}</span>
                    <span className="text-[14px] text-soft">/ mes</span>
                  </p>

                  <ul className="mt-6 grid flex-1 content-start gap-3 text-[15px]">
                    {p.lines.map((l) => (
                      <li key={l} className="flex items-start gap-3">
                        <Check aria-hidden size={17} strokeWidth={2.5} className="mt-[3px] shrink-0 text-sage" />
                        {l}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contacto"
                    onClick={() => {
                      track("plan_select", { plan: p.id });
                      window.dispatchEvent(new CustomEvent("escalab:plan", { detail: p.id }));
                    }}
                    className={`btn mt-8 w-full ${featured ? "btn-primary" : "btn-outline"}`}
                  >
                    Elegir {p.name}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </ul>
        <p className="mt-6 text-[13px] text-soft">Precios de ejemplo del proyecto académico. Implementación incluida.</p>
      </div>
    </section>
  );
}
