import { Check, Clock, GitBranch, Send } from "lucide-react";
import { NodeChip } from "@/components/workflow";
import { Reveal } from "@/components/reveal";
import { IfNode } from "@/components/if-node";

/** Miniatura en línea con la forma del nodo (radio del motivo). */
function Thumb({ children, bg, w = "1.15em" }: { children: React.ReactNode; bg: string; w?: string }) {
  return (
    <span
      data-ui
      aria-hidden
      className="ml-[0.2em] inline-grid place-items-center align-[-0.12em]"
      style={{ height: "0.85em", width: w, borderRadius: "0.18em", background: bg, color: "var(--escalab-navy)" }}
    >
      {children}
    </span>
  );
}

export function Intro() {
  return (
    <section id="problema" aria-labelledby="problema-title" className="page-m py-24 lg:py-32">
      <Reveal>
        <NodeChip type="IF · Condición" name="¿Respondiste en menos de 5 minutos?" icon={<GitBranch size={18} />} />
      </Reveal>

      <div className="mt-10 grid items-start gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <Reveal as="h2" delay={0.05} className="t-h2 max-w-[18ch]">
            <span id="problema-title">Tu cliente no espera.</span>
          </Reveal>
          <Reveal delay={0.12} className="mt-10">
            <p className="t-statement">
              Un cliente escribe a las 22:40
              <Thumb bg="var(--escalab-cyan)" w="1.3em">
                <Send size={12} strokeWidth={3} />
              </Thumb>
              . Si nadie responde en minutos, compra en otro lado. Con Escalab,{" "}
              <span className="whitespace-nowrap">
                ya tiene su respuesta
                <Thumb bg="var(--escalab-green)">
                  <Check size={12} strokeWidth={3.5} />
                </Thumb>
              </span>
              .
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="md:col-span-5">
          <IfNode />
        </Reveal>
      </div>
    </section>
  );
}
