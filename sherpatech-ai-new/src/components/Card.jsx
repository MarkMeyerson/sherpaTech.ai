// src/components/Card.js
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({ theme, variant }) => 
    variant === 'ice' ? theme.colors.iceBlue : theme.colors.alpineWhite};
  border: 1px solid rgba(43, 81, 122, 0.1); /* Mountain Blue with 10% opacity */
  border-radius: ${({ theme }) => theme.borderRadius.card};
  box-shadow: ${({ theme }) => theme.shadows.subtle};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.navyBlue};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.deepNavy};
`;

export default Card;