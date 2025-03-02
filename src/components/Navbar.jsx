// src/components/Navbar.js
import React from 'react';
import styled from 'styled-components';

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

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.alpineWhite};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.xs};
  
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
        <NavLink href="#features">Features</NavLink>
        <NavLink href="#solutions">Solutions</NavLink>
        <NavLink href="#pricing">Pricing</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;