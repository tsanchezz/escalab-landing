"use client";

import { useState } from "react";
import { Wrench } from "lucide-react";
import { NodeChip } from "@/components/workflow";
import { Reveal } from "@/components/reveal";
import { track } from "@/lib/analytics";

const ITEMS = [
  { id: "responder", t: "Responde mensajes en segundos.", c: "Tu agente atiende Instagram, WhatsApp y Messenger todos los días, a cualquier hora.", bg: "#0f2c63" },
  { id: "calificar", t: "Califica cada lead por vos.", c: "Puntúa interés y presupuesto, y te pasa sólo los contactos que valen la pena.", bg: "#0e3550" },
  { id: "agendar", t: "Agenda reuniones sin ida y vuelta.", c: "Cruza tu calendario y confirma el horario con el cliente en la misma conversación.", bg: "#0d3b3b" },
  { id: "crm", t: "Carga todo en tu CRM.", c: "Cada conversación queda registrada en Google Sheets, HubSpot o el CRM que ya uses.", bg: "#123d2c" },
  { id: "seguimiento", t: "Hace el seguimiento que se te olvida.", c: "Reactiva a quien no contestó a las 24 y a las 72 horas, con un mensaje distinto cada vez.", bg: "#2c3a12" },
] as const;

function Switch({ on, onToggle, labelledBy }: { on: boolean; onToggle: () => void; labelledBy: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-labelledby={labelledBy}
      onClick={onToggle}
      data-ui
      className="relative grid h-11 w-[76px] shrink-0 place-items-center rounded-full outline-offset-4"
    >
      <span className="absolute inset-y-[3px] inset-x-0 rounded-full transition-colors duration-300" style={{ background: on ? "var(--grad)" : "var(--escalab-border)" }} />
      <span
        className="absolute left-[7px] top-1/2 size-[26px] -translate-y-1/2 rounded-full bg-ink transition-transform duration-300"
        style={{ transform: `translate(${on ? 36 : 0}px, -50%)`, background: on ? "var(--escalab-navy)" : "var(--escalab-gray)" }}
      />
    </button>
  );
}

export function Features() {
  const [on, setOn] = useState<boolean[]>([true, false, true, false, false]);

  return (
    <section id="servicios" aria-labelledby="servicios-title" className="py-24 lg:py-32">
      <div className="page-m">
        <Reveal>
          <NodeChip type="Tools · Integraciones" name="Qué automatizamos" icon={<Wrench size={18} />} />
        </Reveal>
        <Reveal delay={0.08} as="h2" className="t-h2 mt-10 max-w-[16ch]">
          <span id="servicios-title">Prendé lo que necesitás.</span>
        </Reveal>
      </div>

      <ul className="mt-14 lg:mt-20">
        {ITEMS.map((it, i) => {
          const active = on[i];
          return (
            <li
              key={it.id}
              className="transition-colors duration-500"
              style={{ background: active ? it.bg : "var(--escalab-navy)" }}
            >
              <div className="page-m grid min-h-[132px] grid-cols-[1fr_auto] items-center gap-x-6 gap-y-0 py-6 lg:min-h-[20vh] lg:grid-cols-12 lg:gap-x-6">
                <div className="lg:col-span-10">
                  <h3
                    id={`f-${it.id}`}
                    className="text-[clamp(24px,3.6vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] transition-colors duration-500 max-lg:max-w-[22ch]"
                    style={{ color: active ? "var(--escalab-white)" : "var(--escalab-gray)" }}
                  >
                    {it.t}
                  </h3>
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                    style={{ gridTemplateRows: active ? "1fr" : "0fr", opacity: active ? 1 : 0 }}
                  >
                    <p className="overflow-hidden text-[17px] leading-snug text-ink max-lg:text-[15px]">
                      <span className="block max-w-[58ch] pt-3">{it.c}</span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-end lg:col-span-2">
                  <Switch
                    on={active}
                    labelledBy={`f-${it.id}`}
                    onToggle={() => {
                      setOn((s) => s.map((v, k) => (k === i ? !v : v)));
                      track("feature_toggle", { feature: it.id, enabled: !active });
                    }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
