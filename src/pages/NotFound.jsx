import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.iceBlue} 0%, ${({ theme }) => theme.colors.pearlWhite} 100%);
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.navyBlue};
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.mountainBlue};
  margin: 1rem 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.navyBlue};
  margin: 1rem 0 2rem;
  max-width: 500px;
  opacity: 0.8;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: ${({ theme, $variant }) => 
    $variant === 'primary' ? theme.colors.navyBlue : theme.colors.mountainBlue};
  color: ${({ theme }) => theme.colors.alpineWhite};
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  min-width: 150px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentOrange};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Title>Page Not Found</Title>
      <Message>
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </Message>
      <ButtonGroup>
        <Button $variant="primary" onClick={handleGoHome}>
          Go to Homepage
        </Button>
        <Button onClick={handleGoBack}>
          Go Back
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default NotFound;
