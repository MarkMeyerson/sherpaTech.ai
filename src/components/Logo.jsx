import React from 'react';

const Logo = ({ variant = 'default' }) => {
  const colors = {
    default: {
      mountain: '#FF6B00', // brand-primary (orange)
      text: '#FF6B00',
    },
    light: {
      mountain: '#FFFFFF', // brand-white
      text: '#FFFFFF',
    }
  };

  const selectedColors = colors[variant];

  return (
    <div className="flex items-center gap-2">
      {/* Mountain Logo */}
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M16 2L30 28H2L16 2Z" 
          fill={selectedColors.mountain}
        />
        <path 
          d="M16 8L23 24H9L16 8Z" 
          fill="#E4E4E7" // brand-light (zinc-200)
        />
      </svg>
      
      {/* Text */}
      <span className={`text-2xl font-bold ${variant === 'light' ? 'text-brand-white' : 'text-brand-primary'}`}>
        4SMB.ai
      </span>
    </div>
  );
};

export default Logo;