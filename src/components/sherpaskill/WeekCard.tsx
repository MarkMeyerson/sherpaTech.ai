import React from "react";
import type { Week } from "../../types/sherpaskill";

interface WeekCardProps {
  week: Week;
  weekNumber: number;
  isLast?: boolean;
}

export const WeekCard: React.FC<WeekCardProps> = ({ week, weekNumber, isLast }) => {
  const headingId = `${week.id}-title`;
  
  return (
    <article
      aria-labelledby={headingId}
      className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Week Number Badge */}
      <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1B365D] text-white rounded-full text-lg font-semibold mb-4">
        {weekNumber}
      </div>
      
      {/* Content */}
      <div className="space-y-4">
        <div>
          <h3 id={headingId} className="text-xl font-semibold text-[#1B365D] mb-2 font-['Inter']">
            {week.title}
          </h3>
          <h4 className="text-lg font-medium text-[#2B517A] mb-3 font-['Inter']">
            {week.headline}
          </h4>
          <p className="text-gray-700 leading-relaxed font-['Open_Sans']">
            {week.subcopy}
          </p>
        </div>

        {/* What You'll Learn */}
        <div>
          <h5 className="font-semibold text-[#1B365D] mb-2 font-['Inter']">
            What You'll Learn:
          </h5>
          <ul className="space-y-1">
            {week.whatYouLearn.map((item, index) => (
              <li key={index} className="flex items-start text-gray-700 font-['Open_Sans']">
                <span className="inline-block w-2 h-2 bg-[#FF6A3D] rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Homework & Deliverable */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-[#F7FAFC] p-4 rounded-lg">
            <h6 className="font-semibold text-[#1B365D] text-sm mb-1 font-['Inter']">
              Homework:
            </h6>
            <p className="text-sm text-gray-700 font-['Open_Sans']">
              {week.homework}
            </p>
          </div>
          <div className="bg-[#E8EEF4] p-4 rounded-lg">
            <h6 className="font-semibold text-[#1B365D] text-sm mb-1 font-['Inter']">
              Deliverable:
            </h6>
            <p className="text-sm text-gray-700 font-['Open_Sans']">
              {week.deliverable}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Connector (hidden on mobile, shown on desktop) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-6 -right-8 w-16 h-0.5 bg-[#E8EEF4]" />
      )}
    </article>
  );
};
