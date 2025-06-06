
import React from 'react';

const OurWhyStatement = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800 bg-gray-50">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">SherpaTech.AI - Our Why</h1>
      </header>

      <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">Our Mission</h2>
        <p className="text-lg leading-relaxed mb-4">
          I believe small business owners and individuals at any career stage deserve to unleash their highest-level skills and expertise, 
          not waste time on grunt work that AI can handle in seconds. As your AI guide, I won't carry your business up the peak—I'll walk 
          alongside you, teaching you to navigate these powerful tools yourself.
        </p>
      </section>

      <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">My Founder Journey</h2>
        <p className="text-lg leading-relaxed mb-4">
          My founder journey reflects three decades of Microsoft advocacy, from MCSE certification in the early days through active 
          participation in today's Azure and AI communities where I regularly present on Copilot and agent development. Having guided 
          hundreds of organizations through critical Microsoft transitions and watched the platform evolve from on-premises solutions 
          to today's AI-integrated ecosystem, I've developed a deep appreciation for Microsoft's unique approach to enterprise AI.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          The catalyst moment came while working at the World Bank, where I saw them deploy enterprise-level AI training for staff 
          with million-dollar budgets. I immediately recognized a massive gap: small businesses and individual professionals were 
          locked out of these same capabilities, when the reality is that AI tools costing hundreds of dollars per day just years 
          ago are now available for dollars per day and can be mastered in weeks.
        </p>
        <p className="text-lg leading-relaxed">
          What sets Microsoft apart and what drove me to focus SherpaTech.AI on their platform is how they've solved the fundamental 
          challenge of AI adoption. By embedding LLM-agnostic AI directly into tools everyone already knows, with immediate access 
          to organizational data, they've collapsed the traditional barriers to AI implementation. Small businesses can now deploy 
          sophisticated solutions in weeks rather than years, on a platform that continuously evolves without requiring expensive 
          redevelopment cycles.
        </p>
      </section>

      <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">Our Approach: Teaching You to Fish</h2>
        <p className="text-lg leading-relaxed mb-4">
          Here's what matters most—I don't just implement AI for you. I teach you to fish. When we're done, you can independently 
          build, develop, and deploy AI workflows that transform how you work. My passion is showing you how to harness AI as your 
          oxygen tank for productivity, freeing you from boring grunt work so you can focus on creativity, innovation, and strategic 
          thinking.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Late-career professionals can finally focus on the strategic expertise they've built over decades instead of routine tasks. 
          Unemployed individuals can showcase AI-powered efficiency improvements that make them irresistible to employers. Small 
          business owners can turn cocktail napkin ideas into tested, deployed strategies.
        </p>
        <p className="text-lg leading-relaxed font-semibold text-gray-700">
          The transformation isn't just about 3-4x capacity—it's about knowing how to ask AI the right questions in the right way to 
          get the answers you need. Because it's not AI that will take your job, it's someone who knows AI that will. And I'm here 
          to make sure that someone is you.
        </p>
      </section>

      <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">The Vision</h2>
        <p className="text-lg leading-relaxed mb-4">
          SherpaTech.AI addresses these challenges by providing specialized AI coaching combined with Microsoft-based training 
          environments. We're developing a platform where clients can safely experiment with custom Copilot agents, Power Platform 
          workflows, and Azure AI services during our structured upskilling programs.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          The view from the summit? A thriving business and career that gives you the freedom to focus on what truly matters—strategic 
          thinking, creative problem-solving, and meaningful work. The technology serves the journey, but the journey serves your 
          life's greater expedition.
        </p>
        <p className="text-lg leading-relaxed">
          Our goal is to become a Microsoft licensing partner, enabling seamless transitions from training to production environments 
          while helping clients consolidate their digital tools into cohesive Microsoft ecosystems that drive real business outcomes.
        </p>
      </section>

      <footer className="text-center mt-12 py-6 border-t border-gray-300">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} SherpaTech.AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OurWhyStatement;
