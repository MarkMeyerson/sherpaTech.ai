// ===============================================
// VITE + REACT INTEGRATION EXAMPLE (App.tsx)
// ===============================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import STAIAnnouncementModal from './components/STAIAnnouncementModal';

// Your existing components
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Your existing routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Routes>

        {/* Two-CTA Announcement Modal */}
        <STAIAnnouncementModal 
          isOpenByDefault={true}
          surveyHref="https://forms.office.com/r/Na6S9bCTgP"
          cohortHref="https://www.sherpatech.ai/sherpaskill"
          suppressDays={30}
        />
      </div>
    </Router>
  );
}

export default App;

// ===============================================
// NEXT.JS APP ROUTER INTEGRATION (app/layout.tsx)
// ===============================================

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import STAIAnnouncementModal from '@/components/STAIAnnouncementModal';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SherpaTech.AI - AI Training & Consulting',
  description: 'Transform your business with AI training and consulting services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
        {/* Two-CTA Announcement Modal - Client Component */}
        <STAIAnnouncementModal 
          isOpenByDefault={true}
          surveyHref="https://forms.office.com/r/Na6S9bCTgP"
          cohortHref="https://www.sherpatech.ai/sherpaskill"
          suppressDays={30}
          localStorageKey="stai_2cta_modal_last_dismissed_at"
        />
      </body>
    </html>
  );
}

// NOTE: If you get SSR errors in Next.js, wrap the modal in a ClientOnly component:
// 
// 'use client';
// import dynamic from 'next/dynamic';
// 
// const STAIAnnouncementModal = dynamic(
//   () => import('@/components/STAIAnnouncementModal'),
//   { ssr: false }
// );

// ===============================================
// ADVANCED USAGE EXAMPLES
// ===============================================

// 1. Conditional showing based on user state
function ConditionalModalExample() {
  const [userIsNewVisitor, setUserIsNewVisitor] = React.useState(false);
  
  React.useEffect(() => {
    // Check if user is a first-time visitor
    const hasVisited = localStorage.getItem('has_visited_before');
    setUserIsNewVisitor(!hasVisited);
    
    if (!hasVisited) {
      localStorage.setItem('has_visited_before', 'true');
    }
  }, []);

  return (
    <STAIAnnouncementModal 
      isOpenByDefault={userIsNewVisitor}
      suppressDays={7} // Show again after 1 week for new visitors
    />
  );
}

// 2. A/B testing different suppress durations
function ABTestExample() {
  const [suppressDays, setSuppressDays] = React.useState(30);
  
  React.useEffect(() => {
    // Simple A/B test: 50% get 30 days, 50% get 7 days
    const variant = Math.random() > 0.5 ? 30 : 7;
    setSuppressDays(variant);
    
    // Log for analytics
    console.log(`Modal suppress variant: ${variant} days`);
  }, []);

  return (
    <STAIAnnouncementModal 
      isOpenByDefault={true}
      suppressDays={suppressDays}
      localStorageKey={`stai_modal_v${suppressDays}d`}
    />
  );
}

// 3. Custom URLs from environment variables (recommended for production)
function ProductionModalExample() {
  return (
    <STAIAnnouncementModal 
      isOpenByDefault={true}
      surveyHref={process.env.NEXT_PUBLIC_SURVEY_URL || 'https://forms.office.com/r/Na6S9bCTgP'}
      cohortHref={process.env.NEXT_PUBLIC_COHORT_URL || 'https://www.sherpatech.ai/sherpaskill'}
      suppressDays={parseInt(process.env.NEXT_PUBLIC_MODAL_SUPPRESS_DAYS || '30', 10)}
    />
  );
}
