import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TestPage } from './TestPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;