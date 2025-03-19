// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Import fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=Open+Sans:wght@400;600;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: 16px;
    line-height: ${({ theme }) => theme.typography.lineHeight.body};
    color: ${({ theme }) => theme.colors.deepNavy};
    background-color: ${({ theme }) => theme.colors.pearlWhite};
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.heading};
    line-height: ${({ theme }) => theme.typography.lineHeight.heading};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize.h1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
  
  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize.h2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.h3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
  
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.h4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
  
  h5 {
    font-size: ${({ theme }) => theme.typography.fontSize.h5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    max-width: 75ch; /* For optimal reading */
  }
  
  a {
    color: ${({ theme }) => theme.colors.navyBlue};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default GlobalStyles;