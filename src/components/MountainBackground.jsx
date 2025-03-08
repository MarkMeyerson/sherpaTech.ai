import React from 'react';
import './MountainBackground.css';

function MountainBackground({ position = 'absolute' }) {
  return (
    <div className={`mountain-container ${position === 'fixed' ? 'fixed' : 'absolute'}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320" 
        preserveAspectRatio="none"
        className="mountains w-full h-full"
      >
        {/* White snow-capped peaks in background */}
        <path 
          className="mountain snow-caps" 
          d="M0,180L60,170L120,180L180,160L240,180L300,150L360,180L420,160L480,180L540,150L600,180L660,160L720,180L780,150L840,180L900,160L960,180L1020,150L1080,180L1140,160L1200,180L1260,150L1320,180L1380,160L1440,180L1440,220L0,220Z"
          fill="#FFFFFF" 
          fillOpacity="0.5"
        />
        
        {/* Far mountain range */}
        <path 
          className="mountain far-mountains" 
          d="M0,192L80,176L160,208L240,176L320,208L400,176L480,208L560,176L640,208L720,176L800,208L880,176L960,208L1040,176L1120,208L1200,176L1280,208L1360,176L1440,160L1440,320L0,320Z"
          fill="#1b2a42" 
          fillOpacity="0.7"
        />
        
        {/* White/grey highlights for middle peaks */}
        <path 
          className="mountain mid-highlights" 
          d="M0,224L60,208L120,240L180,208L240,240L300,208L360,240L420,208L480,240L540,208L600,240L660,208L720,240L780,208L840,240L900,208L960,240L1020,208L1080,240L1140,208L1200,240L1260,208L1320,240L1380,208L1440,224L1440,260L0,260Z"
          fill="#E0E0E0" 
          fillOpacity="0.2"
        />
        
        {/* Middle mountain range */}
        <path 
          className="mountain mid-mountains" 
          d="M0,224L60,208L120,240L180,208L240,240L300,208L360,240L420,208L480,240L540,208L600,240L660,208L720,240L780,208L840,240L900,208L960,240L1020,208L1080,240L1140,208L1200,240L1260,208L1320,240L1380,208L1440,224L1440,320L0,320Z"
          fill="#162537" 
          fillOpacity="0.8"
        />
        
        {/* Nearest mountain range with highlights */}
        <path 
          className="mountain near-mountains" 
          d="M0,288L30,266L60,288L90,250L120,288L150,250L180,288L210,240L240,288L270,230L300,288L330,250L360,288L390,250L420,288L450,240L480,288L510,240L540,288L570,240L600,288L630,250L660,288L690,230L720,288L750,240L780,288L810,230L840,288L870,250L900,288L930,230L960,288L990,240L1020,288L1050,250L1080,288L1110,230L1140,288L1170,240L1200,288L1230,230L1260,288L1290,250L1320,288L1350,240L1380,288L1410,240L1440,288L1440,320L0,320Z"
          fill="#121d2c" 
          fillOpacity="0.9"
        />
      </svg>
    </div>
  );
}

export default MountainBackground;