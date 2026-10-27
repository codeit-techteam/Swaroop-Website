import { ImageResponse } from "next/og";

export const alt = "PolyStoreX - Industrial materials. Sourced smarter. Delivered better.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #000C2B 0%, #00338D 60%, #1E55B0 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="32" fill="#FFFFFF" />
            <path
              d="M22 46V18h12.5a9 9 0 0 1 0 18H22"
              fill="none"
              stroke="#00338D"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M28.5 18.5v-3.5"
              fill="none"
              stroke="#FFB800"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M28.5 15.5c-3.2-1.2-5.2-3.8-5.4-6.6 2.8.4 5.2 2.2 6.4 4.8 1.4-2.8 3.9-4.7 6.8-5.1-0.5 3-2.6 5.7-5.8 6.9"
              fill="#FFB800"
            />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "0.12em" }}>
            POLYSTOREX
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Industrial materials.
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#FFB800",
            }}
          >
            Sourced smarter. Delivered better.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#D1DDEB" }}>
            Polymers · Petrochemicals · Procurement · Logistics · Business credit
          </div>
        </div>
      </div>
    ),
    size,
  );
}
