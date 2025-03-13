// src/components/Card.jsx
import React from 'react';

const Card = ({ children, variant = 'default', className = '', ...props }) => {
  const bgColor = variant === 'ice' ? 'bg-[#F7FAFC]' : 'bg-white';
  
  return (
    <div 
      className={`${bgColor} border border-[#2B517A]/10 rounded-lg shadow-sm p-6 mb-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 
      className={`text-[#1B365D] mb-2 text-xl font-semibold ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`text-[#152A4A] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
