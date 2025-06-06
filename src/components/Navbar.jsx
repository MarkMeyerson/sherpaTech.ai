// src/components/Navbar.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors.navyBlue};
  color: ${({ theme }) => theme.colors.alpineWhite};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.alpineWhite};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.xs};
  white-space: normal; // Allow text to wrap
  text-align: center; // Center the text when it wraps
  
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>SherpaTech.ai</Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/our-why">Our Why</NavLink> {/* Added link */}
        <NavLink to="/small-businesses">Small Businesses</NavLink>
        <NavLink to="/training">Training Plan<br />for Individuals</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;