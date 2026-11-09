import Image from "next/image";

/** Foto de fondo con parallax suave en CSS puro (scroll-driven; se desactiva con "reducir movimiento"). El texto va aparte, como HTML real. */
export function ParallaxImage({
  src,
  alt,
  sizes = "100vw",
  preload = false,
  position = "center",
  strength = 8,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  preload?: boolean;
  position?: string;
  strength?: number;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="parallax absolute inset-x-0 -inset-y-[10%]" style={{ "--py": `${strength}%` } as React.CSSProperties}>
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} quality={75} className="object-cover" style={{ objectPosition: position }} />
      </div>
    </div>
  );
}
