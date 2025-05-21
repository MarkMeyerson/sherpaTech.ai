import React from 'react'
import { Link } from 'react-router-dom';
import Hero from './Hero'

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="flex gap-4 justify-center">
        <Link 
          to="/services" 
          className="bg-transparent border-2 border-alpine-white text-alpine-white hover:bg-alpine-white hover:text-navy-blue px-6 py-3 rounded-lg transition-all duration-300"
        >
          Explore Services
        </Link>
        <Link 
          to="/contact" 
          className="bg-alpine-white text-navy-blue hover:bg-ice-blue px-6 py-3 rounded-lg transition-all duration-300"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}

export default Home