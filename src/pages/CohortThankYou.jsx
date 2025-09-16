import React from 'react';
import { useNavigate } from 'react-router-dom';

const CohortThankYou = () => {
  const navigate = useNavigate();

  // Production Stripe payment link
  const STRIPE_LINK = "https://buy.stripe.com/dRmbJ15RW753eKC9KueIw00";

  const handleResourcesClick = () => {
    navigate('/resources-cohort');
  };

  const handleBookingClick = () => {
    window.open('https://outlook.office.com/book/ScheduleYourAICoachingSessionatSherpaTechAI@awarehousedc.com/', '_blank', 'noopener,noreferrer');
  };

  const handlePaymentClick = () => {
    window.open(STRIPE_LINK, '_blank', 'noopener,noreferrer');
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

          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-4 font-inter">
            🎉 You're In!
          </h1>

          {/* Sub-header */}
          <h3 className="text-xl md:text-2xl font-semibold text-mountain-blue mb-6 font-inter">
            Thanks for joining the SherpaSkill™ Cohort.
          </h3>

          {/* Main content */}
          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 font-open-sans">
              We've reserved your spot and added you to our onboarding list. You can complete your 
              payment using the secure link below, and you'll receive a confirmation email with your 
              Teams invite shortly after.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed font-open-sans">
              Get ready to transform your business with practical AI skills that deliver real results. 
              Our team is excited to guide you through this journey!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mb-6">
            {/* Primary Payment Button */}
            <button
              onClick={handlePaymentClick}
              className="w-full bg-navy-blue text-alpine-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-mountain-blue hover:shadow-lg transform hover:scale-105 font-inter"
            >
              Complete Your Payment ($499)
            </button>

            {/* Secondary buttons in a row on larger screens */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleResourcesClick}
                className="bg-mountain-blue text-alpine-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-navy-blue hover:shadow-lg transform hover:scale-105 font-inter"
              >
                Access Cohort Resources
              </button>

              <button
                onClick={handleBookingClick}
                className="bg-mountain-blue text-alpine-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-navy-blue hover:shadow-lg transform hover:scale-105 font-inter"
              >
                Schedule an Intake Call
              </button>
            </div>
          </div>

          {/* Secondary text */}
          <p className="text-sm text-gray-600 font-open-sans">
            Questions? Email us at{' '}
            <a 
              href="mailto:support@sherpatech.ai" 
              className="text-mountain-blue hover:text-navy-blue transition-colors duration-200 underline"
            >
              support@sherpatech.ai
            </a>
            .
          </p>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-ice-blue rounded-lg p-6 text-center">
          <h4 className="text-lg font-semibold text-navy-blue mb-2 font-inter">
            What Happens Next?
          </h4>
          <div className="text-sm text-gray-700 space-y-2 font-open-sans">
            <p>✅ Complete your secure payment</p>
            <p>✅ Confirmation email with Teams invite</p>
            <p>✅ Welcome packet with pre-course materials</p>
            <p>✅ Calendar invite for your first session</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CohortThankYou;