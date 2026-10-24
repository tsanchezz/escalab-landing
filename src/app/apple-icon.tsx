import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const grad = "linear-gradient(135deg, #C8EB63 0%, #42C5A4 35%, #269BD2 68%, #174ED8 100%)";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#071421", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", width: 112, height: 112, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 23, height: 112, borderRadius: 7, background: grad }} />
          <div style={{ position: "absolute", left: 31, top: 0, width: 81, height: 23, borderRadius: 7, background: grad }} />
          <div style={{ position: "absolute", left: 31, top: 44, width: 58, height: 23, borderRadius: 7, background: grad }} />
          <div style={{ position: "absolute", left: 31, top: 89, width: 36, height: 23, borderRadius: 7, background: grad }} />
        </div>
      </div>
    ),
    size,
  );
}
