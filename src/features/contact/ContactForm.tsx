import { useContactForm } from '@/common/hooks/useContactForm';
import { FormStatus } from '@/common/components/FormStatus';

export const ContactForm: React.FC = () => {
  const { status, errors, handleSubmit } = useContactForm();

  return (
    <form 
      onSubmit={handleSubmit}
      aria-label="Contact form"
      noValidate
    >
      <div role="group" aria-labelledby="personal-info">
        <h2 id="personal-info" className="sr-only">Personal Information</h2>
        {/* ...existing form fields with aria-invalid and aria-describedby... */}
      </div>
      
      <FormStatus 
        status={status}
        className="mt-4"
        messages={{
          success: 'Thank you for your message. We will get back to you soon!',
          error: 'Sorry, there was a problem sending your message. Please try again.'
        }}
      />
    </form>
  );
};