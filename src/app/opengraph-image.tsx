import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = "Escalab: automatización de consultas para inmobiliarias";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const bar = { position: "absolute" as const, background: "#2B211C", borderRadius: 3 };
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#F6F1E9", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, fontFamily: "Georgia, serif", color: "#2B211C" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ display: "flex", width: 56, height: 56, position: "relative" }}>
            <div style={{ ...bar, left: 6, top: 6, width: 7, height: 46 }} />
            <div style={{ ...bar, left: 16, top: 6, width: 36, height: 7 }} />
            <div style={{ ...bar, left: 16, top: 25, width: 25, height: 7, background: "#B5573A" }} />
            <div style={{ ...bar, left: 16, top: 45, width: 14, height: 7 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 44 }}>Escalab</div>
            <div style={{ display: "flex", fontSize: 16, letterSpacing: 5, fontFamily: "sans-serif", fontWeight: 700, color: "#9E4A30" }}>PARA INMOBILIARIAS</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 88, lineHeight: 1.02, letterSpacing: -2 }}>
          <div style={{ display: "flex" }}>Cada consulta, respondida.</div>
          <div style={{ display: "flex", color: "#9E4A30", fontStyle: "italic" }}>Cada visita, agendada.</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, fontFamily: "sans-serif", color: "#6B5D52" }}>
          <div style={{ display: "flex" }}>Agente de IA para WhatsApp, Instagram y web</div>
          <div style={{ display: "flex", padding: "10px 22px", borderRadius: 999, background: "#B5573A", color: "#FFF9F2", fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>
            {SITE.claim}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
