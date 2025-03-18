// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-deep-navy text-alpine-white py-8">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-alpine-white text-xl mb-4">SherpaTech.Ai</h3>
            <p className="text-sm opacity-80 mb-4">
              Guiding small and medium businesses through their digital transformation journey.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/sherpatech-ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-alpine-white hover:text-ice-blue"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"></path>
                </svg>
              </a>
              <a 
                href="mailto:info@sherpatech.ai" 
                className="text-alpine-white hover:text-ice-blue"
                aria-label="Email"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-alpine-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Strategy Development</a></li>
              <li><a href="#services" className="text-sm text-alpine-white opacity-80 hover:opacity-100">AI Integration</a></li>
              <li><a href="#services" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Digital Infrastructure</a></li>
              <li><a href="#services" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Process Optimization</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-alpine-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-sm text-alpine-white opacity-80 hover:opacity-100">About Us</a></li>
              <li><a href="#services" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Our Services</a></li>
              <li><a href="#contact" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-alpine-white mb-4">Contact</h4>
            <address className="not-italic text-sm opacity-80">
              <p>Arlington, Virginia</p>
              <p className="mt-2">
                <a href="mailto:info@sherpatech.ai" className="hover:text-ice-blue">
                  info@sherpatech.ai
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-alpine-white/20 mt-8 pt-8 text-sm opacity-70 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} SherpaTech.Ai. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-alpine-white opacity-80 hover:opacity-100 mr-4">Privacy Policy</a>
            <a href="#" className="text-alpine-white opacity-80 hover:opacity-100">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;