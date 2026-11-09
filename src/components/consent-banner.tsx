"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { CONSENT_KEY, GA_ID } from "@/lib/analytics";

const EVENT = "escalab-consent";
const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};
/** Se muestra sólo si hay GA y todavía no se eligió. */
const pending = () => {
  if (!GA_ID) return false;
  try {
    return !localStorage.getItem(CONSENT_KEY);
  } catch {
    return true;
  }
};

export function ConsentBanner() {
  const open = useSyncExternalStore(subscribe, pending, () => false);

  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    window.gtag?.("consent", "update", { analytics_storage: value });
    window.dispatchEvent(new Event(EVENT));
  }

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-label="Preferencias de analítica"
      className="card fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-3xl flex-col gap-4 p-5 shadow-[0_20px_40px_-20px_rgb(43_33_28_/_0.4)] sm:flex-row sm:items-center"
    >
      <p className="t-small flex-1 text-soft">
        Usamos Google Analytics para entender cómo se usa esta página. Sólo se activa si lo aceptás.{" "}
        <Link href="/privacidad" className="text-ink underline underline-offset-4">
          Más información
        </Link>
      </p>
      <div className="flex gap-2">
        <button type="button" onClick={() => choose("denied")} className="btn btn-outline !min-h-11 !px-5 !text-[14px]">
          Rechazar
        </button>
        <button type="button" onClick={() => choose("granted")} className="btn btn-primary !min-h-11 !px-5 !text-[14px]">
          Aceptar
        </button>
      </div>
    </div>
  );
}
