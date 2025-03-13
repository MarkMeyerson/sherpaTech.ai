// src/components/Input.jsx
import React from 'react';

// Base input styles as a function to share between components
const getInputStyles = (error) => {
  return `
    w-full 
    font-sans 
    text-base 
    bg-white 
    border 
    ${error ? 'border-red-500' : 'border-[#2B517A]'} 
    rounded-md 
    px-4 
    py-3 
    transition-colors 
    focus:outline-none 
    focus:border-${error ? 'red-700' : '[#1B365D]'}
    placeholder:text-[#1B365D]/50
  `;
};

export const Input = ({ error, className = '', ...props }) => {
  return (
    <input
      className={`${getInputStyles(error)} ${className}`}
      {...props}
    />
  );
};

export const TextArea = ({ error, className = '', ...props }) => {
  return (
    <textarea
      className={`${getInputStyles(error)} min-h-[120px] resize-vertical ${className}`}
      {...props}
    />
  );
};

export const FormGroup = ({ className = '', children, ...props }) => {
  return (
    <div className={`mb-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const Label = ({ className = '', children, ...props }) => {
  return (
    <label
      className={`block font-semibold mb-2 text-[#152A4A] ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export const ErrorMessage = ({ className = '', children, ...props }) => {
  return (
    <p
      className={`text-red-500 text-sm mt-2 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export default Input;
