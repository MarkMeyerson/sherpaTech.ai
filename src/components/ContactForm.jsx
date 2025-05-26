/**
 * ContactForm component for handling user inquiries
 * @param {Object} props
 * @param {function} props.onSubmit - Form submission handler
 * @param {boolean} props.isLoading - Loading state of the form
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ContactForm = ({ onSubmit, isLoading }) => {
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Validation function
  const validateForm = (formData) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name validation
    if (!formData.get('name') || formData.get('name').trim() === '') {
      errors.name = 'Name is required';
    }

    // Email validation
    const email = formData.get('email');
    if (!email || email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }

    // Message validation
    if (!formData.get('message') || formData.get('message').trim() === '') {
      errors.message = 'Message is required';
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    // Clear previous errors
    setFormErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('https://prod-32.westus.logic.azure.com:443/workflows/de85654dcff04825bb9a39d632ec4a20/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SRYK6PqnPhUfNeMMW8oZp705-GAHg07Fonj6hdMdkos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          source: window.location.pathname
        })
      });

      // Log submission details for tracking
      console.log('Form Submission:', {
        status: response.status,
        url: window.location.pathname
      });

      if (response.ok) {
        setSubmissionStatus('success');
        event.target.reset();
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
      console.error('Form Submission Error:', {
        message: error.message,
        stack: error.stack,
        url: window.location.pathname
      });
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-ice-blue p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-navy-blue mb-6 text-center">Contact Us</h2>
      
      {/* Success and Error Messages */}
      {submissionStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Thank you for reaching out! We'll get back to you soon.
        </div>
      )}
      {submissionStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          There was an error submitting your message. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-navy-blue mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full p-2 border rounded ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-navy-blue mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full p-2 border rounded ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* Message Input */}
        <div>
          <label htmlFor="message" className="block text-navy-blue mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className={`w-full p-2 border rounded ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
          ></textarea>
          {formErrors.message && (
            <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-navy-blue hover:bg-mountain-blue text-alpine-white font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-alpine-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default ContactForm;