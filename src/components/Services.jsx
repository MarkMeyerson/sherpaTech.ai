import React from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const navigateToContact = (service) => {
    navigate('/contact', { 
      state: { 
        preselectedService: service 
      } 
    });
  };

  return (
    <section id="services" className="bg-ice-blue py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-navy-blue mb-10 text-center">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-alpine-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-navy-blue mb-3">AI Strategy Consultation</h3>
            <p className="text-mountain-blue mb-4">
              Develop a customized AI roadmap aligned with your business goals and budget.
            </p>
            <button 
              onClick={() => navigateToContact('AI Strategy Consultation')}
              className="text-mountain-blue hover:text-navy-blue transition-colors duration-300"
            >
              Learn more →
            </button>
          </div>
          
          {/* Service Card 2 */}
          <div className="bg-alpine-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-navy-blue mb-3">AI Implementation</h3>
            <p className="text-mountain-blue mb-4">
              Seamlessly integrate AI tools into your existing workflows and systems.
            </p>
            <button 
              onClick={() => navigateToContact('AI Implementation')}
              className="text-mountain-blue hover:text-navy-blue transition-colors duration-300"
            >
              Learn more →
            </button>
          </div>
          
          {/* Service Card 3 */}
          <div className="bg-alpine-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-navy-blue mb-3">AI Training & Support</h3>
            <p className="text-mountain-blue mb-4">
              Empower your team with the knowledge and skills to effectively use AI tools.
            </p>
            <button 
              onClick={() => navigateToContact('AI Training & Support')}
              className="text-mountain-blue hover:text-navy-blue transition-colors duration-300"
            >
              Learn more →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;