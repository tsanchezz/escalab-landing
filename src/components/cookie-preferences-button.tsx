"use client";

import { GA_ID } from "@/lib/analytics";
import { openCookiePreferences } from "@/lib/consent";

/** Botón "Preferencias de cookies": reabre el panel del aviso. Sin GA configurado no hay nada que elegir. */
export function CookiePreferencesButton({ className, children = "Preferencias de cookies" }: { className?: string; children?: React.ReactNode }) {
  if (!GA_ID) return null;
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      {children}
    </button>
  );
}
