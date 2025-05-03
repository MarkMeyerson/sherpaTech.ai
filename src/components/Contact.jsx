// Updated Contact.jsx with better error handling and debugging
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorDetails, setErrorDetails] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorDetails('');

    try {
      // Your complete Power Automate URL
      const powerAutomateUrl = 'https://prod-32.westus.logic.azure.com:443/workflows/de85654dcff04825bb9a39d632ec4a20/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SRYK6PqnPhUfNeMMW8oZp705-GAHg07Fonj6hdMdkos';
      
      console.log('Sending to:', powerAutomateUrl);
      console.log('Data:', formData);
      
      const response = await fetch(powerAutomateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response:', response);

      if (response.ok || response.status === 202) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitStatus('success');
      } else {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error('Detailed error:', error);
      setErrorDetails(error.message);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#121d2c] mb-8 text-center">Get in Touch</h2>
        
        <div className="max-w-3xl mx-auto bg-[#121d2c] rounded-lg p-8 shadow-lg text-white">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Name *</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-blue-900 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email *</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-blue-900 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject of your message"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 font-medium">Message *</label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5" 
                className="w-full px-4 py-2 rounded bg-blue-900 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
              ></textarea>
            </div>
            
            {submitStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                <p>Sorry, there was an error sending your message. Please try again.</p>
                {errorDetails && (
                  <p className="text-sm mt-2">Error details: {errorDetails}</p>
                )}
              </div>
            )}
            
            <div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-white text-[#121d2c] font-bold rounded hover:bg-gray-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;