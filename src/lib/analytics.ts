export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type GtagFn = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

/** Evento GA4. Si GA no está cargado (sin ID o sin consentimiento) no hace nada. */
export function track(event: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || !GA_ID) return;
  window.gtag?.("event", event, params);
}

/** Clic en un CTA: `cta_click` genérico y, si pide la demo, `click_demo`. */
export function trackCta(location: string, label: string) {
  track("cta_click", { location, label });
  if (label === "pedir_demo") track("click_demo", { location });
}
