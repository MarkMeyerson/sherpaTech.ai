import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import ContactForm from './ContactForm'; // Import ContactForm

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
      <ContactForm onSubmit={() => { /* Dummy handler */ }} /> {/* Add ContactForm here */}
    </div>
  );
};

export default Home;