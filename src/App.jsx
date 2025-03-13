// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import './mountain-wave-animations.css' // CSS for mountain animations
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Footer from './components/Footer'
import Privacy from './components/Privacy'
import Terms from './components/Terms'
import Contact from './components/Contact' // Import the new Contact component
import ComingSoon from './components/ComingSoon'
import BackgroundMountainWaves from './components/BackgroundMountainWaves'

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundMountainWaves />
      <Header />
      <main className="flex-grow relative z-10">
        {/* Show both sections on the same page */}
        <Hero />
        <About />
      </main>
      <Footer />
    </div>
  )
}

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <About />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="relative overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Keep ComingSoon for pages not yet implemented */}
          <Route path="/services" element={<ComingSoon />} />
          <Route path="/team" element={<ComingSoon />} />
          <Route path="/careers" element={<ComingSoon />} />
          <Route path="/blog" element={<ComingSoon />} />
          <Route path="/get-started" element={<ComingSoon />} />
          {/* Catch-all route for any undefined routes */}
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App