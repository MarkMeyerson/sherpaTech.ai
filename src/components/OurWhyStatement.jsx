import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Compass, Heart, Users, Bike, Vote, Lightbulb } from 'lucide-react';

const OurWhyStatement = () => {
  const patternItems = [
    { icon: Users, text: 'Teaching adults computer skills' },
    { icon: Lightbulb, text: 'Mentoring high school students on AI' },
    { icon: Bike, text: 'Restoring bikes for kids through Phoenix Bikes' },
    { icon: Heart, text: 'Refurbishing donated scooters to re-donate to local refugees in need of transit through VCDC' },
    { icon: Vote, text: 'Working as an election poll worker to maintain democratic systems' },
  ];

  return (
    <div className="bg-pearl-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-navy-blue to-mountain-blue text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Why SherpaTech?
            </h1>
            <p className="text-xl text-ice-blue">
              The story behind our mission
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Section 1: The Sherpa Philosophy */}
          <section className="bg-white rounded-xl p-8 md:p-10 shadow-lg border-l-4 border-navy-blue">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-ice-blue p-3 rounded-full">
                <Mountain className="w-8 h-8 text-navy-blue" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-blue">
                The Sherpa Philosophy
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Sherpas are the mountain guides who help climbers navigate treacherous terrain safely.
                They don't carry you up the mountain. They show you how to read the conditions, use the
                right gear, and trust your own footing. They build your confidence so you know the summit
                isn't just achievable—it's achievable by <em>you</em>.
              </p>
              <p>
                That's our approach to AI transformation. We guide, we teach, we build capability.
                The climb is yours, and we make sure you have the skills and confidence to reach
                the top on your own.
              </p>
            </div>
          </section>

          {/* Section 2: The Pattern */}
          <section className="bg-white rounded-xl p-8 md:p-10 shadow-lg border-l-4 border-mountain-blue">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-ice-blue p-3 rounded-full">
                <Compass className="w-8 h-8 text-navy-blue" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-blue">
                The Pattern
              </h2>
            </div>

            {/* Headshot and intro - responsive layout */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {/* Headshot */}
              <div className="flex flex-col items-center md:items-start flex-shrink-0">
                <div className="relative">
                  <img
                    src="/mark-meyerson-headshot.gif"
                    alt="Mark Meyerson, Founder of SherpaTech.AI"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-ice-blue"></div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold text-navy-blue">Mark Meyerson</h3>
                  <p className="text-gray-600">Founder, SherpaTech.AI</p>
                </div>
              </div>

              {/* Intro text */}
              <div className="flex-1">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  For my whole life, I've been doing the same work in different forms:
                </p>
                <ul className="space-y-4">
                  {patternItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="bg-ice-blue p-2 rounded-lg flex-shrink-0 mt-0.5">
                        <item.icon className="w-5 h-5 text-navy-blue" />
                      </div>
                      <span className="text-gray-700 text-lg">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed font-medium border-t border-gray-200 pt-6">
              The pattern is always the same: restore capability, teach independence, give back, close the circle.
            </p>
          </section>

          {/* Section 3: Why This Matters Now */}
          <section className="bg-white rounded-xl p-8 md:p-10 shadow-lg border-l-4 border-indigo-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-ice-blue p-3 rounded-full">
                <Lightbulb className="w-8 h-8 text-navy-blue" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-blue">
                Why This Matters Now
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                After 30 years in technology transformation, I've watched too many nonprofits get
                locked into expensive vendor dependencies when they should be building their own
                capability. Too many talented staff members get overlooked because "they're not technical."
              </p>
              <p>
                AI changes that equation. Now, people who understand their work can build solutions—if
                someone teaches them how.
              </p>
              <p>
                That's what SherpaTech does. We don't build solutions and disappear. We implement
                WITH you, teaching your team, so you own the knowledge and can evolve independently.
              </p>
            </div>
          </section>

          {/* Section 4: Honoring the Inspiration */}
          <section className="bg-white rounded-xl p-8 md:p-10 shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-ice-blue p-3 rounded-full">
                <Heart className="w-8 h-8 text-navy-blue" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-blue">
                Honoring the Inspiration
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                I named this business after Sherpas because their cultural tradition of service
                inspired our methodology. And we honor that inspiration by donating a portion of
                all profits to support Sherpa communities through the Sherpa Support Foundation.
              </p>
              <p className="font-medium text-navy-blue">
                If you're going to be inspired by a tradition, you should actually serve it.
              </p>
            </div>
          </section>

          {/* Closing Quote */}
          <section className="bg-gradient-to-br from-navy-blue to-mountain-blue rounded-xl p-8 md:p-12 text-center">
            <blockquote className="text-2xl md:text-3xl font-semibold text-white leading-relaxed mb-4">
              "We build capability, not dependency. Organizations with limited budgets deserve maximum mission impact."
            </blockquote>
            <div className="w-16 h-1 bg-ice-blue mx-auto rounded-full"></div>
          </section>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              Start Your Journey
            </Link>
            <a
              href="https://claude-code-phi.vercel.app/assessment"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-navy-blue font-semibold rounded-lg border-2 border-navy-blue hover:bg-navy-blue hover:text-white transition-all duration-300 w-full sm:w-auto"
            >
              Take the Assessment
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OurWhyStatement;
