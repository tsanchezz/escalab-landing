"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Check, X } from "lucide-react";

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.round(s % 60)).padStart(2, "0")}`;

/** Nodo IF: alterna entre "sin automatización" (el timer se pasa de 5:00) y "con Escalab" (8 segundos). */
export function IfNode() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<0 | 1>(reduce ? 1 : 0);
  const [seconds, setSeconds] = useState(reduce ? 8 : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const target = phase === 0 ? 720 : 8;
    const controls = animate(0, target, {
      duration: phase === 0 ? 2.4 : 1.1,
      ease: "easeOut",
      onUpdate: setSeconds,
    });
    const next = window.setTimeout(() => setPhase((p) => (p === 0 ? 1 : 0)), phase === 0 ? 4200 : 4800);
    return () => {
      controls.stop();
      window.clearTimeout(next);
    };
  }, [phase, inView, reduce]);

  const ok = seconds <= 300;

  return (
    <div ref={ref} data-ui className="ui-node p-0">
      <span className="ui-port in" />
      <div className="flex items-center gap-3 bg-navy-3 px-5 py-3.5">
        <span className="t-micro text-soft">IF</span>
        <p className="text-[15px] font-bold">Tiempo de respuesta ≤ 5 min</p>
      </div>

      <div className="px-5 py-8">
        <p className="t-small text-soft">{phase === 0 ? "Sin automatización" : "Con el agente de Escalab"}</p>
        <p className="mt-2 text-[56px] font-extrabold leading-none tabular-nums tracking-tight" style={{ color: ok ? "var(--escalab-green)" : "var(--escalab-white)" }}>
          {fmt(seconds)}
        </p>
        <p className="t-small mt-2 text-soft">minutos sin respuesta al cliente</p>
      </div>

      <div className="grid gap-px bg-line">
        {[
          { id: "true", on: ok, label: "Atender y calificar", Icon: Check },
          { id: "false", on: !ok, label: "Lead enfriado", Icon: X },
        ].map(({ id, on, label, Icon }) => (
          <div
            key={id}
            className="relative flex items-center gap-3 px-5 py-4 transition-colors duration-500"
            style={{ background: on ? (id === "true" ? "color-mix(in srgb, var(--escalab-green) 20%, var(--escalab-navy-2))" : "var(--navy-4)") : "var(--escalab-navy-2)" }}
          >
            <span className="t-micro w-12 text-soft">{id}</span>
            <Icon size={16} strokeWidth={3} color={on ? (id === "true" ? "var(--escalab-green)" : "var(--escalab-white)") : "var(--escalab-border)"} />
            <span className="text-[15px] font-semibold" style={{ opacity: on ? 1 : 0.45 }}>
              {label}
            </span>
            <span
              className="ui-port out"
              style={{ borderColor: on ? (id === "true" ? "var(--escalab-green)" : "var(--escalab-gray)") : "var(--escalab-border)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
