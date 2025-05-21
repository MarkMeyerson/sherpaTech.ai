import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const HeaderWrapper = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Navbar />
    </HeaderWrapper>
  );
};

export default Header;