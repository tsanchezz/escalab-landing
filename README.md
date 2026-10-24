# Escalab: landing page

Landing de **Escalab**, empresa ficticia (proyecto académico) que automatiza ventas y atención de pymes con workflows de **n8n**. La página simula un workflow: al hacer scroll, cada sección es un nodo que se ejecuta.

**Stack:** Next.js 16 (App Router) · Tailwind CSS v4 · Motion · Manrope · desplegada en Vercel.
**Diseño:** manual de marca Escalab + skill `design-taste-frontend` (taste-skill), dirección *one-motif* (el nodo de n8n).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Variables de entorno

Copiá `.env.example` a `.env.local`.

| Variable | Para qué |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica (canonical, sitemap, Open Graph). En Vercel usa el dominio de producción si no se define. |
| `NEXT_PUBLIC_GA_ID` | ID de medición de GA4 (`G-XXXXXXXXXX`). Sin él no se carga ningún script. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número para el botón de WhatsApp (opcional). |
| `N8N_WEBHOOK_URL` | Webhook de n8n que recibe los leads del formulario (opcional). |

## Google Analytics 4

Cargado sólo con `NEXT_PUBLIC_GA_ID`, con **Consent Mode v2** (arranca en `denied`; el banner actualiza el consentimiento). Eventos personalizados:

| Evento | Cuándo |
| --- | --- |
| `cta_click` | Clic en CTA (`location`, `label`) |
| `workflow_node_reached` | Primera vez que el scroll alcanza un nodo (`node_index`, `node_name`) |
| `feature_toggle` | Se activa/desactiva una capacidad |
| `calculator_change` | Se mueve el slider de ahorro |
| `plan_select` | Se elige un plan |
| `faq_open` | Se abre una pregunta |
| `generate_lead` | Se envía el formulario (marcalo como conversión en GA4) |

## SEO

Metadata y canonical por la Metadata API, Open Graph/Twitter con imagen generada, `sitemap.xml`, `robots.txt`, manifest, íconos, JSON-LD (`Organization`, `WebSite`, `WebPage`, `ProfessionalService` con ofertas, `FAQPage`), `lang="es-AR"`, una sola `h1`, landmarks semánticos, fuentes con `display: swap` y cabeceras de seguridad.

## Contenido de ejemplo

Precios, la calculadora (4 min por mensaje, 70% resuelto por el agente) y las conversaciones son datos de ejemplo del proyecto académico. No hay clientes, testimonios ni métricas inventadas.
