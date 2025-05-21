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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Validation function for assessment form
  const validateAssessmentForm = (formData) => {
    const errors = {};

    // Business Name validation
    if (!formData.get('businessName') || formData.get('businessName').trim() === '') {
      errors.businessName = 'Business Name is required';
    }

    // Industry validation
    if (!formData.get('industry') || formData.get('industry') === '') {
      errors.industry = 'Industry is required';
    }

    // Employee Count validation
    if (!formData.get('employeeCount') || formData.get('employeeCount') === '') {
      errors.employeeCount = 'Number of Employees is required';
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    
    try {
      // Validate form data
      const validationErrors = validateAssessmentForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        console.error('Form Validation Errors:', validationErrors);
        setSubmissionStatus('error');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('https://prod-32.westus.logic.azure.com:443/workflows/de85654dcff04825bb9a39d632ec4a20/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SRYK6PqnPhUfNeMMW8oZp705-GAHg07Fonj6hdMdkos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('businessName'),
          email: formData.get('email') || 'not_provided@example.com',
          company: formData.get('businessName'),
          assessment: {
            industry: formData.get('industry'),
            employeeCount: formData.get('employeeCount'),
            techLevel: formData.get('techlevel'),
            currentTools: formData.get('currentTools') || [],
            challenges: formData.get('challenges') || '',
            aiGoals: formData.get('aiGoals') || ''
          }
        })
      });

      // Log submission details for tracking
      console.log('Assessment Submission:', {
        status: response.status,
        businessName: formData.get('businessName'),
        url: window.location.pathname
      });

      if (response.ok) {
        // Show success message
        setSubmissionStatus('success');
      } else {
        // Log error details
        console.error('Submission Failed:', {
          status: response.status,
          statusText: response.statusText
        });
        setSubmissionStatus('error');
      }
    } catch (error) {
      // Detailed error logging
      console.error('Assessment Submission Error:', {
        message: error.message,
        stack: error.stack,
        url: window.location.pathname
      });
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of the component remains the same as the previous version
  // ... (previous OverviewContent and return statement)

  return (
    <div className="bg-pearl-white text-deep-navy">
      {/* Existing content... */}
      
      {/* Tab Content */}
      <div className="py-8">
        {activeTab === 'overview' && <OverviewContent />}
        {activeTab === 'assessment' && 
          <div id="assessment-form">
            <AIReadinessAssessment 
              onSubmit={handleSubmit} 
              submissionStatus={submissionStatus}
              isSubmitting={isSubmitting}
            />
          </div>
        }
        {activeTab === 'implementation' && <AIImplementationPlan />}
      </div>

      {/* Rest of the component remains the same */}
    </div>
  );
};

export default SmallBusinesses;