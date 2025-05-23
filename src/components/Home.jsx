import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import ContactForm from './ContactForm'; // Import ContactForm

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Hero />
      <div className="flex gap-4 justify-center">
        <button 
          onClick={() => navigate('/services')}
          className="bg-transparent border-2 border-alpine-white text-alpine-white hover:bg-alpine-white hover:text-navy-blue px-6 py-3 rounded-lg transition-all duration-300"
        >
          Explore Services
        </button>
      </div>
      <ContactForm /> {/* Add ContactForm here */}
    </div>
  );
};

export default Home;