import React, { useEffect } from 'react';

const SherpaSkillHubSpotForm = () => {
  useEffect(() => {
    // Create and inject the HubSpot script
    const script = document.createElement('script');
    script.src = 'https://js-na2.hsforms.net/forms/embed/243001979.js';
    script.async = true;
    script.defer = true;
    
    // Add the script to head
    document.head.appendChild(script);
    
    // Cleanup function to remove script on unmount
    return () => {
      const existingScript = document.querySelector('script[src="https://js-na2.hsforms.net/forms/embed/243001979.js"]');
      if (existingScript) {
        existingScript.remove();
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
        
        {/* HubSpot Form - Using the exact embed code provided */}
        <div 
          className="hs-form-frame" 
          data-region="na2" 
          data-form-id="af95dab6-e285-4ac0-b3d3-9091945a27ca" 
          data-portal-id="243001979"
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