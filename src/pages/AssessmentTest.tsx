import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const TestPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Test Page Is Working!</h1>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;