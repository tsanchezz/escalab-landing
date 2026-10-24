"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

type Msg = { from: "lead" | "ai"; text: string };
type Channel = { id: string; short: string; name: string; trigger: string; lead: string; msgs: Msg[] };

const CHANNELS: Channel[] = [
  {
    id: "ig",
    short: "IG",
    name: "Instagram",
    trigger: "Instagram Trigger",
    lead: "Lucía",
    msgs: [
      { from: "lead", text: "Hola! ¿Hacen envíos a Córdoba? Necesito 20 unidades." },
      { from: "ai", text: "¡Hola, Lucía! Sí, enviamos a todo el país. ¿Te armo un presupuesto ahora?" },
      { from: "lead", text: "Dale, por favor." },
      { from: "ai", text: "Listo. Te lo mando por acá y te propongo una llamada corta para confirmarlo." },
    ],
  },
  {
    id: "wa",
    short: "WA",
    name: "WhatsApp",
    trigger: "WhatsApp Trigger",
    lead: "Martín",
    msgs: [
      { from: "lead", text: "Buenas, ¿tienen turno para el sábado?" },
      { from: "ai", text: "Hola, Martín. Tengo sábado a las 10:30 o a las 12:00. ¿Cuál te sirve?" },
      { from: "lead", text: "10:30 está perfecto." },
      { from: "ai", text: "Reservado. Te mando un recordatorio el viernes a la tarde." },
    ],
  },
  {
    id: "fb",
    short: "FB",
    name: "Messenger",
    trigger: "Messenger Trigger",
    lead: "Sofía",
    msgs: [
      { from: "lead", text: "¿Cuánto sale el plan para 3 sucursales?" },
      { from: "ai", text: "Para 3 sucursales te recomiendo el plan Scale. ¿Querés ver el detalle?" },
      { from: "lead", text: "Sí, pasame." },
      { from: "ai", text: "Te lo envío ahora y coordino una reunión para revisarlo juntos." },
    ],
  },
];

const STEPS = ["Mensaje recibido", "La IA responde", "Lead calificado", "Reunión agendada"];
const STEP_MS = 1500;
const HOLD_MS = 3200;

export function HeroCanvas() {
  const reduce = useReducedMotion();
  const [ch, setCh] = useState(0);
  // mensajes visibles por canal: el canal que sale conserva los suyos mientras se desvanece
  const [counts, setCounts] = useState<number[]>(() => CHANNELS.map(() => 0));
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (reduce) {
      setCounts(CHANNELS.map((c, i) => (i === 0 ? c.msgs.length : 0)));
      return;
    }
    let cancelled = false;
    const run = (c: number, n: number) => {
      if (cancelled) return;
      setCh(c);
      setCounts((prev) => prev.map((v, i) => (i === c ? n : v)));
      if (n < CHANNELS[c].msgs.length) {
        timer.current = window.setTimeout(() => run(c, n + 1), STEP_MS);
      } else {
        timer.current = window.setTimeout(() => run((c + 1) % CHANNELS.length, 0), HOLD_MS);
      }
    };
    const start = window.setTimeout(() => run(0, 1), 900);
    const onVis = () => {
      if (document.hidden) window.clearTimeout(timer.current);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
      window.clearTimeout(timer.current);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  const channel = CHANNELS[ch];
  const shown = counts[ch];
  const done = Math.min(STEPS.length, shown);

  return (
    <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-[170px_minmax(48px,90px)_1fr] lg:gap-0" data-ui>
      {/* nodos de canal */}
      <div className="grid grid-cols-3 gap-2 lg:flex lg:flex-col lg:gap-0">
        {CHANNELS.map((c, i) => (
          <div key={c.id} className="flex flex-1 items-center lg:py-1">
            <div
              className="ui-node flex w-full flex-col items-center gap-2 p-2.5 text-center transition-colors duration-700 sm:flex-row sm:gap-3 sm:p-3 sm:text-left"
              style={{ borderColor: i === ch ? "var(--escalab-cyan)" : undefined, background: i === ch ? "var(--navy-3)" : undefined }}
            >
              <span
                className="grid size-9 shrink-0 place-items-center rounded-[9px] text-[13px] font-extrabold transition-colors duration-700"
                style={{ background: i === ch ? "var(--escalab-blue)" : "var(--navy-4)" }}
              >
                {c.short}
              </span>
              <span className="min-w-0 text-[13px] font-bold leading-tight sm:text-[14px]">{c.name}</span>
              <span className="ui-port out hidden lg:block" />
            </div>
          </div>
        ))}
      </div>

      {/* cables */}
      <svg aria-hidden className="hidden h-full w-full lg:block" viewBox="0 0 100 300" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wire-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#174ED8" />
            <stop offset="0.5" stopColor="#42C5A4" />
            <stop offset="1" stopColor="#C8EB63" />
          </linearGradient>
        </defs>
        {[50, 150, 250].map((y, i) => {
          const d = `M0,${y} C55,${y} 45,150 100,150`;
          return (
            <g key={i}>
              <path d={d} className="wire" />
              {i === ch && <path d={d} className="wire-live" />}
            </g>
          );
        })}
      </svg>

      {/* nodo gigante: la conversación */}
      <div className="ui-node relative overflow-hidden lg:-mr-[var(--m)] lg:rounded-r-none">
        <span className="ui-port in hidden lg:block" />
        <div className="flex items-center gap-3 bg-navy-3 px-5 py-3.5">
          <span className="grid size-8 place-items-center rounded-lg bg-brand-blue text-[12px] font-extrabold">{channel.short}</span>
          <div className="min-w-0 leading-tight">
            <p className="t-micro text-soft">{channel.trigger}</p>
            <p className="text-[15px] font-bold">Conversación con {channel.lead}</p>
          </div>
          <span className="t-small ml-auto hidden items-center gap-2 font-semibold text-green sm:flex">
            <span className="size-2 rounded-full bg-green" style={{ animation: "wf-pulse 1.4s ease-in-out infinite" }} />
            Agente activo
          </span>
        </div>

        <div className="relative min-h-[400px] px-5 py-5 sm:min-h-[320px]">
          {CHANNELS.map((c, i) => (
            <div
              key={c.id}
              aria-hidden={i !== ch}
              className="absolute inset-0 flex flex-col justify-end gap-2.5 px-5 py-5 transition-opacity ease-in-out"
              style={{ opacity: i === ch ? 1 : 0, transitionDuration: "1600ms" }}
            >
              {c.msgs.slice(0, counts[i]).map((m, k) => (
                <div
                  key={k}
                  className={`max-w-[84%] rounded-xl px-4 py-2.5 text-[15px] leading-snug ${
                    m.from === "lead" ? "self-start bg-navy-4" : "self-end bg-brand-blue"
                  }`}
                  style={{ animation: "rise 0.45s cubic-bezier(.2,.7,.2,1) both" }}
                >
                  {m.text}
                </div>
              ))}
              {i === ch && shown < c.msgs.length && c.msgs[shown].from === "ai" && (
                <div className="flex gap-1.5 self-end rounded-xl bg-brand-blue/60 px-4 py-3" aria-hidden>
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="size-1.5 rounded-full bg-ink" style={{ animation: `typing 1s ${d * 0.15}s infinite` }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <ol className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {STEPS.map((s, i) => {
            const on = i < done;
            return (
              <li key={s} className="flex items-center gap-2 bg-navy-2 px-4 py-3.5 text-[13px] font-semibold" style={{ color: on ? "var(--escalab-white)" : "var(--escalab-gray)" }}>
                <span
                  className="grid size-5 shrink-0 place-items-center rounded-full transition-colors duration-500"
                  style={{ background: on ? "var(--escalab-green)" : "var(--navy-4)", color: "var(--escalab-navy)" }}
                >
                  {on && <Check size={12} strokeWidth={3.5} />}
                </span>
                {s}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
