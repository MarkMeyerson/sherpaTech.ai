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
  padding: 24px 12px;
  overflow-x: auto;
  overflow-y: visible;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: ${colors.mountainBlue} ${colors.iceBlue};
  z-index: 2;
  position: relative;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${colors.iceBlue};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.mountainBlue};
    border-radius: 4px;
    
    &:hover {
      background: ${colors.navyBlue};
    }
  }
  
  @media (max-width: 768px) {
    gap: 16px;
    padding: 16px 8px;
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const RoleCard = styled.div`
  flex: 0 0 240px;
  background: ${colors.alpineWhite};
  color: ${colors.navyBlue};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(27, 54, 93, 0.1);
  cursor: pointer;
  transition: all 0.4s ease;
  scroll-snap-align: start;
  position: relative;
  border: 2px solid transparent;
  min-height: 180px;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(27, 54, 93, 0.15);
    border-color: ${colors.accentOrange};
  }
  
  @media (max-width: 768px) {
    flex: 0 0 200px;
    padding: 20px;
    min-height: 160px;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const RoleIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 16px;
  text-align: center;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const RoleTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0 0 8px 0;
  text-align: center;
  line-height: 1.3;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const RoleTagline = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
  font-style: italic;
  opacity: 0.8;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
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
        description: 'Use Copilot to scan industry trends, competitive analysis, and draft clear quarterly strategy updates for your team.'
      },
      {
        title: 'Analyze with Confidence',
        description: 'Excel Copilot transforms raw sales numbers, expenses, and customer data into executive dashboards and highlights growth patterns.'
      },
      {
        title: 'Plan for the Future',
        description: 'Generate 3–5 year scenarios for hiring plans, market expansion, cash flow projections, and investment decisions.'
      }
    ],
    sherpaNote: 'Owners don\'t need to be masters in every domain — Copilot provides enough mastery in each area to make confident, well-rounded decisions without hiring specialists for every task.'
  },
  {
    id: 'sales',
    icon: '📈',
    title: 'Sales & Business Development',
    tagline: 'Spend less time chasing, more time closing.',
    benefits: [
      {
        title: 'Perfect Call Preparation',
        description: 'Use Teams + Outlook to automatically recap previous conversations, research prospects, and generate talking points before every call.'
      },
      {
        title: 'Instant Follow-ups',
        description: 'Draft personalized follow-up emails instantly, matched to client tone and conversation context, with meeting summaries and next steps.'
      },
      {
        title: 'Revenue Insights',
        description: 'Use Excel Copilot to spot sales trends, identify top-performing activities, and forecast pipeline conversion rates automatically.'
      }
    ],
    sherpaNote: 'Sales leaders gain back 8-12 hours each week to focus on building relationships and closing deals, instead of drowning in CRM updates and follow-up paperwork.'
  },
  {
    id: 'operations',
    icon: '📊',
    title: 'Operations & Project Managers',
    tagline: 'Clarity in every project update.',
    benefits: [
      {
        title: 'Automated Status Reports',
        description: 'Generate weekly project status reports that pull from Teams conversations, task lists, and timeline updates automatically.'
      },
      {
        title: 'Meeting Action Items',
        description: 'Capture and organize action items from Teams meetings, assign owners, set deadlines, and track completion without manual note-taking.'
      },
      {
        title: 'Workflow Templates',
        description: 'Build repeatable workflow templates for onboarding, project kickoffs, vendor management, and recurring operational tasks.'
      }
    ],
    sherpaNote: 'Copilot helps ops leaders keep complex projects on track and stakeholders informed without drowning in status meetings and administrative busywork.'
  },
  {
    id: 'finance',
    icon: '💵',
    title: 'Finance & Accounting',
    tagline: 'Reports in minutes, not weekends.',
    benefits: [
      {
        title: 'Board-Ready Reports',
        description: 'Draft executive financial summaries in Excel with charts, variance analysis, and key metric explanations ready for board presentations.'
      },
      {
        title: 'Anomaly Detection',
        description: 'Spot unusual expenses, revenue patterns, and budget variances automatically with Excel Copilot flagging items for review.'
      },
      {
        title: 'Automated Reporting',
        description: 'Generate recurring monthly financial updates, budget vs. actual reports, and cash flow projections with minimal manual effort.'
      }
    ],
    sherpaNote: 'Copilot gives finance leaders clean, reliable numbers and insights without spending weekends building reports manually — more time for strategic analysis.'
  },
  {
    id: 'hr',
    icon: '👥',
    title: 'HR & People Leaders',
    tagline: 'More time for people, less on paperwork.',
    benefits: [
      {
        title: 'Job Descriptions & Onboarding',
        description: 'Draft compelling job descriptions, onboarding checklists, and training materials tailored to specific roles and company culture.'
      },
      {
        title: 'Survey Analysis',
        description: 'Summarize employee engagement surveys, exit interviews, and feedback themes into actionable insights for leadership.'
      },
      {
        title: 'Policy Development',
        description: 'Draft AI usage policies, remote work guidelines, and employee handbook updates based on current best practices.'
      }
    ],
    sherpaNote: 'HR can focus on building culture, developing talent, and supporting employees while Copilot lightens the administrative and documentation load.'
  },
  {
    id: 'marketing',
    icon: '🎨',
    title: 'Marketers',
    tagline: 'Fresh ideas, faster execution.',
    benefits: [
      {
        title: 'Campaign Development',
        description: 'Generate campaign outlines in PowerPoint with messaging frameworks, audience targeting, and content calendars for multi-channel campaigns.'
      },
      {
        title: 'Content Variations',
        description: 'Rewrite marketing copy in multiple tones, lengths, and formats — from LinkedIn posts to email campaigns to website copy.'
      },
      {
        title: 'Performance Reporting',
        description: 'Summarize social media metrics, campaign performance, and customer feedback into executive-ready slides and actionable insights.'
      }
    ],
    sherpaNote: 'Copilot doesn\'t replace creativity — it clears the runway for it by handling repetitive tasks and providing fresh perspectives when you\'re stuck.'
  },
  {
    id: 'it',
    icon: '💻',
    title: 'IT / Tech Leads',
    tagline: 'Support the team without burning out.',
    benefits: [
      {
        title: 'Documentation at Speed',
        description: 'Draft technical documentation, process guides, and troubleshooting wikis in half the time with consistent formatting and clear explanations.'
      },
      {
        title: 'Ticket Automation',
        description: 'Explore Copilot Studio agents for common support tickets, password resets, and IT request routing to reduce manual workload.'
      },
      {
        title: 'Governance Communication',
        description: 'Ensure AI governance, security policies, and compliance guidelines are clearly communicated across the organization.'
      }
    ],
    sherpaNote: 'IT leaders can focus on architecture, innovation, and strategic technology decisions instead of endless support tickets and documentation backlogs.'
  }
];

const WhoIsThisFor = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const carouselRef = useRef(null);

  const openModal = (role) => {
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
                  onClick={() => openModal(role)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(role);
                    }
                  }}
                >
                  <RoleIcon>{role.icon}</RoleIcon>
                  <RoleTitle>{role.title}</RoleTitle>
                  <RoleTagline>{role.tagline}</RoleTagline>
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
