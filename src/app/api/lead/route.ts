import { NextResponse } from "next/server";

type Lead = { name?: string; email?: string; business?: string; plan?: string; website?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max = 200) => String(v ?? "").trim().slice(0, max);

/**
 * Recibe el formulario de contacto. Si existe N8N_WEBHOOK_URL reenvía el lead a ese
 * webhook de n8n; si no, sólo valida y responde ok (modo demo).
 */
export async function POST(request: Request) {
  let body: Lead;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true }); // honeypot: fingimos éxito

  const lead = {
    name: clean(body.name, 100),
    email: clean(body.email, 160),
    business: clean(body.business, 160),
    plan: clean(body.plan, 30),
    source: "escalab-landing",
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || !EMAIL.test(lead.email) || !lead.business) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  const hook = process.env.N8N_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`n8n responded ${res.status}`);
    } catch (err) {
      console.error("[lead] no se pudo reenviar a n8n", err);
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
