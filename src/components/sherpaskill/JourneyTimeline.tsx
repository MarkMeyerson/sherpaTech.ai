import React from "react";
import type { Week } from "../../types/sherpaskill";
import { WeekCard } from "./WeekCard";

const DEFAULT_WEEKS: Week[] = [
  {
    id: "week1",
    title: "Week 1 – Basecamp: Orientation & First Steps",
    headline: "Gear up with tools and mindset for your Copilot journey.",
    subcopy: "Start by learning the fundamentals of Microsoft 365 Copilot and how it fits into your daily work. Research shows most participants discover that 60% of their routine tasks can be Copilot-eligible right away.",
    whatYouLearn: [
      "AI literacy fundamentals and Microsoft's Copilot strategy",
      "Walkthrough of the Microsoft 365 Copilot app ecosystem (Word, Excel, Outlook, Teams)",
      "Environment setup and permissions for a secure Day Zero start",
      "Goal setting and success metrics to measure value in your organization"
    ],
    homework: "Draft a self-introduction using Copilot in Word.",
    deliverable: "Prompt Log #1 with initial experiments."
  },
  {
    id: "week2",
    title: "Week 2 – Camp 2: Apply Tomorrow Tasks",
    headline: "First climbs with real tasks that make an immediate impact.",
    subcopy: "By Week 2, you'll be applying Copilot directly to your inbox and daily communications. Forrester found SMB teams reclaim more than 3 hours per week at this stage by reducing email and meeting overload.",
    whatYouLearn: [
      "Mini-labs in Outlook & Teams with guided practice",
      "Apply-tomorrow assignments for immediate impact",
      "Basic prompt engineering techniques",
      "Time tracking and productivity measurement"
    ],
    homework: "Summarize 25 unread emails using Copilot.",
    deliverable: "Prompt Log #2 with refined techniques."
  },
  {
    id: "week3",
    title: "Week 3 – Glacier: Daily Workflows",
    headline: "Embed Copilot into the rhythm of your day.",
    subcopy: "Week 3 is about building confidence and consistency. Research shows power users integrate Copilot into daily routines and report higher job satisfaction and focus.",
    whatYouLearn: [
      "Daily Copilot routines across Word, Excel, and Teams",
      "Using prompts for meeting summaries and report drafts",
      "How to shift from one-off tasks to consistent workflows",
      "Capturing your own use cases for repeatability"
    ],
    homework: "Use Copilot to generate a first draft of a recurring weekly report.",
    deliverable: "Prompt Log #3 showing before/after comparisons."
  },
  {
    id: "week4",
    title: "Week 4 – Ridge: Reports & Content",
    headline: "Turn raw ideas into polished reports and presentations.",
    subcopy: "In Week 4, you'll level up from quick wins to full content creation. Microsoft studies show Copilot reduces drafting time for proposals, reports, and decks by 45–60%.",
    whatYouLearn: [
      "Drafting professional client proposals in Word",
      "Generating executive summaries from data in Excel",
      "Building PowerPoint outlines and first-pass decks with Copilot",
      "Applying governance guardrails to ensure content accuracy"
    ],
    homework: "Use Copilot to create a 1-page proposal or 5-slide deck draft.",
    deliverable: "Prompt Log #4 plus a completed mini-deliverable (proposal or deck)."
  },
  {
    id: "week5",
    title: "Week 5 – Summit: Agents & Guardrails",
    headline: "Scale Copilot with custom agents and safe adoption practices.",
    subcopy: "The final week takes you from user to builder. You'll create a simple Copilot Studio agent and learn how to apply governance guardrails so Copilot scales safely in your business.",
    whatYouLearn: [
      "Intro to Microsoft Copilot Studio: topics, triggers, and publishing",
      "Extending Copilot with custom workflows (SMB-focused use cases)",
      "Governance Guardrails™ for compliance and security",
      "Building your personal AI adoption roadmap"
    ],
    homework: "Build a simple Copilot Studio FAQ agent for your business.",
    deliverable: "Prompt Log #5 plus a draft AI Roadmap with 3–5 prioritized use cases."
  }
];

interface JourneyTimelineProps {
  weeks?: Week[];
  className?: string;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  weeks = DEFAULT_WEEKS,
  className
}) => {
  return (
    <section 
      id="journey-timeline" 
      className={["bg-[#F7FAFC] py-16 px-4 md:px-6", className].filter(Boolean).join(" ")}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B365D] mb-4 font-['Inter']">
            5-Week Journey to the Summit
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-['Open_Sans']">
            Follow the mountain path from basecamp to summit, mastering Microsoft Copilot step by step.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Mobile Layout: Stacked */}
          <div className="lg:hidden space-y-8">
            {weeks.map((week, index) => (
              <WeekCard 
                key={week.id} 
                week={week} 
                weekNumber={index + 1}
                isLast={index === weeks.length - 1}
              />
            ))}
          </div>

          {/* Desktop Layout: Horizontal Timeline */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-5 gap-8 relative">
              {weeks.map((week, index) => (
                <WeekCard 
                  key={week.id} 
                  week={week} 
                  weekNumber={index + 1}
                  isLast={index === weeks.length - 1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-[#FF6A3D] text-white rounded-lg font-semibold hover:bg-[#e55a35] transition-colors cursor-pointer">
            Ready to Start Your Journey?
          </div>
        </div>
      </div>
    </section>
  );
};
