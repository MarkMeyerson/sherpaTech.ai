import React, { useEffect, useState } from 'react';

const SimpleHubSpotForm = () => {
  const [debug, setDebug] = useState('Initializing...');

  useEffect(() => {
    const checkHubSpot = () => {
      setDebug(`
        Window.hbspt exists: ${!!window.hbspt}
        Window.hbspt.forms exists: ${!!(window.hbspt && window.hbspt.forms)}
        HsFormLoaded: ${window.hsFormLoaded}
      `);
    };

    // Check immediately
    checkHubSpot();

    // Check every 2 seconds
    const interval = setInterval(checkHubSpot, 2000);

    // Try to initialize form if HubSpot is ready
    if (window.hbspt && window.hbspt.forms) {
      try {
        window.hbspt.forms.create({
          region: "na2",
          portalId: "243001979",
          formId: "782d9a92-b21c-4cee-90ca-2b00b37d985c",
          target: "#simple-hubspot-form"
        });
        setDebug(prev => prev + '\nForm creation attempted');
      } catch (error) {
        setDebug(prev => prev + `\nForm creation error: ${error.message}`);
      }
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-gray-100 rounded-lg">
      <h2 className="text-2xl mb-4">HubSpot Debug Test</h2>
      
      <div className="mb-4 text-sm bg-white p-4 rounded border">
        <h3 className="font-bold">Debug Info:</h3>
        <pre className="whitespace-pre-wrap text-xs">{debug}</pre>
      </div>

      <div 
        id="simple-hubspot-form"
        className="min-h-[300px] bg-white p-4 rounded border"
        style={{ border: '2px solid #e5e5e5' }}
      >
        <p className="text-gray-500">Form will appear here...</p>
      </div>
    </div>
  );
};

export default SimpleHubSpotForm;
