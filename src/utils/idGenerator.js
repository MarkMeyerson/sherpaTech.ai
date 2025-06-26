// Utility for generating unique IDs to prevent duplicates
let counter = 0;

export const generateUniqueId = (prefix = 'id') => {
  counter += 1;
  return `${prefix}-${Date.now()}-${counter}`;
};

export const createFormId = (formType, fieldName) => {
  return `${formType}-${fieldName}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Reset counter (useful for testing)
export const resetCounter = () => {
  counter = 0;
};
