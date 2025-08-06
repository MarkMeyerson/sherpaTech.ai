import React, { useEffect, useRef } from 'react';

const ImprovedHubSpotForm = () => {
  const formRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Only load the script once globally
    if (!window.hubspotScriptLoaded && !scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = 'https://js-na2.hsforms.net/forms/embed/243001979.js';
      script.defer = true;
      script.onload = () => {
        window.hubspotScriptLoaded = true;
        scriptLoadedRef.current = true;
      };
      document.head.appendChild(script);
    }

    // Create a unique ID for this form instance
    const formId = `hubspot-form-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Set the ID on the form container
    if (formRef.current) {
      formRef.current.id = formId;
    }

    return () => {
      // Clean up this specific form instance if it exists
      if (window.hbspt && window.hbspt.forms) {
        const formElement = document.getElementById(formId);
        if (formElement) {
          formElement.innerHTML = '';
        }
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
        
        {/* HubSpot Form Container with unique ref */}
        <div 
          ref={formRef}
          className="hs-form-frame" 
          data-region="na2" 
          data-form-id="782d9a92-b21c-4cee-90ca-2b00b37d985c" 
          data-portal-id="243001979"
        ></div>
        
        {/* Loading indicator */}
        <div className="text-center py-4 text-gray-500 text-sm">
          <div className="animate-pulse">
            If the form doesn't appear, please refresh the page or{' '}
            <a 
              href="mailto:info@sherpatech.ai?subject=Contact from Sherpatech.ai&body=Hi, I'd like to learn more about your AI solutions."
              className="text-blue-600 hover:text-blue-800 underline"
            >
              email us directly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovedHubSpotForm;
