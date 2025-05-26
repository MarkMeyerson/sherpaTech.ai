export const FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  MESSAGE: 'message'
} as const;

export const ERROR_MESSAGES = {
  REQUIRED_NAME: 'Name is required',
  REQUIRED_EMAIL: 'Email is required',
  INVALID_EMAIL: 'Invalid email format',
  REQUIRED_MESSAGE: 'Message is required',
  SUBMISSION_ERROR: 'Failed to submit form. Please try again.'
} as const;

export const FORM_VALIDATION = {
  REQUIRED: (field: string) => `${field} is required`,
  EMAIL_FORMAT: 'Please enter a valid email address',
  MIN_LENGTH: (field: string, length: number) => `${field} must be at least ${length} characters`,
} as const;

export const API_ENDPOINTS = {
  CONTACT: 'https://prod-32.westus.logic.azure.com:443/workflows/de85654dcff04825bb9a39d632ec4a20/triggers/manual/paths/invoke',
  VERSION: 'api-version=2016-06-01',
  SIGNATURE: 'sig=SRYK6PqnPhUfNeMMW8oZp705-GAHg07Fonj6hdMdkos'
} as const;