"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { SiInstagram, SiWhatsapp, SiMessenger, SiN8N, SiGooglecalendar } from "react-icons/si";
import {
  BatteryFull,
  Bot,
  Camera,
  Check,
  CheckCheck,
  ChevronLeft,
  GitBranch,
  Heart,
  Image as ImageIcon,
  LoaderCircle,
  Mic,
  Phone as PhoneIcon,
  Plus,
  Signal,
  Smile,
  Video,
  Wifi,
} from "lucide-react";

type Msg = { from: "lead" | "ai"; text: string; time: string };
type Chat = { id: "ig" | "wa" | "fb"; name: string; sub: string; msgs: Msg[] };

const CHATS: Chat[] = [
  {
    id: "ig",
    name: "tallernomade",
    sub: "Activo ahora",
    msgs: [
      { from: "lead", time: "22:40", text: "Hola! ¿Hacen envíos a Córdoba? Necesito 20 unidades." },
      { from: "ai", time: "22:40", text: "¡Hola, Lucía! Sí, enviamos a todo el país. ¿Te armo un presupuesto ahora?" },
      { from: "lead", time: "22:41", text: "Dale, por favor." },
      { from: "ai", time: "22:41", text: "Listo. Te lo mando por acá y te propongo una llamada corta para confirmarlo." },
    ],
  },
  {
    id: "wa",
    name: "Taller Nómade",
    sub: "en línea",
    msgs: [
      { from: "lead", time: "22:52", text: "Buenas, ¿tienen turno para el sábado?" },
      { from: "ai", time: "22:52", text: "Hola, Martín. Tengo sábado a las 10:30 o a las 12:00. ¿Cuál te sirve?" },
      { from: "lead", time: "22:53", text: "10:30 está perfecto." },
      { from: "ai", time: "22:53", text: "Reservado. Te mando un recordatorio el viernes a la tarde." },
    ],
  },
  {
    id: "fb",
    name: "Taller Nómade",
    sub: "Responde en segundos",
    msgs: [
      { from: "lead", time: "23:05", text: "¿Cuánto sale el plan para 3 sucursales?" },
      { from: "ai", time: "23:05", text: "Para 3 sucursales te recomiendo el plan Scale. ¿Querés ver el detalle?" },
      { from: "lead", time: "23:06", text: "Sí, pasame." },
      { from: "ai", time: "23:06", text: "Te lo envío ahora y coordino una reunión para revisarlo juntos." },
    ],
  },
];

const N8N_STEPS = [
  { name: "Instagram Trigger", detail: "Mensaje nuevo", Icon: SiInstagram },
  { name: "AI Agent", detail: "Responde y califica", Icon: Bot },
  { name: "IF", detail: "¿Lead calificado?", Icon: GitBranch },
  { name: "Google Calendar", detail: "Reunión agendada", Icon: SiGooglecalendar },
  { name: "WhatsApp", detail: "Recordatorio enviado", Icon: SiWhatsapp },
] as const;

const APPS = [
  { id: "ig", label: "Instagram", Icon: SiInstagram, total: 4 },
  { id: "wa", label: "WhatsApp", Icon: SiWhatsapp, total: 4 },
  { id: "fb", label: "Messenger", Icon: SiMessenger, total: 4 },
  { id: "n8n", label: "n8n", Icon: SiN8N, total: N8N_STEPS.length },
] as const;

const STEP_MS = 1500;
const HOLD_MS = 3400;

/* ───────── pantallas ───────── */

function Typing({ className, dot }: { className: string; dot: string }) {
  return (
    <div className={`flex w-14 gap-1.5 px-4 py-3 ${className}`} aria-hidden>
      {[0, 1, 2].map((d) => (
        <span key={d} className="size-1.5 rounded-full" style={{ background: dot, animation: `typing 1s ${d * 0.15}s infinite` }} />
      ))}
    </div>
  );
}

const pop = { animation: "rise 0.4s cubic-bezier(.2,.7,.2,1) both" } as const;

function InstagramScreen({ chat, shown }: { chat: Chat; shown: number }) {
  const typing = shown < chat.msgs.length && chat.msgs[shown].from === "ai";
  return (
    <div className="flex h-full flex-col bg-black text-white">
      <div className="flex items-center gap-3 px-4 py-3">
        <ChevronLeft size={22} />
        <span className="grid size-8 place-items-center rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] p-[2px]">
          <span className="grid size-full place-items-center rounded-full bg-black text-[12px] font-bold">T</span>
        </span>
        <div className="min-w-0 leading-tight">
          <p className="text-[14px] font-semibold">{chat.name}</p>
          <p className="text-[12px] text-[#a8a8a8]">{chat.sub}</p>
        </div>
        <PhoneIcon size={20} className="ml-auto" />
        <Video size={22} />
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-3 pb-2">
        {chat.msgs.slice(0, shown).map((m, i) => (
          <p
            key={i}
            className={`max-w-[78%] rounded-[20px] px-3.5 py-2 text-[14px] leading-snug ${m.from === "lead" ? "self-end bg-[linear-gradient(135deg,#3797f0,#7c3aed)]" : "self-start bg-[#262626]"}`}
            style={pop}
          >
            {m.text}
          </p>
        ))}
        {typing && <Typing className="self-start rounded-[20px] bg-[#262626]" dot="#a8a8a8" />}
      </div>
      <div className="mx-3 mb-4 flex items-center gap-2 rounded-full border border-[#363636] px-3 py-2 text-[#a8a8a8]">
        <Camera size={20} className="text-white" />
        <span className="flex-1 text-[14px]">Mensaje…</span>
        <Mic size={19} />
        <ImageIcon size={19} />
        <Heart size={19} />
      </div>
    </div>
  );
}

function WhatsappScreen({ chat, shown }: { chat: Chat; shown: number }) {
  const typing = shown < chat.msgs.length && chat.msgs[shown].from === "ai";
  return (
    <div className="flex h-full flex-col bg-[#0b141a] text-[#e9edef]">
      <div className="flex items-center gap-2.5 bg-[#202c33] px-3 py-2.5">
        <ChevronLeft size={22} />
        <span className="grid size-9 place-items-center rounded-full bg-[#00a884] text-[14px] font-bold text-[#0b141a]">N</span>
        <div className="min-w-0 leading-tight">
          <p className="text-[15px] font-semibold">{chat.name}</p>
          <p className="text-[12px] text-[#8696a0]">{typing ? "escribiendo…" : chat.sub}</p>
        </div>
        <Video size={20} className="ml-auto" />
        <PhoneIcon size={19} />
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-3 pb-2">
        {chat.msgs.slice(0, shown).map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] rounded-lg px-2.5 pb-1 pt-1.5 text-[14px] leading-snug ${m.from === "lead" ? "self-end bg-[#005c4b]" : "self-start bg-[#202c33]"}`}
            style={pop}
          >
            {m.text}
            <span className="mt-0.5 flex items-center justify-end gap-1 text-[12px] text-[#8696a0]">
              {m.time}
              {m.from === "lead" && <CheckCheck size={14} className="text-[#53bdeb]" />}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-2.5 pb-4">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-[#202c33] px-3 py-2 text-[#8696a0]">
          <Smile size={20} />
          <span className="flex-1 text-[14px]">Mensaje</span>
          <Plus size={20} />
        </div>
        <span className="grid size-10 place-items-center rounded-full bg-[#00a884] text-[#0b141a]">
          <Mic size={19} />
        </span>
      </div>
    </div>
  );
}

function MessengerScreen({ chat, shown }: { chat: Chat; shown: number }) {
  const typing = shown < chat.msgs.length && chat.msgs[shown].from === "ai";
  return (
    <div className="flex h-full flex-col bg-black text-white">
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <ChevronLeft size={24} className="text-[#0a84ff]" />
        <span className="grid size-9 place-items-center rounded-full bg-[#0a84ff] text-[14px] font-bold">N</span>
        <div className="min-w-0 leading-tight">
          <p className="text-[15px] font-semibold">{chat.name}</p>
          <p className="text-[12px] text-[#a8a8a8]">{chat.sub}</p>
        </div>
        <PhoneIcon size={20} className="ml-auto text-[#0a84ff]" />
        <Video size={22} className="text-[#0a84ff]" />
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-3 pb-2">
        {chat.msgs.slice(0, shown).map((m, i) => (
          <p
            key={i}
            className={`max-w-[78%] rounded-[20px] px-3.5 py-2 text-[14px] leading-snug ${m.from === "lead" ? "self-end bg-[linear-gradient(160deg,#0a84ff,#a033ff)]" : "self-start bg-[#303030]"}`}
            style={pop}
          >
            {m.text}
          </p>
        ))}
        {typing && <Typing className="self-start rounded-[20px] bg-[#303030]" dot="#a8a8a8" />}
      </div>
      <div className="flex items-center gap-3 px-3 pb-4 text-[#0a84ff]">
        <Plus size={22} />
        <Camera size={21} />
        <ImageIcon size={21} />
        <span className="flex-1 rounded-full bg-[#303030] px-3.5 py-2 text-[14px] text-[#a8a8a8]">Aa</span>
        <Mic size={21} />
      </div>
    </div>
  );
}

function N8nScreen({ shown }: { shown: number }) {
  const done = shown >= N8N_STEPS.length;
  return (
    <div className="flex h-full flex-col bg-[#141118] text-[#f1eef5]">
      <div className="flex items-center gap-2.5 px-4 pb-3 pt-3">
        <SiN8N size={26} color="#ea4b71" />
        <p className="text-[16px] font-bold">Ejecuciones</p>
        <span
          className="ml-auto rounded-md px-2 py-1 text-[12px] font-bold"
          style={{ background: done ? "rgb(112 213 138 / .18)" : "rgb(38 155 210 / .2)", color: done ? "#70d58a" : "#6cc4ee" }}
        >
          {done ? "Exitosa" : "En curso"}
        </span>
      </div>
      <div className="mx-3 rounded-xl bg-[#1f1b26] px-3.5 py-3">
        <p className="text-[14px] font-semibold">Lead → Venta</p>
        <p className="text-[12px] text-[#9a93a8]">Ejecución #1284 · Producción</p>
      </div>
      <ol className="relative mt-3 flex flex-1 flex-col gap-2.5 px-4">
        <span aria-hidden className="absolute bottom-6 left-[31px] top-6 w-0.5 bg-[#2c2735]" />
        {N8N_STEPS.map(({ name, detail, Icon }, i) => {
          const state = i < shown ? "done" : i === shown ? "run" : "wait";
          return (
            <li key={name} className="relative flex items-center gap-3" style={{ opacity: state === "wait" ? 0.45 : 1, transition: "opacity 400ms" }}>
              <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-lg bg-[#2a2433]">
                <Icon size={17} />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-[14px] font-semibold">{name}</span>
                <span className="block text-[12px] text-[#9a93a8]">{detail}</span>
              </span>
              {state === "done" && (
                <span className="flex items-center gap-1 text-[12px] text-[#70d58a]" style={pop}>
                  <Check size={15} strokeWidth={3} /> 0.{3 + i} s
                </span>
              )}
              {state === "run" && <LoaderCircle size={17} className="animate-spin text-[#6cc4ee]" />}
            </li>
          );
        })}
      </ol>
      <div className="mx-4 mb-5 mt-2 h-1.5 overflow-hidden rounded-full bg-[#2c2735]">
        <span className="block h-full rounded-full bg-[#ea4b71] transition-[width] duration-700" style={{ width: `${(Math.min(shown, N8N_STEPS.length) / N8N_STEPS.length) * 100}%` }} />
      </div>
    </div>
  );
}

/* ───────── celular + dock ───────── */

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto h-[600px] w-[292px] rounded-[48px] bg-[#05080d] p-[9px] shadow-[0_0_0_2px_#263746,0_30px_80px_-20px_rgb(0_0_0/0.7)]" data-ui>
      <span aria-hidden className="absolute -left-[3px] top-28 h-10 w-[3px] rounded-l bg-[#263746]" />
      <span aria-hidden className="absolute -left-[3px] top-44 h-14 w-[3px] rounded-l bg-[#263746]" />
      <span aria-hidden className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-[#263746]" />
      <div className="relative h-full overflow-hidden rounded-[40px] bg-black">
        <div className="absolute inset-x-0 top-0 z-20 flex h-11 items-center justify-between px-7 text-[13px] font-semibold text-white">
          <span>22:40</span>
          <span className="flex items-center gap-1.5">
            <Signal size={14} />
            <Wifi size={14} />
            <BatteryFull size={18} />
          </span>
        </div>
        <span aria-hidden className="absolute left-1/2 top-2.5 z-30 h-[24px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
        <div className="absolute inset-x-0 bottom-0 top-11">{children}</div>
        <span aria-hidden className="absolute bottom-1.5 left-1/2 z-20 h-1 w-28 -translate-x-1/2 rounded-full bg-white/70" />
      </div>
    </div>
  );
}

export function PhoneDemo() {
  const reduce = useReducedMotion();
  const [app, setApp] = useState(0);
  const [counts, setCounts] = useState<number[]>(() => APPS.map(() => 0));
  const timer = useRef<number | undefined>(undefined);
  const tilt = useRef<HTMLDivElement>(null);

  const run = useCallback((a: number, n: number) => {
    setApp(a);
    setCounts((prev) => prev.map((v, i) => (i === a ? n : v)));
    window.clearTimeout(timer.current);
    if (n < APPS[a].total) {
      timer.current = window.setTimeout(() => run(a, n + 1), STEP_MS);
    } else {
      timer.current = window.setTimeout(() => run((a + 1) % APPS.length, 0), HOLD_MS);
    }
  }, []);

  useEffect(() => {
    if (reduce) {
      setCounts(APPS.map((a) => a.total));
      return;
    }
    const start = window.setTimeout(() => run(0, 1), 700);
    const onVis = () => document.hidden && window.clearTimeout(timer.current);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(timer.current);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce, run]);

  function select(i: number) {
    if (reduce) {
      setApp(i);
      return;
    }
    run(i, 0);
    window.setTimeout(() => run(i, 1), 300);
  }

  function onMove(e: React.PointerEvent) {
    const el = tilt.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
  }
  function onLeave() {
    if (tilt.current) tilt.current.style.transform = "";
  }

  const shown = counts[app];
  return (
    <div className="relative" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div aria-hidden className="glow bg-brand-blue" style={{ inset: "10% 5%", opacity: 0.35 }} />
      <div ref={tilt} className="relative transition-transform duration-300 ease-out will-change-transform" style={{ animation: reduce ? undefined : "float 7s ease-in-out infinite" }}>
        <Frame>
          {APPS.map((a, i) => (
            <div
              key={a.id}
              aria-hidden={i !== app}
              className="absolute inset-0 transition-opacity ease-in-out"
              style={{ opacity: i === app ? 1 : 0, transitionDuration: "900ms", pointerEvents: i === app ? "auto" : "none" }}
            >
              {a.id === "ig" && <InstagramScreen chat={CHATS[0]} shown={counts[0]} />}
              {a.id === "wa" && <WhatsappScreen chat={CHATS[1]} shown={counts[1]} />}
              {a.id === "fb" && <MessengerScreen chat={CHATS[2]} shown={counts[2]} />}
              {a.id === "n8n" && <N8nScreen shown={counts[3]} />}
            </div>
          ))}
        </Frame>
      </div>

      <div role="tablist" aria-label="Canal de la conversación" className="relative mx-auto mt-7 flex w-fit gap-2.5">
        {APPS.map((a, i) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={i === app}
            aria-label={a.label}
            onClick={() => select(i)}
            className="glass relative grid size-12 place-items-center rounded-xl transition-transform duration-200 hover:-translate-y-0.5"
            style={{ color: i === app ? "var(--escalab-white)" : "var(--escalab-gray)", boxShadow: i === app ? "0 0 0 2px var(--escalab-teal), inset 0 1px 0 rgb(255 255 255 / .35)" : undefined }}
          >
            <a.Icon size={22} />
          </button>
        ))}
      </div>
      <p className="t-small mt-3 text-center text-soft" aria-live="off">
        {APPS[app].label} · simulación de un flujo real
      </p>
      <span className="sr-only">{shown}</span>
    </div>
  );
}
