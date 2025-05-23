import { useState } from 'react';

export default function SmallBusinesses() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-[#F7FAFC] py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1B365D] mb-4">Small Business AI Solutions</h1>
          <p className="text-xl text-[#2B517A] max-w-3xl mx-auto">
            Practical AI implementation strategies to help your small business thrive in the digital age.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-[#2B517A] mb-8">
          <button
            className={`py-3 px-6 font-semibold ${
              activeTab === 'overview'
                ? 'text-[#1B365D] border-b-2 border-[#1B365D]'
                : 'text-[#2B517A] hover:text-[#1B365D]'
            }`}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </button>
          <button
            className={`py-3 px-6 font-semibold ${
              activeTab === 'assessment'
                ? 'text-[#1B365D] border-b-2 border-[#1B365D]'
                : 'text-[#2B517A] hover:text-[#1B365D]'
            }`}
            onClick={() => handleTabChange('assessment')}
          >
            AI Readiness Assessment
          </button>
          <button
            className={`py-3 px-6 font-semibold ${
              activeTab === 'implementation'
                ? 'text-[#1B365D] border-b-2 border-[#1B365D]'
                : 'text-[#2B517A] hover:text-[#1B365D]'
            }`}
            onClick={() => handleTabChange('implementation')}
          >
            Implementation Plan
          </button>
          <button
            className={`py-3 px-6 font-semibold ${
              activeTab === 'contact'
                ? 'text-[#1B365D] border-b-2 border-[#1B365D]'
                : 'text-[#2B517A] hover:text-[#1B365D]'
            }`}
            onClick={() => handleTabChange('contact')}
          >
            Contact Us
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div>
              {/* Our Approach */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-[#1B365D] mb-6">Our Phased Approach</h2>
                <p className="text-lg mb-8">
                  We guide small businesses through their AI journey like a sherpa - not carrying you up the mountain, 
                  but walking alongside you with a map drawn from 30 years of navigating technology transformations.
                </p>

                {/* Phases */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Phase 1 */}
                  <div className="bg-[#E8EEF4] rounded-lg p-6 border-l-4 border-[#1B365D] shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#1B365D] text-[#FFFFFF] flex items-center justify-center font-bold text-lg mr-4">1</div>
                      <h3 className="text-xl font-semibold text-[#1B365D]">Business Owner AI Literacy</h3>
                    </div>
                    <p className="mb-4">
                      A focused course for business owners on AI fundamentals, current capabilities, and strategic applications.
                    </p>
                    <ul className="list-disc list-inside text-[#2B517A] space-y-2">
                      <li>Understand AI&apos;s potential impact</li>
                      <li>Strategize business growth with AI</li>
                      <li>Empower leadership decisions</li>
                    </ul>
                  </div>

                  {/* Phase 2 */}
                  <div className="bg-[#E8EEF4] rounded-lg p-6 border-l-4 border-[#1B365D] shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#1B365D] text-[#FFFFFF] flex items-center justify-center font-bold text-lg mr-4">2</div>
                      <h3 className="text-xl font-semibold text-[#1B365D]">Senior Staff AI Literacy</h3>
                    </div>
                    <p className="mb-4">
                      Equipping your leadership team with the AI knowledge they need to drive adoption and innovation.
                    </p>
                    <ul className="list-disc list-inside text-[#2B517A] space-y-2">
                      <li>Department-specific AI applications</li>
                      <li>Change management strategies</li>
                      <li>Team implementation planning</li>
                    </ul>
                  </div>

                  {/* Phase 3 */}
                  <div className="bg-[#E8EEF4] rounded-lg p-6 border-l-4 border-[#1B365D] shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#1B365D] text-[#FFFFFF] flex items-center justify-center font-bold text-lg mr-4">3</div>
                      <h3 className="text-xl font-semibold text-[#1B365D]">Needs Assessment & Implementation</h3>
                    </div>
                    <p className="mb-4">
                      Comprehensive evaluation and actionable implementation roadmap for your business.
                    </p>
                    <ul className="list-disc list-inside text-[#2B517A] space-y-2">
                      <li>Security & governance framework</li>
                      <li>Opportunity identification</li>
                      <li>Staff training & deployment plan</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
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
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-[#1B365D] mb-4">AI as Your Oxygen Tank</h3>
                    <p>
                      Harness AI as an essential resource that powers your business journey, not just another heavy tool in your backpack.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-[#1B365D] mb-4">Reclaim Your Freedom</h3>
                    <p>
                      Create systems that give you the freedom to occasionally step off the mountain entirely—to spend time with those 
                      who matter most or simply catch your breath.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-[#152A4A] text-[#FFFFFF] p-8 rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
                <p className="text-lg mb-6">
                  Take the first step toward transforming your business with AI. Schedule a free consultation 
                  or complete our AI Readiness Assessment.
                </p