import { ImageResponse } from "next/og";

export const runtime = "edge";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(135deg, #fffaf3 0%, #f4efe8 52%, #d8efe9 100%)",
          color: "#142033",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #0f766e, #f97316)",
            }}
          />
          <div>
            <div style={{ fontSize: "28px", fontWeight: 800 }}>
              Adaptive TOEIC Trainer
            </div>
            <div style={{ fontSize: "16px", color: "#5c667a" }}>
              Diagnose weak spots. Train smarter.
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "840px" }}>
          <div style={{ fontSize: "72px", fontWeight: 900, lineHeight: 0.95 }}>
            A personal study OS for TOEIC
          </div>
          <div
            style={{
              marginTop: "22px",
              fontSize: "28px",
              lineHeight: 1.35,
              color: "#44506a",
            }}
          >
            Diagnostic mode, weakness heatmap, adaptive quests, and contextual
            flashcards in one unique flow.
          </div>
        </div>

        <div style={{ display: "flex", gap: "18px", fontSize: "18px" }}>
          <div style={{ padding: "14px 18px", borderRadius: "999px", background: "rgba(15,118,110,0.12)" }}>
            Personalized
          </div>
          <div style={{ padding: "14px 18px", borderRadius: "999px", background: "rgba(249,115,22,0.12)" }}>
            Adaptive
          </div>
          <div style={{ padding: "14px 18px", borderRadius: "999px", background: "rgba(20,32,51,0.08)" }}>
            Built for Vercel
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
