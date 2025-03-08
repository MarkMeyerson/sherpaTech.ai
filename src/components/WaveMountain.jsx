import React from 'react';

function WaveMountain() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full">
        <path 
          fill="#283593" 
          fillOpacity="0.8"
          d="M0,160L60,170.7C120,181,240,203,360,202.7C480,203,600,181,720,186.7C840,192,960,224,1080,224C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          style={{animation: 'mountainMove1 20s ease-in-out infinite alternate'}}
        />
        <path 
          fill="#303F9F" 
          fillOpacity="0.6"
          d="M0,224L48,218.7C96,213,192,203,288,213.3C384,224,480,256,576,261.3C672,267,768,245,864,234.7C960,224,1056,224,1152,234.7C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          style={{animation: 'mountainMove2 25s ease-in-out infinite alternate'}}
        />
      </svg>
      
      <style jsx>{`
        @keyframes mountainMove1 {
          0% { transform: translateX(-15px); }
          100% { transform: translateX(15px); }
        }
        @keyframes mountainMove2 {
          0% { transform: translateX(10px); }
          100% { transform: translateX(-10px); }
        }
      `}</style>
    </div>
  );
}

export default WaveMountain;