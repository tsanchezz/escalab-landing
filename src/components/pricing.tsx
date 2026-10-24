"use client";

import { Split } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { NodeChip } from "@/components/workflow";
import { Reveal } from "@/components/reveal";
import { track } from "@/lib/analytics";
import { PLANS } from "@/lib/plans";



export function Pricing() {
  const reduce = useReducedMotion();
  return (
    <section id="planes" aria-labelledby="planes-title" className="page-m py-24 lg:py-32">
      <Reveal>
        <NodeChip type="Switch · Ruta" name="Elegí tu plan" icon={<Split size={18} />} />
      </Reveal>

      <div className="relative mt-10 lg:min-h-[600px]">
        <Reveal delay={0.08} as="h2" className="t-h2 lg:absolute lg:left-0 lg:top-0 lg:max-w-[10ch]">
          <span id="planes-title">Tres formas de escalar.</span>
        </Reveal>

        <ul className="mt-12 grid gap-2 lg:mt-0 lg:grid-cols-3 lg:items-end">
          {PLANS.map((p, i) => (
            <motion.li
              key={p.id}
              initial={reduce ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              className="flex flex-col overflow-hidden rounded-xl lg:h-[var(--h)]"
              style={{ background: p.bg, ["--h" as string]: `${p.h}px` }}
            >
              <div className="flex-1 p-7">
                <h3 className="text-[28px] font-extrabold tracking-tight">{p.name}</h3>
                <p className="mt-2 text-[56px] font-extrabold leading-none tracking-[-0.04em] max-lg:text-[44px]">
                  <span className="text-[0.4em] font-bold align-top mr-1.5 tracking-normal">USD</span>
                  {p.price}
                  <span className="ml-1.5 text-[0.3em] font-semibold tracking-normal text-soft">/ mes</span>
                </p>
                <ul className="mt-7 grid gap-2.5 text-[17px]">
                  {p.lines.map((l) => (
                    <li key={l} className="flex items-start gap-3">
                      <span aria-hidden className="mt-[0.5em] size-2.5 shrink-0 rounded-full border-2 border-teal" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#contacto"
                onClick={() => {
                  track("plan_select", { plan: p.id });
                  window.dispatchEvent(new CustomEvent("escalab:plan", { detail: p.id }));
                }}
                className="flex h-16 items-center justify-between px-7 text-[15px] font-bold uppercase tracking-[0.08em] transition-[filter,padding] duration-200 hover:pl-9 hover:brightness-125"
                style={{ background: p.id === "sell" ? "var(--escalab-lime)" : p.strip, color: p.id === "sell" ? "var(--escalab-navy)" : "var(--escalab-white)" }}
              >
                Elegir {p.name}
                <span aria-hidden>→</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
      <p className="t-small mt-8 text-soft">Precios de ejemplo para el proyecto académico. Implementación incluida.</p>
    </section>
  );
}
