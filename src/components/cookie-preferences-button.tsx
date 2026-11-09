"use client";

import { openCookiePreferences } from "@/lib/consent";

/** Botón "Preferencias de cookies": reabre el panel del aviso. */
export function CookiePreferencesButton({ className, children = "Preferencias de cookies" }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      {children}
    </button>
  );
}
