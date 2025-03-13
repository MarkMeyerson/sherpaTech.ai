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
      
      {/* Mountain Range SVG Graphics - with animation */}
      <div className="absolute bottom-0 w-full h-full z-0 overflow-hidden">
        {/* First Mountain Range - Back */}
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: "mountainMove1 25s ease-in-out infinite alternate",
            opacity: 0.15
          }}
        >
          <path
            fill="#ffffff"
            d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
        
        {/* Second Mountain Range - Middle */}
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: "mountainMove2 20s ease-in-out infinite alternate",
            opacity: 0.2
          }}
        >
          <path
            fill="#ffffff"
            d="M0,96L48,122.7C96,149,192,203,288,224C384,245,480,235,576,213.3C672,192,768,160,864,165.3C960,171,1056,213,1152,208C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        
        {/* Third Mountain Range - Front */}
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: "mountainMove3 15s ease-in-out infinite alternate",
            opacity: 0.25
          }}
        >
          <path
            fill="#ffffff"
            d="M0,160L40,149.3C80,139,160,117,240,128C320,139,400,181,480,176C560,171,640,117,720,101.3C800,85,880,107,960,144C1040,181,1120,235,1200,240C1280,245,1360,203,1400,181.3L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
      
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
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8">
          {/* Right column - image */}
          <div className="md:w-1/2">
            <img 
              src="/ai-serpa.jpg" 
              alt="AI Sherpa Guide" 
              className="w-full max-w-md mx-auto rounded-lg shadow-xl"
            />
          </div>
          
          {/* Left column - text content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Your AI Strategy Sherpa
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
        </div>
      </div>
    </section>
  );
};

// Add keyframe animations for moving mountains
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes mountainMove1 {
    0% { transform: translateX(0); }
    100% { transform: translateX(-5%); }
  }
  @keyframes mountainMove2 {
    0% { transform: translateX(0); }
    100% { transform: translateX(5%); }
  }
  @keyframes mountainMove3 {
    0% { transform: translateX(0); }
    100% { transform: translateX(-3%); }
  }
`;
document.head.appendChild(styleSheet);

export default Hero;