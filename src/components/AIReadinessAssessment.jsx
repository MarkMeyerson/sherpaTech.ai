import React, { useState } from 'react';

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
      {submissionStatus === 'success' && (
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
        {/* Previous steps remain the same */}
        {/* ... (previous step 1 and step 2 code) ... */}
        
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

export default AIReadinessAssessment;