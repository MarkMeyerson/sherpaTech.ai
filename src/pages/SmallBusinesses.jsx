import React, { useState } from 'react';
import { Assessment } from '../features/assessment/components/Assessment';

export function SmallBusinesses() {
  const [showAssessment, setShowAssessment] = useState(false);

  const handleStartAssessment = () => {
    setShowAssessment(true);
    // Smooth scroll to assessment section
    document.getElementById('assessment-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-navy-900 to-navy-800">
        <h1 className="text-4xl font-bold text-white sm:text-5xl mb-8">
          Small Business AI Solutions
        </h1>
        
        {/* Animated Assessment Button */}
        <button
          onClick={handleStartAssessment}
          className="relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white 
            bg-pink-600 rounded-lg group hover:bg-pink-500 transition-all duration-300
            animate-pulse hover:animate-none
            shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]"
        >
          <span className="relative">
            Start Your Assessment
            <span className="absolute -right-6 top-1/2 transform -translate-y-1/2 
              transition-transform group-hover:translate-x-2">
              →
            </span>
          </span>
        </button>
      </div>

      {/* Assessment Section */}
      <div id="assessment-section" className="scroll-mt-16">
        {showAssessment && <Assessment />}
      </div>

      {/* Rest of your small business content */}
    </div>
  );
}