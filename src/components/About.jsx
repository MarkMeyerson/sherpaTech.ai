// src/components/About.jsx
import React from 'react';

const About = () => {
  return (
    <section id="about-section" className="py-16 bg-[#F7FAFC]">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-[#1B365D] text-center">About SherpaTech.AI</h2>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="mb-4 text-[#152A4A]">
              At SherpaTech.AI, we serve as your trusted guide through the digital landscape, 
              helping small and medium businesses navigate the complex world of technology 
              and artificial intelligence.
            </p>
            
            <p className="mb-4 text-[#152A4A]">
              Just as Sherpas guide climbers through the treacherous paths of the Himalayas, 
              our team of experts guides your business through digital transformation, AI integration, 
              and technology adoption.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-[#2B517A] mt-8">Our Mission</h3>
            <p className="mb-6 text-[#152A4A]">
              We believe that AI and advanced technologies shouldn't be exclusive to large corporations. 
              Our mission is to democratize access to these powerful tools by providing affordable, 
              scalable solutions tailored specifically for small and medium businesses.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-[#2B517A]">Our Approach</h3>
            <p className="text-[#152A4A]">
              We take a personalized approach to each client, understanding your unique challenges 
              and objectives. Rather than offering one-size-fits-all solutions, we craft custom 
              strategies that align with your business goals, technical capabilities, and budget constraints.
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <a 
              href="mailto:info@sherpatech.ai" 
              className="px-6 py-3 rounded-md bg-[#1B365D] text-white font-semibold hover:bg-[#2B517A] transition-colors inline-block"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;