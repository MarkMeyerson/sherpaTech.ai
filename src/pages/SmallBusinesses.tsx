import React from 'react';
import { Assessment } from '../features/assessment/components/Assessment';
import { SmallBusinessHero } from '../components/SmallBusinessHero';

export const SmallBusinesses: React.FC = () => {
  return (
    <div className="min-h-screen">
      <SmallBusinessHero />
      <div id="ai-readiness-assessment" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6">AI Readiness Assessment</h2>
        <p className="text-center mb-8 text-gray-600 max-w-2xl mx-auto">
          Our AI Readiness Assessment helps you understand where your business stands in terms of AI adoption.
        </p>
        <Assessment />
      </div>
    </div>
  );
};