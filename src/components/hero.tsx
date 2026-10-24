import { Webhook } from "lucide-react";
import { NodeChip } from "@/components/workflow";
import { PhoneDemo } from "@/components/phone";
import { CtaLink } from "@/components/cta-link";
import { SITE } from "@/lib/site";

const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow bg-brand-blue" style={{ width: "46vw", height: "46vw", right: "-10vw", top: "-8vw", animation: "drift-a 22s ease-in-out infinite" }} />
        <div className="glow bg-teal" style={{ width: "34vw", height: "34vw", left: "-12vw", bottom: "-10vw", opacity: 0.2, animation: "drift-b 26s ease-in-out infinite" }} />
      </div>

      <div className="page-m grid items-center gap-14 pb-20 pt-10 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12 lg:gap-8 lg:pt-12">
        <div className="lg:col-span-7">
          <div className="rise" style={rise(0)}>
            <NodeChip type="Webhook · Trigger" name="Llega un mensaje nuevo" icon={<Webhook size={18} />} />
          </div>

          <h1 id="hero-title" className="t-display-hero rise mt-7" style={rise(1)}>
            Automatizá tu pyme.
            <br />
            <span className="text-grad">Vendé más.</span>
          </h1>

          <p className="rise mt-9 max-w-[40ch] text-[19px] leading-relaxed text-ink" style={rise(2)}>
            Escalab arma en n8n un agente de IA que responde, califica y agenda a cada lead desde tus redes. Sin etapa de discovery manual.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={rise(3)}>
            <CtaLink href="#contacto" location="hero" label="escalar_ahora" className="btn btn-primary btn-port">
              Escalar ahora
            </CtaLink>
            <CtaLink href="#como-funciona" location="hero" label="conocer_mas" className="btn btn-secondary btn-port">
              Conocer más
            </CtaLink>
          </div>
          <p className="t-micro rise mt-10 text-soft" style={rise(4)}>
            {SITE.claim}
          </p>
        </div>

        <div className="rise lg:col-span-5" style={rise(3)}>
          <PhoneDemo />
        </div>
      </div>
    </section>
  );
}
