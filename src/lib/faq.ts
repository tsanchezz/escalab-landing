export type Faq = { topic: string; q: string; a: string };

/** Fuente única: se usa en la UI y en el JSON-LD FAQPage. */
export const FAQS: Faq[] = [
  {
    topic: "n8n",
    q: "¿Qué es n8n y por qué lo usamos?",
    a: "n8n es una plataforma de workflows donde cada paso es un nodo conectado a otro. Nos permite armar tu automatización a medida, ver cada ejecución y cambiarla sin reescribir nada.",
  },
  {
    topic: "Redes",
    q: "¿Con qué redes funciona?",
    a: "Instagram, WhatsApp y Facebook Messenger para la atención; Google Calendar para las reuniones; y Google Sheets, HubSpot u otros CRM para registrar cada lead.",
  },
  {
    topic: "Equipo",
    q: "¿Necesito saber de tecnología?",
    a: "No. Nosotros diseñamos, conectamos y probamos el workflow. Vos nos contás cómo vendés hoy y nos ocupamos del resto.",
  },
  {
    topic: "Plazos",
    q: "¿Cuánto tarda la implementación?",
    a: "Un workflow de atención suele estar funcionando en un par de semanas. Los planes con CRM y agenda llevan un poco más porque hay más piezas para conectar.",
  },
  {
    topic: "Datos",
    q: "¿Qué pasa con los datos?",
    a: "Las conversaciones y los datos de contacto se guardan sólo en las herramientas que vos elegís. No los usamos para otra cosa y podés pedir que se borren cuando quieras.",
  },
  {
    topic: "Planes",
    q: "¿Puedo cambiar de plan después?",
    a: "Sí. Empezás con el workflow que necesitás y vamos sumando nodos a medida que tu negocio crece, sin empezar de cero.",
  },
];
