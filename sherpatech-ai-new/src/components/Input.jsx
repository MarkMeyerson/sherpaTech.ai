// src/components/Input.js
import styled, { css } from 'styled-components';

const inputStyles = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.bodyRegular};
  background-color: ${({ theme }) => theme.colors.alpineWhite};
  border: 1px solid ${({ theme, error }) => 
    error ? theme.colors.error : theme.colors.mountainBlue};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  padding: 12px 16px;
  width: 100%;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => 
      error ? theme.colors.error : theme.colors.navyBlue};
  }
  
  &::placeholder {
    color: rgba(27, 54, 93, 0.5); /* Navy Blue with 50% opacity */
  }
`;

export const Input = styled.input`
  ${inputStyles}
`;

export const TextArea = styled.textarea`
  ${inputStyles}
  min-height: 120px;
  resize: vertical;
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Label = styled.label`
  display: block;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.deepNavy};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export default Input;