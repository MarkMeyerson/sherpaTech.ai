import React from 'react';
import styled from 'styled-components';

const TrainingSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl};
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: ${({ theme }) => theme.colors.alpineWhite};
`;

const TrainingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TrainingHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.skyBlue};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TrainingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TrainingCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: ${({ theme }) => theme.spacing.lg};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ModuleTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.skyBlue};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TrainingPlan = () => {
  return (
    <TrainingSection>
      <TrainingContainer>
        <TrainingHeader>
          <Title>Comprehensive AI Training Programs</Title>
          <Description>
            Transform your organization with our expert-led AI training modules
          </Description>
        </TrainingHeader>
        <TrainingGrid>
          <TrainingCard>
            <ModuleTitle>AI Foundations</ModuleTitle>
            <p>Build a strong foundation in AI concepts, machine learning basics, and data analytics fundamentals.</p>
          </TrainingCard>
          <TrainingCard>
            <ModuleTitle>Implementation Strategies</ModuleTitle>
            <p>Learn practical approaches to implementing AI solutions in your business environment.</p>
          </TrainingCard>
          <TrainingCard>
            <ModuleTitle>Advanced AI Applications</ModuleTitle>
            <p>Master advanced AI techniques and explore cutting-edge applications in your industry.</p>
          </TrainingCard>
          <TrainingCard>
            <ModuleTitle>AI Leadership & Strategy</ModuleTitle>
            <p>Develop the skills to lead AI initiatives and create effective AI strategies.</p>
          </TrainingCard>
        </TrainingGrid>
      </TrainingContainer>
    </TrainingSection>
  );
};

export default TrainingPlan;