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
              <a href="#" className="text-alpine-white hover:text-ice-blue">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" className="text-alpine-white hover:text-ice-blue">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                </svg>
              </a>
              <a href="#" className="text-alpine-white hover:text-ice-blue">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-alpine-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="/services" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Strategy Development</a></li>
              <li><a href="/services" className="text-sm text-alpine-white opacity-80 hover:opacity-100">AI Integration</a></li>
              <li><a href="/services" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Digital Infrastructure</a></li>
              <li><a href="/services" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Process Optimization</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-alpine-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-alpine-white opacity-80 hover:opacity-100">About Us</a></li>
              <li><a href="/team" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Our Team</a></li>
              <li><a href="/careers" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Careers</a></li>
              <li><a href="/blog" className="text-sm text-alpine-white opacity-80 hover:opacity-100">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-alpine-white mb-4">Contact</h4>
            <address className="not-italic text-sm opacity-80">
              <p>123 Digital Avenue</p>
              <p>Tech District, TC 12345</p>
              <p className="mt-2">info@sherpatech.ai</p>
              <p>(555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-alpine-white/20 mt-8 pt-8 text-sm opacity-70 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 SherpaTech.Ai. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="/privacy" className="text-alpine-white opacity-80 hover:opacity-100 mr-4">Privacy Policy</a>
            <a href="/terms" className="text-alpine-white opacity-80 hover:opacity-100">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;