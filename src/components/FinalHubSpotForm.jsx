import React, { useEffect } from 'react';

const FinalHubSpotForm = () => {
  useEffect(() => {
    // Load HubSpot script once globally
    if (!document.getElementById('hubspot-main-script')) {
      const script = document.createElement('script');
      script.id = 'hubspot-main-script';
      script.src = 'https://js-na2.hsforms.net/forms/embed/243001979.js';
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Ready to transform your business with AI? Let's start the conversation.
        </p>
        
        {/* HubSpot Form Container - Updated with reCAPTCHA removed */}
        <div 
          className="hs-form-frame" 
          data-region="na2" 
          data-form-id="782d9a92-b21c-4cee-90ca-2b00b37d985c" 
          data-portal-id="243001979"
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

export default FinalHubSpotForm;
