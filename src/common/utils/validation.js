/**
 * Email validation regex pattern
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
export const validateEmail = (email) => {
  return EMAIL_REGEX.test(String(email).toLowerCase());
};

/**
 * Validates form fields
 * @param {FormData} formData - Form data to validate
 * @returns {Object} - Validation errors
 */
export const validateForm = (formData) => {
  const errors = {};

  if (!formData.get('name')?.trim()) {
    errors.name = 'Name is required';
  }

  const email = formData.get('email')?.trim();
  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }

  if (!formData.get('message')?.trim()) {
    errors.message = 'Message is required';
  }

  return errors;
};