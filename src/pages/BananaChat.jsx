import { useEffect } from "react";

const RETELL_AGENT_ID = "agent_73a52d4992e05904a51d641080";
const RETELL_PUBLIC_KEY = "public_key_c138710cf5d6a80f90e3d";

export default function BananaChat() {
  useEffect(() => {
    const existing = document.getElementById("retell-widget");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = "retell-widget";
    script.src = "https://dashboard.retellai.com/retell-widget.js";
    script.type = "module";
    script.setAttribute("data-public-key", RETELL_PUBLIC_KEY);
    script.setAttribute("data-agent-id", RETELL_AGENT_ID);
    script.setAttribute("data-title", "Brenna Holmes Interview Agent");
    script.setAttribute("data-bot-name", "Brenna Holmes AI");
    script.setAttribute("data-popup-message", "Hi! I'm ready to begin your interview session.");
    script.setAttribute("data-show-ai-popup", "true");
    script.setAttribute("data-show-ai-popup-time", "3");
    script.setAttribute("data-auto-open", "true");
    script.setAttribute("data-color", "#1e3a6e");

    document.head.appendChild(script);

    return () => {
      const s = document.getElementById("retell-widget");
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* Nav */}
      <nav style={{ backgroundColor: "#111827" }} className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* BH Monogram */}
          <div
            style={{
              width: "42px",
              height: "42px",
              border: "1.5px solid #fff",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontSize: "16px", fontWeight: "700", letterSpacing: "1px" }}>BH</span>
          </div>
          <div>
            <p style={{ color: "#fff", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", lineHeight: 1 }}>
              BRENNA HOLMES
            </p>
            <p style={{ color: "#9ca3af", fontSize: "9px", letterSpacing: "1.5px", lineHeight: 1, marginTop: "3px" }}>
              ADVISORY CONSULTING
            </p>
          </div>
        </div>
        <a
          href="https://www.brennaholmes.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#d1d5db", fontSize: "13px", letterSpacing: "0.5px" }}
          className="hover:text-white transition-colors"
        >
          brennaholmes.com
        </a>
      </nav>

      {/* Hero — dark navy with landscape-style overlay */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f1f3d 0%, #1a3057 40%, #0d1b2e 100%)",
          position: "relative",
          overflow: "hidden",
          minHeight: "420px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Subtle texture overlay to mimic aerial photo feel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(59,100,180,0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(30,60,110,0.3) 0%, transparent 50%)",
          }}
        />
        <div className="relative px-10 py-16 max-w-4xl">
          <p
            style={{
              color: "#93c5fd",
              fontSize: "13px",
              letterSpacing: "2px",
              fontWeight: "600",
              marginBottom: "20px",
              fontFamily: "sans-serif",
            }}
          >
            STRATEGIC ARCHITECTURE FOR THE SOCIAL IMPACT ECOSYSTEM
          </p>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "800",
              lineHeight: "1.1",
              marginBottom: "24px",
              maxWidth: "750px",
            }}
          >
            Brenna Holmes
            <br />
            <span style={{ fontWeight: "400", fontStyle: "italic" }}>Interview Agent</span>
          </h1>
          <p
            style={{
              color: "#bfdbfe",
              fontSize: "18px",
              fontWeight: "600",
              maxWidth: "620px",
              lineHeight: "1.6",
              fontFamily: "sans-serif",
            }}
          >
            A confidential AI-powered interview session to surface your team's
            operational reality — the friction, the workarounds, and the gaps
            leadership needs to understand.
          </p>
        </div>
      </div>

      {/* Content section — white, matching her site */}
      <div style={{ backgroundColor: "#ffffff", flex: 1 }} className="px-10 py-14">
        <div className="max-w-4xl mx-auto">

          {/* Intro paragraph — cobalt blue bold text matching her style */}
          <p
            style={{
              color: "#1e40af",
              fontSize: "18px",
              fontWeight: "700",
              lineHeight: "1.7",
              marginBottom: "36px",
              fontFamily: "sans-serif",
            }}
          >
            This session is part of Brenna Holmes' organizational diagnostic process.
            Speak freely — your responses help identify structural friction and
            build a clearer picture for mission-aligned growth.
          </p>

          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "32px", marginBottom: "40px" }}>
            <p
              style={{ fontWeight: "700", fontSize: "15px", color: "#111827", marginBottom: "16px", fontFamily: "sans-serif" }}
            >
              How this works.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
              {[
                {
                  step: "01",
                  title: "Chat opens automatically",
                  desc: "The AI interview agent will appear in the bottom-right corner within a few seconds.",
                },
                {
                  step: "02",
                  title: "Answer honestly",
                  desc: "No right or wrong answers. Describe your real experience — workflows, friction, and all.",
                },
                {
                  step: "03",
                  title: "Take your time",
                  desc: "Sessions typically take 15–25 minutes. Your candor is what makes this valuable.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      color: "#1e40af",
                      fontSize: "22px",
                      fontWeight: "800",
                      lineHeight: 1,
                      minWidth: "36px",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {step}
                  </span>
                  <div>
                    <p style={{ fontWeight: "700", fontSize: "14px", color: "#111827", marginBottom: "4px", fontFamily: "sans-serif" }}>
                      {title}
                    </p>
                    <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.6", fontFamily: "sans-serif" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confidentiality */}
          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderLeft: "4px solid #1e40af",
              padding: "16px 20px",
              borderRadius: "2px",
            }}
          >
            <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", fontFamily: "sans-serif" }}>
              <strong style={{ color: "#1e293b" }}>Confidentiality:</strong> All responses are used solely for
              Brenna Holmes Advisory Consulting's organizational diagnostic process.
              Questions? <a href="https://www.brennaholmes.com" style={{ color: "#1e40af" }}>brennaholmes.com</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: "#111827", borderTop: "1px solid #1f2937" }} className="py-5 px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p style={{ color: "#6b7280", fontSize: "12px", fontFamily: "sans-serif" }}>
            © 2026 Brenna Holmes Advisory Consulting
          </p>
          <p style={{ color: "#4b5563", fontSize: "11px", fontFamily: "sans-serif" }}>
            Powered by{" "}
            <a href="https://sherpatech.ai" style={{ color: "#6b7280" }} className="hover:text-gray-400 transition-colors">
              SherpaTech.AI
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
