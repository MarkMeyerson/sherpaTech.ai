import { API_ENDPOINTS } from './constants';
import React from 'react';
import { SubmissionStatus } from '@/features/contact/ContactForm.types';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  source: string;
}

export const submitContactForm = async (data: ContactFormData): Promise<Response> => {
  const response = await fetch(`${API_ENDPOINTS.CONTACT_FORM}?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SRYK6PqnPhUfNeMMW8oZp705-GAHg07Fonj6hdMdkos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

interface FormStatusProps {
  status: SubmissionStatus;
  className?: string;
}

export const FormStatus: React.FC<FormStatusProps> = ({ status, className }) => {
  if (status === 'idle') return null;

  const statusMessages = {
    submitting: 'Sending...',
    success: 'Message sent successfully!',
    error: 'Failed to send message. Please try again.'
  };

  const statusStyles = {
    submitting: 'text-blue-600',
    success: 'text-green-600',
    error: 'text-red-600'
  };

  return (
    <div className={`${statusStyles[status]} ${className}`} role="status">
      {statusMessages[status]}
    </div>
  );
};