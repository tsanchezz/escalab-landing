"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { SiGooglecalendar, SiInstagram, SiWhatsapp } from "react-icons/si";
import { Bot, Brain, Check, Cpu, GitBranch, Timer } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import { usePinned } from "@/lib/use-pinned";

const W = 1000;
const H = 460;
const NH = 72;

type Node = { id: string; x: number; y: number; w: number; type: string; name: string; Icon: IconType | LucideIcon; at: number };

// `at` = paso a partir del cual el nodo está encendido
const NODES: Node[] = [
  { id: "trigger", x: 20, y: 130, w: 215, type: "Trigger", name: "Mensaje nuevo", Icon: SiInstagram, at: 1 },
  { id: "agent", x: 275, y: 130, w: 215, type: "AI Agent", name: "Atiende y califica", Icon: Bot, at: 2 },
  { id: "model", x: 175, y: 330, w: 190, type: "Modelo", name: "Chat de IA", Icon: Cpu, at: 2 },
  { id: "mem", x: 395, y: 330, w: 190, type: "Memoria", name: "Contexto", Icon: Brain, at: 2 },
  { id: "if", x: 540, y: 130, w: 190, type: "IF", name: "¿Calificado?", Icon: GitBranch, at: 3 },
  { id: "cal", x: 790, y: 30, w: 205, type: "Calendar", name: "Agendar reunión", Icon: SiGooglecalendar, at: 4 },
  { id: "wait", x: 790, y: 232, w: 205, type: "Espera · 24 h", name: "Seguimiento", Icon: Timer, at: 5 },
  { id: "send", x: 790, y: 360, w: 205, type: "WhatsApp", name: "Recordatorio", Icon: SiWhatsapp, at: 6 },
];

// cables: [d, paso en el que se dibuja, discontinuo]
const WIRES: [string, number, boolean][] = [
  ["M235,166 L275,166", 2, false],
  ["M490,166 L540,166", 3, false],
  ["M730,166 C765,166 765,66 790,66", 4, false],
  ["M730,166 C765,166 765,268 790,268", 5, false],
  ["M892,304 L892,360", 6, false],
  ["M350,202 C350,270 270,262 270,330", 2, true],
  ["M420,202 C420,270 490,262 490,330", 2, true],
];

// dónde está el paquete de datos en cada paso
const STOPS = [
  { x: 20, y: 166 },
  { x: 20, y: 166 },
  { x: 275, y: 166 },
  { x: 540, y: 166 },
  { x: 790, y: 66 },
  { x: 790, y: 268 },
  { x: 892, y: 360 },
  { x: 892, y: 360 },
];

const CAPTIONS = [
  "Un lead todavía no escribió.",
  "Llega un mensaje por Instagram.",
  "El agente de IA lo atiende y lo califica.",
  "El nodo IF decide si el lead vale la pena.",
  "Si califica, se agenda la reunión en el calendario.",
  "Si no, el flujo espera 24 horas.",
  "Y le escribe por WhatsApp para retomar.",
  "Ejecución exitosa. Del mensaje a la venta, sin tocar nada.",
];

export function WorkflowScene() {
  const ref = useRef<HTMLElement>(null);
  const pinned = usePinned();
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!pinned) return;
    setStep(Math.max(0, Math.min(7, Math.floor(p * 8.4))));
  });

  const s = pinned ? step : 7;
  const stop = STOPS[s];
  const wideLayout = pinned;

  return (
    <section
      ref={ref}
      aria-labelledby="scene-title"
      className={wideLayout ? "relative h-[360vh]" : "relative py-20"}
    >
      <div className={wideLayout ? "sticky top-0 flex h-svh flex-col justify-center gap-6 pt-20" : ""}>
        <div className="page-m grid items-end gap-4 lg:grid-cols-12">
          <h2 id="scene-title" className="t-h2 lg:col-span-6">
            Así corre tu workflow.
          </h2>
          <p className="min-h-[3.2em] max-w-[34ch] text-[19px] leading-snug text-ink lg:col-span-6 lg:justify-self-end" aria-live="polite">
            {CAPTIONS[s]}
          </p>
        </div>

        <div className="page-m">
          <div data-ui className="ui-node overflow-hidden">
            <div className="flex items-center justify-between bg-navy-3 px-5 py-3">
              <p className="text-[15px] font-bold">Workflow · De lead a venta</p>
              <p className="t-small flex items-center gap-2 font-semibold" style={{ color: s === 7 ? "var(--escalab-green)" : "var(--escalab-cyan)" }}>
                {s === 7 ? <Check size={14} strokeWidth={3.5} /> : <span className="size-2 rounded-full bg-cyan" style={{ animation: "wf-pulse 1.1s ease-in-out infinite" }} />}
                {s === 7 ? "Exitosa" : s === 0 ? "Esperando" : "Ejecutando"}
              </p>
            </div>
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Diagrama del workflow de n8n">
              <svg viewBox={`0 0 ${W} ${H}`} className="block w-full min-w-[860px]" role="img" aria-label="Workflow de n8n: trigger, agente de IA, condición, calendario, espera y WhatsApp">
                <defs>
                  <pattern id="scene-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.3" fill="#263746" />
                  </pattern>
                  <linearGradient id="scene-grad" x1="0" x2="1">
                    <stop offset="0" stopColor="#174ED8" />
                    <stop offset="0.5" stopColor="#42C5A4" />
                    <stop offset="1" stopColor="#C8EB63" />
                  </linearGradient>
                </defs>
                <rect width={W} height={H} fill="url(#scene-dots)" />

                {WIRES.map(([d, at, dashed]) => (
                  <g key={d}>
                    <path d={d} fill="none" stroke="#263746" strokeWidth="2.5" strokeDasharray={dashed ? "4 6" : undefined} />
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="url(#scene-grad)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={false}
                      animate={{ pathLength: s >= at ? 1 : 0, opacity: s >= at ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </g>
                ))}

                {NODES.map(({ id, x, y, w, type, name, Icon, at }) => {
                  const on = s >= at;
                  const current = s === at;
                  return (
                    <foreignObject key={id} x={x} y={y} width={w} height={NH} style={{ overflow: "visible" }}>
                      <div
                        className="ui-node flex h-full items-center gap-3 px-3 transition-[opacity,border-color,box-shadow] duration-500"
                        style={{
                          opacity: on ? 1 : 0.32,
                          borderColor: current ? "var(--escalab-cyan)" : on ? "var(--escalab-teal)" : undefined,
                          boxShadow: current ? "0 0 0 4px rgb(38 155 210 / .18)" : undefined,
                        }}
                      >
                        <span className="ui-port in" />
                        <span className="ui-port out" />
                        <span className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-navy-4" style={{ color: on ? "var(--escalab-cyan)" : "var(--escalab-gray)" }}>
                          <Icon size={18} />
                        </span>
                        <span className="min-w-0 leading-tight">
                          <span className="t-micro block truncate text-soft">{type}</span>
                          <span className="block truncate text-[14px] font-bold">{name}</span>
                        </span>
                      </div>
                    </foreignObject>
                  );
                })}

                <motion.circle
                  r="7"
                  fill="#C8EB63"
                  initial={false}
                  animate={{ cx: stop.x, cy: stop.y, opacity: s === 0 ? 0 : 1 }}
                  transition={{ type: "spring", stiffness: 90, damping: 18 }}
                  style={{ filter: "drop-shadow(0 0 8px rgb(200 235 99 / .8))" }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
