// src/components/ComingSoon.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 relative">
        {/* Background with logo at 50% transparency */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <img 
            src="/ai-logo.png" 
            alt="SherpaTech.ai Logo" 
            className="max-w-md w-4/5 opacity-50"
          />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1B365D]">
              Coming Soon
            </h1>
            
            <p className="text-xl mb-8 text-[#152A4A]">
              We're working hard to bring you this content. Please check back soon!
            </p>
            
            <a 
              href="/" 
              className="px-6 py-3 rounded-md bg-[#1B365D] text-white font-semibold hover:bg-[#2B517A] transition-colors inline-block"
            >
              Return to Home
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComingSoon;
