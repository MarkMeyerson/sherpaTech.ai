// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Mountain Gradient Background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: "linear-gradient(to bottom, #1B365D, #2B517A)"
        }}
      ></div>
      
      {/* Enhanced Mountain SVG Graphics */}
      <svg
        viewBox="0 0 1440 520"
        className="absolute bottom-0 w-full h-full z-0"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Mountains */}
        <path
          fill="#ffffff"
          fillOpacity="0.1"
          d="M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,128C840,117,960,139,1080,149.3C1200,160,1320,160,1380,160L1440,160L1440,520L1380,520C1320,520,1200,520,1080,520C960,520,840,520,720,520C600,520,480,520,360,520C240,520,120,520,60,520L0,520Z"
        ></path>
        
        {/* Middle Mountains */}
        <path
          fill="#ffffff"
          fillOpacity="0.15"
          d="M0,256L60,261.3C120,267,240,277,360,245.3C480,213,600,139,720,144C840,149,960,235,1080,240C1200,245,1320,171,1380,133.3L1440,96L1440,520L1380,520C1320,520,1200,520,1080,520C960,520,840,520,720,520C600,520,480,520,360,520C240,520,120,520,60,520L0,520Z"
        ></path>
        
        {/* Foreground Mountains - more visible */}
        <path
          fill="#ffffff"
          fillOpacity="0.2"
          d="M0,160L48,181.3C96,203,192,245,288,229.3C384,213,480,139,576,122.7C672,107,768,149,864,165.3C960,181,1056,171,1152,165.3C1248,160,1344,160,1392,160L1440,160L1440,520L1392,520C1344,520,1248,520,1152,520C1056,520,960,520,864,520C768,520,672,520,576,520C480,520,384,520,288,520C192,520,96,520,48,520L0,520Z"
        ></path>
      </svg>

      {/* Snow Caps */}
      <svg 
        viewBox="0 0 1440 200" 
        className="absolute w-full z-0" 
        style={{ top: '30%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fill="#ffffff" 
          fillOpacity="0.25"
          d="M1440 16L1392 26.7C1344 37 1248 59 1152 69.3C1056 80 960 80 864 69.3C768 59 672 37 576 37.3C480 37 384 59 288 64C192 69 96 59 48 53.3L0 48V0H48C96 0 192 0 288 0C384 0 480 0 576 0C672 0 768 0 864 0C960 0 1056 0 1152 0C1248 0 1344 0 1392 0H1440V16Z"
        ></path>
      </svg>
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left column - text content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Your AI Sherpa
            </h1>
            
            <p className="text-xl mb-8 text-white drop-shadow-md">
              Guiding small and medium businesses through the digital landscape with expert AI solutions.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href="mailto:info@sherpatech.ai" 
                className="px-6 py-3 rounded-md bg-white text-[#1B365D] font-semibold hover:bg-[#E8EEF4] hover:text-[#152A4A] shadow-lg transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="#about-section" 
                className="px-6 py-3 rounded-md bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors"
              >
                About Us
              </a>
            </div>
          </div>
          
          {/* Right column - image */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img 
              src="/ai-serpa.jpg" 
              alt="AI Sherpa Guide" 
              className="w-full max-w-md mx-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;