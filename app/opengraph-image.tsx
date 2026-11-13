import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "PolyStoreX - Industrial materials. Sourced smarter. Delivered better.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/polystorex-logo-transparent.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #000C2B 0%, #0B1F3A 58%, #12315C 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <img src={src} width={440} height={193} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Industrial materials.
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#E8B923",
            }}
          >
            Sourced smarter. Delivered better.
          </div>
          <div style={{ marginTop: 24, fontSize: 26, color: "#D1DDEB" }}>
            Polymers · Petrochemicals · Procurement · Logistics · Business credit
          </div>
        </div>
      </div>
    ),
    size,
  );
}
