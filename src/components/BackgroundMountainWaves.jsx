import React from 'react';
// No need for CSS import here - it's already imported in App.jsx

const BackgroundMountainWaves = () => {
  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      {/* SVG Filter definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="wave-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
          </filter>
        </defs>
      </svg>
      
      {/* Mountain Wave 1 - Furthest back */}
      <div className="absolute inset-x-0 bottom-0 h-64 md:h-96">
        <svg 
          viewBox="0 0 1200 200" 
          preserveAspectRatio="none" 
          className="w-full h-full mountain-wave-1"
        >
          <path 
            d="M0,100 C150,140 350,60 500,100 C650,140 850,60 1200,100 L1200,200 L0,200 Z" 
            fill="#2B517A" 
            fillOpacity="0.2"
            className="wave-filter"
          />
        </svg>
      </div>
      
      {/* Mountain Wave 2 - Middle */}
      <div className="absolute inset-x-0 bottom-0 h-56 md:h-80">
        <svg 
          viewBox="0 0 1200 200" 
          preserveAspectRatio="none" 
          className="w-full h-full mountain-wave-2"
        >
          <path 
            d="M0,120 C250,80 450,150 650,110 C850,70 1050,130 1200,100 L1200,200 L0,200 Z" 
            fill="#1B365D" 
            fillOpacity="0.15"
            className="wave-filter"
          />
        </svg>
      </div>
      
      {/* Mountain Wave 3 - Front */}
      <div className="absolute inset-x-0 bottom-0 h-48 md:h-64">
        <svg 
          viewBox="0 0 1200 200" 
          preserveAspectRatio="none" 
          className="w-full h-full mountain-wave-3"
        >
          <path 
            d="M0,150 C150,120 350,160 500,130 C650,100 850,140 1200,120 L1200,200 L0,200 Z" 
            fill="#152A4A" 
            fillOpacity="0.1"
            className="wave-filter"
          />
        </svg>
      </div>
    </div>
  );
};

export default BackgroundMountainWaves;
