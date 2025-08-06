import React, { useEffect, useRef, useState } from 'react';

const HubSpotContactForm = ({ className = "" }) => {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [formId] = useState(() => `hubspot-form-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    let timeoutId;
    let intervalId;

    const initializeForm = () => {
      try {
        if (window.hbspt && window.hbspt.forms && formRef.current) {
          // Clear any existing form content
          formRef.current.innerHTML = '';

          console.log('Initializing HubSpot form...');
          
          // Create the HubSpot form
          window.hbspt.forms.create({
            region: "na2",
            portalId: "243001979",
            formId: "782d9a92-b21c-4cee-90ca-2b00b37d985c",
            target: `#${formId}`,
            onFormReady: () => {
              console.log('HubSpot form loaded successfully');
              setIsLoading(false);
              setHasError(false);
            },
            onFormSubmit: () => {
              console.log('HubSpot form submitted');
            }
          });
        }
      } catch (error) {
        console.error('Error initializing HubSpot form:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    // Check if HubSpot is already loaded
    if (window.hbspt && window.hbspt.forms) {
      console.log('HubSpot already loaded, initializing form');
      initializeForm();
    } else {
      console.log('Waiting for HubSpot to load...');
      
      // Wait for HubSpot to load
      intervalId = setInterval(() => {
        if (window.hbspt && window.hbspt.forms) {
          console.log('HubSpot loaded, initializing form');
          clearInterval(intervalId);
          initializeForm();
        }
      }, 100);

      // Set error state after 15 seconds if still not loaded
      timeoutId = setTimeout(() => {
        if (isLoading) {
          console.error('HubSpot form failed to load within timeout');
          clearInterval(intervalId);
          setHasError(true);
          setIsLoading(false);
        }
      }, 15000);
    }

    // Cleanup function
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      if (formRef.current) {
        formRef.current.innerHTML = '';
      }
    };
  }, [formId, isLoading]);

  return (
    <div className={`hubspot-contact-form ${className}`}>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-navy-blue mb-6 text-center">Contact Us</h2>
        <p className="text-gray-600 text-center mb-6">
          Ready to transform your business with AI? Get in touch with our team.
        </p>
        
        {/* HubSpot Form Container */}
        <div 
          ref={formRef}
          id={formId}
          className="min-h-[400px]"
        >
          {/* Loading State */}
          {isLoading && !hasError && (
            <div className="flex flex-col justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <span className="text-gray-600">Loading contact form...</span>
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="text-center py-8">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Form Loading Issue</h3>
              <p className="text-gray-600 mb-4">We're having trouble loading our contact form.</p>
              <div className="space-y-3">
                <p className="text-sm text-gray-500">You can still reach us directly:</p>
                <a 
                  href="mailto:info@sherpatech.ai" 
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Email us: info@sherpatech.ai
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HubSpotContactForm;
