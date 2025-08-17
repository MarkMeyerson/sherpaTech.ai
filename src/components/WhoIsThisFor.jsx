import React, { useState, useRef, useEffect } from 'react';
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
    transform: scale(0.95);
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

const expandCard = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.02);
  }
`;

// Styled Components
const SectionContainer = styled.section`
  padding: 80px 24px;
  background: linear-gradient(135deg, ${colors.alpineWhite} 0%, ${colors.iceBlue} 100%);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 16px;
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

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: repeating-linear-gradient(
      to right,
      ${colors.mountainBlue} 0px,
      ${colors.mountainBlue} 4px,
      transparent 4px,
      transparent 12px
    );
    opacity: 0.3;
    z-index: 1;
    transform: translateY(-50%);
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  z-index: 2;
  position: relative;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    gap: 16px;
    padding: 16px 0;
  }
`;

const RoleCard = styled.div`
  flex: 0 0 ${props => props.isExpanded ? '400px' : '280px'};
  background: ${props => props.isExpanded ? 
    `linear-gradient(135deg, ${colors.accentOrange} 0%, #e55a35 100%)` : 
    colors.alpineWhite};
  color: ${props => props.isExpanded ? colors.alpineWhite : colors.navyBlue};
  border-radius: 20px;
  padding: ${props => props.isExpanded ? '32px' : '24px'};
  box-shadow: ${props => props.isExpanded ? 
    '0 20px 60px rgba(255, 106, 61, 0.3)' : 
    '0 8px 32px rgba(27, 54, 93, 0.1)'};
  cursor: ${props => props.isExpanded ? 'default' : 'pointer'};
  transition: all 0.4s ease;
  scroll-snap-align: start;
  position: relative;
  border: ${props => props.isExpanded ? 
    `3px solid ${colors.alpineWhite}` : 
    '2px solid transparent'};
  min-height: ${props => props.isExpanded ? '500px' : '180px'};
  
  &:hover {
    transform: ${props => props.isExpanded ? 'translateY(-4px)' : 'translateY(-8px)'};
    box-shadow: ${props => props.isExpanded ? 
      '0 24px 80px rgba(255, 106, 61, 0.4)' : 
      '0 16px 48px rgba(27, 54, 93, 0.15)'};
  }
  
  @media (max-width: 768px) {
    flex: 0 0 ${props => props.isExpanded ? '320px' : '240px'};
    padding: ${props => props.isExpanded ? '24px' : '20px'};
    min-height: ${props => props.isExpanded ? '420px' : '160px'};
  }
`;

const RoleIcon = styled.div`
  font-size: ${props => props.isExpanded ? '3.5rem' : '2.5rem'};
  margin-bottom: 16px;
  text-align: center;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: ${props => props.isExpanded ? '3rem' : '2rem'};
  }
`;

const RoleTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: ${props => props.isExpanded ? '700' : '600'};
  font-size: ${props => props.isExpanded ? '1.6rem' : '1.3rem'};
  margin: 0 0 12px 0;
  text-align: center;
  line-height: 1.3;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: ${props => props.isExpanded ? '1.4rem' : '1.1rem'};
  }
`;

const RoleTagline = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: ${props => props.isExpanded ? '1.1rem' : '1rem'};
  margin: 0;
  text-align: center;
  font-style: italic;
  opacity: ${props => props.isExpanded ? '1' : '0.8'};
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: ${props => props.isExpanded ? '1rem' : '0.9rem'};
  }
`;

const ExpandedContent = styled.div`
  margin-top: 24px;
  opacity: ${props => props.show ? '1' : '0'};
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.4s ease;
  
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const BenefitList = styled.div`
  margin-bottom: 24px;
`;

const BenefitItem = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const BenefitTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  margin: 0 0 4px 0;
  color: ${colors.alpineWhite};
`;

const BenefitDescription = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
  line-height: 1.4;
`;

const SherpaNote = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 16px;
  border-radius: 12px;
  margin-top: 20px;
  border-left: 4px solid ${colors.alpineWhite};
`;

const SherpaLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  color: ${colors.alpineWhite};
  opacity: 0.8;
`;

const SherpaText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 0.95rem;
  margin: 0;
  font-style: italic;
  line-height: 1.4;
  color: ${colors.alpineWhite};
`;

const CTAButton = styled.a`
  display: inline-block;
  background: ${colors.alpineWhite};
  color: ${colors.accentOrange};
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  margin-top: 20px;
  cursor: pointer;
  
  &:hover {
    background: ${colors.iceBlue};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
    text-decoration: none;
    color: ${colors.accentOrange};
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 12px 20px;
  }
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
  padding: 40px;
  max-width: 600px;
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
  top: 20px;
  right: 20px;
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

const ModalTagline = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.1rem;
  color: ${colors.mountainBlue};
  margin: 0;
  font-style: italic;
`;

const ModalBenefitList = styled.div`
  margin-bottom: 32px;
`;

const ModalBenefitItem = styled.div`
  margin-bottom: 20px;
  padding-left: 24px;
  position: relative;
  
  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    top: 2px;
    color: ${colors.accentOrange};
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const ModalBenefitTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0 0 4px 0;
  color: ${colors.navyBlue};
`;

const ModalBenefitDescription = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  margin: 0;
  color: ${colors.navyBlue};
  opacity: 0.8;
  line-height: 1.5;
`;

const ModalSherpaNote = styled.div`
  background: linear-gradient(135deg, ${colors.iceBlue} 0%, ${colors.pearlWhite} 100%);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid ${colors.accentOrange};
  margin-bottom: 24px;
`;

const ModalSherpaLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  color: ${colors.navyBlue};
`;

const ModalSherpaText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  margin: 0;
  font-style: italic;
  line-height: 1.5;
  color: ${colors.navyBlue};
`;

// Role data
const roles = [
  {
    id: 'small-business',
    icon: '💼',
    title: 'Small Business Owners',
    tagline: 'Turn AI into your strategy partner.',
    benefits: [
      {
        title: 'Strategize Smarter',
        description: 'Use Copilot to scan industry trends and draft clear strategy updates.'
      },
      {
        title: 'Analyze with Confidence',
        description: 'Excel Copilot transforms raw numbers into dashboards and highlights patterns.'
      },
      {
        title: 'Plan for the Future',
        description: 'Generate 3–5 year scenarios for hiring, growth, and cash flow.'
      }
    ],
    sherpaNote: 'Owners don\'t need to be masters in every domain — Copilot provides enough mastery in each area to make confident, well-rounded decisions.',
    isDefault: true
  },
  {
    id: 'sales',
    icon: '📈',
    title: 'Sales & Business Development',
    tagline: 'Spend less time chasing, more time closing.',
    benefits: [
      {
        title: 'Prep for Success',
        description: 'Prep for calls with Teams + Outlook recaps.'
      },
      {
        title: 'Perfect Follow-ups',
        description: 'Draft follow-ups instantly, matched to client tone.'
      },
      {
        title: 'Spot Trends',
        description: 'Use Excel Copilot to spot sales trends.'
      }
    ],
    sherpaNote: 'Sales leaders gain back hours each week to focus on relationships, not paperwork.'
  },
  {
    id: 'operations',
    icon: '📊',
    title: 'Operations & Project Managers',
    tagline: 'Clarity in every project update.',
    benefits: [
      {
        title: 'Automate Reports',
        description: 'Automate weekly project status reports.'
      },
      {
        title: 'Capture Action Items',
        description: 'Capture action items from Teams meetings.'
      },
      {
        title: 'Build Workflows',
        description: 'Build repeatable workflows for recurring tasks.'
      }
    ],
    sherpaNote: 'Copilot helps ops leaders keep projects on track without drowning in admin.'
  },
  {
    id: 'finance',
    icon: '💵',
    title: 'Finance & Accounting',
    tagline: 'Reports in minutes, not weekends.',
    benefits: [
      {
        title: 'Board-Ready Reports',
        description: 'Draft board-ready reports in Excel.'
      },
      {
        title: 'Spot Anomalies',
        description: 'Spot anomalies in data automatically.'
      },
      {
        title: 'Recurring Updates',
        description: 'Generate recurring monthly updates with less effort.'
      }
    ],
    sherpaNote: 'Copilot gives finance leaders clean, reliable numbers without hours of manual work.'
  },
  {
    id: 'hr',
    icon: '👥',
    title: 'HR & People Leaders',
    tagline: 'More time for people, less on paperwork.',
    benefits: [
      {
        title: 'Draft Documentation',
        description: 'Draft job descriptions and onboarding docs.'
      },
      {
        title: 'Summarize Surveys',
        description: 'Summarize employee survey results.'
      },
      {
        title: 'Create Policies',
        description: 'Draft a starter AI usage policy.'
      }
    ],
    sherpaNote: 'HR can focus on culture and growth, while Copilot lightens the admin load.'
  },
  {
    id: 'marketing',
    icon: '🎨',
    title: 'Marketers',
    tagline: 'Fresh ideas, faster execution.',
    benefits: [
      {
        title: 'Campaign Outlines',
        description: 'Generate campaign outlines in PowerPoint.'
      },
      {
        title: 'Multiple Tones',
        description: 'Rewrite messaging in multiple tones.'
      },
      {
        title: 'Clear Reports',
        description: 'Summarize social metrics into clear slides.'
      }
    ],
    sherpaNote: 'Copilot doesn\'t replace creativity — it clears the runway for it.'
  },
  {
    id: 'it',
    icon: '💻',
    title: 'IT / Tech Leads',
    tagline: 'Support the team without burning out.',
    benefits: [
      {
        title: 'Fast Documentation',
        description: 'Draft documentation in half the time.'
      },
      {
        title: 'Ticket Automation',
        description: 'Explore Copilot Studio agents for ticket automation.'
      },
      {
        title: 'Clear Governance',
        description: 'Ensure governance guardrails are clearly communicated.'
      }
    ],
    sherpaNote: 'IT leaders can focus on architecture and innovation instead of endless tickets.'
  }
];

const WhoIsThisFor = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const carouselRef = useRef(null);

  const openModal = (role) => {
    if (role.isDefault) return; // Don't open modal for expanded card
    setSelectedRole(role);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedRole(null);
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

  // Auto-scroll to show expanded card on load
  useEffect(() => {
    if (carouselRef.current) {
      const expandedCard = carouselRef.current.querySelector('[data-expanded="true"]');
      if (expandedCard) {
        expandedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, []);

  return (
    <>
      <SectionContainer id="who-is-this-for">
        <Container>
          <SectionTitle>Who Is This For?</SectionTitle>
          <SectionSubtitle>
            Discover how the 5-week Copilot cohort transforms work for different roles and industries.
          </SectionSubtitle>
          
          <CarouselContainer>
            <CarouselTrack ref={carouselRef}>
              {roles.map((role) => (
                <RoleCard
                  key={role.id}
                  isExpanded={role.isDefault}
                  onClick={() => openModal(role)}
                  data-expanded={role.isDefault}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !role.isDefault) {
                      e.preventDefault();
                      openModal(role);
                    }
                  }}
                >
                  <RoleIcon isExpanded={role.isDefault}>{role.icon}</RoleIcon>
                  <RoleTitle isExpanded={role.isDefault}>{role.title}</RoleTitle>
                  <RoleTagline isExpanded={role.isDefault}>{role.tagline}</RoleTagline>
                  
                  {role.isDefault && (
                    <ExpandedContent show={true}>
                      <BenefitList>
                        {role.benefits.map((benefit, index) => (
                          <BenefitItem key={index}>
                            <BenefitTitle>{benefit.title}:</BenefitTitle>
                            <BenefitDescription>{benefit.description}</BenefitDescription>
                          </BenefitItem>
                        ))}
                      </BenefitList>
                      
                      <SherpaNote>
                        <SherpaLabel>Sherpa Note</SherpaLabel>
                        <SherpaText>{role.sherpaNote}</SherpaText>
                      </SherpaNote>
                      
                      <CTAButton href="#apply">
                        Join the Cohort →
                      </CTAButton>
                    </ExpandedContent>
                  )}
                </RoleCard>
              ))}
            </CarouselTrack>
          </CarouselContainer>
        </Container>
      </SectionContainer>

      {selectedRole && (
        <ModalOverlay onClick={closeModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal} aria-label="Close modal">
              ×
            </CloseButton>
            
            <ModalHeader>
              <ModalIcon>{selectedRole.icon}</ModalIcon>
              <ModalTitle>{selectedRole.title}</ModalTitle>
              <ModalTagline>{selectedRole.tagline}</ModalTagline>
            </ModalHeader>
            
            <ModalBenefitList>
              {selectedRole.benefits.map((benefit, index) => (
                <ModalBenefitItem key={index}>
                  <ModalBenefitTitle>{benefit.title}:</ModalBenefitTitle>
                  <ModalBenefitDescription>{benefit.description}</ModalBenefitDescription>
                </ModalBenefitItem>
              ))}
            </ModalBenefitList>
            
            <ModalSherpaNote>
              <ModalSherpaLabel>Sherpa Note</ModalSherpaLabel>
              <ModalSherpaText>{selectedRole.sherpaNote}</ModalSherpaText>
            </ModalSherpaNote>
            
            <CTAButton href="#apply">
              Join the Cohort →
            </CTAButton>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

export default WhoIsThisFor;
