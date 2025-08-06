import React, { useEffect, useState } from 'react';

const HubSpotDiagnostic = () => {
  const [diagnostics, setDiagnostics] = useState({
    hubspotLoaded: false,
    formsApiLoaded: false,
    scriptsPresent: [],
    networkErrors: [],
    consoleErrors: []
  });

  useEffect(() => {
    // Check if HubSpot scripts loaded
    const checkHubSpot = () => {
      const results = {
        hubspotLoaded: !!window.hbspt,
        formsApiLoaded: !!(window.hbspt && window.hbspt.forms),
        scriptsPresent: [],
        networkErrors: [],
        consoleErrors: []
      };

      // Check for script tags
      const scripts = document.querySelectorAll('script');
      scripts.forEach(script => {
        if (script.src && script.src.includes('hsforms.net')) {
          results.scriptsPresent.push({
            src: script.src,
            loaded: script.readyState === 'complete' || !script.readyState
          });
        }
        if (script.src && script.src.includes('hs-scripts.com')) {
          results.scriptsPresent.push({
            src: script.src,
            loaded: script.readyState === 'complete' || !script.readyState
          });
        }
      });

      setDiagnostics(results);
    };

    // Initial check
    checkHubSpot();

    // Check every 2 seconds for 20 seconds
    const interval = setInterval(checkHubSpot, 2000);
    setTimeout(() => clearInterval(interval), 20000);

    return () => clearInterval(interval);
  }, []);

  const testFormCreation = () => {
    if (window.hbspt && window.hbspt.forms) {
      try {
        window.hbspt.forms.create({
          region: "na2",
          portalId: "243001979",
          formId: "782d9a92-b21c-4cee-90ca-2b00b37d985c",
          target: "#diagnostic-form-test",
          onFormReady: () => {
            console.log('✅ Form created successfully!');
            alert('✅ HubSpot form loaded successfully!');
          },
          onFormDefinitionFetchError: (error) => {
            console.error('❌ Form fetch error:', error);
            alert(`❌ Form fetch error: ${error.message || error}`);
          }
        });
      } catch (error) {
        console.error('❌ Form creation error:', error);
        alert(`❌ Form creation error: ${error.message}`);
      }
    } else {
      alert('❌ HubSpot not loaded - cannot create form');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">HubSpot Diagnostic Tool</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">HubSpot Status</h3>
          <div className="space-y-2">
            <div className={`flex items-center ${diagnostics.hubspotLoaded ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-2">{diagnostics.hubspotLoaded ? '✅' : '❌'}</span>
              HubSpot Main Library: {diagnostics.hubspotLoaded ? 'Loaded' : 'Not Loaded'}
            </div>
            <div className={`flex items-center ${diagnostics.formsApiLoaded ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-2">{diagnostics.formsApiLoaded ? '✅' : '❌'}</span>
              Forms API: {diagnostics.formsApiLoaded ? 'Available' : 'Not Available'}
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Current Config</h3>
          <div className="text-sm space-y-1">
            <div><strong>Portal ID:</strong> 243001979</div>
            <div><strong>Form ID:</strong> 782d9a92-b21c-4cee-90ca-2b00b37d985c</div>
            <div><strong>Region:</strong> na2</div>
          </div>
        </div>
      </div>

      {/* Scripts */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Loaded Scripts</h3>
        {diagnostics.scriptsPresent.length > 0 ? (
          <div className="space-y-2">
            {diagnostics.scriptsPresent.map((script, index) => (
              <div key={index} className="text-sm">
                <div className={`flex items-center ${script.loaded ? 'text-green-600' : 'text-orange-600'}`}>
                  <span className="mr-2">{script.loaded ? '✅' : '⚠️'}</span>
                  {script.src}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-600">❌ No HubSpot scripts found</p>
        )}
      </div>

      {/* Test Button */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Manual Test</h3>
        <button
          onClick={testFormCreation}
          disabled={!diagnostics.formsApiLoaded}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {diagnostics.formsApiLoaded ? 'Test Form Creation' : 'HubSpot Not Ready'}
        </button>
        
        <div id="diagnostic-form-test" className="mt-4 min-h-[200px] border-2 border-dashed border-gray-300 rounded p-4">
          <p className="text-gray-500 text-center">Form will appear here if test succeeds</p>
        </div>
      </div>
    </div>
  );
};

export default HubSpotDiagnostic;
