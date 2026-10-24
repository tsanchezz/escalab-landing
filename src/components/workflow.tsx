"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";

type Ctx = {
  /** índice del nodo en ejecución (-1 = todavía ninguno) */
  active: number;
  total: number;
  label: string;
  finished: boolean;
  finish: () => void;
};

const WorkflowCtx = createContext<Ctx>({ active: -1, total: 0, label: "", finished: false, finish: () => {} });
export const useWorkflow = () => useContext(WorkflowCtx);

type Pos = { y: number; left: number };

/**
 * La página es un workflow: cada sección es un nodo (`[data-wf-node]`) y el scroll
 * avanza la ejecución por una línea en el margen izquierdo. El estado de cada chip
 * (espera → ejecutando → ejecutado) se escribe directo en el DOM para no re-renderizar
 * en cada frame de scroll.
 */
export function Workflow({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const packetRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLElement[]>([]);
  const ysRef = useRef<number[]>([]);
  const rootTopRef = useRef(0);
  const maxReached = useRef(-1);

  const [pos, setPos] = useState<Pos[]>([]);
  const [active, setActive] = useState(-1);
  const [label, setLabel] = useState("");
  const [finished, setFinished] = useState(false);
  const finish = useCallback(() => setFinished(true), []);

  const update = useCallback(() => {
    const ys = ysRef.current;
    const fill = fillRef.current;
    const packet = packetRef.current;
    if (!ys.length || !fill || !packet) return;
    const probe = window.scrollY + window.innerHeight * 0.6 - rootTopRef.current;
    const y0 = ys[0];
    const yEnd = ys[ys.length - 1];
    const clamped = Math.min(Math.max(probe, y0), yEnd);
    fill.style.transform = `scaleY(${(clamped - y0) / (yEnd - y0 || 1)})`;
    packet.style.transform = `translate3d(0, ${clamped - 6}px, 0)`;
    packet.style.opacity = probe >= y0 - 120 && probe <= yEnd + 160 ? "1" : "0";

    let a = -1;
    for (let i = 0; i < ys.length; i++) if (ys[i] <= probe) a = i;
    setActive((prev) => (prev === a ? prev : a));
  }, []);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    rootTopRef.current = top;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-wf-node]"));
    nodesRef.current = els;
    const next = els.map((el) => {
      const r = el.getBoundingClientRect();
      return { y: r.top + window.scrollY - top + r.height / 2, left: r.left - rect.left };
    });
    ysRef.current = next.map((p) => p.y);
    setPos((prev) =>
      prev.length === next.length && prev.every((p, i) => Math.abs(p.y - next[i].y) < 1 && Math.abs(p.left - next[i].left) < 1)
        ? prev
        : next,
    );
    update();
  }, [update]);

  useEffect(() => {
    measure();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const ro = new ResizeObserver(() => measure());
    if (rootRef.current) ro.observe(rootRef.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    const late = window.setTimeout(measure, 900);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.clearTimeout(late);
    };
  }, [measure, update]);

  // Estado visual de cada chip + evento GA4 la primera vez que se alcanza un nodo.
  useEffect(() => {
    const els = nodesRef.current;
    const last = els.length - 1;
    els.forEach((el, i) => {
      const state = i < active || (finished && i === last) ? "done" : i === active ? "run" : "idle";
      if (el.dataset.state !== state) el.dataset.state = state;
    });
    if (active >= 0) setLabel(els[active]?.dataset.wfName ?? "");
    if (active > maxReached.current) {
      maxReached.current = active;
      track("workflow_node_reached", { node_index: active + 1, node_name: els[active]?.dataset.wfName ?? "" });
    }
  }, [active, finished, pos]);

  return (
    <WorkflowCtx.Provider value={{ active, total: pos.length, label, finished, finish }}>
      <div ref={rootRef} className="relative">
        {pos.length > 1 && (
          <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
            <div className="wf-spine-track" style={{ top: pos[0].y, height: pos[pos.length - 1].y - pos[0].y }} />
            <div
              ref={fillRef}
              className="wf-spine-fill"
              style={{ top: pos[0].y, height: pos[pos.length - 1].y - pos[0].y }}
            />
            <div ref={packetRef} className="wf-packet" />
            {pos.map((p, i) => (
              <div key={i}>
                <div className="wf-stub" data-on={i <= active} style={{ top: p.y - 1, left: "var(--spine-x)", width: `calc(${p.left}px - var(--spine-x))` }} />
                <div className="wf-junction" data-on={i <= active} style={{ top: p.y - 5 }} />
              </div>
            ))}
          </div>
        )}
        {children}
      </div>
    </WorkflowCtx.Provider>
  );
}

/** Cabecera de sección con forma de nodo de n8n. */
export function NodeChip({
  type,
  name,
  icon,
  className = "",
}: {
  type: string;
  name: string;
  icon: ReactNode;
  className?: string;
}) {
  return (
    <div className={`wf-chip ${className}`} data-wf-node data-wf-name={name} data-state="idle" data-ui>
      <span className="ui-port in" aria-hidden style={{ left: -7 }} />
      <span className="wf-ico" aria-hidden>
        {icon}
      </span>
      <span className="min-w-0">
        <span className="wf-type">{type}</span>
        <span className="wf-name">{name}</span>
      </span>
      <span className="wf-status" aria-hidden>
        <span className="wf-dot" />
        <span className="wf-status-text" />
      </span>
    </div>
  );
}
