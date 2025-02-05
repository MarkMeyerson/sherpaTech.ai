import React from 'react'

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
    window.location.href = 'mailto:MMeyerson@outlook.com'
  }

  const handleContact = () => {
    window.location.href = 'mailto:MMeyerson@outlook.com'
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-orange-500 text-2xl font-bold cursor-pointer" 
                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              4SMB.ai
            </div>
            <div className="flex gap-8">
              <button 
                onClick={() => handleNavClick('about')} 
                className="text-white hover:text-orange-500 transition-colors">
                About
              </button>
              <button 
                onClick={() => handleNavClick('services')} 
                className="text-white hover:text-orange-500 transition-colors">
                Services
              </button>
              <button 
                onClick={handleContact}
                className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            AI Solutions for
            <span className="text-orange-500"> Small Business</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-12 max-w-3xl mx-auto">
            Empowering small businesses with intelligent automation and AI-driven insights to grow and succeed in the digital age.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="px-8 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
              Get Started
            </button>
            <button 
              onClick={handleLearnMore}
              className="px-8 py-3 border-2 border-green-800 text-green-800 rounded hover:bg-green-800 hover:text-white transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="group cursor-pointer" onClick={() => handleNavClick('analytics')}>
          <h3 className="text-xl font-bold mb-4 text-orange-500">AI-Powered Analytics</h3>
          <p className="text-zinc-400 group-hover:text-white transition-colors">
            Get actionable insights from your business data with our advanced analytics solutions.
          </p>
        </div>
        <div className="group cursor-pointer" onClick={() => handleNavClick('automation')}>
          <h3 className="text-xl font-bold mb-4 text-orange-500">Process Automation</h3>
          <p className="text-zinc-400 group-hover:text-white transition-colors">
            Streamline your operations with intelligent automation tools designed for small businesses.
          </p>
        </div>
        <div className="group cursor-pointer" onClick={() => handleNavClick('intelligence')}>
          <h3 className="text-xl font-bold mb-4 text-orange-500">Customer Intelligence</h3>
          <p className="text-zinc-400 group-hover:text-white transition-colors">
            Understand and serve your customers better with AI-driven customer insights.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-zinc-800/50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Meet Mark Meyerson</h2>
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
                onClick={handleContact}
                className="mt-8 px-6 py-3 bg-green-800 text-white rounded hover:bg-green-700 transition-colors">
                Let's Connect
              </button>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-green-800/10 p-8 rounded-lg border border-zinc-700">
              <h3 className="text-2xl font-semibold text-orange-500 mb-6">Why Work With Me</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-zinc-300">Proven track record of successful technology transformations across hundreds of small businesses</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-zinc-300">Expert in bridging Microsoft technologies with cutting-edge AI solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-zinc-300">Specialized in cost-effective AI strategies tailored for small business needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span>
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
