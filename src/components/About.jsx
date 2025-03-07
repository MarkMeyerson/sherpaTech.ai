// src/components/About.jsx
import React from 'react';

const About = () => {
  return (
    <section id="about" className="bg-pearl-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-6 text-center">About SherpaTech.Ai</h2>
          <p className="text-lg mb-4">
            At SherpaTech.Ai, we are your trusted guides through the complex AI landscape.
            Just as a sherpa guides mountaineers through challenging terrain, we help small and
            medium businesses navigate the world of artificial intelligence.
          </p>
          <p className="text-lg mb-4">
            Our team brings years of experience in AI implementation, tailored specifically
            for the needs and budgets of SMBs. We believe everyone deserves access to powerful
            AI tools - not just large enterprises with massive budgets.
          </p>
          <p className="text-lg">
            We simplify the journey, create clear paths forward, and help you reach new heights 
            with practical AI solutions that deliver real business value.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;