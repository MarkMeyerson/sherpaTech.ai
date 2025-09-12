import React from "react";
import type { Outcome } from "../../types/sherpaskill";
import { OutcomeCard } from "./OutcomeCard";

const DEFAULT_OUTCOMES: Outcome[] = [
  {
    id: "outlook-hours",
    icon: "envelope",
    headline: "Cut through inbox clutter and focus on what matters.",
    subcopy: "Employees save around 30 minutes per day on email with Copilot in Outlook. That's time back for clients and strategy.",
    examples: [
      "Summarize 50 unread emails into bullet points in seconds.",
      "Draft client responses without starting from scratch."
    ],
    visualHint: "Replace placeholder with an Outlook inbox view showing the Copilot panel."
  },
  {
    id: "automate-reports",
    icon: "bar-chart",
    headline: "Let Copilot handle the number crunching.",
    subcopy: "Finance and operations teams recapture hours each month by using Copilot to automate tables, charts, and summaries—so you focus on insights, not formulas.",
    examples: [
      "Turn raw sales data into a clean summary table with one prompt.",
      "Generate pivot tables and charts without writing formulas."
    ],
    visualHint: "Replace placeholder with an Excel sheet showing a Copilot prompt that creates a chart."
  },
  {
    id: "smarter-meetings",
    icon: "calendar",
    headline: "Never leave a meeting unsure of what's next.",
    subcopy: "Teams cut meeting admin time significantly by letting Copilot capture notes and action items—so you stay present in the conversation.",
    examples: [
      "Auto-generate recaps and action items in Teams.",
      "Search past meetings for decisions like \"budget approval.\""
    ],
    visualHint: "Replace placeholder with a Teams recap screen showing Copilot's action item summary."
  },
  {
    id: "content-in-clicks",
    icon: "pencil",
    headline: "From blank page to polished draft in minutes.",
    subcopy: "Organizations report 45%–60% faster drafting for emails and documents; SMB teams say proposal drafts take about half the time with Copilot.",
    examples: [
      "Draft a 1-page client proposal in Word using your key points.",
      "Generate a 10-slide PowerPoint outline in seconds."
    ],
    visualHint: "Replace placeholder with a Word or PowerPoint screenshot showing a Copilot draft."
  }
];

interface SignatureOutcomesProps {
  outcomes?: Outcome[];
  className?: string;
}

export const SignatureOutcomes: React.FC<SignatureOutcomesProps> = ({
  outcomes = DEFAULT_OUTCOMES,
  className
}) => {
  return (
    <section 
      id="signature-outcomes" 
      className={["mx-auto max-w-6xl px-4 md:px-6 py-16", className].filter(Boolean).join(" ")}
    >
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center">
          Signature Outcomes
        </h2>
        <p className="mt-2 text-neutral-700 text-center max-w-3xl mx-auto">
          Practical wins your team can realize with Microsoft 365 Copilot — focused on time back and better outcomes.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {outcomes.map(outcome => (
          <OutcomeCard key={outcome.id} outcome={outcome} />
        ))}
      </div>
    </section>
  );
};
