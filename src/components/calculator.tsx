"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import { track } from "@/lib/analytics";

const MIN = 50;
const MAX = 2000;
const MINUTES_PER_INQUIRY = 4; // atención manual por consulta
const AUTOMATED_SHARE = 0.7; // parte que resuelve el agente

const hoursBack = (n: number) => Math.round((n * MINUTES_PER_INQUIRY * AUTOMATED_SHARE) / 60);

export function SavingsCalculator() {
  const [inquiries, setInquiries] = useState(300);
  const [offHours, setOffHours] = useState(30);
  const target = hoursBack(inquiries);
  const [shown, setShown] = useState(target);
  const sent = useRef<number | undefined>(undefined);
  const current = useRef(target);

  // contador suave hacia el valor nuevo (0,5 s); con movimiento reducido salta directo
  useEffect(() => {
    const from = current.current;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = still ? 1 : Math.min((now - t0) / 500, 1);
      current.current = from + (target - from) * (1 - (1 - k) * (1 - k));
      setShown(Math.round(current.current));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  function report(n: number, p: number) {
    window.clearTimeout(sent.current);
    sent.current = window.setTimeout(
      () => track("calculator_change", { inquiries_per_month: n, off_hours_pct: p, hours_back: hoursBack(n) }),
      900,
    );
  }

  const waiting = Math.round((inquiries * offHours) / 100);
  const pctA = ((inquiries - MIN) / (MAX - MIN)) * 100;
  const pctB = ((offHours - 5) / (70 - 5)) * 100;

  return (
    <section id="ahorro" aria-labelledby="ahorro-title" className="section cv [--cv-m:932px] [--cv-d:812px]">
      <div className="page-m">
        <p className="t-eyebrow">Calculadora</p>
        <Reveal as="h2" className="t-h2 mt-4 max-w-[20ch]">
          <span id="ahorro-title">
            ¿Cuánto tiempo te <em>devuelve?</em>
          </span>
        </Reveal>

        <div className="card mt-10 grid overflow-hidden sm:mt-12 lg:grid-cols-2">
          <div className="grid content-center gap-8 p-6 sm:p-10">
            <div>
              <label htmlFor="inquiries" className="mb-3 flex items-baseline justify-between gap-4 text-[15px] font-semibold">
                <span>Consultas por mes</span>
                <output htmlFor="inquiries" className="font-serif text-[28px] tabular-nums">
                  {inquiries.toLocaleString("es-AR")}
                </output>
              </label>
              <input
                id="inquiries"
                type="range"
                className="range"
                min={MIN}
                max={MAX}
                step={50}
                value={inquiries}
                style={{ "--p": `${pctA}%` } as React.CSSProperties}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setInquiries(v);
                  report(v, offHours);
                }}
              />
            </div>
            <div>
              <label htmlFor="offhours" className="mb-3 flex items-baseline justify-between gap-4 text-[15px] font-semibold">
                <span>Llegan fuera de horario</span>
                <output htmlFor="offhours" className="font-serif text-[28px] tabular-nums">
                  {offHours}%
                </output>
              </label>
              <input
                id="offhours"
                type="range"
                className="range"
                min={5}
                max={70}
                step={5}
                value={offHours}
                style={{ "--p": `${pctB}%` } as React.CSSProperties}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setOffHours(v);
                  report(inquiries, v);
                }}
              />
            </div>
          </div>

          <div className="on-dark bg-night p-6 text-cream sm:p-10">
            <p className="t-eyebrow">Con el agente activo</p>
            <p className="mt-5 text-[15px] text-cream/80">Horas que recupera tu equipo</p>
            <p className="mt-1 font-serif text-[72px] leading-none tracking-[-0.03em] tabular-nums text-terracotta-soft sm:text-[88px]" aria-live="polite">
              {shown}
              <span className="ml-2 font-sans text-[18px] tracking-normal text-cream/80">h al mes</span>
            </p>
            <p className="mt-8 text-[15px] text-cream/80">Consultas que hoy esperan hasta el día siguiente</p>
            <p className="mt-1 font-serif text-[40px] leading-none tabular-nums">{waiting.toLocaleString("es-AR")}</p>
            <p className="mt-8 max-w-[44ch] text-[13px] leading-relaxed text-cream/70">
              Cálculo de ejemplo, no una promesa: {MINUTES_PER_INQUIRY} minutos de atención manual por consulta y {AUTOMATED_SHARE * 100}% resuelto por el agente. Ajustalo a tu operación.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
