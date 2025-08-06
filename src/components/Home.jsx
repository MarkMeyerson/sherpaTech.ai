import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import HybridContactForm from './HybridContactForm';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Hero />
      <div className="flex gap-4 justify-center py-8">
        <button 
          onClick={() => navigate('/services')}
          className="btn btn-secondary"
        >
          Explore Services
        </button>
      </div>
      
      {/* HubSpot Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <HybridContactForm />
        </div>
      </section>
    </div>
  );
};

export default Home;