// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-deep-navy text-alpine-white py-8">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-alpine-white text-xl mb-4">SherpaTech.ai</h3>
            <p className="text-sm opacity-80 mb-4 text-center md:text-left">
              Guiding small and medium businesses through their digital transformation journey.
            </p>
            <div className="mt-2">
              <a href="https://www.linkedin.com/company/sherpatech-ai" target="_blank" rel="noopener noreferrer" className="text-alpine-white hover:text-glacier-blue">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-alpine-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Strategy Development</Link></li>
              <li><Link to="/services" className="text-sm text-alpine-white opacity-80 hover:opacity-100">AI Integration</Link></li>
              <li><Link to="/services" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Digital Infrastructure</Link></li>
              <li><Link to="/services" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Process Optimization</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-alpine-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-alpine-white opacity-80 hover:opacity-100">About Us</Link></li>
              <li><Link to="/team" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Our Team</Link></li>
              <li><Link to="/careers" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Careers</Link></li>
              <li><Link to="/blog" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-alpine-white mb-4">Contact</h4>
            <address className="not-italic text-sm opacity-80">
              <p>Arlington, Virginia</p>
              <p className="mt-2">info@sherpatech.ai</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-alpine-white/20 mt-8 pt-8 text-sm opacity-70 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 SherpaTech.ai. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link to="/privacy" className="text-alpine-white opacity-80 hover:opacity-100 mr-4">Privacy Policy</Link>
            <Link to="/terms" className="text-alpine-white opacity-80 hover:opacity-100">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
