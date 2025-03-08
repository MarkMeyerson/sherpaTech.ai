// src/components/Services.jsx
import React from 'react';

const Services = () => {
  return (
    <section id="services" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#121d2c] mb-10 text-center">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#121d2c] mb-3">AI Strategy Consultation</h3>
            <p className="text-gray-600 mb-4">
              Develop a customized AI roadmap aligned with your business goals and budget.
            </p>
            <a href="#contact" className="text-blue-600 font-semibold hover:text-blue-800">
              Learn more →
            </a>
          </div>
          
          {/* Service Card 2 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#121d2c] mb-3">AI Implementation</h3>
            <p className="text-gray-600 mb-4">
              Seamlessly integrate AI tools into your existing workflows and systems.
            </p>
            <a href="#contact" className="text-blue-600 font-semibold hover:text-blue-800">
              Learn more →
            </a>
          </div>
          
          {/* Service Card 3 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#121d2c] mb-3">AI Training & Support</h3>
            <p className="text-gray-600 mb-4">
              Empower your team with the knowledge and skills to effectively use AI tools.
            </p>
            <a href="#contact" className="text-blue-600 font-semibold hover:text-blue-800">
              Learn more →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;