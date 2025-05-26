export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactFormProps {
  /** Handler for form submission */
  onSubmit: (data: FormData) => Promise<void>;
  /** Loading state of the form */
  isLoading?: boolean;
  /** Optional className for styling */
  className?: string;
  /** Initial form data */
  initialValues?: {
    name?: string;
    email?: string;
    message?: string;
  };
  /** Custom error messages */
  errorMessages?: {
    name?: string;
    email?: string;
    message?: string;
  };
}