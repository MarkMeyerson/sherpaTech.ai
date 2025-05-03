import React from 'react';
import { useNavigate } from 'react-router-dom';

const TrainingPlan = () => {
  const navigate = useNavigate();

  const handleScheduleConsultation = () => {
    // You can replace this URL with your actual scheduling system
    // For now, I'll open a new window to a generic scheduling page
    // or redirect to a contact form with a specific subject
    window.open('https://outlook.office.com/book/ScheduleYourAICoachingSessionatSherpaTechAI@awarehousedc.com/', '_blank');
    
    // Alternative: Navigate to contact form with pre-filled subject
    // navigate('/contact', { state: { subject: 'Schedule Free Consultation' } });
  };

  const handleLearnAboutCoaching = () => {
    // Navigate to a coaching information page
    // Since this page doesn't exist yet, I'll navigate to the home page and scroll to about section
    navigate('/', { replace: true });
    setTimeout(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-pearl-white text-deep-navy">
      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-6 font-inter">Ready to Begin Your AI Journey?</h2>
          <p className="text-xl text-mountain-blue mb-8 font-open-sans">
            Take the first step toward AI mastery with a personalized consultation to discuss your goals and how our 
            5-Week AI Mastery Training can help you achieve them.
          </p>
          <div className="space-y-4">
            <button 
              onClick={handleScheduleConsultation}
              className="bg-navy-blue hover:bg-mountain-blue text-alpine-white font-bold py-3 px-8 rounded-lg transition duration-300 font-inter"
            >
              Schedule Your Free Consultation
            </button>
            <p className="text-mountain-blue font-open-sans">
              or
            </p>
            <button 
              onClick={handleLearnAboutCoaching}
              className="bg-mountain-blue hover:bg-deep-navy text-alpine-white font-bold py-3 px-8 rounded-lg transition duration-300 font-inter"
            >
              Learn About Our Coaching Approach
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingPlan;