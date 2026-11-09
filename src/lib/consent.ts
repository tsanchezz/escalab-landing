export const CONSENT_KEY = "escalab-consent";
export type Consent = "granted" | "denied";

const CHANGE = "escalab-consent";
const OPEN = "escalab-consent-open";

/** Elección guardada; null si todavía no eligió (o el navegador bloquea el almacenamiento). */
export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {}
  window.dispatchEvent(new Event(CHANGE));
}

export function subscribeConsent(cb: () => void) {
  window.addEventListener(CHANGE, cb);
  return () => window.removeEventListener(CHANGE, cb);
}

/** Reabre el panel de preferencias (desde el footer o la página de cookies). */
export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN));
}

export function onOpenCookiePreferences(cb: () => void) {
  window.addEventListener(OPEN, cb);
  return () => window.removeEventListener(OPEN, cb);
}
