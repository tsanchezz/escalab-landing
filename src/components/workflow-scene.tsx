"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { SiGooglecalendar, SiInstagram, SiWhatsapp } from "react-icons/si";
import { Bot, Brain, Check, Cpu, GitBranch, Timer } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import { usePinned } from "@/lib/use-pinned";

const W = 1000;
const H = 400;
const NH = 60;

type Node = { id: string; x: number; y: number; w: number; type: string; name: string; Icon: IconType | LucideIcon; at: number; inPort?: boolean; outPort?: boolean };

// `at` = paso a partir del cual el nodo está encendido. Los puertos sólo existen donde hay un cable.
const NODES: Node[] = [
  { id: "trigger", x: 10, y: 140, w: 170, type: "Trigger", name: "Mensaje nuevo", Icon: SiInstagram, at: 1, outPort: true },
  { id: "agent", x: 215, y: 140, w: 190, type: "AI Agent", name: "Atiende y califica", Icon: Bot, at: 2, inPort: true, outPort: true },
  { id: "model", x: 150, y: 300, w: 170, type: "Modelo", name: "Chat de IA", Icon: Cpu, at: 2 },
  { id: "mem", x: 350, y: 300, w: 170, type: "Memoria", name: "Contexto", Icon: Brain, at: 2 },
  { id: "if", x: 440, y: 140, w: 150, type: "IF", name: "¿Calificado?", Icon: GitBranch, at: 3, inPort: true, outPort: true },
  { id: "cal", x: 640, y: 40, w: 190, type: "Calendar", name: "Agendar reunión", Icon: SiGooglecalendar, at: 4, inPort: true },
  { id: "wait", x: 640, y: 240, w: 150, type: "Espera", name: "A las 24 h", Icon: Timer, at: 5, inPort: true, outPort: true },
  { id: "send", x: 830, y: 240, w: 160, type: "WhatsApp", name: "Recordatorio", Icon: SiWhatsapp, at: 6, inPort: true },
];

// cables: [d, paso en el que se dibuja, discontinuo]
const WIRES: [string, number, boolean][] = [
  ["M180,170 L215,170", 2, false],
  ["M405,170 L440,170", 3, false],
  ["M590,170 C615,170 615,70 640,70", 4, false],
  ["M590,170 C615,170 615,270 640,270", 5, false],
  ["M790,270 L830,270", 6, false],
  ["M300,200 C300,250 235,250 235,300", 2, true],
  ["M350,200 C350,250 435,250 435,300", 2, true],
];

// dónde está el paquete de datos en cada paso
const STOPS = [
  { x: 10, y: 170 },
  { x: 180, y: 170 },
  { x: 405, y: 170 },
  { x: 590, y: 170 },
  { x: 640, y: 70 },
  { x: 640, y: 270 },
  { x: 830, y: 270 },
  { x: 830, y: 270 },
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
      className={wideLayout ? "relative h-[300vh]" : "relative py-20"}
    >
      <div className={wideLayout ? "sticky top-0 flex h-svh flex-col justify-center gap-5 pt-16" : ""}>
        <div className="page-m flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
          <h2 id="scene-title" className="t-h2">
            Así corre tu workflow.
          </h2>
          <p className="min-h-[2.8em] max-w-[34ch] text-[15px] leading-snug text-soft" aria-live="polite">
            {CAPTIONS[s]}
          </p>
        </div>

        <div className="page-m">
          <div data-ui className="ui-node overflow-hidden">
            <div className="flex items-center justify-between bg-navy-3 px-4 py-2.5">
              <p className="text-[15px] font-bold">Workflow · De lead a venta</p>
              <p className="t-small flex items-center gap-2 font-semibold" style={{ color: s === 7 ? "var(--escalab-green)" : "var(--escalab-cyan)" }}>
                {s === 7 ? <Check size={14} strokeWidth={3.5} /> : <span className="size-2 rounded-full bg-cyan" style={{ animation: "wf-pulse 1.1s ease-in-out infinite" }} />}
                {s === 7 ? "Exitosa" : s === 0 ? "Esperando" : "Ejecutando"}
              </p>
            </div>
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Diagrama del workflow de n8n">
              <svg viewBox={`0 0 ${W} ${H}`} className="block w-full min-w-[760px]" role="img" aria-label="Workflow de n8n: trigger, agente de IA, condición, calendario, espera y WhatsApp">
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

                {NODES.map(({ id, x, y, w, type, name, Icon, at, inPort, outPort }) => {
                  const on = s >= at;
                  const current = s === at;
                  return (
                    <foreignObject key={id} x={x} y={y} width={w} height={NH} style={{ overflow: "visible" }}>
                      <div
                        className="ui-node flex h-full items-center gap-2.5 px-2.5 transition-[opacity,border-color,box-shadow] duration-500"
                        style={{
                          opacity: on ? 1 : 0.32,
                          borderColor: current ? "var(--escalab-cyan)" : on ? "var(--escalab-teal)" : undefined,
                          boxShadow: current ? "0 0 0 4px rgb(38 155 210 / .18)" : undefined,
                        }}
                      >
                        {inPort && <span className="ui-port in" />}
                        {outPort && <span className="ui-port out" />}
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-navy-4" style={{ color: on ? "var(--escalab-cyan)" : "var(--escalab-gray)" }}>
                          <Icon size={16} />
                        </span>
                        <span className="min-w-0 leading-tight">
                          <span className="block truncate text-[11px] font-bold uppercase tracking-[0.12em] text-soft">{type}</span>
                          <span className="block truncate text-[13px] font-bold">{name}</span>
                        </span>
                      </div>
                    </foreignObject>
                  );
                })}

                <motion.circle
                  r="6"
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
