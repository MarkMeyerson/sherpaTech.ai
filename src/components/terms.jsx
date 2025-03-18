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
                  Welcome to SherpaTech.ai. These terms and conditions outline the rules and regulations for 
                  the use of our website and services.
                </p>
                <p className="mt-2">
                  By accessing this website, we assume you accept these terms and conditions in full. Do not 
                  continue to use SherpaTech.ai if you do not accept all of the terms and conditions stated on this page.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">License to Use</h2>
                <p>
                  Unless otherwise stated, SherpaTech.ai and/or its licensors own the intellectual property rights 
                  for all material on SherpaTech.ai. All intellectual property rights are reserved.
                </p>
                <p className="mt-2">
                  You may view and/or print pages from our website for your own personal use subject to 
                  restrictions set in these terms and conditions.
                </p>
                <p className="mt-2">You must not:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Republish material from our website</li>
                  <li>Sell, rent or sub-license material from our website</li>
                  <li>Reproduce, duplicate or copy material from our website</li>
                  <li>Redistribute content from SherpaTech.ai (unless content is specifically made for redistribution)</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">User Content</h2>
                <p>
                  In these terms and conditions, "User Content" means material (including without limitation text, 
                  images, audio material, video material and audio-visual material) that you submit to our website, 
                  for whatever purpose.
                </p>
                <p className="mt-2">
                  You grant to SherpaTech.ai a worldwide, irrevocable, non-exclusive, royalty-free license to use, 
                  reproduce, adapt, publish, translate and distribute your User Content in any existing or future media. 
                  You also grant to SherpaTech.ai the right to sub-license these rights, and the right to bring an 
                  action for infringement of these rights.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Limitation of Liability</h2>
                <p>
                  The information on our website is provided on an "as is" basis. To the fullest extent permitted 
                  by law, SherpaTech.ai:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>excludes all representations and warranties relating to our website and its contents or which is or may be provided by any affiliates or any other third party, including in relation to any inaccuracies or omissions in our website and/or the Company's literature; and</li>
                  <li>excludes all liability for damages arising out of or in connection with your use of our website.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Indemnification</h2>
                <p>
                  You hereby indemnify SherpaTech.ai and undertake to keep SherpaTech.ai indemnified against any 
                  losses, damages, costs, liabilities and expenses incurred or suffered by SherpaTech.ai arising 
                  out of any breach by you of any provision of these terms and conditions.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Severability</h2>
                <p>
                  If a provision of these terms and conditions is determined by any court or other competent authority 
                  to be unlawful and/or unenforceable, the other provisions will continue in effect.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-navy-blue">Changes to These Terms</h2>
                <p>
                  SherpaTech.ai may revise these terms and conditions from time to time. Revised terms and conditions 
                  will apply to the use of our website from the date of publication of the revised terms and conditions on our website.
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

export default Terms;