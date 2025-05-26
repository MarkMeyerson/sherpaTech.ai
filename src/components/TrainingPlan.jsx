import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from "react-router-dom";
import { theme } from "./theme";
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.2s ease-in-out; from './components/Services';
  
  &:hover {
    transform: translateY(-2px);gPlan from './components/TrainingPlan';
  }
`;

const TrainingPlan = () => {
  return (
    <div className="min-h-screen bg-pearl-white text-deep-navy">gApp from './AITrainingApp';  // Add this import
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-mountain-blue to-navy-blue">imple error boundary for debugging
        <div className="container mx-auto px-4">ary extends React.Component {
          <h1 className="text-4xl md:text-5xl font-bold text-alpine-white mb-4 font-inter">  constructor(props) {
            5-Week AI Mastery Training
          </h1>
          <p className="text-2xl text-ice-blue mb-8 font-open-sans">
            Your guided expedition to AI proficiency in just 5 hours per week
          </p>
          <div className="bg-ice-blue bg-opacity-10 border border-alpine-white border-opacity-20 p-6 rounded-lg inline-block">
            <p className="text-alpine-white text-lg font-open-sans">
              <strong>Commitment:</strong> 5 hours/week for 5 weeks<br />
              <strong>Structure:</strong> 1-hour intake + five 30-minute weekly sessions + guided practice<br />sage}</div>;
              <strong>Outcome:</strong> Master the art of prompting and create your own AI agent
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-6 font-inter">The Journey Overview</h2>>
          <p className="text-lg mb-8 font-open-sans">
            At SherpaTech.ai, we believe small business owners deserve to conquer the digital />
            mountain without getting lost in the tech wilderness. Our 5-Week AI Mastery Training
            is designed as your expedition map—providing clear guidance, practical tools, and
            expert support to navigate the AI landscape with confidence.
          </p>
          <div className="bg-ice-blue p-8 rounded-lg mb-8">ath="/about" element={<About />} />
            <h3 className="text-xl font-semibold text-navy-blue mb-4 font-inter">Why This Training Works</h3> path="/contact" element={<ContactForm />} />
            <ul className="space-y-3 font-open-sans">
              <li className="flex items-start">ute path="/training" element={<TrainingPlan />} />
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">e" element={<AITrainingApp />} />
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
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">g>Personalized Journey:</strong> Tailored to your specific goals and business needs</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>mlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <span><strong>Practical Application:</strong> Focus on real-world implementation, not just theory</span>ath fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </li>
              <li className="flex items-start">iv>
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">span><strong>Ongoing Support:</strong> Guidance between sessions to ensure your success</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">li>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />ul>
                  </svg>
                </div>        </div>
                <span><strong>Personalized Journey:</strong> Tailored to your specific goals and business needs</span>
              </li>
              <li className="flex items-start">
                <div className="bg-mountain-blue text-alpine-white rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />          <div className="max-w-4xl mx-auto">
                  </svg>l font-bold text-navy-blue mb-12 text-center font-inter">Your 5-Week AI Mastery Journey</h2>
                </div>
                <span><strong>Ongoing Support:</strong> Guidance between sessions to ensure your success</span>
              </li>
            </ul>ine-white rounded-lg p-8 shadow-md relative">
          </div>lassName="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-navy-blue text-alpine-white text-xl font-bold py-3 px-6 rounded-full font-inter">
        </div>
      </section>

      {/* Training Structure Section */}lassName="text-mountain-blue mb-6 font-open-sans">
      <section className="py-16 bg-ice-blue">urrent AI knowledge, and specific business needs to create your customized learning path.
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">pl-4 py-2">
            <h2 className="text-3xl font-bold text-navy-blue mb-12 text-center font-inter">Your 5-Week AI Mastery Journey</h2>h4>

            {/* Intake Session */}
            <div className="mb-16">ort</li>
              <div className="bg-alpine-white rounded-lg p-8 shadow-md relative">>Identification of specific AI applications relevant to your goals</li>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-navy-blue text-alpine-white text-xl font-bold py-3 px-6 rounded-full font-inter">i>Creation of your personalized 5-week learning roadmap</li>
                  Foundation Sessionul>
                </div>div>
                <h3 className="text-2xl font-semibold text-navy-blue mt-6 mb-4 font-inter">1-Hour Personalized Intake</h3>              </div>
                <p className="text-mountain-blue mb-6 font-open-sans">
                  We begin with a comprehensive assessment of your goals, current AI knowledge, and specific business needs to create your customized learning path.
                </p>
                <div className="border-l-4 border-mountain-blue pl-4 py-2">
                  <h4 className="font-semibold text-navy-blue font-inter">What to expect:</h4>              <div className="relative">
                  <ul className="space-y-2 mt-2 font-open-sans">="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-mountain-blue transform -translate-x-1/2 z-0"></div>
                    <li>Detailed discussion of your business and how AI can enhance it</li>
                    <li>Assessment of your current AI knowledge and technical comfort</li>
                    <li>Identification of specific AI applications relevant to your goals</li>
                    <li>Creation of your personalized 5-week learning roadmap</li>center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">1</div>
                  </ul>
                </div>
              </div> className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">1</div>
            </div>ibold text-navy-blue font-inter">AI Foundations & Prompt Basics</h3>

            {/* Weekly Sessions */}
            <div className="space-y-8">className="text-xl font-semibold text-navy-blue mb-2 font-inter">AI Foundations & Prompt Basics</h3>
              <div className="relative"> className="text-mountain-blue font-open-sans">Establish core knowledge about AI capabilities and limitations, and learn the fundamentals of effective prompting.</p>
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-mountain-blue transform -translate-x-1/2 z-0"></div>

                {/* Week 1 */}
                <div className="relative z-10 md:flex items-center mb-12">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">1</div>lassName="md:hidden mb-4">
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">t AI capabilities and limitations, and learn the fundamentals of effective prompting.</p>
                    <div className="md:hidden flex items-center mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">1</div>nter">You'll master:</h4>
                      <h3 className="text-xl font-semibold text-navy-blue font-inter">AI Foundations & Prompt Basics</h3>
                    </div>s</li>
                    <div className="hidden md:block">
                      <h3 className="text-xl font-semibold text-navy-blue mb-2 font-inter">AI Foundations & Prompt Basics</h3>>• The art of clear instruction writing</li>
                      <p className="text-mountain-blue font-open-sans">Establish core knowledge about AI capabilities and limitations, and learn the fundamentals of effective prompting.</p>i>• Applying these skills to a real business task</li>
                    </div>ul>
                  </div>div>
                  <div className="md:w-1/2 md:pl-8">                  </div>
                    <div className="bg-alpine-white rounded-lg p-6 shadow-md">
                      <div className="md:hidden mb-4">
                        <p className="text-mountain-blue font-open-sans">Establish core knowledge about AI capabilities and limitations, and learn the fundamentals of effective prompting.</p>
                      </div>
                      <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">2</div>
                      <ul className="space-y-1 font-open-sans">text-right mb-4 md:mb-0 md:order-1">
                        <li>• Understanding AI strengths and limitations</li>-6 shadow-md">
                        <li>• Basic prompt structure and components</li>
                        <li>• The art of clear instruction writing</li>
                        <li>• Applying these skills to a real business task</li> className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">2</div>
                      </ul>
                    </div>v>
                  </div> with advanced techniques for more powerful and precise AI interactions.</p>
                </div>
 font-inter">You'll master:</h4>
                {/* Week 2 */}
                <div className="relative z-10 md:flex items-center mb-12">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">2</div>)</li>
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0 md:order-1">>• Breaking complex tasks into manageable steps</li>
                    <div className="bg-alpine-white rounded-lg p-6 shadow-md">i>• Creating prompt templates for consistent results</li>
                      <div className="md:hidden mb-4">ul>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">2</div>
                          <h3 className="text-xl font-semibold text-navy-blue font-inter">Advanced Prompting Techniques</h3>
                        </div>
                        <p className="text-mountain-blue font-open-sans">Elevate your prompting skills with advanced techniques for more powerful and precise AI interactions.</p>className="text-xl font-semibold text-navy-blue mb-2 font-inter">Advanced Prompting Techniques</h3>
                      </div> className="text-mountain-blue font-open-sans">Elevate your prompting skills with advanced techniques for more powerful and precise AI interactions.</p>
                      <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>div>
                      <ul className="space-y-1 font-open-sans">                  </div>
                        <li>• Role and context setting in prompts</li>
                        <li>• Using examples for better results (few-shot prompting)</li>
                        <li>• Breaking complex tasks into manageable steps</li>
                        <li>• Creating prompt templates for consistent results</li>
                      </ul>center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">3</div>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:order-0"> className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">3</div>
                    <div className="hidden md:block">ibold text-navy-blue font-inter">AI Tools & Integrations</h3>
                      <h3 className="text-xl font-semibold text-navy-blue mb-2 font-inter">Advanced Prompting Techniques</h3>
                      <p className="text-mountain-blue font-open-sans">Elevate your prompting skills with advanced techniques for more powerful and precise AI interactions.</p>
                    </div>className="text-xl font-semibold text-navy-blue mb-2 font-inter">AI Tools & Integrations</h3>
                  </div> className="text-mountain-blue font-open-sans">Discover how to connect AI capabilities with your existing workflows and business systems.</p>
                </div>

                {/* Week 3 */}
                <div className="relative z-10 md:flex items-center mb-12">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">3</div>lassName="md:hidden mb-4">
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">pabilities with your existing workflows and business systems.</p>
                    <div className="md:hidden flex items-center mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">3</div>b-2 font-inter">You'll master:</h4>
                      <h3 className="text-xl font-semibold text-navy-blue font-inter">AI Tools & Integrations</h3>
                    </div>
                    <div className="hidden md:block">eeds</li>
                      <h3 className="text-xl font-semibold text-navy-blue mb-2 font-inter">AI Tools & Integrations</h3>>• Integrating AI capabilities into existing workflows</li>
                      <p className="text-mountain-blue font-open-sans">Discover how to connect AI capabilities with your existing workflows and business systems.</p>i>• Setting up your first automation with AI</li>
                    </div>ul>
                  </div>div>
                  <div className="md:w-1/2 md:pl-8">                  </div>
                    <div className="bg-alpine-white rounded-lg p-6 shadow-md">
                      <div className="md:hidden mb-4">
                        <p className="text-mountain-blue font-open-sans">Discover how to connect AI capabilities with your existing workflows and business systems.</p>
                      </div>
                      <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">4</div>
                      <ul className="space-y-1 font-open-sans">text-right mb-4 md:mb-0 md:order-1">
                        <li>• Navigating the AI tool ecosystem</li>-6 shadow-md">
                        <li>• Selecting the right tools for your business needs</li>
                        <li>• Integrating AI capabilities into existing workflows</li>
                        <li>• Setting up your first automation with AI</li> className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">4</div>
                      </ul>
                    </div>v>
                  </div>d AI agent by defining its purpose, capabilities, and interaction model.</p>
                </div>
u'll master:</h4>
                {/* Week 4 */}
                <div className="relative z-10 md:flex items-center mb-12">i>
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">4</div></li>
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0 md:order-1">>• Planning knowledge requirements and data sources</li>
                    <div className="bg-alpine-white rounded-lg p-6 shadow-md">i>• Creating a development roadmap for your agent</li>
                      <div className="md:hidden mb-4">ul>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">4</div>
                          <h3 className="text-xl font-semibold text-navy-blue font-inter">AI Agent Planning & Design</h3>
                        </div>
                        <p className="text-mountain-blue font-open-sans">Begin creating your customized AI agent by defining its purpose, capabilities, and interaction model.</p>className="text-xl font-semibold text-navy-blue mb-2 font-inter">AI Agent Planning & Design</h3>
                      </div> className="text-mountain-blue font-open-sans">Begin creating your customized AI agent by defining its purpose, capabilities, and interaction model.</p>
                      <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>div>
                      <ul className="space-y-1 font-open-sans">                  </div>
                        <li>• Identifying the perfect use case for your AI agent</li>
                        <li>• Designing conversation flows and user interactions</li>
                        <li>• Planning knowledge requirements and data sources</li>
                        <li>• Creating a development roadmap for your agent</li>
                      </ul>center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">5</div>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:order-0"> className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">5</div>
                    <div className="hidden md:block">ibold text-navy-blue font-inter">Agent Creation & Deployment</h3>
                      <h3 className="text-xl font-semibold text-navy-blue mb-2 font-inter">AI Agent Planning & Design</h3>
                      <p className="text-mountain-blue font-open-sans">Begin creating your customized AI agent by defining its purpose, capabilities, and interaction model.</p>
                    </div>className="text-xl font-semibold text-navy-blue mb-2 font-inter">Agent Creation & Deployment</h3>
                  </div> className="text-mountain-blue font-open-sans">Build and launch your personalized AI agent to solve real business challenges.</p>
                </div>

                {/* Week 5 */}
                <div className="relative z-10 md:flex items-center">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-navy-blue text-alpine-white font-bold border-4 border-ice-blue absolute left-1/2 transform -translate-x-1/2 font-inter">5</div>lassName="md:hidden mb-4">
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">lized AI agent to solve real business challenges.</p>
                    <div className="md:hidden flex items-center mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-blue text-alpine-white font-bold mr-2 font-inter">5</div>er">You'll master:</h4>
                      <h3 className="text-xl font-semibold text-navy-blue font-inter">Agent Creation & Deployment</h3>
                    </div>
                    <div className="hidden md:block">
                      <h3 className="text-xl font-semibold text-navy-blue mb-2 font-inter">Agent Creation & Deployment</h3>>• Testing and refining your agent's performance</li>
                      <p className="text-mountain-blue font-open-sans">Build and launch your personalized AI agent to solve real business challenges.</p>i>• Deployment and integration into your workflow</li>
                    </div>ul>
                  </div>div>
                  <div className="md:w-1/2 md:pl-8">div>
                    <div className="bg-alpine-white rounded-lg p-6 shadow-md">div>
                      <div className="md:hidden mb-4">div>
                        <p className="text-mountain-blue font-open-sans">Build and launch your personalized AI agent to solve real business challenges.</p>div>
                      </div>
                      <h4 className="font-semibold text-navy-blue mb-2 font-inter">You'll master:</h4>        </div>
                      <ul className="space-y-1 font-open-sans">
                        <li>• Building your agent using the right platform</li>
                        <li>• Writing effective agent instructions</li>
                        <li>• Testing and refining your agent's performance</li>
                        <li>• Deployment and integration into your workflow</li>
                      </ul>mmit Sessions</h2>
                    </div>lassName="text-lg mb-8 font-open-sans">
                  </div>nds. Between our weekly meetings, you'll have:
                </div>
              </div>
            </div>p-6 rounded-lg shadow-md border-t-4 border-navy-blue">
          </div>
        </div>lassName="font-open-sans">
      </section>ructured activities designed to reinforce new skills and build confidence through hands-on application.

      {/* Between Sessions Support */}
      <section className="py-16 container mx-auto px-4">p-6 rounded-lg shadow-md border-t-4 border-navy-blue">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-8 font-inter">Your Support Between Summit Sessions</h2>lassName="font-open-sans">
          <p className="text-lg mb-8 font-open-sans">rated materials including tutorials, prompt templates, and reference guides to support your learning.
            The journey doesn't stop when a session ends. Between our weekly meetings, you'll have:
          </p>
          <div className="grid md:grid-cols-2 gap-6">p-6 rounded-lg shadow-md border-t-4 border-navy-blue">
            <div className="bg-alpine-white p-6 rounded-lg shadow-md border-t-4 border-navy-blue">
              <h3 className="text-xl font-semibold text-navy-blue mb-3 font-inter">Guided Practice Exercises</h3>lassName="font-open-sans">
              <p className="font-open-sans">rect access to your Sherpa for questions, feedback, and guidance as you implement new techniques.
                Structured activities designed to reinforce new skills and build confidence through hands-on application.
              </p>
            </div>p-6 rounded-lg shadow-md border-t-4 border-navy-blue">
            <div className="bg-alpine-white p-6 rounded-lg shadow-md border-t-4 border-navy-blue">
              <h3 className="text-xl font-semibold text-navy-blue mb-3 font-inter">Resource Library Access</h3>lassName="font-open-sans">
              <p className="font-open-sans">ear milestones and achievement markers to monitor your development and celebrate your wins.
                Curated materials including tutorials, prompt templates, and reference guides to support your learning.p>
              </p>div>
            </div>
            <div className="bg-alpine-white p-6 rounded-lg shadow-md border-t-4 border-navy-blue">        </div>
              <h3 className="text-xl font-semibold text-navy-blue mb-3 font-inter">Email Support</h3>
              <p className="font-open-sans">
                Direct access to your Sherpa for questions, feedback, and guidance as you implement new techniques.
              </p>o-b from-navy-blue to-mountain-blue text-alpine-white">
            </div>
            <div className="bg-alpine-white p-6 rounded-lg shadow-md border-t-4 border-navy-blue">
              <h3 className="text-xl font-semibold text-navy-blue mb-3 font-inter">Progress Tracking</h3>ummit Achievements</h2>
              <p className="font-open-sans">lassName="text-xl mb-10 text-center font-open-sans">
                Clear milestones and achievement markers to monitor your development and celebrate your wins. journey, you'll have reached these peaks:
              </p>
            </div>
          </div>ity-10 p-6 rounded-lg">
        </div>
      </section>
u'll craft precise, effective prompts that deliver exactly what you need—saving time and producing
      {/* Outcomes Section */}gher-quality results than 95% of AI users.
      <section className="py-16 bg-gradient-to-b from-navy-blue to-mountain-blue text-alpine-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">ity-10 p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-center font-inter">Your Summit Achievements</h2>
            <p className="text-xl mb-10 text-center font-open-sans">
              By the end of your 5-week journey, you'll have reached these peaks:u'll have built and deployed your own AI agent that addresses a specific business challenge—automating
            </p>sks and enhancing productivity.
            <div className="space-y-6">
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 font-inter">Mastery of AI Prompting</h3>ity-10 p-6 rounded-lg">
                <p className="font-open-sans">
                  You'll craft precise, effective prompts that deliver exactly what you need—saving time and producing
                  higher-quality results than 95% of AI users.u'll possess a clear roadmap for further integrating AI into your business operations, with specific
                </p>xt steps and priority areas.
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 font-inter">Your Custom AI Agent</h3>ity-10 p-6 rounded-lg">
                <p className="font-open-sans">
                  You'll have built and deployed your own AI agent that addresses a specific business challenge—automating
                  tasks and enhancing productivity.u'll approach AI with confidence and clarity, knowing how to leverage these tools effectively and
                </p>ntinuing to evolve your skills independently.
              </div>p>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">div>
                <h3 className="text-xl font-semibold mb-2 font-inter">AI Integration Strategy</h3>div>
                <p className="font-open-sans">
                  You'll possess a clear roadmap for further integrating AI into your business operations, with specific        </div>
                  next steps and priority areas.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 font-inter">AI Confidence</h3>
                <p className="font-open-sans">
                  You'll approach AI with confidence and clarity, knowing how to leverage these tools effectively and-sans">
                  continuing to evolve your skills independently.ke the first step toward AI mastery with a personalized consultation to discuss your goals and how our
                </p>g can help you achieve them.
              </div>
            </div>
          </div>
        </div>ice.com/owa/calendar/ScheduleYourAICoachingSessionatSherpaTechAI@awarehousedc.com/bookings/"
      </section>
 rel="noopener noreferrer"
      {/* CTA Section */}g-mountain-blue text-alpine-white font-bold py-3 px-8 rounded-lg transition duration-300 font-inter"
      <section className="py-16 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">hedule Your Free Consultation
          <h2 className="text-3xl font-bold text-navy-blue mb-6 font-inter">Ready to Begin Your AI Journey?</h2>a>
          <p className="text-xl text-mountain-blue mb-8 font-open-sans">
            Take the first step toward AI mastery with a personalized consultation to discuss your goals and how ourdiv>
            5-Week AI Mastery Training can help you achieve them.  </section>
          </p>  </div>
          <div className="space-y-4">  );
            <a
              href="https://outlook.office.com/owa/calendar/ScheduleYourAICoachingSessionatSherpaTechAI@awarehousedc.com/bookings/"















export default TrainingPlan;};  );    </div>      </section>        </div>          </div>            </a>              Schedule Your Free Consultation            >              className="bg-navy-blue hover:bg-mountain-blue text-alpine-white font-bold py-3 px-8 rounded-lg transition duration-300 font-inter"              rel="noopener noreferrer"              target="_blank"export default TrainingPlan;
