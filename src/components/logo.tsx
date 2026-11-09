/** Isotipo "E": tres brazos que ganan longitud, como una escala. El brazo medio lleva el acento terracota. */
export function Isotype({ size = 32, light = false, className }: { size?: number; light?: boolean; className?: string }) {
  const accent = light ? "#efc6b0" : "#b5573a";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} role="img" aria-label="Escalab" fill="currentColor">
      <rect x="3" y="3" width="4" height="26" rx="1" />
      <rect x="9" y="3" width="20" height="4" rx="1" />
      <rect x="9" y="14" width="14" height="4" rx="1" fill={accent} />
      <rect x="9" y="25" width="8" height="4" rx="1" />
    </svg>
  );
}

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${light ? "text-cream" : "text-ink"} ${className}`}>
      <Isotype size={30} light={light} />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[24px] font-medium tracking-[-0.01em]">Escalab</span>
        <span className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.22em] opacity-75 sm:block">para inmobiliarias</span>
      </span>
    </span>
  );
}
