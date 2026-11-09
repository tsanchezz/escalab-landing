/** Planes de ejemplo (proyecto académico), en USD: `down` es el pago inicial y `price` la mensualidad; `suggested` marca valores orientativos. Fuente única para la UI y el JSON-LD. */
export const PLANS = [
  {
    id: "independiente",
    name: "Independiente",
    who: "Para agentes y corredores",
    down: "550",
    price: "100",
    suggested: false,
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
    down: "750",
    price: "200",
    suggested: true,
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
    down: "1.200",
    price: "400",
    suggested: true,
    lines: [
      "Todo lo de Inmobiliaria",
      "Varias sucursales y equipos",
      "Workflows a medida en n8n",
      "Reportes por propiedad y por agente",
      "Implementación asistida y soporte prioritario",
    ],
  },
] as const;
