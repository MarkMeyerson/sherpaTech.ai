import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Brand Colors
const colors = {
  navyBlue: '#1B365D',
  mountainBlue: '#2B517A',
  iceBlue: '#E8EEF4',
  pearlWhite: '#F7FAFC',
  accentOrange: '#FF6A3D',
  alpineWhite: '#FFFFFF'
};

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pathPulse = keyframes`
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
`;

const flagWave = keyframes`
  0%, 100% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(2deg);
  }
`;

// Styled Components
const SectionContainer = styled.section`
  padding: 80px 24px;
  background: linear-gradient(180deg, ${colors.pearlWhite} 0%, ${colors.alpineWhite} 50%, ${colors.iceBlue} 100%);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 24px;
  color: ${colors.navyBlue};
  animation: ${slideUp} 0.6s ease-out;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 64px;
  color: ${colors.mountainBlue};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 48px;
  }
`;

const JourneyPath = styled.div`
  position: absolute;
  left: 50%;
  top: 120px;
  bottom: 100px;
  width: 4px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    ${colors.mountainBlue} 10%,
    ${colors.navyBlue} 50%,
    ${colors.accentOrange} 90%,
    transparent 100%
  );
  transform: translateX(-50%) rotate(2deg);
  opacity: 0.6;
  animation: ${pathPulse} 3s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -2px;
    right: -2px;
    bottom: 0;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 8px,
      ${colors.mountainBlue} 8px,
      ${colors.mountainBlue} 16px
    );
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    left: 40px;
    transform: translateX(0) rotate(1deg);
  }
`;

const SummitFlag = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  animation: ${flagWave} 2s ease-in-out infinite;
  z-index: 10;
  
  @media (max-width: 768px) {
    left: 40px;
    transform: translateX(-20px);
    font-size: 2.5rem;
  }
`;

const JourneyContainer = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-top: 120px;
  
  @media (max-width: 768px) {
    padding-top: 100px;
    gap: 32px;
  }
`;

const WeekCard = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(27, 54, 93, 0.1);
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  margin-left: ${props => props.offset || '0px'};
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 16px 48px rgba(27, 54, 93, 0.15);
    border-color: ${colors.accentOrange};
  }
  
  &:nth-child(odd) {
    margin-left: 60px;
  }
  
  &:nth-child(even) {
    margin-right: 60px;
  }
  
  @media (max-width: 768px) {
    margin-left: 60px !important;
    margin-right: 0 !important;
    padding: 24px;
    
    &:hover {
      transform: translateY(-4px) scale(1.01);
    }
  }
`;

const WeekHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const WeekIcon = styled.div`
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const WeekTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${colors.navyBlue};
  margin: 0;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const WeekTeaser = styled.p`
  font-family: 'Open Sans', sans-serif;
  color: ${colors.mountainBlue};
  margin: 0;
  font-style: italic;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StageLabel = styled.div`
  position: absolute;
  top: -12px;
  left: 24px;
  background: ${colors.accentOrange};
  color: ${colors.alpineWhite};
  padding: 6px 16px;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-out;
  
  @media (max-width: 768px) {
    padding: 16px;
    align-items: flex-start;
    padding-top: 40px;
  }
`;

const Modal = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 20px;
  padding: 48px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: ${slideUp} 0.4s ease-out;
  box-shadow: 0 24px 80px rgba(27, 54, 93, 0.3);
  
  @media (max-width: 768px) {
    padding: 32px 24px;
    border-radius: 16px;
    max-height: 85vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: ${colors.mountainBlue};
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.iceBlue};
    color: ${colors.navyBlue};
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
  border-bottom: 2px solid ${colors.iceBlue};
  padding-bottom: 24px;
`;

const ModalIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: ${colors.navyBlue};
  margin: 0 0 8px 0;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ModalSubtitle = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.1rem;
  color: ${colors.mountainBlue};
  margin: 0;
  font-style: italic;
`;

const ContentSection = styled.div`
  margin-bottom: 32px;
  
  &:last-of-type {
    margin-bottom: 40px;
  }
`;

const ContentTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  color: ${colors.navyBlue};
  margin: 0 0 12px 0;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BulletItem = styled.li`
  font-family: 'Open Sans', sans-serif;
  color: ${colors.navyBlue};
  margin-bottom: 8px;
  padding-left: 24px;
  position: relative;
  line-height: 1.5;
  
  &:before {
    content: '🎯';
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, ${colors.iceBlue} 0%, ${colors.pearlWhite} 100%);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid ${colors.accentOrange};
  margin: 16px 0;
`;

const QuoteText = styled.p`
  font-family: 'Open Sans', sans-serif;
  color: ${colors.navyBlue};
  margin: 0;
  font-style: italic;
  font-size: 1rem;
  
  &:before {
    content: '"';
    font-size: 1.5rem;
    color: ${colors.accentOrange};
  }
  
  &:after {
    content: '"';
    font-size: 1.5rem;
    color: ${colors.accentOrange};
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: ${colors.iceBlue};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.mountainBlue};
  font-family: 'Open Sans', sans-serif;
  margin: 16px 0;
  border: 2px dashed ${colors.mountainBlue};
  font-size: 0.9rem;
  text-align: center;
  
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  background: ${colors.accentOrange};
  color: ${colors.alpineWhite};
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  
  &:hover {
    background: #e55a35;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 106, 61, 0.3);
    text-decoration: none;
    color: ${colors.alpineWhite};
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 14px 24px;
  }
`;

// Journey data
const weeks = [
  {
    id: 1,
    week: 'Week 1',
    stage: 'Stage 1: Foundations',
    icon: '⛺',
    title: 'Basecamp: Orientation & First Steps',
    teaser: 'Gear up with tools and mindset.',
    learn: [
      'AI literacy fundamentals and Microsoft AI strategy overview',
      'Complete Copilot app ecosystem walkthrough',
      'Day Zero setup and environment preparation',
      'Goal setting and success metrics definition'
    ],
    homework: 'Draft a self-introduction using Copilot in Word',
    deliverable: 'Prompt Log #1 with initial experiments',
    snippet: 'Most participants realize 60% of their tasks are Copilot-eligible right away.',
    isStageStart: true
  },
  {
    id: 2,
    week: 'Week 2',
    stage: 'Stage 1: Foundations',
    icon: '🏕️',
    title: 'Camp 2: Apply Tomorrow Tasks',
    teaser: 'First climbs with real tasks.',
    learn: [
      'Mini-labs in Outlook & Teams with guided practice',
      'Apply-tomorrow assignments for immediate impact',
      'Basic prompt engineering techniques',
      'Time tracking and productivity measurement'
    ],
    homework: 'Summarize 25 unread emails using Copilot',
    deliverable: 'Prompt Log #2 with refined techniques',
    snippet: 'Students reclaim 3+ hours/week at this stage.',
    isStageStart: false
  },
  {
    id: 3,
    week: 'Week 3',
    stage: 'Stage 2: Copilot Mastery',
    icon: '🧗',
    title: 'Glacier: Daily Workflows',
    teaser: 'Deeper dives in daily apps.',
    learn: [
      'Advanced Outlook workflows and email automation',
      'Teams meeting optimization and note-taking',
      'Word document creation and editing mastery',
      'Cross-app workflow integration'
    ],
    homework: 'Build a prompt library for recurring tasks',
    deliverable: 'Workflow Playbook Draft with documented processes',
    snippet: 'SMBs save 6+ hours/month by automating reporting.',
    isStageStart: true
  },
  {
    id: 4,
    week: 'Week 4',
    stage: 'Stage 2: Copilot Mastery',
    icon: '⛰️',
    title: 'Ridge: Reports & Content',
    teaser: 'Turn data and ideas into outputs.',
    learn: [
      'Excel data analysis and chart generation',
      'PowerPoint presentation creation and design',
      'Governance basics and best practices',
      'Quality control and fact-checking methods'
    ],
    homework: 'Draft a 10-slide deck outline with Copilot',
    deliverable: 'Workflow Playbook Final with all processes',
    snippet: 'Consultants cut proposal prep by 70%.',
    isStageStart: false
  },
  {
    id: 5,
    week: 'Week 5',
    stage: 'Stage 3: Advanced Enablement',
    icon: '🏔️',
    title: 'Summit: Agents & Guardrails',
    teaser: 'Build your own agent.',
    learn: [
      'Copilot Studio basics and agent creation',
      'Azure AI Foundry overview and integration',
      'Custom connector development',
      'Organizational AI policy framework'
    ],
    homework: 'Draft an AI usage policy for your organization',
    deliverable: 'Working Agent + Reflection Report with next steps',
    snippet: 'Leaders leave with a tested agent and governance framework.',
    isStageStart: true
  }
];

const FiveWeekJourney = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);

  const openModal = (week) => {
    setSelectedWeek(week);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedWeek(null);
    document.body.style.overflow = 'unset';
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <SectionContainer id="curriculum">
        <Container>
          <SectionTitle>5-Week Journey to the Summit</SectionTitle>
          <SectionSubtitle>
            Follow the mountain path from basecamp to summit, mastering Microsoft Copilot step by step.
          </SectionSubtitle>
          
          <SummitFlag>🚩</SummitFlag>
          <JourneyPath />
          
          <JourneyContainer>
            {weeks.map((week) => (
              <WeekCard
                key={week.id}
                onClick={() => openModal(week)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(week);
                  }
                }}
              >
                {week.isStageStart && <StageLabel>{week.stage.split(':')[0]}</StageLabel>}
                <WeekHeader>
                  <WeekIcon>{week.icon}</WeekIcon>
                  <div>
                    <WeekTitle>{week.week} – {week.title}</WeekTitle>
                    <WeekTeaser>{week.teaser}</WeekTeaser>
                  </div>
                </WeekHeader>
              </WeekCard>
            ))}
          </JourneyContainer>
        </Container>
      </SectionContainer>

      {selectedWeek && (
        <ModalOverlay onClick={closeModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal} aria-label="Close modal">
              ×
            </CloseButton>
            
            <ModalHeader>
              <ModalIcon>{selectedWeek.icon}</ModalIcon>
              <ModalTitle>{selectedWeek.week} – {selectedWeek.title}</ModalTitle>
              <ModalSubtitle>{selectedWeek.teaser}</ModalSubtitle>
            </ModalHeader>
            
            <ContentSection>
              <ContentTitle>What You'll Learn:</ContentTitle>
              <BulletList>
                {selectedWeek.learn.map((item, index) => (
                  <BulletItem key={index}>{item}</BulletItem>
                ))}
              </BulletList>
            </ContentSection>
            
            <ContentSection>
              <ContentTitle>Homework Assignment:</ContentTitle>
              <HighlightBox>
                <p style={{ margin: 0, fontFamily: 'Open Sans', color: colors.navyBlue }}>
                  📝 {selectedWeek.homework}
                </p>
              </HighlightBox>
            </ContentSection>
            
            <ContentSection>
              <ContentTitle>Week Deliverable:</ContentTitle>
              <p style={{ margin: 0, fontFamily: 'Open Sans', color: colors.navyBlue }}>
                📦 {selectedWeek.deliverable}
              </p>
            </ContentSection>
            
            <ImagePlaceholder>
              [Copilot in Action - {selectedWeek.title} Screenshot]
            </ImagePlaceholder>
            
            <HighlightBox>
              <QuoteText>{selectedWeek.snippet}</QuoteText>
            </HighlightBox>
            
            <CTAButton href="#apply">
              Join the Cohort
            </CTAButton>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

export default FiveWeekJourney;
