import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId, event) => {
    event.preventDefault();
    
    if (!isHomePage) {
      // If not on homepage, navigate to homepage with hash
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Close mobile menu if open
      if (isMenuOpen) setIsMenuOpen(false);
      
      // Smooth scroll to the section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-navy-blue text-alpine-white py-4">
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <h1 className="text-2xl font-bold m-0">SherpaTech.Ai</h1>
            <p className="text-sm opacity-80 m-0">Your Guide to Success</p>
          </Link>
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
          className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 right-0 bg-navy-blue md:bg-transparent z-50 md:z-auto`}
        >
          <ul className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
            <li>
              <a 
                href="/#hero" 
                className="text-alpine-white hover:text-ice-blue transition-colors"
                onClick={(e) => scrollToSection('hero', e)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/#services" 
                className="text-alpine-white hover:text-ice-blue transition-colors"
                onClick={(e) => scrollToSection('services', e)}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="/#about" 
                className="text-alpine-white hover:text-ice-blue transition-colors"
                onClick={(e) => scrollToSection('about', e)}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/#contact" 
                className="text-alpine-white hover:text-ice-blue transition-colors"
                onClick={(e) => scrollToSection('contact', e)}
              >
                Contact
              </a>
            </li>
            <li className="md:ml-2">
              <a 
                href="/#contact" 
                className="btn btn-secondary inline-block mt-2 md:mt-0"
                onClick={(e) => scrollToSection('contact', e)}
              >
                Get Started
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;