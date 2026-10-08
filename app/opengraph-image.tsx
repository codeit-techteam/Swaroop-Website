import { ImageResponse } from "next/og";

export const alt = "Swaroop — Industrial materials. Sourced smarter. Delivered better.";
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
          background: "linear-gradient(135deg, #041226 0%, #0B2E59 60%, #1E5A9B 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="64" height="64" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="11" fill="#FFFFFF" />
            <path
              d="M27.5 12.5H17.25a4.25 4.25 0 0 0 0 8.5h5.5a4.25 4.25 0 0 1 0 8.5H12.5"
              fill="none"
              stroke="#0B2E59"
              strokeWidth="3.1"
              strokeLinecap="round"
            />
            <circle cx="28.6" cy="12.5" r="2.6" fill="#1E6FFF" />
            <circle cx="11.4" cy="29.5" r="2.6" fill="#1E6FFF" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "0.18em" }}>SWAROOP</div>
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
              color: "#A3C7FF",
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
