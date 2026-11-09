import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Isotipo E de Escalab, para favicon y avatar. */
export default function Icon() {
  const bar = { position: "absolute" as const, background: "#F6F1E9", borderRadius: 10 };
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#2B211C", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 96 }}>
        <div style={{ display: "flex", width: 320, height: 320, position: "relative" }}>
          <div style={{ ...bar, left: 0, top: 0, width: 50, height: 320 }} />
          <div style={{ ...bar, left: 80, top: 0, width: 240, height: 50 }} />
          <div style={{ ...bar, left: 80, top: 135, width: 170, height: 50, background: "#E39A7A" }} />
          <div style={{ ...bar, left: 80, top: 270, width: 100, height: 50 }} />
        </div>
      </div>
    ),
    size,
  );
}
