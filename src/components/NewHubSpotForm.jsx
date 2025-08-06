import React, { useEffect } from 'react';

const NewHubSpotForm = () => {
  useEffect(() => {
    // Clean up any existing HubSpot scripts to avoid conflicts
    const existingScripts = document.querySelectorAll('script[src*="hsforms.net"]');
    existingScripts.forEach(script => {
      if (!script.src.includes('243001979.js')) {
        script.remove();
      }
    });

    // Add the HubSpot script if it doesn't exist
    const scriptId = 'hubspot-forms-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://js-na2.hsforms.net/forms/embed/243001979.js';
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup if component unmounts
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }
    };
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
        
        {/* HubSpot Form Container */}
        <div 
          className="hs-form-frame" 
          data-region="na2" 
          data-form-id="782d9a92-b21c-4cee-90ca-2b00b37d985c" 
          data-portal-id="243001979"
        ></div>
        
        {/* Fallback message */}
        <div id="form-loading" className="text-center py-8 text-gray-500">
          <div className="animate-pulse">Loading contact form...</div>
        </div>
      </div>
    </div>
  );
};

export default NewHubSpotForm;
