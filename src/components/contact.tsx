"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { ParallaxImage } from "@/components/parallax-image";
import { track } from "@/lib/analytics";
import { WHATSAPP_URL } from "@/lib/site";
import { PLANS } from "@/lib/plans";

type Status = "idle" | "sending" | "ok" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const onPlan = (e: Event) => setPlan((e as CustomEvent<string>).detail);
    window.addEventListener("escalab:plan", onPlan);
    return () => window.removeEventListener("escalab:plan", onPlan);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    try {
      const [res] = await Promise.all([
        fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
        new Promise((r) => setTimeout(r, 700)),
      ]);
      if (!res.ok) throw new Error("bad response");
      setStatus("ok");
      track("generate_lead", { plan: String(data.plan || "sin_definir"), agents: String(data.agents || "sin_definir"), form: "contacto" });
    } catch {
      setStatus("error");
    }
  }

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
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("cta_click", { location: "contacto", label: "whatsapp" })}
            className="mt-6 inline-flex min-h-11 items-center font-semibold text-cream underline underline-offset-4"
          >
            O escribinos por WhatsApp
          </a>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="card p-6 text-ink sm:p-8">
            {status === "ok" ? (
              <div role="status" className="flex min-h-[320px] flex-col items-start justify-center gap-4">
                <span className="grid size-14 place-items-center rounded-full bg-sage-soft text-ink">
                  <Check size={26} strokeWidth={2.5} />
                </span>
                <p className="font-serif text-[32px] leading-tight">Recibimos tu consulta.</p>
                <p className="max-w-[34ch] text-soft">Te escribimos en menos de 24 horas para coordinar la demo.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="c-name">Tu nombre</label>
                    <input id="c-name" name="name" required autoComplete="name" className="field" />
                  </div>
                  <div>
                    <label className="label" htmlFor="c-biz">Inmobiliaria</label>
                    <input id="c-biz" name="business" required autoComplete="organization" className="field" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="c-email">Email</label>
                    <input id="c-email" name="email" type="email" required autoComplete="email" className="field" />
                  </div>
                  <div>
                    <label className="label" htmlFor="c-phone">WhatsApp (opcional)</label>
                    <input id="c-phone" name="phone" type="tel" autoComplete="tel" className="field" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="c-agents">Agentes en el equipo</label>
                    <select id="c-agents" name="agents" defaultValue="" className="field">
                      <option value="">Elegí una opción</option>
                      <option value="1">Solo yo</option>
                      <option value="2-5">2 a 5</option>
                      <option value="6-15">6 a 15</option>
                      <option value="16+">Más de 15</option>
                    </select>
                  </div>
                  <div>
                    <label className="label" htmlFor="c-plan">Plan de interés</label>
                    <select id="c-plan" name="plan" value={plan} onChange={(e) => setPlan(e.target.value)} className="field">
                      <option value="">Todavía no sé</option>
                      {PLANS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="c-msg">¿Qué te gustaría resolver? (opcional)</label>
                  <textarea id="c-msg" name="message" className="field" />
                </div>
                {/* honeypot anti-spam */}
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-1 w-full disabled:opacity-70">
                  {status === "sending" ? "Enviando…" : "Pedir una demo"}
                  {status !== "sending" && <ArrowRight aria-hidden size={18} className="arrow" />}
                </button>
                {status === "error" && (
                  <p role="alert" className="text-[14px] font-semibold text-terracotta-deep">
                    No pudimos enviar el formulario. Probá de nuevo o escribinos por WhatsApp.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
