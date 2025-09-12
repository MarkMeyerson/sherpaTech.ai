import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 48px;
  background: #F7FAFC;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: auto;
  min-height: auto;
  overflow: visible;
`;

const FormTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: #1B365D;
`;

const FormDescription = styled.p`
  margin-bottom: 32px;
  color: #2B517A;
  font-family: 'Open Sans', sans-serif;
  opacity: 0.9;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  height: auto;
  overflow: visible;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #1B365D;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #E8EEF4;
  border-radius: 6px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #FF6A3D;
    box-shadow: 0 0 0 2px rgba(255, 106, 61, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #E8EEF4;
  border-radius: 6px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  background: white;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #FF6A3D;
    box-shadow: 0 0 0 2px rgba(255, 106, 61, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #E8EEF4;
  border-radius: 6px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #FF6A3D;
    box-shadow: 0 0 0 2px rgba(255, 106, 61, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: #FF6A3D;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 14px 24px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    background: #e55a35;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 106, 61, 0.3);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  padding: 16px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 6px;
  color: #155724;
  text-align: center;
  margin-bottom: 20px;
`;

const SimpleContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    businessSize: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // For now, we'll just simulate a successful submission
      // In production, you'd submit to HubSpot API or your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        businessSize: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <FormContainer>
        <SuccessMessage>
          <h4 style={{ margin: '0 0 10px 0' }}>Thank You!</h4>
          <p style={{ margin: 0 }}>
            Your enrollment request has been submitted successfully. We'll get back to you within 24 hours to confirm your spot in the September cohort.
          </p>
        </SuccessMessage>
        <button 
          onClick={() => setIsSubmitted(false)}
          style={{ 
            background: 'none', 
            border: '1px solid #FF6A3D', 
            color: '#FF6A3D', 
            padding: '10px 20px', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Submit Another Application
        </button>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormTitle>Enrollment is open for the September cohort</FormTitle>
      <FormDescription>
        Seats are limited. Reserve your spot today and start your AI transformation journey.
      </FormDescription>
      
      <Form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <FormGroup>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </div>
        
        <FormGroup>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="company">Company Name</Label>
          <Input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="businessSize">Business Size</Label>
          <Select
            id="businessSize"
            name="businessSize"
            value={formData.businessSize}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="solo">Solo Entrepreneur</option>
            <option value="2-10">2-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="200+">200+ employees</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="message">What specific AI challenges are you looking to solve?</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your business goals and how AI could help..."
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Reserve My Spot'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default SimpleContactForm;
