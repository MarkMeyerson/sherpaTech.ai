/**
 * @module ContactForm
 * @description Handles user inquiries and form submission
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { validateEmail } from '@/common/utils/validation';
import { useForm } from '@/common/hooks/useForm';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const { values, handleChange, handleSubmit } = useForm({
    initialValues: formData,
    onSubmit: (values) => {
      const validationErrors = validateForm(values);
      if (Object.keys(validationErrors).length === 0) {
        onSubmit(values);
      } else {
        setErrors(validationErrors);
      }
    },
  });

  const validateForm = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.message) {
      errors.message = 'Message is required';
    }
    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          autoComplete="name"
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
        />
        {errors.message && <span>{errors.message}</span>}
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;