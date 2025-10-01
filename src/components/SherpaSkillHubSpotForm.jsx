import React, { useEffect } from 'react';

const SherpaSkillHubSpotForm = () => {
  useEffect(() => {
    // Function to initialize the form with redirect configuration
    const initializeForm = () => {
      if (window.hbspt && window.hbspt.forms) {
        window.hbspt.forms.create({
          region: "na2",
          portalId: "243001979",
          formId: "af95dab6-e285-4ac0-b3d3-9091945a27ca",
          target: "#hubspot-form-container",
          onFormSubmit: function($form) {
            // Add a small delay to ensure the submission is processed
            setTimeout(() => {
              // Redirect to the thank you page
              window.location.href = '/cohort-thankyou';
            }, 500);
          }
        });
      }
    };

    // Load HubSpot script if not already loaded
    if (!window.hbspt) {
      const script = document.createElement('script');
      script.src = 'https://js-na2.hsforms.net/forms/embed/243001979.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Wait a moment for the script to fully initialize
        setTimeout(initializeForm, 100);
      };
      document.head.appendChild(script);
    } else {
      // Script already loaded, just initialize the form
      initializeForm();
    }

    // Cleanup function to remove script on unmount
    return () => {
      const container = document.getElementById('hubspot-form-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Enrollment is open for the September cohort
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Seats are limited. Reserve your spot today and start your AI transformation journey.
        </p>
        
        {/* HubSpot Form Container */}
        <div 
          id="hubspot-form-container"
          style={{ minHeight: '400px' }}
        ></div>
        
        {/* Backup contact info */}
        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Having trouble? Email us directly at{' '}
            <a 
              href="mailto:info@sherpatech.ai" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              info@sherpatech.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SherpaSkillHubSpotForm;