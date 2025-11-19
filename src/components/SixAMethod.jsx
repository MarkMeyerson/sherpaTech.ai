import React, { useState } from 'react';
import styled from 'styled-components';

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
  background: linear-gradient(135deg, ${colors.pearlWhite} 0%, ${colors.iceBlue} 100%);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${colors.navyBlue} 0%, ${colors.mountainBlue} 100%);
  color: ${colors.alpineWhite};
  padding: 80px 24px 60px;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 32px;
  color: ${colors.iceBlue};
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.9;
`;

const DownloadButton = styled.a`
  display: inline-block;
  background: ${colors.accentOrange};
  color: ${colors.alpineWhite};
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  margin-top: 24px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(255, 106, 61, 0.3);
  }
  
  &:before {
    content: '📄 ';
    margin-right: 8px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
`;

const IntroSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.navyBlue};
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const IntroText = styled.p`
  font-size: 1.1rem;
  color: ${colors.mountainBlue};
  max-width: 900px;
  margin: 0 auto 40px;
  line-height: 1.7;
`;

const MethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const MethodCard = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid transparent;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: ${colors.accentOrange};
  }
  
  ${props => props.$isActive && `
    border-color: ${colors.accentOrange};
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  `}
`;

const PhaseNumber = styled.div`
  position: absolute;
  top: -20px;
  right: -20px;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, ${colors.accentOrange}, ${colors.mountainBlue});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 700;
  color: ${colors.alpineWhite};
  opacity: 0.15;
`;

const PhaseTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${colors.navyBlue};
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PhaseLabel = styled.span`
  font-size: 0.9rem;
  color: ${colors.alpineWhite};
  background: ${colors.accentOrange};
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
`;

const PhaseDuration = styled.div`
  font-size: 0.9rem;
  color: ${colors.mountainBlue};
  font-weight: 600;
  margin-bottom: 16px;
`;

const PhaseDescription = styled.p`
  font-size: 1rem;
  color: ${colors.mountainBlue};
  line-height: 1.6;
  margin-bottom: 16px;
`;

const ViewDetailsButton = styled.button`
  background: ${props => props.$isActive ? colors.accentOrange : colors.mountainBlue};
  color: ${colors.alpineWhite};
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.accentOrange};
    transform: translateX(4px);
  }
`;

const DetailModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(27, 54, 93, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
  overflow-y: auto;
`;

const DetailContent = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 16px;
  padding: 48px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: ${colors.accentOrange};
  color: ${colors.alpineWhite};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(90deg);
    background: ${colors.navyBlue};
  }
`;

const DetailTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.navyBlue};
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const DetailSubtitle = styled.h3`
  font-size: 1.3rem;
  color: ${colors.mountainBlue};
  margin-bottom: 32px;
  font-weight: 600;
`;

const DetailSection = styled.div`
  margin-bottom: 32px;
`;

const DetailSectionTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${colors.navyBlue};
  margin-bottom: 16px;
  border-bottom: 2px solid ${colors.accentOrange};
  padding-bottom: 8px;
`;

const DetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DetailListItem = styled.li`
  font-size: 1rem;
  color: ${colors.mountainBlue};
  line-height: 1.6;
  margin-bottom: 12px;
  padding-left: 28px;
  position: relative;
  
  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${colors.accentOrange};
    font-weight: 700;
    font-size: 1.2rem;
  }
`;

const CTASection = styled.div`
  background: linear-gradient(135deg, ${colors.navyBlue} 0%, ${colors.mountainBlue} 100%);
  color: ${colors.alpineWhite};
  padding: 60px 24px;
  text-align: center;
  margin-top: 60px;
`;

const CTAButton = styled.button`
  background: ${colors.accentOrange};
  color: ${colors.alpineWhite};
  border: none;
  padding: 16px 48px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(255, 106, 61, 0.3);
  }
`;

const SixAMethod = () => {
  const [selectedPhase, setSelectedPhase] = useState(null);

  const phases = [
    {
      number: 1,
      name: 'Assess',
      title: 'Understanding Your Starting Point',
      duration: '1-2 weeks',
      description: 'A comprehensive evaluation of your organization\'s AI readiness, current state, and transformation potential.',
      keyActivities: [
        'AI maturity assessment across people, process, technology',
        'Current workflow analysis and pain point identification',
        'Data landscape review and quality assessment',
        'Technology stack evaluation',
        'Quick-win opportunity mapping'
      ],
      deliverables: [
        'AI Readiness Scorecard',
        'Current State Analysis Report',
        'Opportunity Heat Map (prioritized by ROI and complexity)',
        'Risk and Gap Analysis'
      ],
      successMetrics: [
        'Clear understanding of organizational baseline',
        'Leadership consensus on readiness level',
        '10-15 prioritized opportunities identified',
        'Budget and resource requirements understood'
      ]
    },
    {
      number: 2,
      name: 'Align',
      title: 'Creating Strategic Consensus',
      duration: '1-2 weeks',
      description: 'Building executive alignment and creating a strategic roadmap that connects AI initiatives to business outcomes.',
      keyActivities: [
        'Executive AI strategy workshop',
        'Stakeholder alignment sessions',
        'ROI modeling and business case development',
        'Resource planning (budget, people, time)',
        'Change management strategy',
        'Communication plan creation'
      ],
      deliverables: [
        'Strategic AI Roadmap (12-24 months)',
        'Executive Summary & Business Case',
        'Budget and Resource Allocation',
        'Success Metrics Dashboard',
        'Stakeholder Communication Plan'
      ],
      successMetrics: [
        '100% executive team alignment on vision',
        'Approved budget and timeline',
        'Clear ownership and accountability defined',
        'Board/investor communication prepared'
      ]
    },
    {
      number: 3,
      name: 'Activate',
      title: 'Building Governance and Guardrails',
      duration: '2-3 weeks',
      description: 'Establishing the policies, procedures, and governance framework that enable safe, compliant AI innovation.',
      keyActivities: [
        'AI governance framework design',
        'Policy creation (acceptable use, data privacy, ethics)',
        'Risk assessment and mitigation planning',
        'Compliance review (industry-specific regulations)',
        'Security and access control design',
        'Vendor evaluation framework',
        'Pilot program guidelines',
        'Monitoring and audit procedures'
      ],
      deliverables: [
        'AI Governance Framework Document',
        'AI Use Policy (employee-facing)',
        'Risk Management Plan',
        'Compliance Checklist',
        'Vendor Evaluation Scorecard',
        'Pilot Program Guidelines',
        'Incident Response Procedures'
      ],
      successMetrics: [
        'Policies approved and communicated',
        'Risk mitigation plans in place',
        'Compliance validated by legal/compliance team',
        'Governance committee established',
        'Monitoring dashboard operational'
      ]
    },
    {
      number: 4,
      name: 'Accelerate',
      title: 'Building Organizational Capability',
      duration: '4-8 weeks',
      description: 'Custom training programs that build AI literacy and practical skills across all organizational levels.',
      keyActivities: [
        'Training needs assessment',
        'Role-based curriculum development',
        'Executive AI briefings',
        'Manager implementation training',
        'Staff hands-on workshops',
        'Power user bootcamps',
        'Train-the-trainer programs',
        'Knowledge base and resource library creation'
      ],
      deliverables: [
        'Custom Training Curriculum (by role)',
        'Executive AI Briefing Deck',
        'Manager Implementation Playbook',
        'Staff Quick Start Guides',
        'Power User Advanced Training',
        'Prompt Engineering Library',
        'Internal Knowledge Base'
      ],
      successMetrics: [
        '90%+ training completion rates',
        'Pre/post assessment score improvements',
        'Measured AI literacy increase',
        'Active usage of AI tools',
        'Early adoption success stories'
      ]
    },
    {
      number: 5,
      name: 'Apply',
      title: 'Implementing Real Solutions',
      duration: '6-12 weeks',
      description: 'Building your first AI solutions with a "teach-to-fish" approach - implementing WITH you, not FOR you.',
      keyActivities: [
        'Solution design workshops',
        'Low-code solution implementation (Copilot Studio, Power Platform)',
        'Azure AI service integration (when needed)',
        'Knowledge transfer sessions ("show your work")',
        'Documentation creation',
        'Handoff and empowerment'
      ],
      deliverables: [
        '2-4 Implemented AI Solutions',
        'Solution Architecture Documentation',
        'Build Process Documentation (so you can replicate)',
        'User Guides and Training Materials',
        'Maintenance Playbooks',
        'Troubleshooting Guides',
        'Handoff Certification'
      ],
      successMetrics: [
        'Solutions live and being used',
        'Measurable time/cost savings',
        'User adoption rates >70%',
        'Client team can modify solutions independently',
        'Minimal support tickets post-handoff',
        'Documented ROI achieved'
      ]
    },
    {
      number: 6,
      name: 'Amplify',
      title: 'Scaling and Optimizing',
      duration: 'Ongoing',
      description: 'Expanding successful pilots, optimizing performance, and building continuous improvement capability.',
      keyActivities: [
        'Performance monitoring and optimization',
        'New use case identification',
        'Solution scaling and replication',
        'Advanced feature implementation',
        'Integration expansion',
        'Quarterly strategy reviews',
        'ROI tracking and reporting',
        'Continuous learning programs'
      ],
      deliverables: [
        'Quarterly Business Reviews',
        'Performance Dashboards',
        'Optimization Recommendations',
        'New Use Case Roadmap',
        'ROI Reports',
        'Updated Training Materials',
        'Scaling Playbooks',
        'Center of Excellence Framework'
      ],
      successMetrics: [
        'Solutions scaled to additional departments',
        'Continued ROI improvement',
        'Self-sufficient AI team',
        'Internal champions identified',
        'New use cases identified quarterly',
        'Organizational AI maturity increase'
      ]
    }
  ];

  const handleCardClick = (phase) => {
    setSelectedPhase(phase);
  };

  const closeModal = () => {
    setSelectedPhase(null);
  };

  return (
    <PageContainer>
      <HeroSection>
        <HeroTitle>The 6A Method™</HeroTitle>
        <HeroSubtitle>AI Transformation Framework</HeroSubtitle>
        <HeroDescription>
          From Strategy to Success in Six Strategic Phases. SherpaTech.AI's proprietary framework
          for comprehensive AI transformation that builds capability, not dependency.
        </HeroDescription>
        <DownloadButton href="/6A framework SherpaTech.pdf" download>
          Download Framework PDF
        </DownloadButton>
      </HeroSection>

      <Container>
        <IntroSection>
          <SectionTitle>Why the 6A Method Works</SectionTitle>
          <IntroText>
            Most SMBs fail at AI not because the technology doesn't work, but because they jump into tools 
            without strategy, implement without governance, and train without context. The 6A Method ensures 
            you build sustainable AI capability through strategic planning, proper governance, comprehensive 
            training, and hands-on implementation.
          </IntroText>
        </IntroSection>

        <MethodGrid>
          {phases.map((phase) => (
            <MethodCard
              key={phase.number}
              onClick={() => handleCardClick(phase)}
              $isActive={selectedPhase?.number === phase.number}
            >
              <PhaseNumber>{phase.number}</PhaseNumber>
              <PhaseTitle>
                <PhaseLabel>Phase {phase.number}</PhaseLabel>
                {phase.name}
              </PhaseTitle>
              <PhaseDuration>⏱️ {phase.duration}</PhaseDuration>
              <PhaseDescription>{phase.description}</PhaseDescription>
              <ViewDetailsButton $isActive={selectedPhase?.number === phase.number}>
                {selectedPhase?.number === phase.number ? 'Viewing Details →' : 'View Details →'}
              </ViewDetailsButton>
            </MethodCard>
          ))}
        </MethodGrid>
      </Container>

      <CTASection>
        <SectionTitle style={{ color: colors.alpineWhite, marginBottom: '24px' }}>
          Ready to Transform Your Organization?
        </SectionTitle>
        <IntroText style={{ color: colors.iceBlue, marginBottom: '32px' }}>
          Let's assess your AI readiness and create a strategic roadmap for success.
        </IntroText>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <CTAButton onClick={() => window.location.href = '/contact'}>
            Schedule Your Assessment
          </CTAButton>
          <DownloadButton href="/6A framework SherpaTech.pdf" download style={{ background: colors.alpineWhite, color: colors.navyBlue }}>
            Download Framework PDF
          </DownloadButton>
        </div>
      </CTASection>

      {selectedPhase && (
        <DetailModal onClick={closeModal}>
          <DetailContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>×</CloseButton>
            
            <DetailTitle>Phase {selectedPhase.number}: {selectedPhase.name}</DetailTitle>
            <DetailSubtitle>{selectedPhase.title}</DetailSubtitle>
            <PhaseDuration style={{ fontSize: '1.1rem', marginBottom: '32px' }}>
              ⏱️ Duration: {selectedPhase.duration}
            </PhaseDuration>
            
            <DetailSection>
              <p style={{ fontSize: '1.1rem', color: colors.mountainBlue, lineHeight: 1.7 }}>
                {selectedPhase.description}
              </p>
            </DetailSection>

            <DetailSection>
              <DetailSectionTitle>Key Activities</DetailSectionTitle>
              <DetailList>
                {selectedPhase.keyActivities.map((activity, index) => (
                  <DetailListItem key={index}>{activity}</DetailListItem>
                ))}
              </DetailList>
            </DetailSection>

            <DetailSection>
              <DetailSectionTitle>Deliverables</DetailSectionTitle>
              <DetailList>
                {selectedPhase.deliverables.map((deliverable, index) => (
                  <DetailListItem key={index}>{deliverable}</DetailListItem>
                ))}
              </DetailList>
            </DetailSection>

            <DetailSection>
              <DetailSectionTitle>Success Metrics</DetailSectionTitle>
              <DetailList>
                {selectedPhase.successMetrics.map((metric, index) => (
                  <DetailListItem key={index}>{metric}</DetailListItem>
                ))}
              </DetailList>
            </DetailSection>

            <CTAButton onClick={() => window.location.href = '/contact'} style={{ marginTop: '32px' }}>
              Get Started with Phase {selectedPhase.number}
            </CTAButton>
          </DetailContent>
        </DetailModal>
      )}
    </PageContainer>
  );
};

export default SixAMethod;
