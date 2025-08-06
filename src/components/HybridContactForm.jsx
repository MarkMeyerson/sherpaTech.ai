import React, { useEffect, useRef, useState } from 'react';
import FallbackContactForm from './FallbackContactForm';

const HybridContactForm = ({ className = "" }) => {
  const formContainerRef = useRef(null);
  const [formState, setFormState] = useState('trying-hubspot'); // trying-hubspot, hubspot-loaded, using-fallback
  const [hubspotAttempts, setHubspotAttempts] = useState(0);
  const maxAttempts = 15; // Reduced to 3 seconds instead of 10
  
  useEffect(() => {
    let attempts = 0;
    let formCreated = false;

    const createHubSpotForm = () => {
      if (formCreated) return true;

      try {
        if (window.hbspt && window.hbspt.forms && formContainerRef.current) {
          console.log('Creating HubSpot form...');
          
          formContainerRef.current.innerHTML = '';
          
          window.hbspt.forms.create({
            region: "na2",
            portalId: "243001979",
            formId: "782d9a92-b21c-4cee-90ca-2b00b37d985c",
            target: formContainerRef.current,
            onFormReady: function($form) {
              console.log('HubSpot form loaded successfully!');
              setFormState('hubspot-loaded');
              formCreated = true;
            },
            onFormSubmit: function($form) {
              console.log('HubSpot form submitted!');
            },
            onFormDefinitionFetchError: function(error) {
              console.error('HubSpot form fetch error:', error);
              setFormState('using-fallback');
            }
          });

          return true;
        }
      } catch (error) {
        console.error('Error creating HubSpot form:', error);
        setFormState('using-fallback');
        return true;
      }

      return false;
    };

    const checkHubSpot = () => {
      attempts++;
      setHubspotAttempts(attempts);

      if (createHubSpotForm()) {
        return true;
      }

      if (attempts >= maxAttempts) {
        console.log('HubSpot not available, switching to fallback form');
        setFormState('using-fallback');
        return true;
      }

      return false;
    };

    // Initial check
    if (checkHubSpot()) {
      return;
    }

    // Quick polling for HubSpot
    const pollInterval = setInterval(() => {
      if (checkHubSpot()) {
        clearInterval(pollInterval);
      }
    }, 200);

    // Cleanup
    return () => {
      clearInterval(pollInterval);
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  if (formState === 'using-fallback') {
    return <FallbackContactForm className={className} />;
  }

  return (
    <div className={`hybrid-contact-form ${className}`}>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-navy-blue mb-6 text-center">Contact Us</h2>
        <p className="text-gray-600 text-center mb-6">
          Ready to transform your business with AI? Get in touch with our team.
        </p>
        
        {/* HubSpot form container */}
        <div 
          ref={formContainerRef}
          className="min-h-[400px] relative"
        >
          {/* Loading state for HubSpot */}
          {formState === 'trying-hubspot' && (
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading contact form...</p>
              <p className="text-xs text-gray-500 mt-2">
                Attempt {hubspotAttempts}/{maxAttempts}
              </p>
              {hubspotAttempts > 10 && (
                <p className="text-xs text-gray-400 mt-1">
                  Having trouble? We'll switch to our backup form in a moment...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HybridContactForm;
