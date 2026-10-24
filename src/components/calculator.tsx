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
      <div className="page-m py-20 lg:py-24">
        <NodeChip type="Set · Cálculo" name="Cuánto tiempo recuperás" icon={<Calculator size={16} />} />

        <div className="mt-8 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal as="h2" className="t-h2">
              <span id="ahorro-title">¿Cuántos mensajes por mes?</span>
            </Reveal>
            <div className="mt-8 max-w-[400px]">
              <label htmlFor="msgs" className="mb-4 flex items-center justify-between text-[14px] font-semibold">
                <span>Mensajes por mes</span>
                <output htmlFor="msgs" className="text-[20px] font-extrabold tabular-nums">
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
          </div>

          <div data-ui className="ui-node p-6 md:p-8">
            <p className="t-small text-soft">Horas que el agente te devuelve</p>
            <p className="text-grad mt-2 text-[72px] font-extrabold leading-none tracking-[-0.04em] tabular-nums" aria-live="polite">
              {shown}
              <span className="ml-2 text-[22px] tracking-normal">h al mes</span>
            </p>
            <p className="t-small mt-5 max-w-[40ch] text-soft">
              Mensajes × {MINUTES_PER_MSG} minutos de atención manual × {AUTOMATED_SHARE * 100}% resuelto por el agente. Supuestos de ejemplo, no una promesa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
