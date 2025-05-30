import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CTAButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const TrainingPlan = () => {
  return (
    <div className="min-h-screen bg-pearl-white text-deep-navy">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-mountain-blue to-navy-blue">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-alpine-white mb-4 font-inter">
            5-Week AI Mastery Training
          </h1>
          <p className="text-2xl text-ice-blue mb-8 font-open-sans">
            Your guided expedition to AI proficiency in just 5 hours per week
          </p>
          <div className="bg-ice-blue bg-opacity-10 border border-alpine-white border-opacity-20 p-6 rounded-lg inline-block">
            <p className="text-alpine-white text-lg font-open-sans">
              <strong>Commitment:</strong> 5 hours/week for 5 weeks<br />
              <strong>Structure:</strong> 1-hour intake + five 30-minute weekly sessions + guided practice<br />
              <strong>Outcome:</strong> Master the art of prompting and create your own AI agent
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-6 font-inter">The Journey Overview</h2>
          <p className="text-lg mb-8 font-open-sans">
            At SherpaTech.ai, we believe small business owners deserve to conquer the digital
            mountain without getting lost in the tech wilderness. Our 5-Week AI Mastery Training
            is designed as your expedition map—providing clear guidance, practical tools, and
            expert support to navigate the AI landscape with confidence.
          </p>
          <div className="bg-ice-blue p-8 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-navy-blue mb-4 font-inter">Why This Training Works</h3>
            <ul className="space-y-3 font-open-sans">
              <li className="flex items-start">
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong>Structured Approach:</strong> A clear path with weekly milestones and actionable steps</span>
              </li>
              <li className="flex items-start">
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong>Expert Guidance:</strong> Leverage our 30 years of technology experience</span>
              </li>
              <li className="flex items-start">
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong>Personalized Journey:</strong> Tailored to your specific goals and business needs</span>
              </li>
              <li className="flex items-start">
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong>Practical Application:</strong> Focus on real-world implementation, not just theory</span>
              </li>
              <li className="flex items-start">
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong>Ongoing Support:</strong> Guidance between sessions to ensure your success</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Training Structure Section */}
      <section className="py-16 bg-ice-blue">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-blue mb-12 text-center font-inter">Your 5-Week AI Mastery Journey</h2>
            <div className="mb-16">
              <div className="bg-alpine-white rounded-lg p-8 shadow-md relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-navy-blue text-alpine-white text-xl font-bold py-3 px-6 rounded-full font-inter">
                  Intake Session
                </div>
                <h3 className="text-2xl font-semibold text-navy-blue mt-6 mb-4 font-inter">1-Hour Personalized Intake</h3>
                <p className="text-mountain-blue mb-6 font-open-sans">
                  We begin with a comprehensive assessment of your goals, current AI knowledge, and specific business needs to create your customized learning path.
                </p>
                <div className="border-l-4 border-mountain-blue pl-4 py-2">
                  <h4 className="font-semibold text-navy-blue font-inter">What to expect:</h4>
                  <ul className="space-y-2 mt-2 font-open-sans">
                    <li>Detailed discussion of your business and how AI can enhance it</li>
                    <li>Assessment of your current AI knowledge and technical comfort</li>
                    <li>Identification of specific AI applications relevant to your goals</li>
                    <li>Creation of your personalized 5-week learning roadmap</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              {/* Week 1 */}
              <div className="relative z-10 md:flex items-center mb-12">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">1</div>
                <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                  <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                  <h3 className="text-xl font-semibold text-navy-blue font-inter">AI Foundations & Prompt Basics</h3>
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <div className="bg-alpine-white rounded-lg p-6 shadow-md">
                    <div className="md:hidden mb-4">
                      <p className="text-mountain-blue font-open-sans">Establish core knowledge about AI capabilities and limitations, and learn the fundamentals of effective prompting.</p>
                    </div>
                    <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                    <ul className="space-y-1 font-open-sans">
                      <li>• Understanding AI strengths and limitations</li>
                      <li>• Basic prompt structure and components</li>
                      <li>• The art of clear instruction writing</li>
                      <li>• Applying these skills to a real business task</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Week 2 */}
              <div className="relative z-10 md:flex items-center mb-12">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">2</div>
                <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0 md:order-1">
                  <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                  <h3 className="text-xl font-semibold text-navy-blue font-inter">Advanced Prompting Techniques</h3>
                </div>
                <div className="md:w-1/2 md:pl-8 md:order-0">
                  <div className="bg-alpine-white rounded-lg p-6 shadow-md">
                    <div className="md:hidden mb-4">
                      <p className="text-mountain-blue font-open-sans">Elevate your prompting skills with advanced techniques for more powerful and precise AI interactions.</p>
                    </div>
                    <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                    <ul className="space-y-1 font-open-sans">
                      <li>• Role and context setting in prompts</li>
                      <li>• Using examples for better results (few-shot prompting)</li>
                      <li>• Breaking complex tasks into manageable steps</li>
                      <li>• Creating prompt templates for consistent results</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Week 3 */}
              <div className="relative z-10 md:flex items-center mb-12">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">3</div>
                <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                  <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                  <h3 className="text-xl font-semibold text-navy-blue font-inter">AI Tools & Integrations</h3>
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <div className="bg-alpine-white rounded-lg p-6 shadow-md">
                    <div className="md:hidden mb-4">
                      <p className="text-mountain-blue font-open-sans">Discover how to connect AI capabilities with your existing workflows and business systems.</p>
                    </div>
                    <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                    <ul className="space-y-1 font-open-sans">
                      <li>• Navigating the AI tool ecosystem</li>
                      <li>• Selecting the right tools for your business needs</li>
                      <li>• Integrating AI capabilities into existing workflows</li>
                      <li>• Setting up your first automation with AI</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Week 4 */}
              <div className="relative z-10 md:flex items-center mb-12">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">4</div>
                <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0 md:order-1">
                  <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                  <h3 className="text-xl font-semibold text-navy-blue font-inter">AI Agent Planning & Design</h3>
                </div>
                <div className="md:w-1/2 md:pl-8 md:order-0">
                  <div className="bg-alpine-white rounded-lg p-6 shadow-md">
                    <div className="md:hidden mb-4">
                      <p className="text-mountain-blue font-open-sans">Begin creating your customized AI agent by defining its purpose, capabilities, and interaction model.</p>
                    </div>
                    <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                    <ul className="space-y-1 font-open-sans">
                      <li>• Identifying the perfect use case for your AI agent</li>
                      <li>• Designing conversation flows and user interactions</li>
                      <li>• Planning knowledge requirements and data sources</li>
                      <li>• Creating a development roadmap for your agent</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Week 5 */}
              <div className="relative z-10 md:flex items-center">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">5</div>
                <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                  <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                  <h3 className="text-xl font-semibold text-navy-blue font-inter">Agent Creation & Deployment</h3>
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <div className="bg-alpine-white rounded-lg p-6 shadow-md">
                    <div className="md:hidden mb-4">
                      <p className="text-mountain-blue font-open-sans">Build and launch your personalized AI agent to solve real business challenges.</p>
                    </div>
                    <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                    <ul className="space-y-1 font-open-sans">
                      <li>• Building your agent using the right platform</li>
                      <li>• Writing effective agent instructions</li>
                      <li>• Testing and refining your agent's performance</li>
                      <li>• Deployment and integration into your workflow</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-6 font-inter">Ready to Begin Your AI Journey?</h2>
          <p className="text-xl text-mountain-blue mb-8 font-open-sans">
            Take the first step toward AI mastery with a personalized consultation to discuss your goals and how our
            5-Week AI Mastery Training can help you achieve them.
          </p>
          <div className="mt-8">
            <CTAButton to="/training/ai-course">
              Start Your AI Training Journey
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Add a call-to-action button to start the training */}
      <section className="py-8 text-center">
        <CTAButton to="/training-app" style={{ backgroundColor: '#007BFF', color: '#FFFFFF' }}>
          Start Training
        </CTAButton>
      </section>
    </div>
  );
};

export default TrainingPlan;
