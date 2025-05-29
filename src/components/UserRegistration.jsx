import React, { useState } from 'react';

const UserRegistration = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      onRegister({ name, email });
    } else {
      alert('Please fill in both fields.');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-pearl-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo or Icon */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-navy-blue rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-blue">Welcome to SherpaTech.AI</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Start your AI Training Program journey
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white py-8 px-6 sm:px-8 rounded-xl shadow-sm border border-ice-blue space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy-blue mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy-blue mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
              placeholder="Enter your email address"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-navy-blue text-white py-3 px-4 rounded-lg hover:bg-mountain-blue focus:outline-none focus:ring-2 focus:ring-navy-blue focus:ring-offset-2 transition-colors duration-200 font-medium text-base"
          >
            Start Your Training Journey
          </button>
        </form>

        {/* Additional Info */}
        <div className="text-center text-xs sm:text-sm text-gray-500">
          <p>Your information is secure and will only be used for training progress tracking.</p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
