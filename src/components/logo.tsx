import { useId } from "react";

/** Isotipo "E": tres brazos que ganan longitud hacia arriba, como una escala. */
export function Isotype({ size = 32, className }: { size?: number; className?: string }) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Escalab"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="32" x2="32" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#174ED8" />
          <stop offset="0.38" stopColor="#269BD2" />
          <stop offset="0.7" stopColor="#42C5A4" />
          <stop offset="1" stopColor="#C8EB63" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="6.5" height="26" rx="2" fill={`url(#${id})`} />
      <rect x="11" y="3" width="18" height="6.5" rx="2" fill={`url(#${id})`} />
      <rect x="11" y="12.75" width="13" height="6.5" rx="2" fill={`url(#${id})`} />
      <rect x="11" y="22.5" width="8" height="6.5" rx="2" fill={`url(#${id})`} />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-extrabold tracking-tight ${className}`}>
      <Isotype size={30} />
      <span className="text-[22px] leading-none">
        Esca<span className="text-grad">lab</span>
      </span>
    </span>
  );
}
