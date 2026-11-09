import type { ReactNode } from "react";

/** Entrada de las partes de una sección: sube 24px con opacidad, una sola vez. La activa <RevealObserver />. */
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
  const Comp = as;
  return (
    <Comp className={`reveal ${className}`} style={{ "--ry": `${y}px`, "--rd": `${delay}s` } as React.CSSProperties}>
      {children}
    </Comp>
  );
}
