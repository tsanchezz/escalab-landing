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
  email: "hola@escalab.example",
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

const WA_TEXT = encodeURIComponent("Hola Escalab, quiero automatizar las consultas de mi inmobiliaria.");
export const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${WA_TEXT}`
  : `https://wa.me/?text=${WA_TEXT}`;
