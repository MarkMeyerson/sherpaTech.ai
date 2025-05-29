import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TrainingApp from './components/TrainingApp';
import MobileTestShowcase from './components/MobileTestShowcase';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen-safe bg-pearl-white">
        {/* Navigation for testing */}
        <nav className="bg-navy-blue text-white p-4">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <Link to="/" className="text-xl font-bold">SherpaTech.AI</Link>
            <div className="flex space-x-4 text-sm">
              <Link to="/" className="hover:text-ice-blue transition-colors">Home</Link>
              <Link to="/training" className="hover:text-ice-blue transition-colors">Training</Link>
              <Link to="/mobile-test" className="hover:text-ice-blue transition-colors">Mobile Test</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/training" element={<TrainingApp />} />
          <Route path="/mobile-test" element={<MobileTestShowcase />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
