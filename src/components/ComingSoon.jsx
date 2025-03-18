// src/components/ComingSoon.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-pearl-white">
        <div className="text-center max-w-2xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-navy-blue mb-4">Coming Soon</h1>
          <div className="w-20 h-1 bg-mountain-blue mx-auto mb-8"></div>
          
          <p className="text-xl text-deep-navy mb-8">
            Our Sherpas are currently guiding this part of the journey to completion.
            Check back soon for updates!
          </p>
          
          <img 
            src="/images/mountain-peak.svg" 
            alt="Mountain Peak" 
            className="w-48 mx-auto mb-8"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
          
          <a 
            href="/"
            className="inline-block bg-navy-blue text-alpine-white py-3 px-8 rounded-md hover:bg-mountain-blue transition duration-300 font-semibold"
          >
            Return to Base Camp
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComingSoon;