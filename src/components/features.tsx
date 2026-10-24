"use client";

import { useState } from "react";
import { Wrench } from "lucide-react";
import { NodeChip } from "@/components/workflow";
import { Reveal } from "@/components/reveal";
import { track } from "@/lib/analytics";

const ITEMS = [
  { id: "responder", t: "Responde mensajes en segundos", c: "Atiende Instagram, WhatsApp y Messenger todos los días, a cualquier hora." },
  { id: "calificar", t: "Califica cada lead", c: "Puntúa interés y presupuesto, y te pasa sólo los contactos que valen la pena." },
  { id: "agendar", t: "Agenda reuniones", c: "Cruza tu calendario y confirma el horario con el cliente en la misma conversación." },
  { id: "crm", t: "Carga todo en tu CRM", c: "Cada conversación queda en Google Sheets, HubSpot o el CRM que ya uses." },
  { id: "seguimiento", t: "Hace el seguimiento", c: "Reactiva a quien no contestó a las 24 y a las 72 horas, con un mensaje distinto." },
] as const;

function Switch({ on, onToggle, labelledBy }: { on: boolean; onToggle: () => void; labelledBy: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-labelledby={labelledBy}
      onClick={onToggle}
      className="relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 before:absolute before:-inset-2.5 before:content-['']"
      style={{ background: on ? "var(--escalab-teal)" : "var(--escalab-border)" }}
    >
      <span
        className="absolute left-0.5 top-0.5 size-5 rounded-full bg-ink transition-transform duration-300"
        style={{ transform: on ? "translateX(20px)" : "none" }}
      />
    </button>
  );
}

export function Features() {
  const [on, setOn] = useState<boolean[]>([true, true, true, false, false]);

  return (
    <section id="servicios" aria-labelledby="servicios-title" className="page-m py-20 lg:py-24">
      <NodeChip type="Tools · Integraciones" name="Qué automatizamos" icon={<Wrench size={16} />} />

      <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <Reveal as="h2" className="t-h2">
            <span id="servicios-title">Prendé lo que necesitás.</span>
          </Reveal>
          <p className="t-small mt-4 max-w-[34ch] text-soft">Cada función es un nodo del workflow: la activás o la dejás apagada.</p>
        </div>

        <ul className="md:col-span-7">
          {ITEMS.map((it, i) => {
            const active = on[i];
            return (
              <li key={it.id} className="flex items-center gap-6 border-t border-line py-5 first:border-t-0 first:pt-0">
                <div className="min-w-0 flex-1">
                  <h3
                    id={`f-${it.id}`}
                    className="text-[18px] font-bold leading-tight transition-colors duration-300"
                    style={{ color: active ? "var(--escalab-white)" : "var(--escalab-gray)" }}
                  >
                    {it.t}
                  </h3>
                  <p className="t-small mt-1 text-soft transition-opacity duration-300" style={{ opacity: active ? 1 : 0.5 }}>
                    {it.c}
                  </p>
                </div>
                <Switch
                  on={active}
                  labelledBy={`f-${it.id}`}
                  onToggle={() => {
                    setOn((s) => s.map((v, k) => (k === i ? !v : v)));
                    track("feature_toggle", { feature: it.id, enabled: !active });
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
