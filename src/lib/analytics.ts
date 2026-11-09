import { readConsent } from "@/lib/consent";

/** Medición con gtag.js directo (G-XXXXXXXXXX). */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
/** Medición vía Google Tag Manager (GTM-XXXXXXX). Si está definido tiene prioridad sobre GA_ID. */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
/** Hay algo que medir, y por lo tanto algo que consentir. */
export const ANALYTICS_ON = Boolean(GTM_ID || GA_ID);

type GtagFn = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

/** Evento de analítica. No hace nada sin ID configurado, sin consentimiento o si el script todavía no cargó. */
export function track(event: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || !ANALYTICS_ON || readConsent() !== "granted") return;
  if (GTM_ID) window.dataLayer?.push({ event, ...params });
  else window.gtag?.("event", event, params);
}

/** Clic en un CTA: `cta_click` genérico y, si pide la demo, `click_demo`. */
export function trackCta(location: string, label: string) {
  track("cta_click", { location, label });
  if (label === "pedir_demo") track("click_demo", { location });
}
