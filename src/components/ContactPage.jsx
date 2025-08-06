import React from 'react';
import HybridContactForm from './HybridContactForm';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-navy-blue mb-6">
            Let's Start Your AI Journey
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Ready to transform your business with artificial intelligence? Our team of experts 
            is here to guide you through every step of your digital transformation.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <HybridContactForm />
        </div>
      </div>

      {/* Additional Contact Info */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-navy-blue mb-12">
              Other Ways to Reach Us
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Email */}
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <a 
                  href="mailto:info@sherpatech.ai" 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  info@sherpatech.ai
                </a>
              </div>

              {/* Phone */}
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600">Schedule a consultation</p>
              </div>

              {/* Location */}
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600">Remote & On-site Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
