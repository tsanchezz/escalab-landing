"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/** Observador único compartido: cada Reveal entra una sola vez y deja de observarse. */
let observer: IntersectionObserver | undefined;
function watch(el: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.setAttribute("data-in", "");
        observer?.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -4% 0px" },
  );
  observer.observe(el);
}

/** Entrada de las partes de una sección: sube 24px con opacidad, una sola vez. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "p" | "li" | "h2" | "h3" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) watch(ref.current);
  }, []);
  const Comp = as as "div";
  return (
    <Comp
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${className}`}
      style={{ "--ry": `${y}px`, "--rd": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}
