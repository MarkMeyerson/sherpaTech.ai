import React from 'react'
import Logo from './components/Logo'

function App() {
  const handleNavClick = (section) => {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleGetStarted = () => {
    const element = document.getElementById('about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLearnMore = () => {
    window.location.href = 'mailto:info@4smb.ai'
  }

  const handleContact = () => {
    window.location.href = 'mailto:info@4smb.ai'
  }

  const handleMarkContact = () => {
    window.location.href = 'mailto:mark@4smb.ai'
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="cursor-pointer" 
                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Logo variant="light" />
            </div>
            <div className="flex gap-8">
              <button 
                onClick={() => handleNavClick('about')} 
                className="text-brand-white hover:text-brand-primary transition-colors">
                About
              </button>
              <button 
                onClick={() => handleNavClick('services')} 
                className="text-brand-white hover:text-brand-primary transition-colors">
                Services
              </button>
              <button 
                onClick={handleContact}
                className="btn-secondary">
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-brand-white mb-6">
            AI Solutions for
            <span className="text-brand-primary"> Small Business</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-12 max-w-3xl mx-auto">
            Empowering small businesses with intelligent automation and AI-driven insights to grow and succeed in the digital age.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="btn-primary">
              Get Started
            </button>
            <button 
              onClick={handleLearnMore}
              className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="group cursor-pointer" onClick={() => handleNavClick('analytics')}>
          <h3 className="text-xl font-bold mb-4 text-brand-primary">AI-Powered Analytics</h3>
          <p className="text-zinc-400 group-hover:text-brand-white transition-colors">
            Get actionable insights from your business data with our advanced analytics solutions.
          </p>
        </div>
        <div className="group cursor-pointer" onClick={() => handleNavClick('automation')}>
          <h3 className="text-xl font-bold mb-4 text-brand-primary">Process Automation</h3>
          <p className="text-zinc-400 group-hover:text-brand-white transition-colors">
            Streamline your operations with intelligent automation tools designed for small businesses.
          </p>
        </div>
        <div className="group cursor-pointer" onClick={() => handleNavClick('intelligence')}>
          <h3 className="text-xl font-bold mb-4 text-brand-primary">Customer Intelligence</h3>
          <p className="text-zinc-400 group-hover:text-brand-white transition-colors">
            Understand and serve your customers better with AI-driven customer insights.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-zinc-800/50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-brand-white mb-6">Meet Mark Meyerson</h2>
              <div className="space-y-4">
                <p className="text-zinc-300">
                  As a dedicated technology strategist with over three decades of experience, I've guided thousands of small businesses through their digital transformation journeys. My extensive work with Microsoft technologies has provided me with deep insights into how businesses can effectively leverage technology to achieve their goals.
                </p>
                <p className="text-zinc-300">
                  In recent years, I've focused intensively on artificial intelligence and its practical applications for small businesses. My expertise lies in identifying and implementing AI solutions that deliver real value while being cost-effective and manageable for small business operations.
                </p>
                <p className="text-zinc-300">
                  I specialize in making AI accessible and practical for entire organizations, not just leadership. By focusing on sustainable implementation and team empowerment, I help businesses integrate AI in ways that enhance productivity, improve decision-making, and drive growth.
                </p>
              </div>
              <button 
                onClick={handleMarkContact}
                className="mt-8 btn-secondary">
                Let's Connect
              </button>
            </div>
            <div className="card bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10">
              <h3 className="text-2xl font-semibold text-brand-primary mb-6">Why Work With Me</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-brand-secondary mt-1">•</span>
                  <span className="text-zinc-300">Proven track record of successful technology transformations across hundreds of small businesses</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-secondary mt-1">•</span>
                  <span className="text-zinc-300">Expert in bridging Microsoft technologies with cutting-edge AI solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-secondary mt-1">•</span>
                  <span className="text-zinc-300">Specialized in cost-effective AI strategies tailored for small business needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-secondary mt-1">•</span>
                  <span className="text-zinc-300">Focused on building internal AI capabilities and sustainable growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-zinc-600">
            © 2025 4SMB.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App