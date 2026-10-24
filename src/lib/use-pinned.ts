"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/** true sólo en escritorio y sin "reducir movimiento": ahí las escenas se fijan y el scroll las dirige. */
export function usePinned(minWidth = 1024) {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [minWidth]);
  return wide && !reduce;
}
