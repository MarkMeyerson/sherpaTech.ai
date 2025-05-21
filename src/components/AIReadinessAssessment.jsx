import React, { useState } from 'react';

const AIReadinessAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    employeeCount: '',
    techlevel: '',
    priorities: [],
    currentTools: [],
    challenges: '',
    aiGoals: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter(item => item !== value)
      });
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - you can add your logic here
    console.log('Form submitted:', formData);
    // Typically would send to backend or process data
    setCurrentStep(4); // Move to thank you step
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-pearl-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-navy-blue mb-6">AI Readiness Assessment</h2>
      <p className="text-lg mb-8">
        Complete this assessment to help us understand your business needs and prepare your 
        customized AI implementation plan.
      </p>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-ice-blue rounded-full h-2.5">
          <div 
            className="bg-navy-blue h-2.5 rounded-full" 
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-mountain-blue">
          <span className={currentStep >= 1 ? "font-semibold text-navy-blue" : ""}>Business Info</span>
          <span className={currentStep >= 2 ? "font-semibold text-navy-blue" : ""}>Tech Assessment</span>
          <span className={currentStep >= 3 ? "font-semibold text-navy-blue" : ""}>AI Goals</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Business Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-navy-blue font-semibold mb-2">Business Name</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full p-3 border border-mountain-blue rounded-md bg-alpine-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="industry" className="block text-navy-blue font-semibold mb-2">Industry</label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full p-3 border border-mountain-blue rounded-md bg-alpine-white"
                required
              >
                <option value="">Select your industry</option>
                <option value="retail">Retail</option>
                <option value="healthcare">Healthcare</option>
                <option value="financial">Financial Services</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="technology">Technology</option>
                <option value="education">Education</option>
                <option value="hospitality">Hospitality</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="employeeCount" className="block text-navy-blue font-semibold mb-2">Number of Employees</label>
              <select
                id="employeeCount"
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleInputChange}
                className="w-full p-3 border border-mountain-blue rounded-md bg-alpine-white"
                required
              >
                <option value="">Select range</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="bg-navy-blue hover:bg-mountain-blue text-alpine-white font-bold py-2 px-6 rounded-md transition duration-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Technology Assessment */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="techlevel" className="block text-navy-blue font-semibold mb-2">How would you rate your organization's overall technical sophistication?</label>
              <select
                id="techlevel"
                name="techlevel"
                value={formData.techlevel}
                onChange={handleInputChange}
                className="w-full p-3 border border-mountain-blue rounded-md bg-alpine-white"
                required
              >
                <option value="">Select level</option>
                <option value="basic">Basic - We use standard office tools and applications</option>
                <option value="intermediate">Intermediate - We use industry-specific software and have some automation</option>
                <option value="advanced">Advanced - We have custom software solutions and embrace new technologies</option>
                <option value="cutting-edge">Cutting-edge - We're early adopters of emerging technologies</option>
              </select>
            </div>
            
            <div>
              <p className="block text-navy-blue font-semibold mb-2">Which of the following tools does your business currently use? (Select all that apply)</p>
              <div className="space-y-2">
                {['CRM software', 'Project management tools', 'Data analysis tools', 'Cloud services', 'Marketing automation', 'AI/ML technologies', 'None of the above'].map((tool) => (
                  <div key={tool} className="flex items-center">
                    <input
                      type="checkbox"
                      id={tool.replace(/\s+/g, '')}
                      name="currentTools"
                      value={tool}
                      checked={formData.currentTools.includes(tool)}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-5 w-5"
                    />
                    <label htmlFor={tool.replace(/\s+/g, '')}>{tool}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="challenges" className="block text-navy-blue font-semibold mb-2">What are your biggest operational challenges right now?</label>
              <textarea
                id="challenges"
                name="challenges"
                value={formData.challenges}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-3 border border-mountain-blue rounded-md bg-alpine-white"
              ></textarea>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-ice-blue hover:bg-mountain-blue hover:text-alpine-white text-navy-blue font-bold py-2 px-6 rounded-md transition duration-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-navy-blue hover:bg-mountain-blue text-alpine-white font-bold py-2 px-6 rounded-md transition duration-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: AI Goals */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <p className="block text-navy-blue font-semibold mb-2">What are your top priorities for implementing AI? (Select all that apply)</p>
              <div className="space-y-2">
                {[
                  'Improving operational efficiency',
                  'Enhancing customer experience',
                  'Data analysis and insights',
                  'Automating repetitive tasks',
                  'Product/service innovation',
                  'Reducing costs',
                  'Staying competitive'
                ].map((priority) => (
                  <div key={priority} className="flex items-center">
                    <input
                      type="checkbox"
                      id={priority.replace(/\s+/g, '')}
                      name="priorities"
                      value={priority}
                      checked={formData.priorities.includes(priority)}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-5 w-5"
                    />
                    <label htmlFor={priority.replace(/\s+/g, '')}>{priority}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="aiGoals" className="block text-navy-blue font-semibold mb-2">Describe your ideal outcome after implementing AI in your business:</label>
              <textarea
                id="aiGoals"
                name="aiGoals"
                value={formData.aiGoals}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-3 border border-mountain-blue rounded-md bg-alpine-white"
              ></textarea>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-ice-blue hover:bg-mountain-blue hover:text-alpine-white text-navy-blue font-bold py-2 px-6 rounded-md transition duration-300"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-navy-blue hover:bg-mountain-blue text-alpine-white font-bold py-2 px-6 rounded-md transition duration-300"
              >
                Submit Assessment
              </button>
            </div>
          </div>
        )}
        
        {/* Step 4: Thank You */}
        {currentStep === 4 && (
          <div className="text-center py-8">
            <svg className="w-20 h-20 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-2xl font-bold text-navy-blue mb-2">Assessment Received!</h3>
            <p className="text-lg mb-6">
              Thank you for completing our AI Readiness Assessment. Our team of Sherpas will review your 
              information and prepare a personalized consultation to discuss your AI journey.
            </p>
            <p className="font-semibold text-mountain-blue mb-8">
              Watch for an email from us within 1-2 business days to schedule your consultation.
            </p>
            <button
              type="button"
              className="bg-navy-blue hover:bg-mountain-blue text-alpine-white font-bold py-2 px-6 rounded-md transition duration-300"
              onClick={() => window.location.href = '/resources'}
            >
              Explore AI Resources While You Wait
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AIReadinessAssessment;