"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Bot, Check } from "lucide-react";
import { NodeChip } from "@/components/workflow";
import { usePinned } from "@/lib/use-pinned";

const STEPS = [
  { t: "Llega el mensaje", c: "Un lead escribe por Instagram, WhatsApp o Messenger." },
  { t: "La IA lo califica", c: "El agente responde, puntúa interés y presupuesto." },
  { t: "Se agenda la reunión", c: "Cruza tu calendario y confirma el horario." },
  { t: "Se cierra la venta", c: "El lead pasa a tu CRM listo para cobrar." },
] as const;

const STATUS = ["Nuevo", "Calificado", "Agendado", "Ganado"] as const;

/** La misma tarjeta de lead, cada vez más avanzada. */
function LeadCard({ stage }: { stage: number }) {
  return (
    <div data-ui className="ui-node w-full max-w-[320px] p-4 text-left">
      <div className="flex items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-navy-4 text-[13px] font-extrabold">L</span>
        <div className="min-w-0 leading-tight">
          <p className="text-[14px] font-bold">Lucía R.</p>
          <p className="t-small text-soft">Instagram</p>
        </div>
        <span
          className="ml-auto rounded-md px-2 py-0.5 text-[12px] font-bold"
          style={{ background: stage === 3 ? "var(--escalab-green)" : "var(--navy-4)", color: stage === 3 ? "var(--escalab-navy)" : "var(--escalab-white)" }}
        >
          {STATUS[stage]}
        </span>
      </div>

      <p className="mt-3 rounded-lg bg-navy-3 p-3 text-[13px] leading-snug">Necesito 20 unidades. ¿Envían a Córdoba?</p>

      <dl className="mt-3 grid min-h-[96px] content-start gap-2.5 text-[13px]">
        {stage >= 1 && (
          <div>
            <dt className="flex justify-between text-soft">
              <span>Puntaje del lead</span>
              <span className="font-bold text-ink">86 / 100</span>
            </dt>
            <dd className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
              <span className="block h-full w-[86%] rounded-full bg-grad" />
            </dd>
          </div>
        )}
        {stage >= 2 && (
          <div className="flex justify-between gap-3">
            <dt className="text-soft">Reunión</dt>
            <dd className="font-bold">Jue 16:00 · Calendar</dd>
          </div>
        )}
        {stage >= 3 && (
          <div className="flex justify-between gap-3">
            <dt className="text-soft">Presupuesto</dt>
            <dd className="font-bold tabular-nums text-green">ARS 480.000</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const pinned = usePinned();
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (pinned) setStep(Math.max(0, Math.min(3, Math.floor(p * 4.4))));
  });

  const s = pinned ? step : 3;

  return (
    <section id="como-funciona" aria-labelledby="como-title" className="py-12">
      <div className="page-m pb-6">
        <NodeChip type="AI Agent · n8n" name="El agente de Escalab" icon={<Bot size={16} />} />
      </div>

      <div ref={ref} className={pinned ? "relative h-[260vh]" : "relative py-8"}>
        <div className={pinned ? "sticky top-0 flex h-svh items-center pt-14" : ""}>
          <div className="page-m grid w-full items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col items-start gap-8">
              <h2 id="como-title" className="t-h2 max-w-[14ch]">
                Un lead, cuatro nodos.
              </h2>
              <LeadCard stage={s} />
            </div>

            <ol className="grid gap-2">
              {STEPS.map((st, i) => {
                const done = i < s;
                const on = i === s;
                return (
                  <li
                    key={st.t}
                    className="flex gap-4 rounded-xl border px-4 py-4 transition-[opacity,border-color,background-color] duration-500"
                    style={{
                      opacity: i <= s ? 1 : 0.35,
                      borderColor: on ? "var(--escalab-cyan)" : "var(--escalab-border)",
                      background: on ? "var(--navy-3)" : "transparent",
                    }}
                  >
                    <span
                      className="grid size-7 shrink-0 place-items-center rounded-full text-[13px] font-bold"
                      style={{ background: done ? "var(--escalab-green)" : on ? "var(--escalab-blue)" : "var(--navy-4)", color: done ? "var(--escalab-navy)" : "var(--escalab-white)" }}
                    >
                      {done ? <Check size={14} strokeWidth={3.5} /> : i + 1}
                    </span>
                    <div>
                      <p className="text-[16px] font-bold leading-tight">{st.t}</p>
                      <p className="t-small mt-1 text-soft">{st.c}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
