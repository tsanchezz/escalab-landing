const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** URL canónica. Cambiala con NEXT_PUBLIC_SITE_URL cuando haya dominio propio. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE = {
  name: "Escalab",
  audience: "para inmobiliarias",
  claim: "Responder. Calificar. Agendar.",
  signature: "Optimize · Scale · Sell",
  title: "Escalab | Automatización de consultas para inmobiliarias",
  description:
    "Un agente de IA que responde, califica y agenda cada consulta de tu inmobiliaria por WhatsApp, Instagram y web, y ordena el seguimiento de tus leads.",
  locale: "es_AR",
  keywords: [
    "software para inmobiliarias",
    "chatbot para inmobiliarias",
    "bot de WhatsApp para inmobiliarias",
    "automatización de consultas inmobiliarias",
    "seguimiento de leads inmobiliarios",
    "agendar visitas automáticamente",
    "IA para inmobiliarias",
    "n8n para inmobiliarias",
  ],
} as const;

export const NAV_LINKS = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#servicios", label: "Qué resuelve" },
  { href: "#planes", label: "Planes" },
  { href: "#faq", label: "Preguntas" },
] as const;

/** Número de WhatsApp (sólo dígitos, con código de país). Sin NEXT_PUBLIC_WHATSAPP_NUMBER no se muestra ningún enlace. */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/D/g, "");

export const WHATSAPP_MESSAGE = "Hola Escalab, quiero automatizar las consultas de mi inmobiliaria.";

/** Enlace wa.me con el número y el mensaje codificado; null si todavía no hay número configurado. */
export function buildWhatsAppLink(message: string = WHATSAPP_MESSAGE): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Email de contacto real, sólo si se configura NEXT_PUBLIC_CONTACT_EMAIL (no se inventan direcciones). */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || undefined;
