import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SimpleContactForm from './SimpleContactForm';
import SignatureOutcomes from './SignatureOutcomes';
import FiveWeekJourney from './FiveWeekJourney';
import WhoIsThisFor from './WhoIsThisFor';
// import { useMobileOptimizations } from '../hooks/useMobileOptimizations';

// Brand Colors
const colors = {
  navyBlue: '#1B365D',
  mountainBlue: '#2B517A',
  iceBlue: '#E8EEF4',
  pearlWhite: '#F7FAFC',
  accentOrange: '#FF6A3D',
  alpineWhite: '#FFFFFF'
};

const PageContainer = styled.div`
  min-height: 100vh;
  font-family: 'Open Sans', sans-serif;
  color: ${colors.navyBlue};
  line-height: 1.6;
  
  /* Smooth scrolling behavior */
  scroll-behavior: ${props => props.$reducedMotion ? 'auto' : 'smooth'};
  
  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
    
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${colors.navyBlue} 0%, ${colors.mountainBlue} 100%);
  color: ${colors.alpineWhite};
  padding: 80px 24px 64px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/mountain-ai.jpg') center/cover;
    opacity: 0.1;
    z-index: 0;
  }
  
  * {
    position: relative;
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const HeroTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 3rem;
  margin-bottom: 24px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 16px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 48px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 32px;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 32px;
`;

const PrimaryButton = styled.button`
  background: ${colors.accentOrange};
  color: ${colors.alpineWhite};
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    background: #e55a35;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 106, 61, 0.3);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: ${colors.alpineWhite};
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  padding: 12px 24px;
  border: 2px solid ${colors.alpineWhite};
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    background: ${colors.alpineWhite};
    color: ${colors.navyBlue};
  }
`;

const Section = styled.section`
  padding: 64px 24px;
  
  &:nth-child(even) {
    background: ${colors.pearlWhite};
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 48px;
  color: ${colors.navyBlue};
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 32px;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: ${colors.iceBlue};
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const CardIcon = styled.div`
  width: 64px;
  height: 64px;
  background: ${colors.accentOrange};
  border-radius: 50%;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const CardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: ${colors.navyBlue};
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: ${colors.navyBlue};
  opacity: 0.8;
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  margin-bottom: 16px;
  border: 1px solid ${colors.iceBlue};
  border-radius: 8px;
  overflow: hidden;
`;

const FAQQuestion = styled.button`
  width: 100%;
  background: ${colors.iceBlue};
  border: none;
  padding: 24px;
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: ${colors.navyBlue};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.mountainBlue};
    color: ${colors.alpineWhite};
  }
  
  &:focus {
    outline: 2px solid ${colors.accentOrange};
    outline-offset: 2px;
  }
  
  @media (max-width: 768px) {
    padding: 16px;
    font-size: 1rem;
  }
`;

const FAQAnswer = styled.div`
  padding: ${props => props.isOpen ? '24px' : '0 24px'};
  max-height: ${props => props.isOpen ? '200px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  background: ${colors.alpineWhite};
  color: ${colors.navyBlue};
`;

const SherpaSkill = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  
  // Ensure scrolling is always enabled on this page
  useEffect(() => {
    // Reset any overflow hidden that might have been set by modals
    document.body.style.overflow = 'unset';
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  // Temporarily disabled mobile optimizations for debugging
  // const { isMobile, deviceInfo, accessibilityHelpers } = useMobileOptimizations({
  //   enableGestures: true,
  //   enableHaptics: true,
  //   enablePerformanceMonitoring: true
  // });

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
    
    // Add haptic feedback on mobile (temporarily disabled)
    // if (isMobile && window.navigator?.vibrate) {
    //   window.navigator.vibrate(50);
    // }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', // deviceInfo?.reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      
      // Add haptic feedback on mobile (temporarily disabled)
      // if (isMobile && window.navigator?.vibrate) {
      //   window.navigator.vibrate(30);
      // }
    }
  };

  const faqData = [
    {
      question: "Do I need a Copilot license?",
      answer: "No, we provide access to Copilot for the duration of the course. You'll learn how to work with both free and premium features."
    },
    {
      question: "What if I miss a session?",
      answer: "All sessions are recorded and available for 90 days. You'll also have access to makeup sessions and one-on-one support if needed."
    },
    {
      question: "Will I have access after the course?",
      answer: "Yes! You'll have lifetime access to all course materials, templates, and a private alumni community for ongoing support."
    },
    {
      question: "How technical do I need to be?",
      answer: "No coding experience required! This course is designed for non-technical professionals. If you can use Microsoft Office, you can succeed in this course."
    }
  ];

  return (
    <PageContainer> {/* $reducedMotion={deviceInfo?.reducedMotion} */}
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <HeroTitle>SherpaSkill™: Master Microsoft Copilot in 5 Weeks</HeroTitle>
          <HeroSubtitle>
            Non-technical professionals learn Copilot hands-on, build real workflows, 
            and create your first Copilot Studio agent.
          </HeroSubtitle>
          <CTAContainer>
            <PrimaryButton 
              onClick={() => scrollToSection('apply')}
              aria-label="Reserve your spot in the SherpaSkill cohort"
            >
              Reserve My Spot
            </PrimaryButton>
            <SecondaryButton 
              onClick={() => scrollToSection('curriculum')}
              aria-label="View the SherpaSkill curriculum details"
            >
              View Curriculum
            </SecondaryButton>
          </CTAContainer>
        </Container>
      </HeroSection>

      {/* What You'll Learn */}
      <Section id="curriculum" aria-label="What you'll learn section">
        <Container>
          <SectionTitle>What You'll Learn</SectionTitle>
          <CardsGrid role="list" aria-label="Learning outcomes">
            <Card role="listitem">
              <CardIcon aria-hidden="true">🎯</CardIcon>
              <CardTitle>Foundations</CardTitle>
              <CardDescription>
                AI literacy, Copilot overview, and Day Zero orientation to get you started confidently.
              </CardDescription>
            </Card>
            <Card role="listitem">
              <CardIcon aria-hidden="true">⚡</CardIcon>
              <CardTitle>Copilot Mastery</CardTitle>
              <CardDescription>
                Hands-on labs, workflow creation, and governance best practices for real-world application.
              </CardDescription>
            </Card>
            <Card role="listitem">
              <CardIcon aria-hidden="true">🚀</CardIcon>
              <CardTitle>Advanced Enablement</CardTitle>
              <CardDescription>
                Build agents, create connectors, and explore Azure AI Foundry for advanced capabilities.
              </CardDescription>
            </Card>
          </CardsGrid>
        </Container>
      </Section>

      {/* Signature Outcomes */}
      <SignatureOutcomes />

      {/* 5-Week Journey */}
      <FiveWeekJourney />

      {/* Who Is This For */}
      <WhoIsThisFor />

      {/* CTA + HubSpot Form */}
      <Section id="apply" aria-label="Application section">
        <Container>
          <SectionTitle>Ready to Transform Your Productivity?</SectionTitle>
          <SimpleContactForm />
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section aria-label="Frequently asked questions section">
        <Container>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <FAQContainer role="list" aria-label="Frequently asked questions">
            {faqData.map((faq, index) => (
              <FAQItem key={index} role="listitem">
                <FAQQuestion 
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQ === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  {faq.question}
                  <span aria-hidden="true">{openFAQ === index ? '−' : '+'}</span>
                </FAQQuestion>
                <FAQAnswer 
                  isOpen={openFAQ === index}
                  id={`faq-answer-${index}`}
                  aria-labelledby={`faq-question-${index}`}
                  role="region"
                >
                  {faq.answer}
                </FAQAnswer>
              </FAQItem>
            ))}
          </FAQContainer>
        </Container>
      </Section>
    </PageContainer>
  );
};

export default SherpaSkill;
