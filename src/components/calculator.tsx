"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useMotionValueEvent } from "motion/react";
import { Calculator } from "lucide-react";
import { NodeChip } from "@/components/workflow";
import { Reveal } from "@/components/reveal";
import { track } from "@/lib/analytics";

const MIN = 50;
const MAX = 3000;
const MINUTES_PER_MSG = 4; // atención manual por consulta
const AUTOMATED_SHARE = 0.7; // parte que resuelve el agente

const hoursSaved = (msgs: number) => Math.round((msgs * MINUTES_PER_MSG * AUTOMATED_SHARE) / 60);

export function SavingsCalculator() {
  const [msgs, setMsgs] = useState(400);
  const target = hoursSaved(msgs);
  const mv = useMotionValue(target);
  const [shown, setShown] = useState(target);
  const sent = useRef<number | undefined>(undefined);

  useMotionValueEvent(mv, "change", (v) => setShown(Math.round(v)));
  useEffect(() => {
    const c = animate(mv, target, { duration: 0.45, ease: "easeOut" });
    return () => c.stop();
  }, [target, mv]);

  function onChange(v: number) {
    setMsgs(v);
    window.clearTimeout(sent.current);
    sent.current = window.setTimeout(() => track("calculator_change", { messages_per_month: v, hours_saved: hoursSaved(v) }), 900);
  }

  const pct = ((msgs - MIN) / (MAX - MIN)) * 100;

  return (
    <section id="ahorro" aria-labelledby="ahorro-title" className="bg-navy-2">
      <div className="page-m py-24 lg:py-28">
        <Reveal>
          <NodeChip type="Set · Cálculo" name="Cuánto tiempo recuperás" icon={<Calculator size={18} />} />
        </Reveal>

        <div className="mt-10 grid items-end gap-10 md:grid-cols-12 md:gap-8">
          <Reveal delay={0.08} className="md:col-span-7">
            <h2 id="ahorro-title" className="max-w-[18ch] text-[clamp(28px,3vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              ¿Cuántos mensajes por mes?
            </h2>
          </Reveal>

          <Reveal delay={0.14} className="md:col-span-5">
            <div data-ui className="w-full max-w-[400px] md:ml-auto">
              <label htmlFor="msgs" className="mb-4 flex items-baseline justify-between text-[15px] font-semibold">
                <span>Mensajes por mes</span>
                <output htmlFor="msgs" className="text-[22px] font-extrabold tabular-nums">
                  {msgs.toLocaleString("es-AR")}
                </output>
              </label>
              <input
                id="msgs"
                type="range"
                className="range"
                min={MIN}
                max={MAX}
                step={50}
                value={msgs}
                style={{ "--p": `${pct}%` } as React.CSSProperties}
                onChange={(e) => onChange(Number(e.target.value))}
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid items-end gap-6 md:grid-cols-12 lg:mt-20">
          <p
            className="text-grad font-extrabold leading-[0.8] tracking-[-0.05em] tabular-nums md:col-span-8 lg:col-span-9"
            style={{ fontSize: "clamp(104px, 19vw, 320px)" }}
            aria-live="polite"
          >
            {shown}
            <span className="ml-[0.12em] text-[0.2em] tracking-[-0.02em]">h al mes</span>
          </p>
          <p className="t-small max-w-[30ch] text-soft md:col-span-4 md:justify-self-end lg:col-span-3">
            Horas de atención que el agente te devuelve: mensajes × {MINUTES_PER_MSG} minutos de atención manual × {AUTOMATED_SHARE * 100}% resuelto por el agente. Son supuestos de ejemplo, no una promesa.
          </p>
        </div>
      </div>
    </section>
  );
}
