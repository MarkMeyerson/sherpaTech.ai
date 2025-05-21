import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { theme } from './theme'
import './App.css'
import './index.css'

// Components
import Header from './components/Header'
import Home from './components/Home'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import TrainingPlan from './components/TrainingPlan'
import SmallBusinesses from './components/SmallBusinesses'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/small-businesses" element={<SmallBusinesses />} />
              <Route path="/training" element={<TrainingPlan />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App