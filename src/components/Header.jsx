import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-navy-blue text-alpine-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Updated to SherpaTech.AI */}
          <Link to="/" className="text-2xl font-bold font-inter">
            SherpaTech.AI
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 font-inter">
            <Link to="/" className="hover:text-ice-blue transition duration-300">
              Home
            </Link>
            <a href="#services" className="hover:text-ice-blue transition duration-300">
              Services
            </a>
            {/* Updated Training Plan with glowing effect */}
            <Link 
              to="/training" 
              className="relative overflow-hidden bg-gradient-to-r from-mountain-blue to-navy-blue px-6 py-2 rounded-lg hover:from-navy-blue hover:to-mountain-blue transition-all shadow-lg animate-pulse inline-block group"
            >
              <span className="relative z-10 text-white font-medium">Training Plan</span>
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/30"></div>
            </Link>
            <a href="#about" className="hover:text-ice-blue transition duration-300">
              About
            </a>
            <a href="#contact" className="hover:text-ice-blue transition duration-300">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-alpine-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3 font-inter">
              <Link
                to="/"
                className="hover:text-ice-blue transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="#services"
                className="hover:text-ice-blue transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              {/* Mobile Training Plan - no glow effect to maintain mobile simplicity */}
              <Link
                to="/training"
                className="bg-gradient-to-r from-mountain-blue to-navy-blue px-6 py-2 rounded-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Training Plan
              </Link>
              <a
                href="#about"
                className="hover:text-ice-blue transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="hover:text-ice-blue transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;