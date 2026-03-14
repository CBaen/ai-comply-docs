import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Compliance Documents — Compliance documentation for state and federal AI regulations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e40af 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Shield icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 16,
            background: "rgba(255,255,255,0.1)",
            border: "2px solid rgba(255,255,255,0.2)",
            marginBottom: 32,
            fontSize: 40,
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}
        >
          AI Compliance Documents
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: 700,
            marginBottom: 40,
          }}
        >
          Compliance documentation for state and federal AI regulations.
          Self-service. Instant download.
        </div>

        {/* Bottom bar with key states */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["Illinois", "Colorado", "California", "Virginia", "NYC", "EU AI Act"].map(
            (state) => (
              <div
                key={state}
                style={{
                  padding: "8px 20px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 8,
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                {state}
              </div>
            )
          )}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.05em",
          }}
        >
          aicompliancedocuments.com
        </div>
      </div>
    ),
    { ...size }
  );
}
