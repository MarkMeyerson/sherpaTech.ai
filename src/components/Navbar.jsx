// src/components/Navbar.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors.navyBlue};
  color: ${({ theme }) => theme.colors.alpineWhite};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.navyBlue};
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.md};
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.alpineWhite};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.xs};
  white-space: normal;
  text-align: center;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    border-bottom: 1px solid rgba(255,255,255,0.1);
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.alpineWhite};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  min-height: 44px;
  min-width: 44px;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <NavbarContainer>
      <Logo>SherpaTech.ai</Logo>
      <MobileMenuButton onClick={toggleMenu} aria-label="Toggle navigation menu">
        {isOpen ? '✕' : '☰'}
      </MobileMenuButton>
      <NavLinks isOpen={isOpen}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/our-why" onClick={closeMenu}>Our Why</NavLink>
        <NavLink to="/small-businesses" onClick={closeMenu}>Small Businesses</NavLink>
        <NavLink to="/training" onClick={closeMenu}>Training Plan<br />for Individuals</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;