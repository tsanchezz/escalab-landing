export type Msg = { from: "lead" | "bot" | "sys"; text: string };
export type Step = { n: string; title: string; text: string; msgs: Msg[] };

/** Recorrido de una consulta. Conversación de ejemplo (inmobiliaria ficticia). */
export const STEPS: Step[] = [
  {
    n: "01",
    title: "Llega la consulta",
    text: "Alguien pregunta por una de tus propiedades desde WhatsApp, Instagram, Facebook o el formulario de tu web.",
    msgs: [{ from: "lead", text: "Hola, ¿sigue disponible el 2 ambientes de Palermo?" }],
  },
  {
    n: "02",
    title: "Responde al instante",
    text: "El agente contesta con los datos de tu ficha, a cualquier hora, también un domingo a la noche.",
    msgs: [{ from: "bot", text: "¡Hola! Sí, sigue disponible: 2 ambientes, 48 m² y balcón. ¿Querés que coordinemos una visita?" }],
  },
  {
    n: "03",
    title: "Califica la consulta",
    text: "Pregunta lo que tu equipo necesita saber: operación, zona, presupuesto y plazo.",
    msgs: [
      { from: "bot", text: "¿Es para alquilar o comprar? ¿Qué presupuesto manejás y para cuándo?" },
      { from: "lead", text: "Alquilar, hasta USD 700, desde el 1 de diciembre." },
    ],
  },
  {
    n: "04",
    title: "Agenda la visita",
    text: "Revisa la agenda del agente, propone horarios y confirma en la misma conversación.",
    msgs: [
      { from: "bot", text: "Tengo el jueves a las 17 h o el viernes a las 11 h. ¿Cuál te queda mejor?" },
      { from: "lead", text: "El jueves." },
    ],
  },
  {
    n: "05",
    title: "Avisa a tu equipo",
    text: "El agente asignado recibe la consulta con todo el contexto, y queda registrada en tu planilla o CRM.",
    msgs: [{ from: "sys", text: "Visita confirmada · jueves 17 h · asignada a Lucía" }],
  },
  {
    n: "06",
    title: "Hace el seguimiento",
    text: "Recuerda la visita, escribe después y reactiva las consultas que se enfriaron, sin que nadie lo tenga que acordar.",
    msgs: [{ from: "bot", text: "Te recuerdo la visita de mañana a las 17 h. ¿Seguimos con el plan?" }],
  },
];
