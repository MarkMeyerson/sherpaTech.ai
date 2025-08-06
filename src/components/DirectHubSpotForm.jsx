import React from 'react';

const DirectHubSpotForm = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-navy-blue mb-6 text-center">Contact Us</h2>
      <p className="text-gray-600 text-center mb-6">
        Ready to transform your business with AI? Get in touch with our team.
      </p>
      
      {/* Direct HubSpot embed using the exact code provided */}
      <div 
        className="hs-form-frame" 
        data-region="na2" 
        data-form-id="782d9a92-b21c-4cee-90ca-2b00b37d985c" 
        data-portal-id="243001979"
        style={{ minHeight: '400px' }}
      >
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact form...</p>
          <p className="text-sm text-gray-500 mt-2">
            If the form doesn't load, please email us at: 
            <a href="mailto:info@sherpatech.ai" className="text-blue-600 ml-1">
              info@sherpatech.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DirectHubSpotForm;
