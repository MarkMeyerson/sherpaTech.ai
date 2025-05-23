import React from 'react';

const TrainingPlan = () => {
  return (
    <div className="min-h-screen bg-pearl-white text-deep-navy">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-mountain-blue to-navy-blue">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-alpine-white mb-4 font-inter">
            5-Week AI Mastery Training
          </h1>
          <p className="text-2xl text-ice-blue mb-8 font-open-sans">
            Your guided expedition to AI proficiency in just 5 hours per week
          </p>
          <div className="bg-ice-blue bg-opacity-10 border border-alpine-white border-opacity-20 p-6 rounded-lg inline-block">
            <p className="text-alpine-white text-lg font-open-sans">
              <strong>Commitment:</strong> 5 hours/week for 5 weeks<br />
              <strong>Structure:</strong> 1-hour intake + five 30-minute weekly sessions + guided practice<br />
              <strong>Outcome:</strong> Master the art of prompting and create your own AI agent
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-6 font-inter">The Journey Overview</h2>
          <p className="text-lg mb-8 font-open-sans">
            At SherpaTech.ai, we believe small business owners deserve to conquer the digital
            mountain without getting lost in the tech wilderness. Our 5-Week AI Mastery Training
            is designed as your expedition map—providing clear guidance, practical tools, and
            expert support to navigate the AI landscape with confidence.
          </p>
          <div className="bg-ice-blue p-8 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-navy-blue mb-4 font-inter">Why This Training Works</h3>
            <ul className="space-y-3 font-open-sans">
              <li className="flex items-start">
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong>Structured Approach:</strong> A clear path with weekly milestones and actionable steps</span>
              </li>
              <li className="flex items-start">
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong>Expert Guidance:</strong> Leverage our 30 years of technology experience</span>
              </li>
              <li className="flex items-start">
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong>Practical Application:</strong> Focus on real-world implementation, not just theory</span>
              </li>
              <li className="flex items-start">
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong>Personalized Journey:</strong> Tailored to your specific goals and business needs</span>
              </li>
              <li className="flex items-start">
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong>Ongoing Support:</strong> Guidance between sessions to ensure your success</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Training Structure Section */}
      <section className="py-16 bg-ice-blue">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-blue mb-12 text-center font-inter">Your 5-Week AI Mastery Journey</h2>

            {/* Intake Session */}
            <div className="mb-16">
              <div className="bg-alpine-white rounded-lg p-8 shadow-md relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-navy-blue text-alpine-white text-xl font-bold py-3 px-6 rounded-full font-inter">
                  Foundation Session
                </div>
                <h3 className="text-2xl font-semibold text-navy-blue mt-6 mb-4 font-inter">1-Hour Personalized Intake</h3>
                <p className="text-mountain-blue mb-6 font-open-sans">
                  We begin with a comprehensive assessment of your goals, current AI knowledge, and specific business needs to create your customized learning path.
                </p>
                <div className="border-l-4 border-mountain-blue pl-4 py-2">
                  <h4 className="font-semibold text-navy-blue font-inter">What to expect:</h4>
                  <ul className="space-y-2 mt-2 font-open-sans">
                    <li>Detailed discussion of your business and how AI can enhance it</li>
                    <li>Assessment of your current AI knowledge and technical comfort</li>
                    <li>Identification of specific AI applications relevant to your goals</li>
                    <li>Creation of your personalized 5-week learning roadmap</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Weekly Sessions */}
            <div className="space-y-8">
              <div className="relative">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-mountain-blue transform -translate-x-1/2 z-0"></div>

                {/* Week 1 */}
                <div className="relative z-10 md:flex items-center mb-12">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">1</div>
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                    <div className="md:hidden flex items-center mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">1</div>
                      <h3 className="text-xl font-semibold text-navy-blue font-inter">AI Foundations & Prompt Basics</h3>
                    </div>
                    <div className="hidden md:block">
                      <h3 className="text-xl font-semibold text-navy-blue mb-2 font-inter">AI Foundations & Prompt Basics</h3>
                      <p className="text-mountain-blue font-open-sans">Establish core knowledge about AI capabilities and limitations, and learn the fundamentals of effective prompting.</p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <div className="bg-alpine-white rounded-lg p-6 shadow-md">
                      <div className="md:hidden mb-4">
                        <p className="text-mountain-blue font-open-sans">Establish core knowledge about AI capabilities and limitations, and learn the fundamentals of effective prompting.</p>
                      </div>
                      <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                      <ul className="space-y-1 font-open-sans">
                        <li>• Understanding AI strengths and limitations</li>
                        <li>• Basic prompt structure and components</li>
                        <li>• The art of clear instruction writing</li>
                        <li>• Applying these skills to a real business task</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Week 2 */}
                <div className="relative z-10 md:flex items-center mb-12">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">2</div>
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0 md:order-1">
                    <div className="bg-alpine-white rounded-lg p-6 shadow-md">
                      <div className="md:hidden mb-4">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">2</div>
                          <h3 className="text-xl font-semibold text-navy-blue font-inter">Advanced Prompting Techniques</h3>
                        </div>
                        <p className="text-mountain-blue font-open-sans">Elevate your prompting skills with advanced techniques for more powerful and precise AI interactions.</p>
                      </div>
                      <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                      <ul className="space-y-1 font-open-sans">
                        <li>• Role and context setting in prompts</li>
                        <li>• Using examples for better results (few-shot prompting)</li>
                        <li>• Breaking complex tasks into manageable steps</li>
                        <li>• Creating prompt templates for consistent results</li>
                      </ul>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:order-0">
                    <div className="hidden md:block">
                      <h3 className="text-xl font-semibold text-navy-blue mb-2 font-inter">Advanced Prompting Techniques</h3>
                      <p className="text-mountain-blue font-open-sans">Elevate your prompting skills with advanced techniques for more powerful and precise AI interactions.</p>
                    </div>
                  </div>
                </div>

                {/* Week 3 */}
                <div className="relative z-10 md:flex items-center mb-12">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">3</div>
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                    <div className="md:hidden flex items-center mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">3</div>
                      <h3 className="text-xl font-semibold text-navy-blue font-inter">AI Tools & Integrations</h3>
                    </div>
                    <div className="hidden md:block">
                      <h3 className="text-xl font-semibold text-navy-blue mb-2 font-inter">AI Tools & Integrations</h3>
                      <p className="text-mountain-blue font-open-sans">Discover how to connect AI capabilities with your existing workflows and business systems.</p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <div className="bg-alpine-white rounded-lg p-6 shadow-md">
                      <div className="md:hidden mb-4">
                        <p className="text-mountain-blue font-open-sans">Discover how to connect AI capabilities with your existing workflows and business systems.</p>
                      </div>
                      <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                      <ul className="space-y-1 font-open-sans">
                        <li>• Navigating the AI tool ecosystem</li>
                        <li>• Selecting the right tools for your business needs</li>
                        <li>• Integrating AI capabilities into existing workflows</li>
                        <li>• Setting up your first automation with AI</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Week 4 */}
                <div className="relative z-10 md:flex items-center mb-12">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">4</div>
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0 md:order-1">
                    <div className="bg-alpine-white rounded-lg p-6 shadow-md">
                      <div className="md:hidden mb-4">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">4</div>
                          <h3 className="text-xl font-semibold text-navy-blue font-inter">AI Agent Planning & Design</h3>
                        </div>
                        <p className="text-mountain-blue font-open-sans">Begin creating your customized AI agent by defining its purpose, capabilities, and interaction model.</p>
                      </div>
                      <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                      <ul className="space-y-1 font-open-sans">
                        <li>• Identifying the perfect use case for your AI agent</li>
                        <li>• Designing conversation flows and user interactions</li>
                        <li>• Planning knowledge requirements and data sources</li>
                        <li>• Creating a development roadmap for your agent</li>
                      </ul>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:order-0">
                    <div className="hidden md:block">
                      <h3 className="text-xl font-semibold text-navy-blue mb-2 font-inter">AI Agent Planning & Design</h3>
                      <p className="text-mountain-blue font-open-sans">Begin creating your customized AI agent by defining its purpose, capabilities, and interaction model.</p>
                    </div>
                  </div>
                </div>

                {/* Week 5 */}
                <div className="relative z-10 md:flex items-center">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">5</div>
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                    <div className="md:hidden flex items-center mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">5</div>
                      <h3 className="text-xl font-semibold text-navy-blue font-inter">Agent Creation & Deployment</h3>
                    </div>
                    <div className="hidden md:block">
                      <h3 className="text-xl font-semibold text-navy-blue mb-2 font-inter">Agent Creation & Deployment</h3>
                      <p className="text-mountain-blue font-open-sans">Build and launch your personalized AI agent to solve real business challenges.</p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <div className="bg-alpine-white rounded-lg p-6 shadow-md">
                      <div className="md:hidden mb-4">
                        <p className="text-mountain-blue font-open-sans">Build and launch your personalized AI agent to solve real business challenges.</p>
                      </div>
                      <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>
                      <ul className="space-y-1 font-open-sans">
                        <li>• Building your agent using the right platform</li>
                        <li>• Writing effective agent instructions</li>
                        <li>• Testing and refining your agent's performance</li>
                        <li>• Deployment and integration into your workflow</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Between Sessions Support */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-8 font-inter">Your Support Between Summit Sessions</h2>
          <p className="text-lg mb-8 font-open-sans">
            The journey doesn't stop when a session ends. Between our weekly meetings, you'll have:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-alpine-white p-6 rounded-lg shadow-md border-t-4 border-navy-blue">
              <h3 className="text-xl font-semibold text-navy-blue mb-3 font-inter">Guided Practice Exercises</h3>
              <p className="font-open-sans">
                Structured activities designed to reinforce new skills and build confidence through hands-on application.
              </p>
            </div>
            <div className="bg-alpine-white p-6 rounded-lg shadow-md border-t-4 border-navy-blue">
              <h3 className="text-xl font-semibold text-navy-blue mb-3 font-inter">Resource Library Access</h3>
              <p className="font-open-sans">
                Curated materials including tutorials, prompt templates, and reference guides to support your learning.
              </p>
            </div>
            <div className="bg-alpine-white p-6 rounded-lg shadow-md border-t-4 border-navy-blue">
              <h3 className="text-xl font-semibold text-navy-blue mb-3 font-inter">Email Support</h3>
              <p className="font-open-sans">
                Direct access to your Sherpa for questions, feedback, and guidance as you implement new techniques.
              </p>
            </div>
            <div className="bg-alpine-white p-6 rounded-lg shadow-md border-t-4 border-navy-blue">
              <h3 className="text-xl font-semibold text-navy-blue mb-3 font-inter">Progress Tracking</h3>
              <p className="font-open-sans">
                Clear milestones and achievement markers to monitor your development and celebrate your wins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-16 bg-gradient-to-b from-navy-blue to-mountain-blue text-alpine-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center font-inter">Your Summit Achievements</h2>
            <p className="text-xl mb-10 text-center font-open-sans">
              By the end of your 5-week journey, you'll have reached these peaks:
            </p>
            <div className="space-y-6">
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 font-inter">Mastery of AI Prompting</h3>
                <p className="font-open-sans">
                  You'll craft precise, effective prompts that deliver exactly what you need—saving time and producing
                  higher-quality results than 95% of AI users.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 font-inter">Your Custom AI Agent</h3>
                <p className="font-open-sans">
                  You'll have built and deployed your own AI agent that addresses a specific business challenge—automating
                  tasks and enhancing productivity.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 font-inter">AI Integration Strategy</h3>
                <p className="font-open-sans">
                  You'll possess a clear roadmap for further integrating AI into your business operations, with specific
                  next steps and priority areas.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 font-inter">AI Confidence</h3>
                <p className="font-open-sans">
                  You'll approach AI with confidence and clarity, knowing how to leverage these tools effectively and
                  continuing to evolve your skills independently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-6 font-inter">Ready to Begin Your AI Journey?</h2>
          <p className="text-xl text-mountain-blue mb-8 font-open-sans">
            Take the first step toward AI mastery with a personalized consultation to discuss your goals and how our
            5-Week AI Mastery Training can help you achieve them.
          </p>
          <div className="space-y-4">
            <a
              href="https://outlook.office.com/owa/calendar/ScheduleYourAICoachingSessionatSherpaTechAI@awarehousedc.com/bookings/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy-blue hover:bg-mountain-blue text-alpine-white font-bold py-3 px-8 rounded-lg transition duration-300 font-inter"
            >
              Schedule Your Free Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingPlan;
