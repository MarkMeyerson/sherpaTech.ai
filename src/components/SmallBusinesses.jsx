import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AIImplementationPlan from './AIImplementationPlan';
import ContactForm from './ContactForm';
import AIReadinessAssessment from './AIReadinessAssessment';
import BookingButton from './BookingButton';

const SmallBusinesses = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [submissionStatus, setSubmissionStatus] = useState('');

  // Handle tab selection from URL or state
  useEffect(() => {
    // Check if there's a state passed from another component
    const tabFromState = location.state?.selectedTab;
    if (tabFromState) {
      setActiveTab(tabFromState);
    }
  }, [location.state]);

  // Tab change handler with scroll to top
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Scroll to top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Content for the Overview tab
  const OverviewContent = () => (
    <div>
      {/* Our Approach */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-navy-blue mb-6">Our Phased Approach</h2>
        <p className="text-lg mb-8">
          We guide small businesses through their AI journey like a sherpa - not carrying you up the mountain, 
          but walking alongside you with a map drawn from 30 years of navigating technology transformations.
        </p>

        {/* Phases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Phase 1 */}
          <div className="bg-ice-blue rounded-lg p-6 border-l-4 border-navy-blue shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-navy-blue text-alpine-white flex items-center justify-center font-bold text-lg mr-4">1</div>
              <h3 className="text-xl font-semibold text-navy-blue">Business Owner AI Literacy</h3>
            </div>
            <p className="mb-4">
              A focused course for business owners on AI fundamentals, current capabilities, and strategic applications.
            </p>
            <ul className="list-disc list-inside text-mountain-blue space-y-2">
              <li>Understand AI's potential impact</li>
              <li>Strategize business growth with AI</li>
              <li>Empower leadership decisions</li>
            </ul>
          </div>

          {/* Phase 2 */}
          <div className="bg-ice-blue rounded-lg p-6 border-l-4 border-navy-blue shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-navy-blue text-alpine-white flex items-center justify-center font-bold text-lg mr-4">2</div>
              <h3 className="text-xl font-semibold text-navy-blue">Senior Staff AI Literacy</h3>
            </div>
            <p className="mb-4">
              Equipping your leadership team with the AI knowledge they need to drive adoption and innovation.
            </p>
            <ul className="list-disc list-inside text-mountain-blue space-y-2">
              <li>Department-specific AI applications</li>
              <li>Change management strategies</li>
              <li>Team implementation planning</li>
            </ul>
          </div>

          {/* Phase 3 */}
          <div className="bg-ice-blue rounded-lg p-6 border-l-4 border-navy-blue shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-navy-blue text-alpine-white flex items-center justify-center font-bold text-lg mr-4">3</div>
              <h3 className="text-xl font-semibold text-navy-blue">Needs Assessment & Implementation</h3>
            </div>
            <p className="mb-4">
              Comprehensive evaluation and actionable implementation roadmap for your business.
            </p>
            <ul className="list-disc list-inside text-mountain-blue space-y-2">
              <li>Security & governance framework</li>
              <li>Opportunity identification</li>
              <li>Staff training & deployment plan</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-navy-blue mb-6">Why Take This Journey?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-navy-blue mb-4">Reach New Business Heights</h3>
            <p>
              Implement AI systems that work while you sleep, automating the climb so your business can reach elevations 
              once thought impossible.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-navy-blue mb-4">Navigate With Confidence</h3>
            <p>
              Move forward with a clear map and experienced guide, avoiding common pitfalls and making informed decisions 
              about AI implementation.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-navy-blue mb-4">AI as Your Oxygen Tank</h3>
            <p>
              Harness AI as an essential resource that powers your business journey, not just another heavy tool in your backpack.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-navy-blue mb-4">Freedom to Step Away</h3>
            <p>
              Build a thriving business that gives you the freedom to occasionally step off the mountain entirely—to focus on what matters most.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-deep-navy text-alpine-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Ascent?</h2>
        <p className="text-xl mb-8">
          Take the first step toward AI transformation by exploring our assessment or implementation plan.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => {
              handleTabChange('assessment');
              document.getElementById('assessment-form').scrollIntoView({ behavior: 'smooth' });
            }} 
            className="bg-navy-blue hover:bg-mountain-blue text-alpine-white font-bold py-3 px-8 rounded-lg transition duration-300"
          >
            Take the Assessment
          </button>
          <button 
            onClick={() => handleTabChange('implementation')} 
            className="bg-alpine-white hover:bg-ice-blue text-navy-blue font-bold py-3 px-8 rounded-lg transition duration-300"
          >
            View Implementation Plan
          </button>
        </div>
      </div>
    </div>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    try {
      const response = await fetch('YOUR_EXISTING_FLOW_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          assessment: {
            currentTech: formData.get('currentTech'),
            challenges: formData.get('challenges'),
            goals: formData.get('goals')
          }
        })
      });

      if (response.ok) {
        // Show success message
        setSubmissionStatus('success');
      } else {
        // Show error message
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="bg-pearl-white text-deep-navy">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy-blue to-mountain-blue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-alpine-white mb-4">AI Transformation for Small Businesses</h1>
            <p className="text-xl md:text-2xl text-alpine-white opacity-90">
              Your sherpa-guided journey to conquer the digital mountain without getting lost in the tech wilderness
            </p>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex overflow-x-auto border-b border-ice-blue">
          <button 
            className={`py-2 px-4 font-semibold whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-navy-blue text-navy-blue' : 'text-mountain-blue hover:text-navy-blue'}`}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </button>
          <button 
            className={`py-2 px-4 font-semibold whitespace-nowrap ${activeTab === 'assessment' ? 'border-b-2 border-navy-blue text-navy-blue' : 'text-mountain-blue hover:text-navy-blue'}`}
            onClick={() => handleTabChange('assessment')}
          >
            AI Readiness Assessment
          </button>
          <button 
            className={`py-2 px-4 font-semibold whitespace-nowrap ${activeTab === 'implementation' ? 'border-b-2 border-navy-blue text-navy-blue' : 'text-mountain-blue hover:text-navy-blue'}`}
            onClick={() => handleTabChange('implementation')}
          >
            Implementation Plan
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'overview' && <OverviewContent />}
          {activeTab === 'assessment' && 
            <div id="assessment-form">
              <AIReadinessAssessment />
            </div>
          }
          {activeTab === 'implementation' && <AIImplementationPlan />}
        </div>
      </div>

      {/* Add Booking Button Section */}
      <div className="bg-deep-navy text-alpine-white rounded-lg p-8 text-center mb-16">
        <p className="text-xl mb-8">
          Schedule a free consultation to discuss your business's AI journey.
        </p>
        <BookingButton />
      </div>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default SmallBusinesses;