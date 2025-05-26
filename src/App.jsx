import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from "react-router-dom";
import { theme } from "./theme";
// Remove App.css import since we're using index.css
import './index.css';

// Components
import Header from './components/Header';
import Home from './components/Home';
import Services from './components/Services';
import About from './components/About';
import ContactForm from './components/ContactForm';
import TrainingPlan from './components/TrainingPlan';
import SmallBusinesses from './components/SmallBusinesses';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Footer from './components/Footer';
import { Navigation } from './components/Navigation';
import { TestPage } from './TestPage';
import { Assessment } from './features/assessment/components/Assessment';

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
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/small-businesses" element={<SmallBusinesses />} />
                <Route path="/training" element={<TrainingPlan />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/assessment" element={<Assessment />} />
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