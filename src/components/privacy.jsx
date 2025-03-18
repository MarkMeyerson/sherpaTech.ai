// src/components/Privacy.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6 text-navy-blue">Privacy Policy</h1>
            
            <div className="space-y-6 text-deep-navy">
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Introduction</h2>
                <p>
                  At SherpaTech.ai, we respect your privacy and are committed to protecting your personal data. 
                  This privacy policy will inform you about how we look after your personal data when you visit 
                  our website and tell you about your privacy rights and how the law protects you.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">The Data We Collect</h2>
                <p>
                  We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                  <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                  <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">How We Use Your Data</h2>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                  <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                  <li>Where we need to comply with a legal obligation.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Data Security</h2>
                <p>
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Your Legal Rights</h2>
                <p>
                  Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Request access to your personal data.</li>
                  <li>Request correction of your personal data.</li>
                  <li>Request erasure of your personal data.</li>
                  <li>Object to processing of your personal data.</li>
                  <li>Request restriction of processing your personal data.</li>
                  <li>Request transfer of your personal data.</li>
                  <li>Right to withdraw consent.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <div className="mt-2">
                  <p><strong>Email:</strong> <a href="mailto:info@sherpatech.ai" className="text-mountain-blue hover:underline">info@sherpatech.ai</a></p>
                  <p><strong>Address:</strong> 123 Digital Avenue, Tech District, TC 12345</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Changes to This Privacy Policy</h2>
                <p>
                  We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "last updated" date.
                </p>
                <p className="mt-4">
                  <strong>Last Updated:</strong> March 7, 2025
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;