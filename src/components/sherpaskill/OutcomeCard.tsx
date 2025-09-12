import React from "react";
import type { Outcome } from "../../types/sherpaskill";
import { Mail, BarChart3, Calendar, PencilLine } from "lucide-react";

const IconMap: Record<Outcome["icon"], React.ComponentType<{ className?: string }>> = {
  "envelope": Mail,
  "bar-chart": BarChart3,
  "calendar": Calendar,
  "pencil": PencilLine
};

export const OutcomeCard: React.FC<{ outcome: Outcome }> = ({ outcome }) => {
  const Icon = IconMap[outcome.icon];
  const headingId = `${outcome.id}-headline`;
  
  return (
    <article
      aria-labelledby={headingId}
      className="group rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur p-6 shadow-md hover:shadow-lg transition"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-xl border p-3" aria-hidden="true">
          {Icon ? <Icon className="h-6 w-6" /> : <div className="h-6 w-6" />}
        </div>
        <div className="flex-1">
          <h3 id={headingId} className="text-xl font-semibold tracking-tight">
            {outcome.headline}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-neutral-700">
            {outcome.subcopy}
          </p>
          <ul className="mt-3 space-y-1 text-neutral-800">
            {outcome.examples.map((ex, i) => (
              <li key={i} className="pl-4 relative">
                <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-neutral-400" aria-hidden="true" />
                {ex}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <div className="aspect-[16/10] w-full rounded-xl border border-dashed grid place-content-center text-sm text-neutral-500">
              Image placeholder
            </div>
            {outcome.visualHint && (
              <p className="mt-2 text-xs text-neutral-500">Hint: {outcome.visualHint}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
