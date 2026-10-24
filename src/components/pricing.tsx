"use client";

import { Check, Split } from "lucide-react";
import { NodeChip } from "@/components/workflow";
import { Reveal } from "@/components/reveal";
import { track } from "@/lib/analytics";
import { PLANS } from "@/lib/plans";

export function Pricing() {
  return (
    <section id="planes" aria-labelledby="planes-title" className="page-m py-20 lg:py-24">
      <NodeChip type="Switch · Ruta" name="Elegí tu plan" icon={<Split size={16} />} />

      <Reveal as="h2" className="t-h2 mt-8">
        <span id="planes-title">Tres formas de escalar.</span>
      </Reveal>

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {PLANS.map((p, i) => {
          const featured = p.id === "scale";
          return (
            <Reveal as="li" key={p.id} delay={i * 0.08} className="flex">
              <div
                data-ui
                className="ui-node flex w-full flex-col p-6"
                style={featured ? { borderColor: "var(--escalab-teal)", background: "var(--navy-3)" } : undefined}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[18px] font-bold">{p.name}</h3>
                  {featured && <span className="rounded-md bg-teal px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-navy">Popular</span>}
                </div>
                <p className="mt-3 flex items-baseline gap-1.5 text-[40px] font-extrabold leading-none tracking-[-0.03em]">
                  <span className="text-[14px] font-bold tracking-normal text-soft">USD</span>
                  {p.price}
                  <span className="text-[14px] font-semibold tracking-normal text-soft">/ mes</span>
                </p>
                <ul className="mt-6 grid flex-1 content-start gap-2.5 text-[14px]">
                  {p.lines.map((l) => (
                    <li key={l} className="flex items-start gap-2.5">
                      <Check aria-hidden size={16} strokeWidth={3} className="mt-[3px] shrink-0 text-teal" />
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
                  className={`btn mt-7 w-full ${featured ? "btn-primary" : "btn-secondary"}`}
                >
                  Elegir {p.name}
                </a>
              </div>
            </Reveal>
          );
        })}
      </ul>
      <p className="t-small mt-6 text-soft">Precios de ejemplo para el proyecto académico. Implementación incluida.</p>
    </section>
  );
}
