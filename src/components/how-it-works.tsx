import { Bot } from "lucide-react";
import { NodeChip } from "@/components/workflow";
import { Reveal } from "@/components/reveal";
import { WorkflowCanvas } from "@/components/workflow-canvas";

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
      className="ui-node lead-card relative h-[330px] w-[260px] max-w-full p-4 text-left transition-transform duration-150 hover:-translate-y-1.5"
    >
      <span className="ui-port in" />
      <span className="ui-port out" />
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-[9px] bg-navy-4 text-[14px] font-extrabold">L</span>
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

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-title">
      <div className="page-m pb-12 pt-8">
        <Reveal>
          <NodeChip type="AI Agent · n8n" name="El agente de Escalab" icon={<Bot size={18} />} />
        </Reveal>
      </div>

      <div className="relative grid [container-type:inline-size] md:grid-cols-2 lg:grid-cols-4">
        {FIELDS.map((f, i) => (
          <div
            key={f.clause}
            className="relative flex flex-col justify-start gap-8 pb-9 pl-[var(--pl)] pr-7 pt-28 lg:h-[min(84svh,760px)] lg:justify-end lg:gap-0 lg:pt-0"
            style={{ background: f.bg, ["--pl" as string]: i === 0 ? "var(--m)" : "28px" }}
          >
            {i === 0 && (
              <h2 id="como-title" className="absolute left-[var(--pl)] top-8 max-w-[11ch] text-[clamp(24px,2vw,32px)] font-extrabold leading-[1.05] tracking-tight">
                Un lead, cuatro nodos.
              </h2>
            )}
            <Reveal delay={i * 0.12} className="z-10 lg:absolute lg:left-[var(--pl)] lg:top-[38%]">
              <LeadCard stage={i as 0 | 1 | 2 | 3} />
            </Reveal>
            <Reveal delay={0.1 + i * 0.12}>
              <p className="max-w-[16ch] text-[clamp(22px,2vw,32px)] font-bold leading-[1.1] tracking-tight">{f.clause}</p>
            </Reveal>
          </div>
        ))}

        {/* cable de ejecución que atraviesa los cuatro campos, por detrás de las tarjetas */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 z-0 hidden lg:block" style={{ top: "calc(38% + 165px)" }}>
          <div className="h-0.5 w-full" style={{ background: "repeating-linear-gradient(90deg, var(--escalab-border) 0 8px, transparent 8px 16px)" }} />
          <span className="packet-run absolute -top-[5px] left-0 size-3 rounded-full bg-lime" />
        </div>
      </div>

      <WorkflowCanvas />
    </section>
  );
}
