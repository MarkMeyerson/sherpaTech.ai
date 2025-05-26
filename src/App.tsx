import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AssessmentTest } from './pages/AssessmentTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/assessment-test" element={<AssessmentTest />} />
      </Routes>
    </Router>
  );
}

export default App;