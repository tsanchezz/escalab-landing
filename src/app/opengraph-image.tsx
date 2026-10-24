import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = "Escalab: automatización con n8n para pymes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const grad = "linear-gradient(100deg, #174ED8 0%, #269BD2 38%, #42C5A4 70%, #C8EB63 100%)";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#071421", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, fontFamily: "sans-serif", color: "#F7F8FA" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 56, height: 56, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 12, height: 56, borderRadius: 4, background: grad }} />
            <div style={{ position: "absolute", left: 16, top: 0, width: 40, height: 12, borderRadius: 4, background: grad }} />
            <div style={{ position: "absolute", left: 16, top: 22, width: 29, height: 12, borderRadius: 4, background: grad }} />
            <div style={{ position: "absolute", left: 16, top: 44, width: 18, height: 12, borderRadius: 4, background: grad }} />
          </div>
          <div style={{ display: "flex", fontSize: 46, fontWeight: 800 }}>
            Esca
            <span style={{ backgroundImage: grad, backgroundClip: "text", color: "transparent" }}>lab</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
          <div style={{ display: "flex" }}>Automatizá tu pyme.</div>
          <div style={{ display: "flex", backgroundImage: grad, backgroundClip: "text", color: "transparent" }}>Vendé más.</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#B9C3CD" }}>
          <div style={{ display: "flex" }}>Workflows de n8n · de lead a venta</div>
          <div style={{ display: "flex", letterSpacing: 4 }}>{SITE.claim.toUpperCase()}</div>
        </div>
      </div>
    ),
    size,
  );
}
