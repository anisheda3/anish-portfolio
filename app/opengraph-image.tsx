import { ImageResponse } from "next/og";

export const alt = "Anish Eda, AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 20% 0%, #0f3b37 0%, #06080b 55%)",
          color: "#e8edf2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#5eead4" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#5eead4" }} />
          Open to AI / ML Engineer roles
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 148, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>Anish Eda.</div>
          <div style={{ fontSize: 40, color: "#9aa6b2", marginTop: 24 }}>
            AI Engineer · RAG &amp; LLM fine-tuning · Agentic AI · Computer vision
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#5f6b78" }}>
          <span>IIIT Sri City · B.Tech AI &amp; DS</span>
          <span>github.com/anisheda3</span>
        </div>
      </div>
    ),
    size,
  );
}
