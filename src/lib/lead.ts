/** Validación del formulario de contacto: la comparten el cliente (mensajes en pantalla) y el servidor (/api/lead). */

export const AGENT_OPTIONS = ["1", "2-5", "6-15", "16+"] as const;

export const LIMITS = { name: 100, business: 160, email: 160, phone: 40, plan: 30, message: 1000 } as const;

export type LeadField = "name" | "business" | "email" | "phone" | "agents" | "plan" | "message" | "consent";
export type LeadErrors = Partial<Record<LeadField, string>>;

export type LeadInput = {
  name: string;
  business: string;
  email: string;
  phone: string;
  agents: string;
  plan: string;
  message: string;
  consent: boolean;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+\d][\d\s().-]{5,}$/;
const text = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

/** Normaliza lo que llega (formulario o JSON) a un LeadInput acotado. */
export function normalizeLead(raw: Record<string, unknown>): LeadInput {
  return {
    name: text(raw.name, LIMITS.name),
    business: text(raw.business, LIMITS.business),
    email: text(raw.email, LIMITS.email).toLowerCase(),
    phone: text(raw.phone, LIMITS.phone),
    agents: text(raw.agents, 10),
    plan: text(raw.plan, LIMITS.plan),
    message: text(raw.message, LIMITS.message),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
  };
}

export function validateLead(lead: LeadInput, planIds: readonly string[]): LeadErrors {
  const e: LeadErrors = {};
  if (lead.name.length < 2) e.name = "Escribí tu nombre.";
  if (lead.business.length < 2) e.business = "Escribí el nombre de tu inmobiliaria.";
  if (!lead.email) e.email = "Escribí tu email.";
  else if (!EMAIL.test(lead.email)) e.email = "Revisá el email: parece incompleto.";
  if (lead.phone && !PHONE.test(lead.phone)) e.phone = "Usá sólo números, con código de área (ej. 11 5555 5555).";
  if (lead.agents && !(AGENT_OPTIONS as readonly string[]).includes(lead.agents)) e.agents = "Elegí una de las opciones.";
  if (lead.plan && !planIds.includes(lead.plan)) e.plan = "Elegí uno de los planes.";
  if (!lead.consent) e.consent = "Necesitamos tu aceptación para poder responderte.";
  return e;
}
