const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** URL canónica. Cambiala con NEXT_PUBLIC_SITE_URL cuando haya dominio propio. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE = {
  name: "Escalab",
  claim: "Optimize · Scale · Sell",
  title: "Escalab | Automatización con n8n para pymes",
  description:
    "Automatizamos la atención y las ventas de tu pyme con n8n: un agente de IA responde, califica y agenda leads desde tus redes sociales, sin discovery manual.",
  locale: "es_AR",
  email: "hola@escalab.example",
  keywords: [
    "automatización para pymes",
    "n8n",
    "automatización de ventas",
    "agente de IA",
    "chatbot para Instagram y WhatsApp",
    "calificación de leads",
    "digitalización de pymes",
  ],
} as const;

export const NAV_LINKS = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#servicios", label: "Qué automatizamos" },
  { href: "#planes", label: "Planes" },
  { href: "#faq", label: "Preguntas" },
] as const;

export const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Escalab, quiero automatizar mi negocio.")}`
  : `https://wa.me/?text=${encodeURIComponent("Hola Escalab, quiero automatizar mi negocio.")}`;
