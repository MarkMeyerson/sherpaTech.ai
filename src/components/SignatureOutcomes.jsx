import React, { useState } from 'react';
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
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const SectionContainer = styled.section`
  padding: 64px 24px;
  background: ${colors.pearlWhite};
  
  @media (max-width: 768px) {
    padding: 48px 16px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 48px;
  color: ${colors.navyBlue};
  animation: ${slideUp} 0.6s ease-out;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 32px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Tile = styled.div`
  background: ${colors.alpineWhite};
  padding: 32px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(27, 54, 93, 0.08);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(27, 54, 93, 0.15);
    border-color: ${colors.accentOrange};
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 24px 20px;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const TileIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
  display: block;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }
`;

const TileTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: ${colors.navyBlue};
  margin: 0;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  /* Mobile fixes */
  width: 100vw;
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height for mobile */
  
  @media (max-width: 768px) {
    padding: 16px;
    align-items: flex-start;
    padding-top: 40px;
  }
`;

const Modal = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 16px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  max-height: 90dvh; /* Dynamic viewport height for mobile */
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(27, 54, 93, 0.3);
  z-index: 10000;
  
  @media (max-width: 768px) {
    padding: 32px 24px;
    border-radius: 12px;
    max-height: 85vh;
    max-height: 85dvh;
    margin-top: 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${colors.mountainBlue};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.iceBlue};
    color: ${colors.navyBlue};
  }
  
  @media (max-width: 768px) {
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
`;

const ModalTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: ${colors.navyBlue};
  margin: 0 0 16px 0;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
`;

const ModalSubheadline = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2rem;
  color: ${colors.mountainBlue};
  margin: 0 0 32px 0;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 24px;
  }
`;

const ExamplesSection = styled.div`
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const ExamplesTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: ${colors.navyBlue};
  margin: 0 0 16px 0;
`;

const ExamplesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ExampleItem = styled.li`
  font-family: 'Open Sans', sans-serif;
  color: ${colors.navyBlue};
  margin-bottom: 12px;
  padding-left: 24px;
  position: relative;
  line-height: 1.5;
  
  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${colors.accentOrange};
    font-weight: bold;
  }
`;

const StorySection = styled.div`
  background: ${colors.iceBlue};
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 24px;
  }
`;

const StoryText = styled.p`
  font-family: 'Open Sans', sans-serif;
  color: ${colors.navyBlue};
  margin: 0;
  font-style: italic;
  line-height: 1.6;
`;

const CTAButton = styled.a`
  display: block;
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
  text-align: center;
  width: 100%;
  
  &:hover {
    background: #e55a35;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 106, 61, 0.3);
    text-decoration: none;
    color: ${colors.alpineWhite};
  }
  
  @media (max-width: 768px) {
    padding: 14px 24px;
  }
`;

// Outcome data
const outcomes = [
  {
    id: 1,
    icon: '✉️',
    title: 'Save Hours in Outlook',
    subheadline: 'Cut through inbox clutter and focus on what matters.',
    examples: [
      'Summarize 50 unread emails into bullet points in 10 seconds.',
      'Draft routine client responses with Copilot instead of typing from scratch.'
    ],
    story: 'A project manager cut inbox time from 2.5 hrs/day to 45 minutes.',
    cta: 'Join the Cohort',
    ctaLink: '#apply'
  },
  {
    id: 2,
    icon: '📊',
    title: 'Automate Reports',
    subheadline: 'Let Copilot handle the number crunching.',
    examples: [
      'Turn raw sales data into a clean summary table with one prompt.',
      'Generate charts and pivot tables without formulas.'
    ],
    story: 'A finance lead saves 6 hours per month on board reports.',
    cta: 'Join the Cohort',
    ctaLink: '#apply'
  },
  {
    id: 3,
    icon: '📅',
    title: 'Smarter Meetings',
    subheadline: 'Never leave a meeting unsure of what\'s next.',
    examples: [
      'Copilot in Teams auto-generates meeting recaps and action items.',
      'Search past meetings for "budget approval decision" in seconds.'
    ],
    story: 'A 15-person team saves 3+ hours/week avoiding rework.',
    cta: 'Join the Cohort',
    ctaLink: '#apply'
  },
  {
    id: 4,
    icon: '✍️',
    title: 'Content in Clicks',
    subheadline: 'From blank page to polished draft in minutes.',
    examples: [
      'Draft a 1-page client proposal in Word with your key points.',
      'Generate a 10-slide PowerPoint deck outline in seconds.'
    ],
    story: 'A consultant cut prep time for proposals by 70%.',
    cta: 'Join the Cohort',
    ctaLink: '#apply'
  }
];

const SignatureOutcomes = () => {
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const openModal = (outcome) => {
    // Save current scroll position before opening modal
    setScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
    setSelectedOutcome(outcome);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    // Force scroll to top to ensure modal is visible
    window.scrollTo(0, 0);
  };

  const closeModal = () => {
    setSelectedOutcome(null);
    document.body.style.overflow = 'unset'; // Restore scroll
    // Restore original scroll position
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 50); // Small delay to ensure DOM is updated
  };

  // Close modal on ESC key
  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset'; // Cleanup on unmount
    };
  }, []);

  return (
    <>
      <SectionContainer>
        <Container>
          <SectionTitle>Signature Outcomes</SectionTitle>
          <Grid>
            {outcomes.map((outcome) => (
              <Tile
                key={outcome.id}
                onClick={() => openModal(outcome)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(outcome);
                  }
                }}
              >
                <TileIcon>{outcome.icon}</TileIcon>
                <TileTitle>{outcome.title}</TileTitle>
              </Tile>
            ))}
          </Grid>
        </Container>
      </SectionContainer>

      {selectedOutcome && (
        <ModalOverlay onClick={closeModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal} aria-label="Close modal">
              ×
            </CloseButton>
            
            <ModalTitle>
              {selectedOutcome.icon} {selectedOutcome.title}
            </ModalTitle>
            
            <ModalSubheadline>
              {selectedOutcome.subheadline}
            </ModalSubheadline>
            
            <ExamplesSection>
              <ExamplesTitle>Quick Examples:</ExamplesTitle>
              <ExamplesList>
                {selectedOutcome.examples.map((example, index) => (
                  <ExampleItem key={index}>{example}</ExampleItem>
                ))}
              </ExamplesList>
            </ExamplesSection>
            
            <StorySection>
              <StoryText>
                💡 Real Result: {selectedOutcome.story}
              </StoryText>
            </StorySection>
            
            <CTAButton href={selectedOutcome.ctaLink}>
              {selectedOutcome.cta}
            </CTAButton>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

export default SignatureOutcomes;
