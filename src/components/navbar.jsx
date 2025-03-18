import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components version (can be used alongside Tailwind)
const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: all 0.3s ease;
  background-color: ${props => props.isScrolled ? 
    props.theme.colors.navyBlue : props.theme.colors.deepNavy};
  background-opacity: ${props => props.isScrolled ? 0.95 : 0.8};
  padding: ${props => props.isScrolled ? 
    `${props.theme.spacing.xs} 0` : `${props.theme.spacing.sm} 0`};
  box-shadow: ${props => props.isScrolled ? 
    props.theme.shadows.medium : 'none'};
`;

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Using Tailwind classes for the internal structure
  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-navy-blue bg-opacity-95 shadow-elevated py-2' 
        : 'bg-deep-navy bg-opacity-80 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and branding */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-heading font-bold text-xl text-alpine-white">SherpaTech.ai</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/solutions">Solutions</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          
          {/* Call to action buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-alpine-white hover:text-glacier-blue px-3 py-2 text-sm font-medium transition-colors">
              Log in
            </button>
            <button className="bg-glacier-blue text-deep-navy px-4 py-2 rounded-button text-sm font-medium hover:bg-alpine-white transition-colors">
              Get Started
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-alpine-white p-2 rounded-md focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {!isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu, show/hide based on menu state */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-deep-navy">
          <MobileNavLink to="/features">Features</MobileNavLink>
          <MobileNavLink to="/solutions">Solutions</MobileNavLink>
          <MobileNavLink to="/pricing">Pricing</MobileNavLink>
          <MobileNavLink to="/about">About</MobileNavLink>
          <MobileNavLink to="/contact">Contact</MobileNavLink>
          
          <div className="pt-4 flex flex-col space-y-3 px-3">
            <button className="w-full text-center text-alpine-white border border-mountain-blue py-2 rounded-button text-sm font-medium hover:bg-mountain-blue transition-colors">
              Log in
            </button>
            <button className="w-full text-center bg-glacier-blue text-deep-navy py-2 rounded-button text-sm font-medium hover:bg-alpine-white transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Desktop Navigation Link
const NavLink = ({ to, children }) => {
  return (
    <Link 
      to={to}
      className="px-3 py-2 rounded-button text-sm font-medium text-alpine-white hover:text-glacier-blue transition-colors"
    >
      {children}
    </Link>
  );
};

// Mobile Navigation Link
const MobileNavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="block px-3 py-2 rounded-md text-base font-medium text-alpine-white hover:bg-mountain-blue hover:text-glacier-blue transition-colors"
    >
      {children}
    </Link>
  );
};

// Export both styled component version and regular component
export { NavContainer };
export default NavbarComponent;