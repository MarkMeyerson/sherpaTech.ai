// src/components/Button.jsx
import React from 'react';

// Primary button (navy blue background, white text)
export const PrimaryButton = ({ children, className = '', disabled = false, onClick, type = 'button', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-md bg-[#1B365D] text-white font-semibold 
                 hover:bg-[#152A4A] transition-colors duration-200 
                 ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} 
                 active:translate-y-0.5 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Secondary button (mountain blue background, white text)
export const SecondaryButton = ({ children, className = '', disabled = false, onClick, type = 'button', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-md bg-[#2B517A] text-white font-semibold 
                 hover:bg-[#1B365D] transition-colors duration-200 
                 ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} 
                 active:translate-y-0.5 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Text button (transparent background, navy text)
export const TextButton = ({ children, className = '', disabled = false, onClick, type = 'button', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md bg-transparent text-[#152A4A] font-semibold 
                 hover:bg-[#F7FAFC] transition-colors duration-200 
                 ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} 
                 active:translate-y-0.5 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
