import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AIReadinessAssessment = ({ onSubmit, submissionStatus, isSubmitting }) => {
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
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear any existing error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
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

  const validateStep = () => {
    const errors = {};

    if (currentStep === 1) {
      // Validate first step
      if (!formData.businessName || formData.businessName.trim() === '') {
        errors.businessName = 'Business Name is required';
      }
      if (!formData.industry) {
        errors.industry = 'Industry is required';
      }
      if (!formData.employeeCount) {
        errors.employeeCount = 'Number of Employees is required';
      }
    } else if (currentStep === 2) {
      // Validate second step
      if (!formData.techlevel) {
        errors.techlevel = 'Technology level is required';
      }
    } else if (currentStep === 3) {
      // Validate third step
      if (formData.priorities.length === 0) {
        errors.priorities = 'Please select at least one priority';
      }
      if (!formData.aiGoals || formData.aiGoals.trim() === '') {
        errors.aiGoals = 'Please describe your AI goals';
      }
    }

    return errors;
  };

  const nextStep = () => {
    const stepErrors = validateStep();
    
    if (Object.keys(stepErrors).length > 0) {
      setFormErrors(stepErrors);
      return;
    }

    // Clear previous errors
    setFormErrors({});
    
    // Move to next step
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate final step
    const finalStepErrors = validateStep();
    
    if (Object.keys(finalStepErrors).length > 0) {
      setFormErrors(finalStepErrors);
      return;
    }

    // Call the passed onSubmit function from parent
    onSubmit(e);
    
    // Set success state to display thank you
    setCurrentStep(4);
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

      {/* Submission Status */}
      {submissionStatus === 'success' && currentStep !== 4 && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Thank you for completing the AI Readiness Assessment! Our team will review your information.
        </div>
      )}
      {submissionStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          There was an error submitting your assessment. Please try again.
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Step 1: Business Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-navy-blue font-semibold mb-2">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded ${formErrors.businessName ? 'border-red-500' : 'border-mountain-blue'} bg-alpine-white`}
              />
              {formErrors.businessName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.businessName}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="industry" className="block text-navy-blue font-semibold mb-2">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded ${formErrors.industry ? 'border-red-500' : 'border-mountain-blue'} bg-alpine-white`}
              >
                <option value="">Select your industry</option>
                <option value="retail">Retail</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance & Banking</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="technology">Technology</option>
                <option value="education">Education</option>
                <option value="hospitality">Hospitality & Tourism</option>
                <option value="realEstate">Real Estate</option>
                <option value="construction">Construction</option>
                <option value="professional">Professional Services</option>
                <option value="other">Other</option>
              </select>
              {formErrors.industry && (
                <p className="text-red-500 text-sm mt-1">{formErrors.industry}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="employeeCount" className="block text-navy-blue font-semibold mb-2">
                Number of Employees
              </label>
              <select
                id="employeeCount"
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded ${formErrors.employeeCount ? 'border-red-500' : 'border-mountain-blue'} bg-alpine-white`}
              >
                <option value="">Select employee count</option>
                <option value="1-5">1-5</option>
                <option value="6-20">6-20</option>
                <option value="21-50">21-50</option>
                <option value="51-100">51-100</option>
                <option value="101-250">101-250</option>
                <option value="250+">250+</option>
              </select>
              {formErrors.employeeCount && (
                <p className="text-red-500 text-sm mt-1">{formErrors.employeeCount}</p>
              )}
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
              <p className="block text-navy-blue font-semibold mb-2">
                How would you describe your organization's current technology level?
              </p>
              <div className="space-y-2">
                {[
                  { value: 'basic', label: 'Basic - Using essential tools like email and office software' },
                  { value: 'intermediate', label: 'Intermediate - Using some cloud services and specialized software' },
                  { value: 'advanced', label: 'Advanced - Implemented various digital systems and automation' },
                  { value: 'innovative', label: 'Innovative - Already using some AI tools or advanced analytics' }
                ].map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={option.value}
                      name="techlevel"
                      value={option.value}
                      checked={formData.techlevel === option.value}
                      onChange={handleInputChange}
                      className="mr-2 h-5 w-5"
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                  </div>
                ))}
              </div>
              {formErrors.techlevel && (
                <p className="text-red-500 text-sm mt-1">{formErrors.techlevel}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="currentTools" className="block text-navy-blue font-semibold mb-2">
                What technology tools is your business currently using? (Select all that apply)
              </label>
              <div className="space-y-2">
                {[
                  'CRM system',
                  'Cloud storage/services',
                  'Project management software',
                  'Accounting software',
                  'Marketing automation',
                  'E-commerce platform',
                  'Video conferencing',
                  'Data analytics tools',
                  'AI-powered tools'
                ].map((tool) => (
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
              <label htmlFor="challenges" className="block text-navy-blue font-semibold mb-2">
                What are your biggest technology or operational challenges right now?
              </label>
              <textarea
                id="challenges"
                name="challenges"
                value={formData.challenges}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-3 border rounded border-mountain-blue bg-alpine-white"
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
              <p className="block text-navy-blue font-semibold mb-2">
                What are your top priorities for implementing AI? (Select all that apply)
              </p>
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
              {formErrors.priorities && (
                <p className="text-red-500 text-sm mt-1">{formErrors.priorities}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="aiGoals" className="block text-navy-blue font-semibold mb-2">
                Describe your ideal outcome after implementing AI in your business:
              </label>
              <textarea
                id="aiGoals"
                name="aiGoals"
                value={formData.aiGoals}
                onChange={handleInputChange}
                rows="4"
                className={`w-full p-3 border rounded ${formErrors.aiGoals ? 'border-red-500' : 'border-mountain-blue'} bg-alpine-white`}
              ></textarea>
              {formErrors.aiGoals && (
                <p className="text-red-500 text-sm mt-1">{formErrors.aiGoals}</p>
              )}
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
                disabled={isSubmitting}
                className="bg-navy-blue hover:bg-mountain-blue text-alpine-white font-bold py-2 px-6 rounded-md transition duration-300 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-alpine-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Assessment'
                )}
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

AIReadinessAssessment.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

AIReadinessAssessment.defaultProps = {
  isLoading: false
};

export default AIReadinessAssessment;