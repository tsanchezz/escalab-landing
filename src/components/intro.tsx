import { GitBranch } from "lucide-react";
import { NodeChip } from "@/components/workflow";
import { Reveal } from "@/components/reveal";
import { IfNode } from "@/components/if-node";

export function Intro() {
  return (
    <section id="problema" aria-labelledby="problema-title" className="page-m py-20 lg:py-24">
      <NodeChip type="IF · Condición" name="¿Respondiste en menos de 5 minutos?" icon={<GitBranch size={16} />} />

      <div className="mt-8 grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <Reveal as="h2" className="t-h2">
            <span id="problema-title">Tu cliente no espera.</span>
          </Reveal>
          <Reveal delay={0.1} className="mt-5">
            <p className="t-statement max-w-[44ch] text-soft">
              Un cliente escribe a las 22:40. Si nadie responde en minutos, compra en otro lado. Con Escalab, ya tiene su respuesta.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <IfNode />
        </Reveal>
      </div>
    </section>
  );
}
