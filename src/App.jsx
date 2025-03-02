// src/App.jsx
import React from 'react'
import './App.css'
import './index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Show both sections on the same page */}
        <Hero />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App