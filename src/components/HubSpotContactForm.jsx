import React, { useEffect } from 'react';

const HubSpotContactForm = ({ className = "" }) => {
  useEffect(() => {
    // Initialize HubSpot form when component mounts
    const initializeForm = () => {
      if (window.hbspt && window.hbspt.forms) {
        // Clear any existing form content
        const formContainer = document.getElementById('hubspot-form-container');
        if (formContainer) {
          formContainer.innerHTML = '';
        }

        // Create the HubSpot form
        window.hbspt.forms.create({
          region: "na2",
          portalId: "243001979",
          formId: "782d9a92-b21c-4cee-90ca-2b00b37d985c",
          target: "#hubspot-form-container"
        });
      }
    };

    // Check if HubSpot is already loaded
    if (window.hbspt) {
      initializeForm();
    } else {
      // Wait for HubSpot to load
      const checkHubSpot = setInterval(() => {
        if (window.hbspt && window.hbspt.forms) {
          clearInterval(checkHubSpot);
          initializeForm();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkHubSpot), 10000);
    }

    // Cleanup function
    return () => {
      const formContainer = document.getElementById('hubspot-form-container');
      if (formContainer) {
        formContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className={`hubspot-contact-form ${className}`}>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-navy-blue mb-6 text-center">Contact Us</h2>
        <p className="text-gray-600 text-center mb-6">
          Ready to transform your business with AI? Get in touch with our team.
        </p>
        
        {/* HubSpot Form Container */}
        <div 
          id="hubspot-form-container"
          className="min-h-[400px]"
        >
          {/* Loading placeholder */}
          <div className="flex flex-col justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <span className="text-gray-600">Loading contact form...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubSpotContactForm;
