import { Bot, CalendarCheck, GitBranch, MessageCircle, Send, Timer, Brain, Cpu } from "lucide-react";
import { Reveal } from "@/components/reveal";

type N = { id: string; x: number; y: number; type: string; name: string; Icon: typeof Bot; w?: number };

// Coordenadas en un lienzo de 1000 x 460 (las mismas del SVG de cables).
const W = 1000;
const H = 460;
const NW = 190;
const NH = 72;

const NODES: N[] = [
  { id: "trigger", x: 20, y: 130, type: "Trigger", name: "Mensaje de Instagram", Icon: MessageCircle, w: 200 },
  { id: "agent", x: 275, y: 130, type: "AI Agent", name: "Atiende y califica", Icon: Bot },
  { id: "if", x: 530, y: 130, type: "IF", name: "¿Lead calificado?", Icon: GitBranch, w: 180 },
  { id: "cal", x: 790, y: 30, type: "Google Calendar", name: "Agendar reunión", Icon: CalendarCheck, w: 205 },
  { id: "wait", x: 790, y: 232, type: "Wait · 24 h", name: "Seguimiento", Icon: Timer, w: 175 },
  { id: "model", x: 180, y: 330, type: "Chat Model", name: "Modelo de IA", Icon: Cpu, w: 170 },
  { id: "mem", x: 390, y: 330, type: "Memory", name: "Contexto", Icon: Brain, w: 170 },
  { id: "send", x: 790, y: 360, type: "WhatsApp", name: "Enviar recordatorio", Icon: Send, w: 195 },
];

const wires = [
  "M220,166 L275,166", // trigger → agent
  "M465,166 L530,166", // agent → if
  "M710,166 C755,166 755,66 790,66", // if true → calendar
  "M710,166 C755,166 755,268 790,268", // if false → wait
  "M880,304 L880,360", // wait → whatsapp
];

export function WorkflowCanvas() {
  return (
    <Reveal className="page-m mt-20">
      <div data-ui className="ui-node overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-navy-3 px-5 py-3.5">
          <p className="text-[15px] font-bold">Workflow · De lead a venta</p>
          <p className="t-small flex items-center gap-2 font-semibold text-green">
            <span className="size-2 rounded-full bg-green" style={{ animation: "wf-pulse 1.4s ease-in-out infinite" }} />
            Activo
          </p>
        </div>

        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Diagrama del workflow de n8n">
          <div
            className="relative mx-auto min-w-[1000px]"
            style={{ aspectRatio: `${W} / ${H}` }}
          >
            <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`}>
              <defs>
                <pattern id="canvas-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.3" fill="#263746" />
                </pattern>
                <linearGradient id="canvas-grad" x1="0" x2="1">
                  <stop offset="0" stopColor="#174ED8" />
                  <stop offset="0.5" stopColor="#42C5A4" />
                  <stop offset="1" stopColor="#C8EB63" />
                </linearGradient>
              </defs>
              <rect width={W} height={H} fill="url(#canvas-dots)" />
              {wires.map((d) => (
                <g key={d}>
                  <path d={d} fill="none" stroke="var(--escalab-border)" strokeWidth="2.5" />
                  <path d={d} fill="none" stroke="url(#canvas-grad)" strokeWidth="2.5" strokeDasharray="7 11" style={{ animation: "wire-flow 1s linear infinite" }} />
                </g>
              ))}
              {/* conexiones de herramientas del agente */}
              <path d="M330,202 C330,270 265,262 265,330" fill="none" stroke="var(--escalab-border)" strokeWidth="2" strokeDasharray="4 6" />
              <path d="M410,202 C410,270 475,262 475,330" fill="none" stroke="var(--escalab-border)" strokeWidth="2" strokeDasharray="4 6" />
              {/* paquete de datos recorriendo la ruta principal */}
              <circle r="6" fill="#C8EB63" className="svg-packet">
                <animateMotion dur="7s" repeatCount="indefinite" path="M220,166 L710,166 C755,166 755,66 790,66" keyTimes="0;1" calcMode="linear" />
              </circle>
            </svg>

            {NODES.map(({ id, x, y, type, name, Icon, w }) => (
              <div
                key={id}
                className="ui-node absolute flex items-center gap-3 px-3 transition-colors duration-300 hover:border-cyan"
                style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%`, width: `${((w ?? NW) / W) * 100}%`, height: `${(NH / H) * 100}%` }}
              >
                <span className="ui-port in" />
                <span className="ui-port out" />
                <span className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-navy-4 text-cyan">
                  <Icon size={18} />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="t-micro block truncate text-soft">{type}</span>
                  <span className="block truncate text-[14px] font-bold">{name}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="t-small mt-4 max-w-[60ch] text-soft">
        Así se ve por dentro lo que construimos en n8n: cada caja es un nodo y cada cable, un paso que se ejecuta solo.
      </p>
    </Reveal>
  );
}
