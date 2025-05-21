import React from 'react'
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Privacy from './components/Privacy'
import TrainingPlan from './components/TrainingPlan'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import SmallBusinesses from './components/SmallBusinesses'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<>
              <Hero />
              <Services />
              <About />
              <Contact />
            </>} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/training" element={<TrainingPlan />} />
            <Route path="/small-businesses" element={<SmallBusinesses />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App