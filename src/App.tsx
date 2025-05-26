import { Routes, Route } from 'react-router-dom';
import { AssessmentTest } from './pages/AssessmentTest';

function App() {
  return (
    <Routes>
      {/* ...existing routes... */}
      <Route path="/assessment-test" element={<AssessmentTest />} />
    </Routes>
  );
}

export default App;