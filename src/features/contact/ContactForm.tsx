import { FormStatus } from '@/common/components/FormStatus';
import { useState } from 'react';

export default function ContactForm() {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // ...existing form submission logic...
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ...existing form fields... */}
      
      <FormStatus 
        status={submissionStatus}
        className="mt-4"
        messages={{
          success: 'Thank you for your message. We will get back to you soon!',
          error: 'Sorry, there was a problem sending your message. Please try again.'
        }}
      />
    </form>
  );
}