// src/components/Contact.jsx
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { FormGroup, Label, Input, TextArea, ErrorMessage } from './Input';
import { PrimaryButton } from './Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-pearl-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-navy-blue text-center">Contact Us</h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                {submitted ? (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <h2 className="text-2xl font-semibold mb-2 text-navy-blue">Thank You!</h2>
                    <p className="text-deep-navy">Your message has been sent. We'll get back to you as soon as possible.</p>
                    <button 
                      onClick={() => setSubmitted(false)} 
                      className="mt-6 text-mountain-blue hover:text-navy-blue underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                      />
                      {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                      />
                      {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="message">Message *</Label>
                      <TextArea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        error={errors.message}
                      />
                      {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
                    </FormGroup>
                    
                    <div className="mt-6">
                      <PrimaryButton
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </PrimaryButton>
                    </div>
                  </form>
                )}
              </div>
              
              {/* Contact Information */}
              <div>
                <div className="bg-ice-blue rounded-lg shadow-sm p-8 mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-navy-blue">Get in Touch</h2>
                  <p className="mb-6 text-deep-navy">
                    Have questions about how we can help your business with AI integration? 
                    Send us a message and our team will get back to you as soon as possible.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-mountain-blue mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <div>
                        <h3 className="font-semibold text-navy-blue">Email</h3>
                        <a href="mailto:info@sherpatech.ai" className="text-mountain-blue hover:underline">info@sherpatech.ai</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-mountain-blue mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <div>
                        <h3 className="font-semibold text-navy-blue">Location</h3>
                        <p>Arlington, Virginia</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-navy-blue rounded-lg shadow-sm p-8 text-white">
                  <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
                  <p className="mb-6 opacity-90">
                    Follow us on LinkedIn to stay updated with the latest in AI technology 
                    for small and medium businesses.
                  </p>
                  <a 
                    href="https://www.linkedin.com/company/sherpatech-ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white border border-white/30 px-4 py-2 rounded hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;