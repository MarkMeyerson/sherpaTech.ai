import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SmallBusinessHero: React.FC = () => {
  const handleStartAssessment = (e: React.MouseEvent) => {
    e.preventDefault();
    const assessmentElement = document.getElementById('ai-readiness-assessment');
    if (assessmentElement) {
      assessmentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.error('Assessment element not found');
    }
  };

  return (
    <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
        Small Business AI Solutions
      </h1>
      <p className="mt-4 text-xl text-gray-500">
        Practical AI implementation strategies to help your small business thrive.
      </p>
      <div className="mt-8">
        <button 
          onClick={handleStartAssessment}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
        >
          Start Your Assessment
        </button>
      </div>
    </div>
  );
};