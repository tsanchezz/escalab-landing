"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Bot } from "lucide-react";
import { NodeChip } from "@/components/workflow";
import { Reveal } from "@/components/reveal";
import { usePinned } from "@/lib/use-pinned";

const FIELDS = [
  { clause: "Primero, llega el mensaje.", bg: "#071421" },
  { clause: "Después, la IA lo califica.", bg: "#0d2236" },
  { clause: "Luego, se agenda la reunión.", bg: "#123049" },
  { clause: "Y se cierra la venta.", bg: "#19405f" },
] as const;

const STATUS = ["Nuevo", "Calificado", "Agendado", "Ganado"] as const;

/** La misma tarjeta de lead, cada vez más avanzada. */
function LeadCard({ stage }: { stage: 0 | 1 | 2 | 3 }) {
  return (
    <div
      data-ui
      className="ui-node relative h-[330px] w-[260px] max-w-full p-4 text-left transition-transform duration-150 hover:-translate-y-1.5"
    >
      <span className="ui-port in" />
      <span className="ui-port out" />
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-navy-4 text-[14px] font-extrabold">L</span>
        <div className="min-w-0 leading-tight">
          <p className="text-[15px] font-bold">Lucía R.</p>
          <p className="t-small text-soft">Instagram</p>
        </div>
        <span
          className="ml-auto rounded-md px-2 py-1 text-[13px] font-bold"
          style={{ background: stage === 3 ? "var(--escalab-green)" : "var(--navy-4)", color: stage === 3 ? "var(--escalab-navy)" : "var(--escalab-white)" }}
        >
          {STATUS[stage]}
        </span>
      </div>

      <p className="mt-4 rounded-lg bg-navy-3 p-3 text-[14px] leading-snug">Necesito 20 unidades. ¿Envían a Córdoba?</p>

      <dl className="mt-4 grid gap-3 text-[14px]">
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
            <dd className="text-right font-bold">Jue 16:00 · Calendar</dd>
          </div>
        )}
        {stage >= 3 && (
          <div className="flex justify-between gap-3">
            <dt className="text-soft">Presupuesto aceptado</dt>
            <dd className="font-bold tabular-nums text-green">ARS 480.000</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

function Field({ i, progress, pinned }: { i: number; progress: MotionValue<number>; pinned: boolean }) {
  const f = FIELDS[i];
  const start = 0.06 + i * 0.22;
  const t = useTransform(progress, [start, start + 0.14], [0, 1]);
  const y = useTransform(t, [0, 1], [48, 0]);
  const style = pinned ? { opacity: t, y } : undefined;

  return (
    <div
      className="relative flex min-h-[520px] flex-col justify-start gap-8 pb-9 pl-[var(--pl)] pr-7 pt-28 lg:h-full lg:min-h-0 lg:justify-end lg:gap-0 lg:pt-0"
      style={{ background: f.bg, ["--pl" as string]: i === 0 ? "var(--m)" : "28px" }}
    >
      {i === 0 && (
        <h2 id="como-title" className="absolute left-[var(--pl)] top-24 max-w-[11ch] text-[clamp(24px,2vw,32px)] font-extrabold leading-[1.05] tracking-tight">
          Un lead, cuatro nodos.
        </h2>
      )}
      <motion.div className="z-10 lg:absolute lg:left-[var(--pl)] lg:top-[38%]" style={style}>
        <LeadCard stage={i as 0 | 1 | 2 | 3} />
      </motion.div>
      <motion.div style={style}>
        <p className="max-w-[16ch] text-[clamp(22px,2vw,32px)] font-bold leading-[1.1] tracking-tight">{f.clause}</p>
      </motion.div>
    </div>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const pinned = usePinned();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const packet = useTransform(scrollYProgress, [0.04, 0.96], ["0%", "100%"]);

  return (
    <section id="como-funciona" aria-labelledby="como-title">
      <div className="page-m pb-12 pt-8">
        <Reveal>
          <NodeChip type="AI Agent · n8n" name="El agente de Escalab" icon={<Bot size={18} />} />
        </Reveal>
      </div>

      <div ref={ref} className={pinned ? "relative h-[380vh]" : "relative"}>
        <div className={pinned ? "sticky top-0 h-svh" : ""}>
          <div className="relative grid h-full md:grid-cols-2 lg:grid-cols-4">
            {FIELDS.map((f, i) => (
              <Field key={f.clause} i={i} progress={scrollYProgress} pinned={pinned} />
            ))}

            {/* cable de ejecución que atraviesa los cuatro campos, por detrás de las tarjetas */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 z-0 hidden overflow-hidden [container-type:inline-size] lg:block" style={{ top: "calc(38% + 165px)" }}>
              <div className="h-0.5 w-full" style={{ background: "repeating-linear-gradient(90deg, var(--escalab-border) 0 8px, transparent 8px 16px)" }} />
              {pinned ? (
                <motion.span className="absolute -top-[5px] size-3 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_18px_2px_rgb(200_235_99/0.55)]" style={{ left: packet }} />
              ) : (
                <span className="packet-run absolute -top-[5px] left-0 size-3 rounded-full bg-lime" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
