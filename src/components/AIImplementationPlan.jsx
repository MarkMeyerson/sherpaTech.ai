import React from 'react';

const AIImplementationPlan = () => {
  const phases = [
    {
      number: 1,
      title: "Business Owner AI Literacy",
      duration: "2 weeks",
      description: "Building foundational knowledge for business leaders",
      components: [
        "AI fundamentals workshop",
        "Current capabilities assessment",
        "Strategic applications planning",
        "Leadership vision development"
      ]
    },
    {
      number: 2,
      title: "Senior Staff AI Literacy",
      duration: "3 weeks",
      description: "Preparing your team to lead AI initiatives",
      components: [
        "Department-specific AI use cases",
        "Change management principles",
        "Ethical AI considerations",
        "Implementation principles"
      ]
    },
    {
      number: 3,
      title: "Needs Assessment",
      duration: "2-3 weeks",
      description: "Comprehensive evaluation of your business",
      components: [
        "Security & governance audit",
        "Operational workflow analysis",
        "Data capability assessment",
        "AI opportunity identification"
      ]
    },
    {
      number: 4,
      title: "AI Readiness Plan",
      duration: "2 weeks",
      description: "Creating your roadmap to AI adoption",
      components: [
        "Security framework development",
        "Staff training curriculum",
        "Implementation timeline",
        "ROI projections & metrics"
      ]
    },
    {
      number: 5,
      title: "Implementation & Support",
      duration: "Ongoing",
      description: "Executing your AI transformation",
      components: [
        "Phased deployment strategy",
        "Staff training execution",
        "Progress monitoring",
        "Continuous optimization"
      ]
    }
  ];

  return (
    <div className="w-full bg-pearl-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-navy-blue mb-6">Your AI Implementation Journey</h2>
      <p className="text-lg mb-8">
        Our structured approach ensures your business implements AI strategically and effectively.
        Here's what your journey with SherpaTech.ai looks like:
      </p>

      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-mountain-blue transform md:translate-x-0 -translate-x-1/2 z-0"></div>

        {/* Timeline Items */}
        <div className="relative z-10">
          {phases.map((phase, index) => (
            <div key={index} className={`flex flex-col md:flex-row gap-4 mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Phase Number Bubble */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-navy-blue text-alpine-white flex items-center justify-center font-bold transform -translate-x-1/2 z-20">
                {phase.number}
              </div>
              
              {/* Content Box */}
              <div className="md:w-1/2 ml-12 md:ml-0 bg-ice-blue rounded-lg p-6 shadow-md border-l-4 border-navy-blue">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-navy-blue">{phase.title}</h3>
                  <span className="text-sm bg-navy-blue text-alpine-white px-3 py-1 rounded-full">
                    {phase.duration}
                  </span>
                </div>
                <p className="mb-4">{phase.description}</p>
                <ul className="list-disc list-inside text-mountain-blue space-y-1">
                  {phase.components.map((component, cIndex) => (
                    <li key={cIndex}>{component}</li>
                  ))}
                </ul>
              </div>
              
              {/* Empty space for alignment */}
              <div className="hidden md:block md:w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-navy-blue text-alpine-white rounded-lg p-6 mt-8 text-center">
        <h3 className="text-2xl font-bold mb-3">Ready to Start Your AI Journey?</h3>
        <p className="mb-4">
          The path to AI transformation begins with a single step. Schedule your initial consultation today.
        </p>
        <button className="bg-alpine-white text-navy-blue hover:bg-ice-blue font-bold py-2 px-6 rounded-md transition duration-300">
          Book Your Free Consultation
        </button>
      </div>
    </div>
  );
};

export default AIImplementationPlan;