import React, { useEffect, useRef, useState } from 'react';

const RobustHubSpotForm = ({ className = "" }) => {
  const formContainerRef = useRef(null);
  const [formState, setFormState] = useState('loading'); // loading, loaded, error
  const [debugInfo, setDebugInfo] = useState('');
  const formId = useRef(`hubspot-form-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50; // 10 seconds total
    let formCreated = false;

    const createForm = () => {
      if (formCreated) return;

      try {
        if (window.hbspt && window.hbspt.forms && formContainerRef.current) {
          console.log('Creating HubSpot form...');
          
          // Clear any existing content
          formContainerRef.current.innerHTML = '';
          
          window.hbspt.forms.create({
            region: "na2",
            portalId: "243001979",
            formId: "782d9a92-b21c-4cee-90ca-2b00b37d985c",
            target: `#${formId.current}`,
            onFormReady: function($form) {
              console.log('HubSpot form ready!', $form);
              setFormState('loaded');
              formCreated = true;
            },
            onFormSubmit: function($form) {
              console.log('Form submitted!', $form);
            },
            onFormDefinitionFetchError: function(error) {
              console.error('Form definition fetch error:', error);
              setFormState('error');
            }
          });

          setDebugInfo('Form creation initiated...');
        }
      } catch (error) {
        console.error('Error creating HubSpot form:', error);
        setFormState('error');
        setDebugInfo(`Error: ${error.message}`);
      }
    };

    const checkAndCreate = () => {
      attempts++;
      setDebugInfo(`Attempt ${attempts}/${maxAttempts} - Checking HubSpot...`);

      if (window.hbspt && window.hbspt.forms) {
        console.log('HubSpot detected, creating form');
        createForm();
        return true;
      }

      if (attempts >= maxAttempts) {
        console.error('HubSpot failed to load after maximum attempts');
        setFormState('error');
        setDebugInfo('HubSpot scripts failed to load');
        return true;
      }

      return false;
    };

    // Initial check
    if (checkAndCreate()) {
      return;
    }

    // Poll for HubSpot availability
    const pollInterval = setInterval(() => {
      if (checkAndCreate()) {
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

  return (
    <div className={`robust-hubspot-form ${className}`}>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-navy-blue mb-6 text-center">Contact Us</h2>
        <p className="text-gray-600 text-center mb-6">
          Ready to transform your business with AI? Get in touch with our team.
        </p>
        
        {/* Debug info in development */}
        {import.meta.env.DEV && (
          <div className="mb-4 p-2 bg-yellow-100 rounded text-xs">
            <strong>Debug:</strong> {debugInfo}
          </div>
        )}
        
        {/* Form container */}
        <div 
          ref={formContainerRef}
          id={formId.current}
          className="min-h-[400px] relative"
        >
          {/* Loading state */}
          {formState === 'loading' && (
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading contact form...</p>
              <p className="text-sm text-gray-500 mt-2">
                This may take a moment to load
              </p>
            </div>
          )}

          {/* Error state */}
          {formState === 'error' && (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Contact Form Unavailable</h3>
              <p className="text-gray-600 mb-4">We're having trouble loading our contact form right now.</p>
              <div className="space-y-3">
                <p className="text-sm text-gray-500">Please contact us directly:</p>
                <div className="space-y-2">
                  <a 
                    href="mailto:info@sherpatech.ai" 
                    className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    📧 Email: info@sherpatech.ai
                  </a>
                  <button
                    onClick={() => window.location.reload()}
                    className="block w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    🔄 Reload Page
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RobustHubSpotForm;
