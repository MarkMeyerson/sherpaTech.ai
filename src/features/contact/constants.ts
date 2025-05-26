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

export const API_ENDPOINTS = {
  CONTACT_FORM: 'https://prod-32.westus.logic.azure.com:443/workflows/de85654dcff04825bb9a39d632ec4a20/triggers/manual/paths/invoke'
} as const;