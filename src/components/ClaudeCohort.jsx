import React, { useState } from 'react';
import styled from 'styled-components';

// Site brand colors
const colors = {
  navyBlue: '#1B365D',
  mountainBlue: '#2B517A',
  iceBlue: '#E8EEF4',
  pearlWhite: '#F7FAFC',
  accentOrange: '#FF6A3D',
  alpineWhite: '#FFFFFF',
  gold: '#F5A623',
};

// ── Layout ───────────────────────────────────────────────────────────────────

const PageContainer = styled.div`
  min-height: 100vh;
  font-family: 'Open Sans', sans-serif;
  color: ${colors.navyBlue};
  line-height: 1.6;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
`;

// ── Hero ─────────────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${colors.navyBlue} 0%, ${colors.mountainBlue} 100%);
  color: ${colors.alpineWhite};
  padding: 80px 24px 72px;
  text-align: center;
`;

const Eyebrow = styled.div`
  display: inline-block;
  background: ${colors.gold};
  color: ${colors.navyBlue};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 18px;
  border-radius: 20px;
  margin-bottom: 22px;
`;

const HeroTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.15;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #c8d5ea;
  max-width: 620px;
  margin: 0 auto 24px;
`;

const InstructorBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 30px;
  padding: 8px 20px;
  font-size: 14px;
  color: #c8d5ea;
`;

const OnlineDot = styled.span`
  width: 8px;
  height: 8px;
  background: #4ade80;
  border-radius: 50%;
  display: inline-block;
`;

// ── Benefits ─────────────────────────────────────────────────────────────────

const BenefitsSection = styled.section`
  background: ${colors.iceBlue};
  padding: 60px 24px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  color: ${colors.navyBlue};
  margin-bottom: 36px;
`;

const BenefitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const BenefitCard = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 14px;
  padding: 28px 22px;
  text-align: left;
  box-shadow: 0 2px 12px rgba(27,54,93,0.08);
`;

const BenefitIcon = styled.div`
  font-size: 28px;
  margin-bottom: 12px;
`;

const BenefitTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${colors.navyBlue};
`;

const BenefitText = styled.p`
  font-size: 13px;
  color: #5a6278;
  line-height: 1.6;
`;

// ── Pricing ───────────────────────────────────────────────────────────────────

const PricingSection = styled.section`
  background: ${colors.pearlWhite};
  padding: 70px 24px;
  text-align: center;
`;

const PricingSubtitle = styled.p`
  color: #8b9ab5;
  font-size: 15px;
  margin-bottom: 48px;
  margin-top: -12px;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
  max-width: 720px;
  margin: 0 auto 24px;
`;

const PlanCard = styled.div`
  background: ${colors.alpineWhite};
  border: 2px solid ${props => props.$featured ? colors.gold : '#e2e8f0'};
  border-radius: 20px;
  padding: 38px 28px;
  position: relative;
  box-shadow: ${props => props.$featured
    ? '0 12px 40px rgba(245,166,35,0.15)'
    : '0 4px 16px rgba(27,54,93,0.07)'};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 48px rgba(27,54,93,0.14);
  }
`;

const PlanBadge = styled.div`
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  background: ${colors.gold};
  color: ${colors.navyBlue};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 16px;
  border-radius: 20px;
  white-space: nowrap;
`;

const PlanName = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.mountainBlue};
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const PlanPrice = styled.div`
  font-size: 52px;
  font-weight: 900;
  line-height: 1;
  color: ${colors.navyBlue};
  margin-bottom: 4px;

  span {
    font-size: 18px;
    font-weight: 400;
    color: #8b9ab5;
  }
`;

const PlanSessions = styled.div`
  font-size: 14px;
  color: #8b9ab5;
  margin-bottom: 24px;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 28px;
  text-align: left;
`;

const PlanFeature = styled.li`
  font-size: 14px;
  color: #4a5568;
  padding: 6px 0;
  display: flex;
  align-items: flex-start;
  gap: 8px;

  &::before {
    content: '✓';
    color: ${colors.gold};
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

const CTAButton = styled.a`
  display: block;
  width: 100%;
  padding: 16px 20px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 800;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  background: ${props => props.$primary ? colors.gold : 'transparent'};
  color: ${props => props.$primary ? colors.navyBlue : colors.navyBlue};
  border: 2px solid ${props => props.$primary ? colors.gold : '#cbd5e0'};

  &:hover {
    transform: scale(1.02);
    background: ${props => props.$primary ? '#f0b830' : colors.iceBlue};
  }
`;

const Guarantee = styled.p`
  font-size: 13px;
  color: #a0aec0;
  margin-top: 16px;
`;

// ── About ─────────────────────────────────────────────────────────────────────

const AboutSection = styled.section`
  background: ${colors.navyBlue};
  color: ${colors.alpineWhite};
  padding: 60px 24px;
  text-align: center;
`;

const AboutInner = styled.div`
  max-width: 620px;
  margin: 0 auto;
`;

const AboutTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 16px;
`;

const AboutText = styled.p`
  font-size: 15px;
  color: #c8d5ea;
  line-height: 1.75;
  margin-bottom: 12px;
`;

const CredBadge = styled.div`
  display: inline-block;
  background: rgba(245,166,35,0.15);
  border: 1px solid ${colors.gold};
  color: ${colors.gold};
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 13px;
  margin-top: 12px;
`;

// ── Component ────────────────────────────────────────────────────────────────

const ClaudeCohort = () => {
  const STRIPE_50  = 'https://buy.stripe.com/6oUfZhcgk7536e6e0KeIw02';
  const STRIPE_100 = 'https://buy.stripe.com/7sYaEX948897gSKg8SeIw03';

  return (
    <PageContainer>

      {/* Hero */}
      <HeroSection>
        <Container>
          <Eyebrow>🚀 Now Enrolling — Spring 2026</Eyebrow>
          <HeroTitle>Claude Cohort<br />by SherpaTech.AI</HeroTitle>
          <HeroSubtitle>
            Live AI coaching sessions where you'll master Claude and put AI
            to work in your business — starting this month.
          </HeroSubtitle>
          <InstructorBadge>
            <OnlineDot /> Led by&nbsp;<strong>Mark Meyerson</strong>&nbsp;· 30+ years of business transformation
          </InstructorBadge>
        </Container>
      </HeroSection>

      {/* Benefits */}
      <BenefitsSection>
        <Container>
          <SectionTitle>What You Get Each Session</SectionTitle>
          <BenefitGrid>
            <BenefitCard>
              <BenefitIcon>🧠</BenefitIcon>
              <BenefitTitle>Hands-On Claude Training</BenefitTitle>
              <BenefitText>Real prompts, real use cases, real results — not theory. Every session is practical and immediately usable.</BenefitText>
            </BenefitCard>
            <BenefitCard>
              <BenefitIcon>📊</BenefitIcon>
              <BenefitTitle>Strategy, Not Just Tools</BenefitTitle>
              <BenefitText>Learn to apply AI to your specific challenges with Mark's 6A Method™ framework.</BenefitText>
            </BenefitCard>
            <BenefitCard>
              <BenefitIcon>🤝</BenefitIcon>
              <BenefitTitle>Small Cohort Community</BenefitTitle>
              <BenefitText>Learn alongside peers. Ask questions, share wins, and get accountability from the group.</BenefitText>
            </BenefitCard>
            <BenefitCard>
              <BenefitIcon>⚡</BenefitIcon>
              <BenefitTitle>Immediate Implementation</BenefitTitle>
              <BenefitText>Walk away from every session with something you can deploy in your workflow that same day.</BenefitText>
            </BenefitCard>
          </BenefitGrid>
        </Container>
      </BenefitsSection>

      {/* Pricing */}
      <PricingSection>
        <Container>
          <SectionTitle>Choose Your Pace</SectionTitle>
          <PricingSubtitle>Month-to-month · No contracts · Cancel anytime</PricingSubtitle>
          <PricingGrid>

            {/* Starter */}
            <PlanCard>
              <PlanName>Starter</PlanName>
              <PlanPrice>$50<span>/mo</span></PlanPrice>
              <PlanSessions>2 live sessions per month</PlanSessions>
              <PlanFeatures>
                <PlanFeature>2× live Zoom cohort sessions</PlanFeature>
                <PlanFeature>Session recordings included</PlanFeature>
                <PlanFeature>Cohort community access</PlanFeature>
                <PlanFeature>Monthly prompting & workflow topics</PlanFeature>
                <PlanFeature>Cancel anytime after first month</PlanFeature>
              </PlanFeatures>
              <CTAButton href={STRIPE_50} target="_blank" rel="noopener noreferrer">
                Join for $50/mo →
              </CTAButton>
            </PlanCard>

            {/* Accelerator */}
            <PlanCard $featured>
              <PlanBadge>Most Popular</PlanBadge>
              <PlanName>Accelerator</PlanName>
              <PlanPrice>$100<span>/mo</span></PlanPrice>
              <PlanSessions>4 live sessions per month</PlanSessions>
              <PlanFeatures>
                <PlanFeature>4× live Zoom cohort sessions</PlanFeature>
                <PlanFeature>Session recordings included</PlanFeature>
                <PlanFeature>Cohort community access</PlanFeature>
                <PlanFeature>Weekly deep-dive topics</PlanFeature>
                <PlanFeature>Priority Q&A time each session</PlanFeature>
                <PlanFeature>Cancel anytime after first month</PlanFeature>
              </PlanFeatures>
              <CTAButton href={STRIPE_100} target="_blank" rel="noopener noreferrer" $primary>
                Join for $100/mo →
              </CTAButton>
            </PlanCard>

          </PricingGrid>
          <Guarantee>🔒 Secure checkout via Stripe · Satisfaction guaranteed</Guarantee>
        </Container>
      </PricingSection>

      {/* About */}
      <AboutSection>
        <Container>
          <AboutInner>
            <AboutTitle>About Your Instructor</AboutTitle>
            <AboutText>
              Mark Meyerson is the founder of SherpaTech.AI with 30+ years helping SMBs and nonprofits
              navigate technology transformation. He coaches organizations through his proprietary{' '}
              <strong>6A Method™</strong> — from AI strategy through real-world implementation.
            </AboutText>
            <AboutText>
              The Claude Cohort distills that expertise into affordable, high-impact live sessions
              designed to get you moving fast.
            </AboutText>
            <CredBadge>🏔️ SherpaTech.AI · AI Strategy & Coaching for SMBs & Nonprofits</CredBadge>
          </AboutInner>
        </Container>
      </AboutSection>

    </PageContainer>
  );
};

export default ClaudeCohort;
