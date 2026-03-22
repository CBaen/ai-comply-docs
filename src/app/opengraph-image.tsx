import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "AI Compliance Documents — Compliance documentation for state and federal AI regulations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

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
        {/* Shield logo */}
        <img
          src={logoBase64}
          width={120}
          height={120}
          style={{ marginBottom: 32 }}
        />

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
          {["Illinois", "Colorado", "Texas", "California", "NYC", "EU AI Act"].map(
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
