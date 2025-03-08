// src/components/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#121d2c] mb-8 text-center">Get in Touch</h2>
        
        <div className="max-w-3xl mx-auto bg-[#121d2c] rounded-lg p-8 shadow-lg text-white">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 rounded bg-blue-900 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 rounded bg-blue-900 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email address"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full px-4 py-2 rounded bg-blue-900 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject of your message"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 font-medium">Message</label>
              <textarea 
                id="message" 
                rows="5" 
                className="w-full px-4 py-2 rounded bg-blue-900 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
              ></textarea>
            </div>
            
            <div>
              <button 
                type="submit" 
                className="px-6 py-3 bg-white text-[#121d2c] font-bold rounded hover:bg-gray-100 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;