// src/components/Contact.jsx
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real application, you would send the form data to your server
    // For now, we'll just simulate a successful submission
    try {
      // Simulate API call
      setTimeout(() => {
        setFormStatus({
          submitted: true,
          error: false
        });
        // Reset form
        setFormState({
          name: '',
          email: '',
          company: '',
          message: ''
        });
      }, 1000);
    } catch (error) {
      setFormStatus({
        submitted: false,
        error: true
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-pearl-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-alpine-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-2 text-navy-blue">Contact Us</h1>
            <p className="text-mountain-blue mb-8">Have questions? We're here to help guide your journey.</p>
            
            {formStatus.submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded mb-6">
                <h2 className="font-bold text-xl mb-2">Message Received!</h2>
                <p>Thank you for reaching out. A Sherpa will be in touch with you shortly.</p>
              </div>
            ) : formStatus.error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-6">
                <h2 className="font-bold text-xl mb-2">Something went wrong</h2>
                <p>Please try again or email us directly at info@sherpatech.ai</p>
              </div>
            ) : null}
            
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-deep-navy font-medium mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-mountain-blue rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-deep-navy font-medium mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-mountain-blue rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-deep-navy font-medium mb-1">Company (Optional)</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full p-3 border border-mountain-blue rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-deep-navy font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full p-3 border border-mountain-blue rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-navy-blue text-alpine-white py-3 px-6 rounded-md hover:bg-mountain-blue transition duration-300 font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              <div className="bg-ice-blue p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-navy-blue">Other Ways to Connect</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-mountain-blue">Email</h3>
                    <p><a href="mailto:info@sherpatech.ai" className="text-deep-navy hover:text-navy-blue">info@sherpatech.ai</a></p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-mountain-blue">Office</h3>
                    <p className="text-deep-navy">123 Digital Avenue</p>
                 