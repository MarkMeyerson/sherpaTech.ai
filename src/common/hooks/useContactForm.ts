import { useState } from 'react';
import { ContactFormData } from '@/features/contact/services/contactForm.service';
import { FormErrors, SubmissionStatus } from '@/features/contact/ContactForm.types';

export const useContactForm = () => {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (data: ContactFormData): FormErrors => {
    const newErrors: FormErrors = {};
    if (!data.name?.trim()) newErrors.name = 'Name is required';
    if (!data.email?.trim()) newErrors.email = 'Email is required';
    if (!data.message?.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    const validationErrors = validateForm(data);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      return false;
    }

    try {
      await ContactFormService.submit(data);
      setStatus('success');
      return true;
    } catch (error) {
      setStatus('error');
      return false;
    }
  };

  return { status, errors, handleSubmit };
};