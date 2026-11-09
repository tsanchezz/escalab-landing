/** Planes de ejemplo (proyecto académico). Fuente única para la UI y el JSON-LD. */
export const PLANS = [
  {
    id: "independiente",
    name: "Independiente",
    who: "Para agentes y corredores",
    price: "190",
    lines: [
      "1 agente de IA en WhatsApp o Instagram",
      "Respuestas con los datos de tus fichas",
      "Calificación básica de cada consulta",
      "Agenda de visitas",
      "Reporte mensual",
    ],
  },
  {
    id: "inmobiliaria",
    name: "Inmobiliaria",
    who: "Para inmobiliarias con equipo",
    price: "390",
    lines: [
      "Todo lo de Independiente",
      "Hasta 3 canales: WhatsApp, Instagram, Facebook y web",
      "Registro en planilla o CRM",
      "Reparto de consultas entre agentes",
      "Seguimiento a las 24 y 72 horas",
    ],
  },
  {
    id: "red",
    name: "Red o grupo",
    who: "Para varias sucursales",
    price: "790",
    lines: [
      "Todo lo de Inmobiliaria",
      "Varias sucursales y equipos",
      "Workflows a medida en n8n",
      "Reportes por propiedad y por agente",
      "Implementación asistida y soporte prioritario",
    ],
  },
] as const;
