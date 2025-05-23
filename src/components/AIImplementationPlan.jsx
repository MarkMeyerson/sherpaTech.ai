import React from 'react';

const AIImplementationPlan = () => {
  return (
    <div className="min-h-screen bg-pearl-white text-deep-navy">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-mountain-blue to-navy-blue">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-alpine-white mb-4 font-inter">
            AI Implementation Plan
          </h1>
          <p className="text-2xl text-ice-blue mb-8 font-open-sans">
            A structured approach to ensure successful AI integration for your small business.
          </p>
          <div className="bg-ice-blue bg-opacity-10 border border-alpine-white border-opacity-20 p-6 rounded-lg inline-block">
            <p className="text-alpine-white text-lg font-open-sans">
              <strong>Focus:</strong> Practical solutions with measurable results<br />
              <strong>Outcome:</strong> A tailored AI implementation roadmap aligned with your business objectives.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-6 font-inter">Our Phased Approach</h2>
          <p className="text-lg mb-8 font-open-sans">
            We guide small businesses through their AI journey like a sherpa - not carrying you up the mountain,
            but walking alongside you with a map drawn from 30 years of navigating technology transformations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-ice-blue rounded-lg p-6 border-l-4 border-navy-blue shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-navy-blue text-alpine-white flex items-center justify-center font-bold text-lg mr-4 font-inter">1</div>
                <h3 className="text-xl font-semibold text-navy-blue font-inter">Discovery & Assessment</h3>
              </div>
              <p className="mb-4 font-open-sans">
                We begin with a comprehensive evaluation of your business operations, challenges, and goals.
              </p>
            </div>

            <div className="bg-ice-blue rounded-lg p-6 border-l-4 border-navy-blue shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-navy-blue text-alpine-white flex items-center justify-center font-bold text-lg mr-4 font-inter">2</div>
                <h3 className="text-xl font-semibold text-navy-blue font-inter">Strategy Development</h3>
              </div>
              <p className="mb-4 font-open-sans">
                We create a tailored AI implementation roadmap aligned with your business objectives.
              </p>
            </div>

            <div className="bg-ice-blue rounded-lg p-6 border-l-4 border-navy-blue shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-navy-blue text-alpine-white flex items-center justify-center font-bold text-lg mr-4 font-inter">3</div>
                <h3 className="text-xl font-semibold text-navy-blue font-inter">Implementation & Integration</h3>
              </div>
              <p className="mb-4 font-open-sans">
                We execute the plan with minimal disruption to your current operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-16 bg-gradient-to-b from-navy-blue to-mountain-blue text-alpine-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center font-inter">Key Benefits</h2>
            <p className="text-xl mb-10 text-center font-open-sans">
              What you'll gain from our AI Implementation Plan:
            </p>
            <div className="space-y-6">
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 font-inter">Improved Efficiency</h3>
                <p className="font-open-sans">
                  Automate repetitive tasks and streamline workflows to free up valuable time and resources.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 font-inter">Data-Driven Decisions</h3>
                <p className="font-open-sans">
                  Leverage AI to analyze data and gain actionable insights for better decision-making.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 font-inter">Enhanced Customer Experience</h3>
                <p className="font-open-sans">
                  Personalize customer interactions and improve satisfaction with AI-powered solutions.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 font-inter">Competitive Advantage</h3>
                <p className="font-open-sans">
                  Stay ahead of the curve by adopting AI technologies and gaining a competitive edge in your industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-6 font-inter">Ready to Transform Your Business with AI?</h2>
          <p className="text-xl text-mountain-blue mb-8 font-open-sans">
            Schedule a consultation to discuss your AI implementation goals and how we can help you achieve them.
          </p>
          <div className="space-y-4">
            <a
              href="https://outlook.office.com/owa/calendar/ScheduleYourAICoachingSessionatSherpaTechAI@awarehousedc.com/bookings/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy-blue hover:bg-mountain-blue text-alpine-white font-bold py-3 px-8 rounded-lg transition duration-300 font-inter"
            >
              Book Your Free Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIImplementationPlan;