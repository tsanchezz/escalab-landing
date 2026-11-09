import { NextResponse } from "next/server";
import { normalizeLead, validateLead } from "@/lib/lead";
import { PLANS } from "@/lib/plans";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

const PLAN_IDS = PLANS.map((p) => p.id);
const MAX_BODY = 8_000;

/**
 * Recibe el formulario de contacto, lo valida (mismas reglas que el cliente) y, si existe
 * N8N_WEBHOOK_URL lo reenvía a ese webhook; si no, lo manda por email a LEAD_NOTIFY_EMAIL (o NEXT_PUBLIC_CONTACT_EMAIL).
 */
export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true }); // honeypot: un bot rellena este campo; fingimos éxito

  const lead = normalizeLead(body);
  const errors = validateLead(lead, PLAN_IDS);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "invalid_fields", fields: errors }, { status: 422 });
  }

  const payload = {
    name: lead.name,
    business: lead.business,
    email: lead.email,
    phone: lead.phone,
    agents: lead.agents,
    plan: lead.plan,
    message: lead.message,
    consent: true,
    segment: "inmobiliarias",
    source: "escalab-landing",
    receivedAt: new Date().toISOString(),
  };

  try {
    const hook = process.env.N8N_WEBHOOK_URL;
    const notifyTo = process.env.LEAD_NOTIFY_EMAIL || CONTACT_EMAIL;
    if (hook) await sendToWebhook(hook, payload);
    else if (notifyTo) await sendByEmail(notifyTo, payload);
    else console.warn("[lead] sin N8N_WEBHOOK_URL ni email de destino: el lead sólo se validó (modo demo)", payload.email);
  } catch (err) {
    console.error("[lead] no se pudo entregar el lead", err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

type Payload = Record<string, string | boolean>;

async function sendToWebhook(url: string, payload: Payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) throw new Error(`webhook respondió ${res.status}`);
}

/**
 * Entrega por email con FormSubmit (sin cuenta ni claves): la primera vez manda un mail de activación
 * a la casilla de destino; después cada consulta llega como una tabla con los datos del formulario.
 */
async function sendByEmail(to: string, p: Payload) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Origin: SITE_URL, Referer: `${SITE_URL}/` },
    body: JSON.stringify({
      _subject: `Escalab: nueva consulta de ${p.business}`,
      _template: "table",
      _captcha: "false",
      Nombre: p.name,
      Inmobiliaria: p.business,
      email: p.email,
      WhatsApp: p.phone || "(no indicó)",
      "Agentes en el equipo": p.agents || "(no indicó)",
      "Plan de interés": p.plan || "(no indicó)",
      Mensaje: p.message || "(sin mensaje)",
      "Aceptó privacidad": "Sí",
      Recibido: p.receivedAt,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  const body = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
  if (!res.ok || String(body.success) !== "true") throw new Error(`FormSubmit: ${body.message ?? res.status}`);
}
