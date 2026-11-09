import { ArrowRight } from "lucide-react";
import { ParallaxImage } from "@/components/parallax-image";
import { Bubble, Phone } from "@/components/phone";
import { CtaLink } from "@/components/cta-link";
import { STEPS } from "@/lib/journey";

const delay = (s: number) => ({ animationDelay: `${s}s` });
const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

// Conversación corta del hero: la consulta, la respuesta, la calificación y la agenda.
const HERO_MSGS = [STEPS[0].msgs[0], STEPS[1].msgs[0], STEPS[2].msgs[1], STEPS[3].msgs[0]];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden bg-night text-cream">
      <ParallaxImage
        src="/images/hero.jpg"
        alt="Living amplio con pared de madera, sillón gris y cocina integrada, con luz natural"
        preload
        position="60% 50%"
        sizes="100vw"
        className="-z-20"
      />
      <div aria-hidden className="scrim-hero absolute inset-0 -z-10" />

      <div className="page-m grid w-full gap-10 pb-12 pt-28 sm:pb-16 lg:grid-cols-12 lg:items-end lg:pb-20">
        <div className="lg:col-span-7">
          <p className="t-eyebrow rise" style={i(0)}>
            Para inmobiliarias y agentes
          </p>

          <h1 id="hero-title" className="t-display mt-5 text-cream">
            <span className="line">
              <span style={i(1)}>Cada consulta, respondida.</span>
            </span>
            <span className="line">
              <span style={i(2)}>
                Cada visita, <em>agendada.</em>
              </span>
            </span>
          </h1>

          {/* sin animación de opacidad: es el elemento más grande del primer pintado (LCP) */}
          <p className="t-lead mt-6 max-w-[48ch]">
            Escalab arma para tu inmobiliaria un agente de IA que responde, califica y agenda cada consulta desde WhatsApp, Instagram y tu web, y deja el seguimiento ordenado para tu equipo.
          </p>

          <div className="rise mt-8 flex flex-wrap gap-3" style={i(4)}>
            <CtaLink href="#contacto" location="hero" label="pedir_demo" className="btn btn-primary">
              Pedir una demo <ArrowRight aria-hidden size={18} className="arrow" />
            </CtaLink>
            <CtaLink href="#como-funciona" location="hero" label="ver_como_funciona" className="btn btn-light">
              Ver cómo funciona
            </CtaLink>
          </div>

          <p className="rise mt-10 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.18em] text-cream/85" style={i(5)}>
            <span>Responder</span>
            <span aria-hidden className="h-px w-6 bg-terracotta-soft" />
            <span>Calificar</span>
            <span aria-hidden className="h-px w-6 bg-terracotta-soft" />
            <span>Agendar</span>
          </p>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <Phone>
            {HERO_MSGS.map((m, n) => (
              <Bubble key={m.text} msg={m} className="bubble-in" style={delay(1.2 + n * 1.1)} />
            ))}
          </Phone>
        </div>
      </div>
    </section>
  );
}
