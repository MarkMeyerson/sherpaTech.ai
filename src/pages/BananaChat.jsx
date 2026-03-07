import { useEffect } from "react";

const RETELL_AGENT_ID = "agent_73a52d4992e05904a51d641080";
const RETELL_PUBLIC_KEY = "public_key_c138710cf5d6a80f90e3d";

export default function BananaChat() {
  useEffect(() => {
    // Remove any existing Retell widget script to avoid duplicates
    const existing = document.getElementById("retell-widget");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = "retell-widget";
    script.src = "https://dashboard.retellai.com/retell-widget.js";
    script.type = "module";
    script.setAttribute("data-public-key", RETELL_PUBLIC_KEY);
    script.setAttribute("data-agent-id", RETELL_AGENT_ID);
    script.setAttribute("data-title", "B.A.N.A.N.A. Diagnostic");
    script.setAttribute("data-bot-name", "BANANA AI");
    script.setAttribute("data-popup-message", "Hi! I'm ready to begin your AI Listening Tour session.");
    script.setAttribute("data-show-ai-popup", "true");
    script.setAttribute("data-show-ai-popup-time", "3");
    script.setAttribute("data-auto-open", "true");
    script.setAttribute("data-color", "#1e3a5f");

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const s = document.getElementById("retell-widget");
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 flex flex-col">
      {/* Header */}
      <header className="border-b border-blue-800/40 bg-slate-900/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              ST
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              SherpaTech<span className="text-blue-400">.AI</span>
            </span>
          </div>
          <span className="text-slate-400 text-sm hidden sm:block">
            Prepared for <span className="text-white font-medium">RKD Group</span>
          </span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-blue-300 text-sm font-medium">Phase 1 — Operational Diagnostic</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            B.A.N.A.N.A.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              AI Listening Tour
            </span>
          </h1>

          <p className="text-slate-300 text-lg mb-3 leading-relaxed">
            This confidential session is designed to capture your on-the-ground operational reality —
            the workflows, workarounds, and friction points that leadership may not see.
          </p>

          <p className="text-slate-400 text-base mb-10">
            Speak freely. This is <strong className="text-slate-200">not</strong> a performance review.
            Your responses help build a clearer picture for RKD Group's AI readiness roadmap.
          </p>

          {/* Instructions */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12 text-left">
            {[
              {
                step: "1",
                title: "Chat opens automatically",
                desc: "The BANANA AI agent will greet you in the bottom-right corner.",
              },
              {
                step: "2",
                title: "Answer honestly",
                desc: "No right or wrong answers — describe your real day-to-day experience.",
              },
              {
                step: "3",
                title: "Take your time",
                desc: "Sessions typically take 10–20 minutes. You can pause and return.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mb-3">
                  {step}
                </div>
                <p className="text-white font-medium text-sm mb-1">{title}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Confidentiality note */}
          <p className="text-slate-500 text-sm">
            🔒 All responses are confidential and used solely for RKD Group's internal AI diagnostic.
            <br />
            Questions? Contact{" "}
            <a
              href="mailto:mark@sherpaTech.ai"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              mark@sherpaTech.ai
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-900/40 py-4 text-center">
        <p className="text-slate-600 text-xs">
          © 2026 SherpaTech.AI · 301.273.1993 ·{" "}
          <a href="https://sherpatech.ai" className="hover:text-slate-400 transition-colors">
            sherpatech.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
