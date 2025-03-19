import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #1B365D;
  color: #FFFFFF;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const NavLink = styled(Link)`
  color: #FFFFFF;
  font-weight: 500;
  text-decoration: none;
  padding: 8px;
  
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
        <NavLink to="/#features">Features</NavLink>
        <NavLink to="/#solutions">Solutions</NavLink>
        <NavLink to="/#pricing">Pricing</NavLink>
        <NavLink to="/#about">About</NavLink>
        <NavLink to="/#contact">Contact</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;