/** Planes de ejemplo (proyecto académico). Fuente única para la UI y el JSON-LD. */
export const PLANS = [
  {
    id: "optimize",
    name: "Optimize",
    price: "190",
    h: 360,
    bg: "#0e3550",
    strip: "#0a2638",
    lines: ["1 workflow de atención", "Respuestas automáticas en 1 red", "Calificación básica de leads", "Reporte mensual"],
  },
  {
    id: "scale",
    name: "Scale",
    price: "390",
    h: 480,
    bg: "#0d3b3b",
    strip: "#0a2b2b",
    lines: ["Todo lo de Optimize", "Hasta 3 redes sociales", "CRM conectado", "Agenda automática de reuniones", "Seguimiento a las 24 y 72 horas"],
  },
  {
    id: "sell",
    name: "Sell",
    price: "790",
    h: 600,
    bg: "#123d2c",
    strip: "#0c2b20",
    lines: ["Todo lo de Scale", "Agente de IA con cierre de venta", "Workflows a medida en n8n", "Reportes en tiempo real", "Soporte prioritario", "Implementación asistida"],
  },
] as const;
