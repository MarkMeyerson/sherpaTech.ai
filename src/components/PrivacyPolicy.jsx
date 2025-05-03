import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
          <p>
            Welcome to SherpaTech.AI. We respect your privacy and are committed to protecting your personal data.
            This privacy policy will inform you about how we look after your personal data when you visit our website
            and tell you about your privacy rights and how the law protects you.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">2. Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you including:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Identity Data: includes first name, last name, username or similar identifier</li>
            <li>Contact Data: includes email address and telephone numbers</li>
            <li>Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform</li>
            <li>Usage Data: includes information about how you use our website and services</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>To provide and improve our services</li>
            <li>To communicate with you</li>
            <li>For analytics purposes to improve our website</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">4. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <p className="mt-2">
            Email: privacy@sherpatech.ai<br />
            Address: [Your Company Address]
          </p>
        </section>
      </div>
      
      <div className="mt-8">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}

export default PrivacyPolicy;