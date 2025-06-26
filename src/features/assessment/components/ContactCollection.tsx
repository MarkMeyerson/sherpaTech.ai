import React, { useState } from 'react';
import { UserContact } from '../types/assessment.types';

interface ContactCollectionProps {
  onSubmit: (contact: UserContact) => void;
}

export const ContactCollection: React.FC<ContactCollectionProps> = ({ onSubmit }) => {
  const [contact, setContact] = useState<UserContact>({ email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(contact);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Almost there!</h3>
      <p>Please provide your contact information to see your results.</p>
      
      <div>
        <label htmlFor="assessment-contact-email" className="block mb-1">Email (required)</label>
        <input
          type="email"
          id="assessment-contact-email"
          required
          className="w-full p-2 border rounded"
          value={contact.email}
          onChange={e => setContact(prev => ({ ...prev, email: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="assessment-contact-phone" className="block mb-1">Phone (optional)</label>
        <input
          type="tel"
          id="assessment-contact-phone"
          className="w-full p-2 border rounded"
          value={contact.phone || ''}
          onChange={e => setContact(prev => ({ ...prev, phone: e.target.value }))}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        View Results
      </button>
    </form>
  );
};