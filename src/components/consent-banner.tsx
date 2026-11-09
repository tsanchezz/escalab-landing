"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { GA_ID } from "@/lib/analytics";
import { onOpenCookiePreferences, readConsent, saveConsent, subscribeConsent } from "@/lib/consent";

/**
 * Aviso de cookies: Aceptar / Rechazar / Configurar. Es un panel fijo (no mueve el layout).
 * Sólo existe si hay GA configurado; se reabre desde "Preferencias de cookies" en el footer.
 */
export function ConsentBanner() {
  const titleId = useId();
  const ref = useRef<HTMLDivElement>(null);
  // "ssr" evita mostrar el aviso en el HTML del servidor (no conoce la elección guardada)
  const saved = useSyncExternalStore(subscribeConsent, readConsent, () => "ssr" as const);
  const [reopened, setReopened] = useState(false);
  const [panel, setPanel] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(
    () =>
      onOpenCookiePreferences(() => {
        setAnalytics(readConsent() === "granted");
        setPanel(true);
        setReopened(true);
      }),
    [],
  );

  const visible = Boolean(GA_ID) && saved !== "ssr" && (saved === null || reopened);

  useEffect(() => {
    if (reopened) ref.current?.focus();
  }, [reopened]);

  useEffect(() => {
    if (!reopened) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [reopened]);

  function close() {
    setReopened(false);
    setPanel(false);
  }

  function choose(value: "granted" | "denied") {
    saveConsent(value);
    close();
  }

  if (!visible) return null;
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="card fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl p-5 shadow-[0_20px_40px_-20px_rgb(43_33_28_/_0.4)] outline-none"
    >
      <p id={titleId} className="font-serif text-[20px] leading-tight">
        Tu privacidad
      </p>
      <p className="t-small mt-2 text-soft">
        Usamos Google Analytics para entender cómo se usa esta página. Sólo se activa si lo aceptás y podés cambiarlo cuando quieras.{" "}
        <Link href="/cookies" className="text-ink underline underline-offset-4">
          Política de cookies
        </Link>
      </p>

      {panel && (
        <fieldset className="mt-4 grid gap-3 border-t border-line pt-4">
          <legend className="sr-only">Categorías de cookies</legend>
          <label className="flex items-start gap-3 text-[14px]">
            <input type="checkbox" checked disabled className="mt-1 size-5 shrink-0 accent-[#9e4a30]" />
            <span>
              <strong className="font-semibold text-ink">Necesarias (siempre activas)</strong>
              <span className="block text-soft">Recuerdan tu elección sobre cookies.</span>
            </span>
          </label>
          <label className="flex items-start gap-3 text-[14px]">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 size-5 shrink-0 accent-[#9e4a30]" />
            <span>
              <strong className="font-semibold text-ink">Analítica (Google Analytics 4)</strong>
              <span className="block text-soft">Mide visitas y clics de forma agregada, con IP anonimizada.</span>
            </span>
          </label>
        </fieldset>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {panel ? (
          <>
            <button type="button" onClick={() => choose(analytics ? "granted" : "denied")} className="btn btn-primary !min-h-11 !px-5 !text-[14px]">
              Guardar preferencias
            </button>
            {reopened && (
              <button type="button" onClick={close} className="btn btn-outline !min-h-11 !px-5 !text-[14px]">
                Cerrar
              </button>
            )}
          </>
        ) : (
          <>
            <button type="button" onClick={() => choose("granted")} className="btn btn-primary !min-h-11 !px-5 !text-[14px]">
              Aceptar
            </button>
            <button type="button" onClick={() => choose("denied")} className="btn btn-outline !min-h-11 !px-5 !text-[14px]">
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => {
                setAnalytics(false);
                setPanel(true);
              }}
              className="inline-flex min-h-11 items-center px-3 text-[14px] font-semibold text-ink underline underline-offset-4"
            >
              Configurar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
