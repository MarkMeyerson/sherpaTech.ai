// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper function to check if a link is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Get active link class
  const getNavLinkClass = (path) => {
    return `text-alpine-white transition-colors ${
      isActive(path) 
        ? 'font-semibold text-glacier-blue' 
        : 'hover:text-ice-blue'
    }`;
  };

  return (
    <header className="bg-sherpa-black text-alpine-white py-4">
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <div className="logo flex items-center">
          <Link to="/">
            <img 
              src="/ai-logo.svg" 
              alt="SherpaTech.AI Logo" 
              className="h-20 mr-3"
            />
          </Link>
          <div className="bg-sherpa-black px-4 py-2 rounded">
            <h1 className="text-2xl font-bold m-0 text-steam-gray">Sherpa<span className="font-extrabold text-alpine-white">Tech</span>.<span className="text-glacier-blue font-bold">AI</span></h1>
            <p className="text-sm m-0 text-fog-gray">Your Guide to Success</p>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-alpine-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path 
              d="M3 12H21M3 6H21M3 18H21" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav 
          className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 right-0 bg-sherpa-black md:bg-transparent z-50 md:z-auto`}
        >
          <ul className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
            <li><Link to="/" className={getNavLinkClass('/')}>Home</Link></li>
            <li><Link to="/services" className={getNavLinkClass('/services')}>Services</Link></li>
            <li><Link to="/about" className={getNavLinkClass('/about')}>About</Link></li>
            <li><Link to="/contact" className={getNavLinkClass('/contact')}>Contact</Link></li>
            <li className="md:ml-2">
              <Link 
                to="/get-started" 
                className={`px-6 py-3 rounded-md ${
                  isActive('/get-started') 
                    ? 'bg-glacier-blue text-deep-navy' 
                    : 'bg-mountain-blue text-alpine-white hover:bg-navy-blue'
                } font-semibold transition-colors inline-block mt-2 md:mt-0`}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
