"use client";

import { useEffect, useState } from "react";
import { Send, Check } from "lucide-react";
import { NodeChip, useWorkflow } from "@/components/workflow";
import { track } from "@/lib/analytics";
import { WHATSAPP_URL } from "@/lib/site";

type Status = "idle" | "sending" | "ok" | "error";

const field =
  "h-12 w-full rounded-lg bg-[#2b66e6] px-4 text-[16px] text-white placeholder:text-white/75 outline-offset-2 focus-visible:outline-white";

export function Contact() {
  const { finish } = useWorkflow();
  const [status, setStatus] = useState<Status>("idle");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const onPlan = (e: Event) => setPlan((e as CustomEvent<string>).detail);
    window.addEventListener("escalab:plan", onPlan);
    return () => window.removeEventListener("escalab:plan", onPlan);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const [res] = await Promise.all([
        fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
        new Promise((r) => setTimeout(r, 900)),
      ]);
      if (!res.ok) throw new Error("bad response");
      setStatus("ok");
      finish();
      track("generate_lead", { plan: String(data.plan || "sin_definir"), form: "contacto" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="page-m pb-20 pt-8 lg:pb-24">
      <NodeChip type="Webhook · Respuesta" name="De lead a venta" icon={<Send size={18} />} />

      <div className="mt-8">
        <div className="coupon grid lg:grid-cols-[46%_1fr]" data-ui>
          <span aria-hidden className="coupon-perf" />

          <div className="flex flex-col justify-between gap-10 p-7 lg:p-9">
            <h2 id="contacto-title" className="text-[clamp(24px,2.4vw,34px)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em]">
              Empecemos tu workflow
            </h2>
            <div>
              <p className="max-w-[34ch] text-[16px] leading-relaxed text-white">
                Contanos de tu negocio y te respondemos en menos de 24 horas.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("cta_click", { location: "contacto", label: "whatsapp" })}
                className="mt-5 inline-block text-[15px] font-bold underline underline-offset-4"
              >
                O escribinos por WhatsApp
              </a>
            </div>
          </div>

          <div className="p-7 pt-10 lg:p-9 max-lg:pt-12">
            {status === "ok" ? (
              <div role="status" className="flex h-full min-h-[320px] flex-col items-start justify-center gap-4">
                <span className="grid size-14 place-items-center rounded-full bg-navy text-green">
                  <Check size={28} strokeWidth={3.5} />
                </span>
                <p className="text-[28px] font-extrabold leading-tight tracking-tight">Ejecución exitosa.</p>
                <p className="max-w-[30ch] text-[17px]">Tu lead ya está en el flujo. Te escribimos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-2.5" noValidate={false}>
                <label className="sr-only" htmlFor="c-name">Nombre</label>
                <input id="c-name" name="name" required autoComplete="name" placeholder="Tu nombre" className={field} />
                <label className="sr-only" htmlFor="c-email">Email</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="Tu email" className={field} />
                <label className="sr-only" htmlFor="c-biz">Tu negocio</label>
                <input id="c-biz" name="business" required autoComplete="organization" placeholder="Tu negocio" className={field} />
                <label className="sr-only" htmlFor="c-plan">Plan de interés</label>
                <select
                  id="c-plan"
                  name="plan"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className={`${field} appearance-none`}
                >
                  <option value="" className="text-navy">Plan de interés</option>
                  <option value="optimize" className="text-navy">Optimize</option>
                  <option value="scale" className="text-navy">Scale</option>
                  <option value="sell" className="text-navy">Sell</option>
                  <option value="no_se" className="text-navy">Todavía no sé</option>
                </select>
                {/* honeypot anti-spam */}
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-1 h-12 w-full rounded-lg bg-navy text-[15px] font-bold uppercase tracking-[0.1em] text-white transition-[filter,transform] duration-200 hover:brightness-125 active:scale-[0.99] disabled:opacity-70"
                >
                  {status === "sending" ? "Ejecutando…" : "Ejecutar workflow"}
                </button>
                {status === "error" && (
                  <p role="alert" className="t-small text-white">
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
