import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #1a1a2e, #16213e);
  color: ${({ theme }) => theme.colors.alpineWhite};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing.lg};
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const PlanTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  color: ${({ theme }) => theme.colors.skyBlue};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TrainingPlan = () => {
  return (
    <Container>
      <Title>AI Training Programs</Title>
      <Grid>
        <Card>
          <PlanTitle>Fundamentals of AI</PlanTitle>
          <p>Master the basics of artificial intelligence and machine learning. Perfect for beginners looking to understand core concepts.</p>
        </Card>
        <Card>
          <PlanTitle>Advanced AI Implementation</PlanTitle>
          <p>Deep dive into practical AI implementation strategies. Learn how to integrate AI solutions into existing business processes.</p>
        </Card>
        <Card>
          <PlanTitle>AI Leadership Workshop</PlanTitle>
          <p>Strategic training for executives and decision-makers. Understand how to lead AI transformation in your organization.</p>
        </Card>
        <Card>
          <PlanTitle>Custom Training Solutions</PlanTitle>
          <p>Tailored programs designed specifically for your team's needs and industry requirements.</p>
        </Card>
      </Grid>
    </Container>
  );
};

export default TrainingPlan;