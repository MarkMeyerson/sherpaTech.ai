import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from "react-router-dom";
import { theme } from "./utils/theme";
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';

// Core components (loaded immediately)
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy loaded components (split into chunks)
const Home = lazy(() => import('./components/Home'));
const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const SherpaSkill = lazy(() => import('./components/SherpaSkill'));
const TrainingPlan = lazy(() => import('./components/TrainingPlan'));
const SmallBusinesses = lazy(() => import('./components/SmallBusinesses'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const HubSpotForm = lazy(() => import('./components/HubSpotForm'));
const Assessment = lazy(() => import('./features/assessment/components/Assessment'));
const TrainingApp = lazy(() => import('./components/TrainingApp'));
const OurWhyStatement = lazy(() => import('./components/OurWhyStatement'));
const STAIAnnouncementModal = lazy(() => import('./components/STAIAnnouncementModal'));
const CohortThankYou = lazy(() => import('./pages/CohortThankYou'));
const ResourcesCohort = lazy(() => import('./pages/ResourcesCohort'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ErrorBoundary>
          <div className="min-h-screen">
            <Navbar />
            <main style={{ minHeight: 'calc(100vh - 140px)' }}>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/small-businesses" element={<SmallBusinesses />} />
                  <Route path="/sherpaskill" element={<SherpaSkill />} />
                  <Route path="/training" element={<TrainingPlan />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/assessment" element={<Assessment />} />
                  <Route path="/training-app/*" element={<TrainingApp />} />
                  <Route path="/our-why" element={<OurWhyStatement />} />
                  <Route path="/cohort-thankyou" element={<CohortThankYou />} />
                  <Route path="/resources-cohort" element={<ResourcesCohort />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            
            {/* SherpaSkill Cohort Announcement Modal */}
            <Suspense fallback={null}>
              <STAIAnnouncementModal 
                isOpenByDefault={true}
                cohortHref="/sherpaskill"
                suppressDays={30}
                localStorageKey="stai_2cta_modal_last_dismissed_at"
              />
            </Suspense>
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;