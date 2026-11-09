import { NextResponse } from "next/server";
import { normalizeLead, validateLead } from "@/lib/lead";
import { PLANS } from "@/lib/plans";
import { CONTACT_EMAIL } from "@/lib/site";

const PLAN_IDS = PLANS.map((p) => p.id);
const MAX_BODY = 8_000;

/**
 * Recibe el formulario de contacto y lo valida (mismas reglas que el cliente).
 * - Con N8N_WEBHOOK_URL reenvía el lead a ese webhook.
 * - Sin webhook devuelve `notifyTo` (LEAD_NOTIFY_EMAIL o NEXT_PUBLIC_CONTACT_EMAIL) y el navegador
 *   entrega el mail con FormSubmit: ese servicio bloquea los pedidos que salen de servidores en la nube.
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

  const hook = process.env.N8N_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        }),
        signal: AbortSignal.timeout(8_000),
      });
      if (!res.ok) throw new Error(`webhook respondió ${res.status}`);
    } catch (err) {
      console.error("[lead] no se pudo reenviar al webhook", err);
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  const notifyTo = process.env.LEAD_NOTIFY_EMAIL || CONTACT_EMAIL;
  if (!notifyTo) console.warn("[lead] sin N8N_WEBHOOK_URL ni email de destino: el lead sólo se validó (modo demo)", lead.email);
  return NextResponse.json({ ok: true, ...(notifyTo ? { notifyTo } : {}) });
}
