"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { track } from "@/lib/analytics";
import { emailFields, LeadErrors, LeadField, LeadInput, normalizeLead, validateLead } from "@/lib/lead";
import { PLANS } from "@/lib/plans";

type Status = "idle" | "sending" | "ok" | "error";

const PLAN_IDS = PLANS.map((p) => p.id);
const ORDER: LeadField[] = ["name", "business", "email", "phone", "agents", "plan", "message", "consent"];

/** Entrega por email con FormSubmit desde el navegador (desde servidores en la nube lo bloquean). */
async function deliverByEmail(to: string, lead: LeadInput) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(emailFields(lead)),
  });
  const body = (await res.json().catch(() => ({}))) as { success?: string | boolean };
  if (!res.ok || String(body.success) !== "true") throw new Error("email delivery failed");
}

/** Formulario de contacto: validación en cliente (misma lógica que el servidor), estados y avisos accesibles. */
export function ContactForm() {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const onPlan = (e: Event) => setPlan((e as CustomEvent<string>).detail);
    window.addEventListener("escalab:plan", onPlan);
    return () => window.removeEventListener("escalab:plan", onPlan);
  }, []);

  const read = () => {
    const form = formRef.current!;
    const data = Object.fromEntries(new FormData(form));
    return { data, lead: normalizeLead({ ...data, consent: (form.elements.namedItem("consent") as HTMLInputElement).checked }) };
  };

  function focusFirst(errs: LeadErrors) {
    const first = ORDER.find((f) => errs[f]);
    if (first) (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
  }

  /** Revalida un campo ya marcado con error cuando la persona lo corrige. */
  function recheck(field: LeadField) {
    if (!errors[field]) return;
    const next = validateLead(read().lead, PLAN_IDS);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const { data, lead } = read();
    const found = validateLead(lead, PLAN_IDS);
    setErrors(found);
    if (Object.keys(found).length) {
      focusFirst(found);
      return;
    }
    setStatus("sending");
    try {
      const [res] = await Promise.all([
        fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, consent: true }) }),
        new Promise((r) => setTimeout(r, 600)),
      ]);
      if (res.status === 422) {
        const body = (await res.json().catch(() => ({}))) as { fields?: LeadErrors };
        if (body.fields) {
          setErrors(body.fields);
          setStatus("idle");
          focusFirst(body.fields);
          return;
        }
      }
      if (!res.ok) throw new Error("bad response");
      const { notifyTo } = (await res.json().catch(() => ({}))) as { notifyTo?: string };
      if (notifyTo) await deliverByEmail(notifyTo, lead);
      setStatus("ok");
      track("form_submit", { plan: lead.plan || "sin_definir", agents: lead.agents || "sin_definir", form: "contacto" });
    } catch {
      setStatus("error");
    }
  }

  const invalid = (f: LeadField) => (errors[f] ? { "aria-invalid": true as const, "aria-describedby": id(`${f}-err`) } : {});
  const err = (f: LeadField) =>
    errors[f] ? (
      <p id={id(`${f}-err`)} className="mt-1.5 text-[13px] font-semibold text-terracotta-deep">
        {errors[f]}
      </p>
    ) : null;
  const count = Object.keys(errors).length;

  return (
    <div className="card p-6 text-ink sm:p-8">
      {/* región viva: anuncia envío, éxito y errores a lectores de pantalla */}
      <div aria-live="polite" aria-atomic="true" className={status === "ok" ? undefined : "sr-only"}>
        {status === "sending" && "Enviando tu consulta…"}
        {status === "idle" && count > 0 && `El formulario tiene ${count} ${count === 1 ? "campo" : "campos"} para revisar.`}
        {status === "ok" && (
          <div className="flex min-h-[320px] flex-col items-start justify-center gap-4">
            <span className="grid size-14 place-items-center rounded-full bg-sage-soft text-ink">
              <Check aria-hidden size={26} strokeWidth={2.5} />
            </span>
            <p className="font-serif text-[32px] leading-tight">Recibimos tu consulta.</p>
            <p className="max-w-[34ch] text-soft">Te escribimos en menos de 24 horas para coordinar la demo.</p>
          </div>
        )}
      </div>

      {status !== "ok" && (
        <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor={id("name")}>
                Tu nombre
              </label>
              <input id={id("name")} name="name" required maxLength={100} autoComplete="name" className="field" onChange={() => recheck("name")} {...invalid("name")} />
              {err("name")}
            </div>
            <div>
              <label className="label" htmlFor={id("business")}>
                Inmobiliaria
              </label>
              <input id={id("business")} name="business" required maxLength={160} autoComplete="organization" className="field" onChange={() => recheck("business")} {...invalid("business")} />
              {err("business")}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor={id("email")}>
                Email
              </label>
              <input id={id("email")} name="email" type="email" required maxLength={160} autoComplete="email" className="field" onChange={() => recheck("email")} {...invalid("email")} />
              {err("email")}
            </div>
            <div>
              <label className="label" htmlFor={id("phone")}>
                WhatsApp (opcional)
              </label>
              <input id={id("phone")} name="phone" type="tel" maxLength={40} autoComplete="tel" inputMode="tel" className="field" onChange={() => recheck("phone")} {...invalid("phone")} />
              {err("phone")}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor={id("agents")}>
                Agentes en el equipo
              </label>
              <select id={id("agents")} name="agents" defaultValue="" className="field" {...invalid("agents")}>
                <option value="">Elegí una opción</option>
                <option value="1">Solo yo</option>
                <option value="2-5">2 a 5</option>
                <option value="6-15">6 a 15</option>
                <option value="16+">Más de 15</option>
              </select>
              {err("agents")}
            </div>
            <div>
              <label className="label" htmlFor={id("plan")}>
                Plan de interés
              </label>
              <select id={id("plan")} name="plan" value={plan} onChange={(e) => setPlan(e.target.value)} className="field" {...invalid("plan")}>
                <option value="">Todavía no sé</option>
                {PLANS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {err("plan")}
            </div>
          </div>

          <div>
            <label className="label" htmlFor={id("message")}>
              ¿Qué te gustaría resolver? (opcional)
            </label>
            <textarea id={id("message")} name="message" maxLength={1000} className="field" {...invalid("message")} />
            {err("message")}
          </div>

          <div>
            <div className="flex items-start gap-3">
              <input
                id={id("consent")}
                name="consent"
                type="checkbox"
                required
                className="mt-1 size-5 shrink-0 accent-[#9e4a30]"
                onChange={() => recheck("consent")}
                {...invalid("consent")}
              />
              <label htmlFor={id("consent")} className="text-[14px] leading-snug text-soft">
                Acepto la{" "}
                <Link href="/privacidad" target="_blank" className="text-ink underline underline-offset-4">
                  Política de privacidad
                </Link>{" "}
                y los{" "}
                <Link href="/terminos" target="_blank" className="text-ink underline underline-offset-4">
                  Términos
                </Link>{" "}
                (se abren en otra pestaña) y que Escalab use estos datos para responderme.
              </label>
            </div>
            {err("consent")}
          </div>

          {/* honeypot anti-spam: invisible y fuera del orden de tabulación; un bot lo completa y el servidor lo descarta */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor={id("website")}>No completar</label>
            <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <button type="submit" disabled={status === "sending"} aria-disabled={status === "sending"} className="btn btn-primary mt-1 w-full disabled:opacity-70">
            {status === "sending" ? "Enviando…" : "Pedir una demo"}
            {status !== "sending" && <ArrowRight aria-hidden size={18} className="arrow" />}
          </button>

          {status === "error" && (
            <p role="alert" className="text-[14px] font-semibold text-terracotta-deep">
              No pudimos enviar el formulario. Probá de nuevo en unos minutos.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
