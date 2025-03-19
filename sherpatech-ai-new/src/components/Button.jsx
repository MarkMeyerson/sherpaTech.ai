// src/components/Button.js
import styled, { css } from 'styled-components';

const baseButtonStyles = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.bodyRegular};
  padding: 12px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

export const PrimaryButton = styled.button`
  ${baseButtonStyles}
  background-color: ${({ theme }) => theme.colors.navyBlue};
  color: ${({ theme }) => theme.colors.alpineWhite};
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.deepNavy};
  }
`;

export const SecondaryButton = styled.button`
  ${baseButtonStyles}
  background-color: ${({ theme }) => theme.colors.mountainBlue};
  color: ${({ theme }) => theme.colors.alpineWhite};
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.navyBlue};
  }
`;

export const TextButton = styled.button`
  ${baseButtonStyles}
  background-color: transparent;
  color: ${({ theme }) => theme.colors.deepNavy};
  padding: 8px 16px;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.iceBlue};
  }
`;

export default PrimaryButton;