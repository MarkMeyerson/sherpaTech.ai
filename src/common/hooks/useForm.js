import { useState } from 'react';
import { validateForm } from '../utils/validation';

export const useForm = (initialState = {}) => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleSubmit = async (event, submitCallback) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      await submitCallback(formData);
      setSubmissionStatus('success');
      event.target.reset();
    } catch (error) {
      console.error('Form Submission Error:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formErrors,
    isSubmitting,
    submissionStatus,
    handleSubmit
  };
};