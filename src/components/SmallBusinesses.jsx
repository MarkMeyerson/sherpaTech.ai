import { useState } from 'react';

export default function SmallBusinesses() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-[#F7FAFC] py-12">
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
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-[#1B365D] mb-6">AI Readiness Assessment</h2>
            <p className="text-lg mb-8">
              Our AI Readiness Assessment helps you understand where your business stands in terms of AI adoption potential 
              and identifies key opportunities for implementation.
            </p>
            
            <div className="bg-[#E8EEF4] p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-[#1B365D] mb-4">What You Will Learn</h3>
              <p>
                The assessment provides insights into your organization's AI readiness, key opportunity areas,
                potential roadblocks, and recommended next steps tailored to your business.
              </p>
            </div>
            
            <div className="text-center">
              <button className="bg-[#1B365D] hover:bg-[#2B517A] text-[#FFFFFF] font-bold py-3 px-8 rounded-md transition duration-300">
                Start Your Assessment
              </button>
            </div>
          </div>
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
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-[#1B365D] mb-6">Contact Us</h2>
            <p className="text-lg mb-8">
              Have questions about how we can help your small business leverage AI? Reach out to us.
            </p>
            
            <div className="space-y-8">
              <div className="bg-[#E8EEF4] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1B365D] mb-4">Schedule a Consultation</h3>
                <p className="mb-4">
                  Book a free 30-minute consultation with one of our AI Sherpas to discuss your business needs.
                </p>
                <button className="bg-[#1B365D] hover:bg-[#2B517A] text-[#FFFFFF] font-bold py-2 px-4 rounded-md transition duration-300">
                  Book Now
                </button>
              </div>
              
              <div className="bg-[#E8EEF4] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1B365D] mb-4">Email Us</h3>
                <p className="mb-4">
                  Send us an email with your questions or inquiries and we will respond within 24 hours.
                </p>
                <p className="text-[#2B517A] font-semibold">
                  info@sherpatech.ai
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}