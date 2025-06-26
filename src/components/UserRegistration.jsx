import React, { useState } from 'react';
import { generateUniqueId } from '../utils/idGenerator';
import trainingService from '../services/trainingService';

const UserRegistration = ({ onRegister }) => {
  const [mode, setMode] = useState('new'); // 'new' or 'returning'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Generate unique IDs for form fields
  const nameFieldId = generateUniqueId('registration-name');
  const emailFieldId = generateUniqueId('registration-email');
  const identifierFieldId = generateUniqueId('registration-identifier');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (name && email) {
        const result = await trainingService.loginUser(email, name);
        onRegister(result);
      } else {
        setError('Please fill in both fields.');
      }
    } catch (error) {
      setError('Failed to register. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturningUser = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userData = await trainingService.lookupUser(identifier);
      if (userData) {
        onRegister(userData);
      } else {
        setError('User not found. Please check your email or name, or register as a new user.');
      }
    } catch (error) {
      setError('Failed to find user. Please try again.');
      console.error('Lookup error:', error);
    } finally {
      setIsLoading(false);
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
        </div>        {/* Registration Form */}
        <div className="bg-white py-8 px-6 sm:px-8 rounded-xl shadow-sm border border-ice-blue space-y-6">
          {/* Mode Selection Tabs */}
          <div className="flex rounded-lg border border-gray-200 p-1">
            <button
              type="button"
              onClick={() => {
                setMode('new');
                setError('');
              }}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                mode === 'new'
                  ? 'bg-navy-blue text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              New User
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('returning');
                setError('');
              }}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                mode === 'returning'
                  ? 'bg-navy-blue text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Returning User
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {mode === 'new' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor={nameFieldId} className="block text-sm font-medium text-navy-blue mb-2">
                  Full Name
                </label>
                <input
                  id={nameFieldId}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor={emailFieldId} className="block text-sm font-medium text-navy-blue mb-2">
                  Email Address
                </label>
                <input
                  id={emailFieldId}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter your email address"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-navy-blue text-white py-3 px-4 rounded-lg hover:bg-mountain-blue focus:outline-none focus:ring-2 focus:ring-navy-blue focus:ring-offset-2 transition-colors duration-200 font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Starting...' : 'Start Your Training Journey'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleReturningUser} className="space-y-6">
              <div>
                <label htmlFor={identifierFieldId} className="block text-sm font-medium text-navy-blue mb-2">
                  Email Address or Full Name
                </label>
                <input
                  id={identifierFieldId}
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-blue focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter your email or full name"
                  required
                  disabled={isLoading}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Enter the email or name you used when you first registered
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-navy-blue text-white py-3 px-4 rounded-lg hover:bg-mountain-blue focus:outline-none focus:ring-2 focus:ring-navy-blue focus:ring-offset-2 transition-colors duration-200 font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Finding...' : 'Continue Training'}
              </button>
            </form>
          )}
        </div>        {/* Additional Info */}
        <div className="text-center text-xs sm:text-sm text-gray-500">
          <p>Your information is secure and will only be used for training progress tracking.</p>
          {!trainingService.isBackendAvailable() && (
            <p className="mt-2 text-yellow-600">
              Currently running in offline mode. Progress will be saved locally.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
