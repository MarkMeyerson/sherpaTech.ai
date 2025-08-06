import React, { useEffect, useRef, useState } from 'react';

const RobustContactForm = () => {
  const formRef = useRef(null);
  const [showFallback, setShowFallback] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // Load HubSpot script if not already loaded
    if (!window.hubspotScriptLoaded) {
      const script = document.createElement('script');
      script.src = 'https://js-na2.hsforms.net/forms/embed/243001979.js';
      script.defer = true;
      script.onload = () => {
        window.hubspotScriptLoaded = true;
      };
      script.onerror = () => {
        setFormError('HubSpot form failed to load');
        setShowFallback(true);
      };
      document.head.appendChild(script);
    }

    // Listen for form submission errors
    const handleFormError = (event) => {
      if (event.detail && event.detail.error) {
        console.error('HubSpot form error:', event.detail.error);
        if (event.detail.error.includes('captcha') || event.detail.error.includes('Captcha')) {
          setFormError('CAPTCHA validation failed. Please try the backup form below.');
          setShowFallback(true);
        }
      }
    };

    // Add error listener
    window.addEventListener('message', (event) => {
      if (event.data && typeof event.data === 'string' && event.data.includes('captcha')) {
        setFormError('CAPTCHA issue detected. Please use the backup form below.');
        setShowFallback(true);
      }
    });

    document.addEventListener('hsFormCallback', handleFormError);

    // Auto-fallback after 10 seconds if no form appears
    const fallbackTimer = setTimeout(() => {
      if (formRef.current && !formRef.current.querySelector('form')) {
        setFormError('Form taking too long to load');
        setShowFallback(true);
      }
    }, 10000);

    return () => {
      document.removeEventListener('hsFormCallback', handleFormError);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleFallbackSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Create mailto link
    const subject = encodeURIComponent('Contact from Sherpatech.ai');
    const body = encodeURIComponent(`
Name: ${firstName} ${lastName}
Email: ${email}
Message: ${message}

Sent from Sherpatech.ai contact form
    `);
    
    window.location.href = `mailto:info@sherpatech.ai?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Ready to transform your business with AI? Let's start the conversation.
        </p>
        
        {/* Show error message if there's an issue */}
        {formError && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">{formError}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* HubSpot Form Container */}
        {!showFallback && (
          <div 
            ref={formRef}
            className="hs-form-frame" 
            data-region="na2" 
            data-form-id="782d9a92-b21c-4cee-90ca-2b00b37d985c" 
            data-portal-id="243001979"
          ></div>
        )}
        
        {/* Fallback Form */}
        {showFallback && (
          <form onSubmit={handleFallbackSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Tell us a little more (optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-colors font-semibold"
            >
              Send Message
            </button>
            
            <p className="text-xs text-gray-500 text-center">
              This will open your email client to send us a message directly.
            </p>
          </form>
        )}
        
        {/* Manual fallback trigger */}
        {!showFallback && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowFallback(true)}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Having trouble with the form? Click here for a backup form
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RobustContactForm;
