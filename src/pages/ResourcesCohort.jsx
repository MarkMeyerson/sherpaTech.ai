import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResourcesCohort = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/cohort-thankyou');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-pearl-white flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Main Card Container */}
        <div className="bg-alpine-white rounded-xl shadow-lg p-8 md:p-12 text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/sherpa-logo.svg" 
              alt="SherpaTech.AI Logo" 
              className="h-16 w-auto mx-auto"
            />
          </div>

          {/* Construction Icon */}
          <div className="text-6xl mb-6">
            🚧
          </div>

          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4 font-inter">
            Cohort Resources Coming Soon
          </h1>

          {/* Sub-header */}
          <h3 className="text-xl md:text-2xl font-semibold text-mountain-blue mb-6 font-inter">
            We're building something amazing for you!
          </h3>

          {/* Main content */}
          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 font-open-sans">
              Your exclusive cohort resource center is currently under construction. 
              This will be your one-stop hub for:
            </p>
            
            <div className="bg-ice-blue rounded-lg p-6 mb-6">
              <div className="text-left space-y-3 font-open-sans">
                <p className="flex items-center"><span className="text-mountain-blue mr-2">📚</span> Course materials and guides</p>
                <p className="flex items-center"><span className="text-mountain-blue mr-2">🎥</span> Video tutorials and recordings</p>
                <p className="flex items-center"><span className="text-mountain-blue mr-2">💬</span> Community discussion forums</p>
                <p className="flex items-center"><span className="text-mountain-blue mr-2">📋</span> Templates and worksheets</p>
                <p className="flex items-center"><span className="text-mountain-blue mr-2">🎯</span> Progress tracking tools</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed font-open-sans">
              We'll notify you via email as soon as your resources are ready!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={handleBackClick}
              className="bg-navy-blue text-alpine-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-mountain-blue hover:shadow-lg transform hover:scale-105 font-inter"
            >
              ← Back to Thank You Page
            </button>

            <button
              onClick={handleHomeClick}
              className="bg-mountain-blue text-alpine-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-navy-blue hover:shadow-lg transform hover:scale-105 font-inter"
            >
              Visit Homepage
            </button>
          </div>

          {/* Secondary text */}
          <p className="text-sm text-gray-600 font-open-sans">
            Need immediate help? Email us at{' '}
            <a 
              href="mailto:support@sherpatech.ai" 
              className="text-mountain-blue hover:text-navy-blue transition-colors duration-200 underline"
            >
              support@sherpatech.ai
            </a>
            .
          </p>
        </div>

        {/* Timeline Card */}
        <div className="mt-6 bg-ice-blue rounded-lg p-6 text-center">
          <h4 className="text-lg font-semibold text-navy-blue mb-2 font-inter">
            Expected Timeline
          </h4>
          <p className="text-sm text-gray-700 font-open-sans">
            Resources will be available within <strong>48-72 hours</strong> after your payment confirmation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourcesCohort;