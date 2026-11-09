import type { CSSProperties, ReactNode } from "react";
import { Phone as PhoneIcon, Video } from "lucide-react";
import type { Msg } from "@/lib/journey";

/** Burbuja de la conversación de ejemplo. */
export function Bubble({ msg, className = "", style }: { msg: Msg; className?: string; style?: CSSProperties }) {
  if (msg.from === "sys") {
    return (
      <p style={style} className={`self-center rounded-full bg-sand px-3 py-1 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-soft ${className}`}>
        {msg.text}
      </p>
    );
  }
  const lead = msg.from === "lead";
  return (
    <p
      style={style}
      className={`max-w-[84%] px-3.5 py-2 text-[14px] leading-snug text-ink shadow-[0_1px_0_rgb(43_33_28_/_0.08)] ${
        lead ? "self-start rounded-2xl rounded-bl-md bg-white" : "self-end rounded-2xl rounded-br-md bg-sage-soft"
      } ${className}`}
    >
      {msg.text}
    </p>
  );
}

/** Marco de teléfono con una conversación de ejemplo (simulación, inmobiliaria ficticia). */
export function Phone({ children, caption = true }: { children: ReactNode; caption?: boolean }) {
  return (
    <figure className="mx-auto w-full max-w-[310px]">
      <div className="rounded-[46px] bg-night p-[10px] shadow-[0_30px_60px_-24px_rgb(30_24_20_/_0.55)]">
        <div className="flex h-[560px] flex-col overflow-hidden rounded-[36px] bg-[#efe7db]">
          <div className="flex items-center gap-3 border-b border-line bg-linen px-4 pb-3 pt-5">
            <span aria-hidden className="grid size-10 place-items-center rounded-full bg-terracotta font-serif text-[16px] text-linen">
              CA
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[14px] font-bold text-ink">Casa Aurelia</span>
              <span className="block truncate text-[12px] text-soft">Respuesta automática</span>
            </span>
            <Video aria-hidden size={18} className="text-soft" />
            <PhoneIcon aria-hidden size={17} className="text-soft" />
          </div>
          <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">{children}</div>
          <div className="px-3 pb-4">
            <div className="rounded-full bg-white px-4 py-2.5 text-[13px] text-[#8a7b6e]">Mensaje</div>
          </div>
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-center text-[12px] text-cream/80">Conversación de ejemplo · simulación</figcaption>}
    </figure>
  );
}
