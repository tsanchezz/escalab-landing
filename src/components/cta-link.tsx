"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

/** Enlace/botón con evento GA4 `cta_click`. */
export function CtaLink({
  href,
  location,
  label,
  className,
  children,
  external,
}: {
  href: string;
  location: string;
  label: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track("cta_click", { location, label })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
