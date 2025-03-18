// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="bg-navy-blue text-alpine-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Your AI Strategy Sherpa</h2>
          <img src="/ai-serpa.jpg" alt="AI Sherpa" className="mx-auto mb-8 rounded-lg shadow-lg" />
          <p className="text-xl mb-8">
            We guide small and medium businesses through the AI landscape, 
            helping you reach new heights with practical AI solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#services" className="btn btn-primary">
              Explore Services
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;