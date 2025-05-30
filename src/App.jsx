import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from "react-router-dom";
import { theme } from "./utils/theme";
import './index.css';

// Components
import Navbar from './components/Navbar';  // Using your styled Navbar instead
import Home from './components/Home';
import Services from './components/Services';
import About from './components/About';
import ContactForm from './components/ContactForm';
import TrainingPlan from './components/TrainingPlan';
import SmallBusinesses from './components/SmallBusinesses';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Footer from './components/Footer';
import { Assessment } from './features/assessment/components/Assessment';
import TrainingApp from './components/TrainingApp';
import MobileTestShowcase from './components/MobileTestShowcase';

// Optional: Simple error boundary for debugging
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red' }}>Error: {this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

const App = () => {
  // Add a placeholder onSubmit handler for ContactForm
  const handleContactFormSubmit = (formData) => {
    console.log('Contact form submitted:', formData);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactForm onSubmit={handleContactFormSubmit} />} />
                <Route path="/small-businesses" element={<SmallBusinesses />} />
                <Route path="/training" element={<TrainingPlan />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/training-app/*" element={<TrainingApp />} />
                <Route path="/mobile-test" element={<MobileTestShowcase />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;