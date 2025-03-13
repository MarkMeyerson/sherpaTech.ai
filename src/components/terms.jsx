// src/components/Terms.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6 text-navy-blue">Terms of Service</h1>
            
            <div className="space-y-6 text-deep-navy">
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Introduction</h2>
                <p>
                  These Terms of Service ("Terms") govern your access to and use of the SherpaTech.ai website and services. 
                  Please read these Terms carefully, and contact us if you have any questions.
                </p>
                <p className="mt-2">
                  By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Using SherpaTech.ai</h2>
                <p>
                  You may use our services only as permitted by these Terms and any applicable laws. Don't misuse our services.
                </p>
                <p className="mt-2">
                  You must follow any policies made available to you within the services.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Your Content</h2>
                <p>
                  Our services allow you to upload, submit, store, send or receive content. You retain ownership of any intellectual 
                  property rights that you hold in that content.
                </p>
                <p className="mt-2">
                  When you upload, submit, store, send or receive content to or through our services, you give SherpaTech.ai 
                  a worldwide license to use, host, store, reproduce, modify, create derivative works, communicate, publish, 
                  publicly perform, publicly display and distribute such content. The rights you grant in this license are for 
                  the limited purpose of operating, promoting, and improving our services, and to develop new ones.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Software in our Services</h2>
                <p>
                  SherpaTech.ai gives you a personal, worldwide, royalty-free, non-assignable and non-exclusive license to use 
                  the software provided to you by SherpaTech.ai as part of the services. This license is for the sole purpose of 
                  enabling you to use and enjoy the benefit of the services as provided by SherpaTech.ai, in the manner permitted 
                  by these Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Modifying and Terminating our Services</h2>
                <p>
                  We are constantly changing and improving our services. We may add or remove functionalities or features, 
                  and we may suspend or stop a service altogether.
                </p>
                <p className="mt-2">
                  You can stop using our services at any time, although we'll be sorry to see you go. SherpaTech.ai may also 
                  stop providing services to you, or add or create new limits to our services at any time.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Liability for our Services</h2>
                <p>
                  When permitted by law, SherpaTech.ai, and SherpaTech.ai's suppliers and distributors, will not be responsible for:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Lost profits, revenues, or data, financial losses or indirect, special, consequential, exemplary, or punitive damages.</li>
                  <li>Any matters beyond reasonable control.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Business Uses of our Services</h2>
                <p>
                  If you are using our services on behalf of a business, that business accepts these terms. It will hold harmless 
                  and indemnify SherpaTech.ai and its affiliates, officers, agents, and employees from any claim, suit or action 
                  arising from or related to the use of the services or violation of these terms, including any liability or expense 
                  arising from claims, losses, damages, suits, judgments, litigation costs and attorneys' fees.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="mt-2">
                  <p><strong>Email:</strong> <a href="mailto:info@sherpatech.ai" className="text-mountain-blue hover:underline">info@sherpatech.ai</a></p>
                  <p><strong>Address:</strong> 123 Digital Avenue, Tech District, TC 12345</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                </div>
              </section>
              
              <section>
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

export default Terms;
