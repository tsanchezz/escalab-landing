"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONSENT_KEY, GA_ID } from "@/lib/analytics";

export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    window.gtag?.("consent", "update", { analytics_storage: value });
    setOpen(false);
  }

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-label="Preferencias de analítica"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-3xl flex-col gap-4 glass glass-liquid rounded-2xl p-5 sm:flex-row sm:items-center"
    >
      <p className="t-small flex-1 text-soft">
        Usamos Google Analytics para entender cómo se usa esta página. Sólo se activa si lo aceptás.{" "}
        <Link href="/privacidad" className="text-ink underline underline-offset-4">
          Más información
        </Link>
      </p>
      <div className="flex gap-2">
        <button type="button" onClick={() => choose("denied")} className="btn btn-secondary !min-h-11 !px-4 !text-[13px]">
          Rechazar
        </button>
        <button type="button" onClick={() => choose("granted")} className="btn btn-primary !min-h-11 !px-4 !text-[13px]">
          Aceptar
        </button>
      </div>
    </div>
  );
}
