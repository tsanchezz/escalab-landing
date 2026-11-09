import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const bar = { position: "absolute" as const, background: "#F6F1E9", borderRadius: 4 };
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#2B211C", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", width: 112, height: 112, position: "relative" }}>
          <div style={{ ...bar, left: 0, top: 0, width: 18, height: 112 }} />
          <div style={{ ...bar, left: 28, top: 0, width: 84, height: 18 }} />
          <div style={{ ...bar, left: 28, top: 47, width: 60, height: 18, background: "#E39A7A" }} />
          <div style={{ ...bar, left: 28, top: 94, width: 36, height: 18 }} />
        </div>
      </div>
    ),
    size,
  );
}
