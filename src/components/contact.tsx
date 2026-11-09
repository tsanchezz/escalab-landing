import { ParallaxImage } from "@/components/parallax-image";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppLink } from "@/components/whatsapp-link";

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="on-dark cv relative isolate overflow-hidden bg-night text-cream [--cv-m:1225px] [--cv-d:776px]">
      <ParallaxImage
        src="/images/contacto.jpg"
        alt="Fachada moderna con paneles de madera y puerta de entrada"
        sizes="100vw"
        position="50% 40%"
        strength={6}
        className="-z-20"
      />
      <div aria-hidden className="scrim-hero absolute inset-0 -z-10" />

      <div className="page-m section grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <p className="t-eyebrow">Pedí una demo</p>
          <h2 id="contacto-title" className="t-h2 mt-4 text-cream">
            Hablemos de <em>tu inmobiliaria.</em>
          </h2>
          <p className="t-lead mt-5 max-w-[40ch]">
            Contanos cómo recibís hoy las consultas y te mostramos cómo quedaría con el agente. Te respondemos en menos de 24 horas.
          </p>
          <WhatsAppLink location="contacto" className="mt-6 inline-flex min-h-11 items-center font-semibold text-cream underline underline-offset-4">
            O escribinos por WhatsApp
          </WhatsAppLink>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
