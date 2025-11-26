// src/components/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, GraduationCap } from 'lucide-react';

const About = () => {
  const services = [
    {
      icon: Target,
      title: 'AI Strategy & Assessment',
      description: 'Evaluate your readiness and create a practical roadmap'
    },
    {
      icon: Users,
      title: 'Hands-On Implementation',
      description: 'Build solutions WITH you, not just FOR you'
    },
    {
      icon: GraduationCap,
      title: 'Team Capability Building',
      description: 'Train your staff so you own the knowledge'
    }
  ];

  return (
    <section id="about" className="bg-pearl-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-navy-blue to-mountain-blue text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your AI Strategy Sherpa
            </h1>
            <p className="text-xl md:text-2xl text-ice-blue">
              Guiding your business through AI transformation
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Intro */}
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              SherpaTech.AI guides small and medium businesses through AI transformation.
              We don't just implement solutions—we teach your team to build and maintain them independently.
            </p>
          </div>

          {/* What We Do */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-blue text-center mb-8">
              What We Do
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-ice-blue"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-ice-blue p-3 rounded-full">
                      <service.icon className="w-8 h-8 text-navy-blue" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-navy-blue text-center mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Who We Serve */}
          <div className="bg-ice-blue rounded-lg p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-navy-blue mb-4 text-center">
              Who We Serve
            </h2>
            <p className="text-gray-700 text-center text-lg">
              SMBs and nonprofits who want AI's benefits without enterprise budgets or vendor lock-in.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://claude-code-phi.vercel.app/assessment"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              Take Our AI Readiness Assessment
            </a>
            <Link
              to="/our-why"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-navy-blue font-semibold rounded-lg border-2 border-navy-blue hover:bg-navy-blue hover:text-white transition-all duration-300 w-full sm:w-auto"
            >
              Learn Our Approach
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
