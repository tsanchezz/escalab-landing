export type Faq = { q: string; a: string };

/** Fuente única: se usa en la UI y en el JSON-LD FAQPage. */
export const FAQS: Faq[] = [
  {
    q: "¿Suena a robot?",
    a: "Se arma con tu tono: cómo saludás, cómo hablás de una propiedad y qué decís cuando no tenés la respuesta. Responde con los datos de tus fichas y escribe como lo haría alguien de tu equipo, no como un menú de opciones.",
  },
  {
    q: "¿Qué pasa con las consultas complejas?",
    a: "Si la consulta se sale de lo que el agente puede resolver (una negociación, un caso particular, un cliente enojado), la deriva a la persona que vos definas, con todo el historial de la conversación a mano.",
  },
  {
    q: "¿Con qué canales funciona?",
    a: "WhatsApp, Instagram, Facebook Messenger y el formulario de tu web. Para agendar usa Google Calendar y para registrar cada consulta, Google Sheets o el CRM que ya uses. Las consultas de tus portales se pueden canalizar al mismo flujo; en cada caso lo vemos en el diagnóstico.",
  },
  {
    q: "¿Sirve para alquileres y para ventas?",
    a: "Sí. El agente pregunta primero qué busca la persona (alquilar o comprar, zona, presupuesto y plazo) y adapta las preguntas y la agenda según la operación.",
  },
  {
    q: "¿Necesito cambiar de CRM o de número de WhatsApp?",
    a: "No hace falta cambiar de herramientas. El flujo se conecta a lo que ya usás; si hoy trabajás con una planilla, arrancamos por ahí y después se puede pasar a un CRM.",
  },
  {
    q: "¿Cuánto tarda la puesta en marcha?",
    a: "Primero hacemos un diagnóstico de cómo recibís y atendés hoy las consultas. Un agente de atención suele estar funcionando en un par de semanas; los planes con varios canales, CRM y sucursales llevan algo más porque hay más piezas para conectar.",
  },
  {
    q: "¿Qué pasa con los datos de mis clientes?",
    a: "Las conversaciones y los datos de contacto se guardan sólo en las herramientas que vos elegís. No los usamos para otra cosa y podés pedir que se borren cuando quieras.",
  },
  {
    q: "¿Qué es n8n y por qué lo usamos?",
    a: "n8n es una plataforma de automatización donde cada paso es un bloque conectado a otro. Nos permite armar tu flujo a medida, ver qué pasó en cada consulta y cambiarlo sin empezar de cero.",
  },
  {
    q: "¿Puedo cambiar de plan o cortar cuando quiera?",
    a: "Sí. Empezás con lo que necesitás y vamos sumando canales o sucursales a medida que la inmobiliaria crece. Si querés dejar de usarlo, lo desactivamos.",
  },
];
