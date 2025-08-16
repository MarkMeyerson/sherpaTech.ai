// src/components/Navbar.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors.navyBlue};
  color: ${({ theme }) => theme.colors.alpineWhite};
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000;
  min-height: 64px;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 60px;
    padding-top: max(1rem, env(safe-area-inset-top));
    padding-left: max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
  }
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.alpineWhite};
  z-index: 1001;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.navyBlue};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
    transition: transform 0.3s ease-in-out;
    z-index: 999;
    padding: 2rem;
    padding-top: max(2rem, env(safe-area-inset-top));
    padding-bottom: max(2rem, env(safe-area-inset-bottom));
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  @media (max-width: 480px) {
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.accentOrange || '#FF6A3D' : theme.colors.alpineWhite};
  font-weight: ${({ theme, $isActive }) => $isActive ? theme.typography.fontWeight.bold : theme.typography.fontWeight.medium};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  white-space: nowrap;
  text-align: center;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.accentOrange || '#FF6A3D'};
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accentOrange || '#FF6A3D'};
    outline-offset: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 1.2rem 2rem;
    width: 85%;
    min-height: 56px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-weight: 500;
    
    &:hover, &:active {
      background-color: rgba(255, 255, 255, 0.2);
      transform: scale(1.02);
    }
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 1rem 1.5rem;
    width: 90%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.alpineWhite};
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0.7rem;
  min-height: 48px;
  min-width: 48px;
  position: relative;
  z-index: 1001;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: bold;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.05);
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accentOrange || '#FF6A3D'};
    outline-offset: 2px;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    min-height: 44px;
    min-width: 44px;
    font-size: 1.6rem;
    padding: 0.6rem;
  }
`;

const MobileOverlay = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    transition: all 0.3s ease-in-out;
  }
`;
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Close menu when clicking outside on mobile
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <NavbarContainer>
        <Logo>SherpaTech.ai</Logo>
        <MobileMenuButton onClick={toggleMenu} aria-label="Toggle navigation menu">
          {isOpen ? '✕' : '☰'}
        </MobileMenuButton>
        <NavLinks isOpen={isOpen}>
          <NavLink to="/" onClick={closeMenu} $isActive={isActive('/')}>Home</NavLink>
          <NavLink to="/services" onClick={closeMenu} $isActive={isActive('/services')}>Services</NavLink>
          <NavLink to="/about" onClick={closeMenu} $isActive={isActive('/about')}>About</NavLink>
          <NavLink to="/our-why" onClick={closeMenu} $isActive={isActive('/our-why')}>Our Why</NavLink>
          <NavLink to="/small-businesses" onClick={closeMenu} $isActive={isActive('/small-businesses')}>Small Businesses</NavLink>
          <NavLink to="/sherpaskill" onClick={closeMenu} $isActive={isActive('/sherpaskill')}>SherpaSkill™</NavLink>
          <NavLink to="/contact" onClick={closeMenu} $isActive={isActive('/contact')}>Contact</NavLink>
        </NavLinks>
      </NavbarContainer>
      <MobileOverlay isOpen={isOpen} onClick={handleOverlayClick} />
    </>
  );
};

export default Navbar;