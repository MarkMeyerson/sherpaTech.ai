import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AssessmentTest } from './pages/AssessmentTest';
import { SmallBusinessHero } from './components/SmallBusinessHero';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/assessment-test" element={<AssessmentTest />} />
        <Route path="/" element={<SmallBusinessHero />} />
      </Routes>
    </Router>
  );
}

export default App;

// Inside SmallBusinessHero.tsx
const handleStartAssessment = () => {
  console.log('Start Assessment button clicked');
};

// Inside Assessment.tsx
console.log('Assessment loaded, current question:', INITIAL_QUESTIONS[0]);