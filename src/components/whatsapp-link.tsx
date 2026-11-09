"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";
import { buildWhatsAppLink } from "@/lib/site";

/** Enlace a WhatsApp con evento GA4 `click_whatsapp`. No renderiza nada si no hay número configurado. */
export function WhatsAppLink({
  location,
  message,
  className,
  children,
}: {
  location: string;
  message?: string;
  className?: string;
  children: ReactNode;
}) {
  const href = buildWhatsAppLink(message);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir a Escalab por WhatsApp (se abre en una pestaña nueva)"
      onClick={() => track("click_whatsapp", { location })}
      className={className}
    >
      {children}
    </a>
  );
}
