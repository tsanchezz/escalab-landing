import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Isotipo E de Escalab, para favicon y avatar. */
export default function Icon() {
  const grad = "linear-gradient(135deg, #C8EB63 0%, #42C5A4 35%, #269BD2 68%, #174ED8 100%)";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#071421", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 96 }}>
        <div style={{ display: "flex", width: 320, height: 320, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 66, height: 320, borderRadius: 20, background: grad }} />
          <div style={{ position: "absolute", left: 90, top: 0, width: 230, height: 66, borderRadius: 20, background: grad }} />
          <div style={{ position: "absolute", left: 90, top: 127, width: 166, height: 66, borderRadius: 20, background: grad }} />
          <div style={{ position: "absolute", left: 90, top: 254, width: 102, height: 66, borderRadius: 20, background: grad }} />
        </div>
      </div>
    ),
    size,
  );
}
