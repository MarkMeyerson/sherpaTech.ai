import { useState } from 'react';
import BookingButton from './BookingButton';
import HubSpotContactForm from './HubSpotContactForm';
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Add animation keyframes
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(236,72,153,0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(236,72,153,0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(236,72,153,0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const AssessmentButton = styled(Link)`
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  color: white;
  padding: 1.25rem 2.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.25rem;
  display: inline-block;
  position: relative;
  margin: 1rem;
  transition: all 0.3s ease-in-out;
  animation: ${float} 3s ease-in-out infinite;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 20px 40px rgba(124, 58, 237, 0.3);
    animation: ${pulse} 2s infinite;
  }

  &:before {
    content: '';
    position: absolute;
    inset: -3px;
    background: linear-gradient(60deg, #4F46E5, #EC4899, #7C3AED);
    border-radius: 14px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover:before {
    opacity: 1;
  }
`;

// Add a container for better positioning
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 2rem 0;
`;

const AssessmentContent = styled.div`
  max-width: 4xl;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1B365D;
  margin-bottom: 1rem;
`;

const SectionText = styled.p`
  font-size: 1.125rem;
  color: #2B517A;
  margin-bottom: 1.5rem;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ListItem = styled.div`
  background: #E8EEF4;
  border-left: 4px solid #1B365D;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ListItemTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1B365D;
  margin-bottom: 0.5rem;
`;

const ListItemText = styled.p`
  color: #2B517A;
`;

const ButtonContainerAssessment = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

export default function SmallBusinesses() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-pearl-white">
      {/* Hero Section with prominent assessment button */}
      <section className="py-16 bg-gradient-to-b from-navy-blue to-mountain-blue">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-alpine-white mb-6">
            AI Solutions for Small Businesses
          </h1>
          <p className="text-xl text-ice-blue mb-8 max-w-2xl mx-auto">
            Discover how AI can transform your business operations and drive growth
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1B365D] mb-4">Small Business AI Solutions</h1>
          <p className="text-xl text-[#2B517A] max-w-3xl mx-auto">
            Practical AI implementation strategies to help your small business thrive in the digital age.
          </p>
        </div>

        <div className="flex flex-wrap border-b border-[#2B517A] mb-8">
          <button
            className={activeTab === 'overview'
              ? 'py-3 px-6 font-semibold text-[#1B365D] border-b-2 border-[#1B365D]'
              : 'py-3 px-6 font-semibold text-[#2B517A] hover:text-[#1B365D]'}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </button>
          <button
            className={activeTab === 'assessment'
              ? 'py-3 px-6 font-semibold text-[#1B365D] border-b-2 border-[#1B365D]'
              : 'py-3 px-6 font-semibold text-[#2B517A] hover:text-[#1B365D]'}
            onClick={() => handleTabChange('assessment')}
          >
            AI Readiness Assessment
          </button>
          <button
            className={activeTab === 'implementation'
              ? 'py-3 px-6 font-semibold text-[#1B365D] border-b-2 border-[#1B365D]'
              : 'py-3 px-6 font-semibold text-[#2B517A] hover:text-[#1B365D]'}
            onClick={() => handleTabChange('implementation')}
          >
            Implementation Plan
          </button>
          <button
            className={activeTab === 'contact'
              ? 'py-3 px-6 font-semibold text-[#1B365D] border-b-2 border-[#1B365D]'
              : 'py-3 px-6 font-semibold text-[#2B517A] hover:text-[#1B365D]'}
            onClick={() => handleTabChange('contact')}
          >
            Contact Us
          </button>
        </div>

        {activeTab === 'overview' && (
          <div>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-[#1B365D] mb-6">Our Phased Approach</h2>
              <p className="text-lg mb-8">
                We guide small businesses through their AI journey like a sherpa - not carrying you up the mountain,
                but walking alongside you with a map drawn from 30 years of navigating technology transformations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#E8EEF4] rounded-lg p-6 border-l-4 border-[#1B365D] shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#1B365D] text-[#FFFFFF] flex items-center justify-center font-bold text-lg mr-4">1</div>
                    <h3 className="text-xl font-semibold text-[#1B365D]">Business Owner AI Literacy</h3>
                  </div>
                  <p className="mb-4">
                    A focused course for business owners on AI fundamentals, current capabilities, and strategic applications.
                  </p>
                </div>

                <div className="bg-[#E8EEF4] rounded-lg p-6 border-l-4 border-[#1B365D] shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#1B365D] text-[#FFFFFF] flex items-center justify-center font-bold text-lg mr-4">2</div>
                    <h3 className="text-xl font-semibold text-[#1B365D]">Senior Staff AI Literacy</h3>
                  </div>
                  <p className="mb-4">
                    Equipping your leadership team with the AI knowledge they need to drive adoption and innovation.
                  </p>
                </div>

                <div className="bg-[#E8EEF4] rounded-lg p-6 border-l-4 border-[#1B365D] shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#1B365D] text-[#FFFFFF] flex items-center justify-center font-bold text-lg mr-4">3</div>
                    <h3 className="text-xl font-semibold text-[#1B365D]">Needs Assessment & Implementation</h3>
                  </div>
                  <p className="mb-4">
                    Comprehensive evaluation and actionable implementation roadmap for your business.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold text-[#1B365D] mb-6">Why Take This Journey?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-[#1B365D] mb-4">Reach New Business Heights</h3>
                  <p>
                    Implement AI systems that work while you sleep, automating the climb so your business can reach elevations
                    once thought impossible.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-[#1B365D] mb-4">Navigate With Confidence</h3>
                  <p>
                    Move forward with a clear map and experienced guide, avoiding common pitfalls and making informed decisions
                    about AI implementation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assessment' && (
          <AssessmentContent>
            <div className="text-center mb-8">
              <SectionTitle>AI Readiness Assessment</SectionTitle>
              <ButtonContainerAssessment>
                <AssessmentButton to="/assessment">
                  Start Your Assessment
                </AssessmentButton>
              </ButtonContainerAssessment>
            </div>

            <SectionText>
              Our AI Readiness Assessment helps you understand where your business stands in terms of AI adoption potential
              and identifies key opportunities for implementation.
            </SectionText>

            <div className="bg-[#E8EEF4] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#1B365D] mb-4">What You Will Learn</h3>
              <p className="mb-6">
                The assessment provides insights into your organization's AI readiness, key opportunity areas,
                potential roadblocks, and recommended next steps tailored to your business.
              </p>
            </div>
          </AssessmentContent>
        )}

        {activeTab === 'implementation' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1B365D] mb-6">AI Implementation Plan</h2>
            <p className="text-lg mb-8">
              Our structured approach ensures a successful AI integration for your small business,
              focusing on practical solutions with measurable results.
            </p>

            <div className="space-y-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="bg-[#1B365D] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1B365D] mb-3">Discovery & Assessment</h3>
                    <p className="mb-3">We begin with a comprehensive evaluation of your business operations, challenges, and goals.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="bg-[#1B365D] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1B365D] mb-3">Strategy Development</h3>
                    <p className="mb-3">We create a tailored AI implementation roadmap aligned with your business objectives.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="bg-[#1B365D] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1B365D] mb-3">Implementation & Integration</h3>
                    <p className="mb-3">We execute the plan with minimal disruption to your current operations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <HubSpotContactForm className="mb-6" />
            <div className="mt-4 text-center">
              <p className="text-gray-600 mb-4">Prefer to book a consultation directly?</p>
              <BookingButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}