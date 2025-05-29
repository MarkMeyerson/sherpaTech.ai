import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import trainingData from './trainingData';
import contentRepository from '../components/contentRepository';
import UserRegistration from './UserRegistration';
import useMobileOptimizations from '../hooks/useMobileOptimizations';
import TrainingHeader from './TrainingHeader';
import ContentRenderer from './ContentRenderer';
import QuizSection from './QuizSection';
import FallbackUI from './FallbackUI';

const TrainingApp = () => {
  const navigate = useNavigate();
  
  // Initialize mobile optimizations hook
  const {
    deviceInfo,
    performanceMetrics,
    userPreferences,
    gestureState,
    showToast,
    hapticFeedback,
    optimizedImageUrl,
    isSupported
  } = useMobileOptimizations();
  
  // Consolidate state management and simplify logic
  const [appState, setAppState] = useState({
    currentWeek: 1,
    completedItems: {},
    quizAnswers: {},
    quizFeedback: null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    currentQuestionIndex: 0,
    quizScore: 0,
    answerFeedback: null,
    showScrollTop: false,
    showMobileView: false,
    isLoading: false,
    loadingType: '',
    errors: []
  });

  // Update state references
  const { currentWeek, completedItems, quizAnswers, quizFeedback, user, currentQuestionIndex, quizScore, answerFeedback, showScrollTop, showMobileView, isLoading, loadingType, errors } = appState;

  // Simplify state updates
  const updateAppState = (updates) => setAppState((prevState) => ({ ...prevState, ...updates }));

  // Refactor scroll handling
  useEffect(() => {
    const handleScroll = () => {
      updateAppState({ showScrollTop: window.pageYOffset > 400 });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Enhanced navigation with haptic feedback
  const handleNavigation = (direction) => {
    const newWeek = direction === 'next' ? currentWeek + 1 : currentWeek - 1;
    if (newWeek >= 1 && newWeek <= trainingData.length) {
      updateAppState({ isLoading: true, loadingType: 'navigation', currentWeek: newWeek, quizFeedback: null });
      showToast(`Moved to Week ${newWeek}`, 'success');
      hapticFeedback('light');
      setTimeout(() => updateAppState({ isLoading: false }), 300);
    }
  };

  const handleNextWeek = () => handleNavigation('next');
  const handlePreviousWeek = () => handleNavigation('previous');

  // Move the initialization of currentWeekContent to a higher scope
  const currentWeekContent = useMemo(() => contentRepository[`week${currentWeek}`] || {}, [currentWeek]);
  // Performance optimization: Memoize expensive calculations
  const weekProgress = useMemo(() => {
    const totalItems = Object.values(currentWeekContent).reduce((sum, items) => sum + (items?.length || 0), 0);
    const completedCount = Object.values(completedItems).filter(Boolean).length;
    return totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
  }, [currentWeekContent, completedItems]);
  // Accessibility: Announce page changes to screen readers
  useEffect(() => {
    if (deviceInfo.isMobile) {
      const announcement = `Week ${currentWeek} content loaded. ${weekProgress}% complete.`;
      
      // Create announcement for screen readers
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.textContent = announcement;
      
      document.body.appendChild(announcer);
      
      setTimeout(() => {
        document.body.removeChild(announcer);
      }, 1000);
    }
  }, [currentWeek, weekProgress, deviceInfo.isMobile]);
  // Enhanced scroll to top with smooth behavior and position memory
  const scrollToTop = () => {
    if (deviceInfo.isMobile) {
      // Smooth scroll for mobile
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
    
    showToast('Scrolled to top', 'success', 1500);
  };
  // Enhanced completion toggle with haptic feedback
  const toggleCompletion = (itemId) => {
    setCompletedItems((prev) => {
      const newState = {
        ...prev,
        [itemId]: !prev[itemId],
      };
      
      // Haptic feedback for completion
      if (isSupported('vibration') && deviceInfo.isMobile) {
        hapticFeedback(newState[itemId] ? 'medium' : 'light');
      }
      
      // Show toast feedback
      if (deviceInfo.isMobile) {
        showToast(
          newState[itemId] ? 'Item completed!' : 'Item unmarked', 
          newState[itemId] ? 'success' : 'info',
          2000
        );
      }
      
      return newState;
    });
  };

  const handleQuizSubmit = (answers) => {
    const currentWeekData = trainingData.find((week) => week.week === currentWeek);
    const quiz = currentWeekData.quiz;
    const feedback = [];

    quiz.forEach((question, index) => {
      if (answers[index] !== question.correct) {
        feedback.push({
          question: question.question,
          correctAnswer: question.options[question.correct],
          explanation: question.explanation,
        });
      }
    });

    setQuizFeedback(feedback);
  };
  const handleAnswerSubmit = (selectedOption) => {
    const currentQuestion = contentRepository.quizzes[`week${currentWeek}`][currentQuestionIndex];

    if (selectedOption === currentQuestion.correct) {
      setQuizScore((prevScore) => prevScore + 1);
      setAnswerFeedback({
        message: 'Correct, great job!',
        link: null,
      });
    } else {
      setAnswerFeedback({
        message: `Oops! Here's a link to learn more:`,
        link: currentQuestion.reviewLink,
      });
    }

    if (currentQuestionIndex < contentRepository.quizzes[`week${currentWeek}`].length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setAnswerFeedback(null);
      alert(`Quiz completed! You got ${quizScore + 1} out of ${contentRepository.quizzes[`week${currentWeek}`].length} questions correct.`);
      setQuizFeedback(null);
      setCurrentQuestionIndex(0);
      setQuizScore(0);
    }
  };

  const sendSummaryReport = async (quizScore, missedQuestions) => {
    const emailContent = {
      name: user.name,
      email: user.email,
      week: currentWeek,
      score: quizScore,
      missedQuestions: missedQuestions.map((q) => ({
        question: q.question,
        reviewLink: q.reviewLink,
      })),
      source: window.location.pathname,
    };

    try {
      const response = await fetch('https://prod-32.westus.logic.azure.com:443/workflows/de85654dcff04825bb9a39d632ec4a20/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SRYK6PqnPhUfNeMMW8oZp705-GAHg07Fonj6hdMdkos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailContent),
      });

      if (response.ok) {
        alert('Summary report sent successfully!');
      } else {
        console.error('Failed to send summary report:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending summary report:', error);
    }
  };  const handleQuizCompletion = () => {
    const currentWeekData = trainingData.find((week) => week.week === currentWeek);
    const missedQuestions = currentWeekData.quiz.filter((_, index) => {
      return quizAnswers[index] !== currentWeekData.quiz[index].correct;
    });

    sendSummaryReport(quizScore, missedQuestions);

    if (currentWeek === trainingData.length) {
      alert('Congratulations on completing the training program! A final summary will be sent to your email.');
    }
  };
  // Enhanced touch gesture handling with haptic feedback
  const handleAdvancedTouch = (e) => {
    const touch = e.touches[0];
    if (!touch) return;
    
    // Use haptic feedback from hook
    if (deviceInfo.isMobile) {
      hapticFeedback('light'); // Light feedback for touch
    }
  };

  // Mobile-optimized loading states
  const setLoadingState = (isLoading, type = '') => {
    setIsLoading(isLoading);
    setLoadingType(type);
    
    if (isLoading && deviceInfo.isMobile) {
      // Disable scrolling during loading to prevent janky animations
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };


  // Enhanced gesture indicator with animation
  const showGestureIndicator = (x, y, direction) => {
    const indicator = document.createElement('div');
    indicator.className = 'gesture-feedback fixed pointer-events-none z-50';
    indicator.style.left = `${x}px`;
    indicator.style.top = `${y}px`;
    indicator.style.transform = 'translate(-50%, -50%)';
    
    const icon = direction === 'left' ? '👈' : '👉';
    const text = direction === 'left' ? 'Next Week' : 'Previous Week';
    indicator.innerHTML = `<div class="flex items-center space-x-2 bg-navy-blue text-white px-3 py-2 rounded-lg shadow-lg">
      <span class="text-lg">${icon}</span>
      <span class="text-sm font-medium">${text}</span>
    </div>`;
    
    document.body.appendChild(indicator);
    
    // Remove after animation
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    }, 1000);
  };

  // Ensure currentWeekContent is initialized before any dependent code
  const renderContentByType = (type, items, icon) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center mb-4 sm:mb-6">
          <span className="text-2xl sm:text-3xl mr-3 sm:mr-4">{icon}</span>
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy-blue mobile-title">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1 mobile-subtitle">
              {items[0]?.definition || `${type.charAt(0).toUpperCase() + type.slice(1)} content for enhanced learning`}
            </p>
          </div>
        </div>
          <div className={`grid gap-4 lg:gap-6 ${
          deviceInfo.isMobile 
            ? 'mobile-card-grid grid-cols-1' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 tablet-grid'
        }`}>
          {items.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-sm border border-ice-blue hover:shadow-md hover:border-navy-blue transition-all duration-300 overflow-hidden group"
            >
              {/* Video Thumbnail or Content Preview */}
              {type === 'videos' && item.embedUrl && (
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <iframe
                    src={item.embedUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={item.title}
                  ></iframe>
                </div>
              )}
              
              <div className="p-5">
                {/* Checkbox and Duration */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={!!completedItems[item.id]}
                      onChange={() => toggleCompletion(item.id)}
                      className="w-5 h-5 text-navy-blue border-gray-300 rounded focus:ring-navy-blue focus:ring-2 transition-colors duration-200"
                    />
                    <span className="ml-3 text-sm font-medium text-navy-blue">
                      {completedItems[item.id] ? 'Completed' : 'Mark Complete'}
                    </span>
                  </div>
                  {(item.duration || item.estimatedTime) && (
                    <span className="text-xs bg-ice-blue text-navy-blue px-2 py-1 rounded-full font-medium">
                      {item.duration || item.estimatedTime}
                    </span>
                  )}
                </div>

                {/* Content Title and Description */}
                <h4 className="font-semibold text-navy-blue mb-2 group-hover:text-mountain-blue transition-colors duration-200 leading-tight">
                  {item.title}
                </h4>
                
                {item.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-navy-blue text-white text-center py-2 px-4 rounded-lg hover:bg-mountain-blue transition-colors duration-200 text-sm font-medium"
                    >
                      {type === 'videos' ? 'Watch' : type === 'readings' ? 'Read' : 'Open'}
                    </a>
                  )}
                  
                  {item.downloadUrl && (
                    <a
                      href={item.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-100 text-navy-blue text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium border border-gray-300"
                    >
                      Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>    );
  };

  // Add a debug message to confirm rendering
  console.log('TrainingApp component is rendering');

  // Ensure fallback UI logic is inside the TrainingApp function
  if (!currentWeekContent || Object.keys(currentWeekContent).length === 0) {
    console.log('Fallback UI triggered: currentWeekContent is empty');
    return (
      <div className="fallback-ui">
        <p>No content available for the current week. Please try again later.</p>
      </div>
    );
  }

  if (!user) {
    return <UserRegistration onRegister={(userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }} />;
  }
  // Add a fallback for gestureState to prevent null errors
  const safeGestureState = gestureState || {};

  // Ensure setShowMobileView is properly defined
  const setShowMobileView = (value) => {
    setAppState((prevState) => ({ ...prevState, showMobileView: value }));
  };

  // Update the component to use safeGestureState
  return (
    <div 
      className="min-h-screen bg-pearl-white text-navy-blue flex flex-col"
      {...safeGestureState.touchHandlers} // Use the safe fallback here
    >
      <TrainingHeader
        currentWeek={currentWeek}
        handlePreviousWeek={handlePreviousWeek}
        handleNextWeek={handleNextWeek}
        trainingData={trainingData}
        deviceInfo={deviceInfo}
        navigate={navigate}
        setShowMobileView={setShowMobileView} // Correctly pass the function
        showMobileView={showMobileView}
      />

      <main className={`flex-grow ${deviceInfo.isMobile ? 'mobile-scroll-optimized' : ''}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ${
          deviceInfo.isMobile ? 'mobile-content safe-area-inset-left safe-area-inset-right' : ''
        }`}>
          {/* Mobile swipe hint */}
          {deviceInfo.isMobile && (
            <div className="text-center mb-4 swipe-hint swipe-indicator">
              <p className="text-sm text-gray-500">Swipe left/right to navigate weeks</p>
            </div>
          )}
          
        {renderContentByType('videos', currentWeekContent?.videos, '📹')}
        {renderContentByType('readings', currentWeekContent?.readings, '📖')}
        {renderContentByType('activities', currentWeekContent?.activities, '🎯')}
        {renderContentByType('podcasts', currentWeekContent?.podcasts, '🎧')}
        {renderContentByType('tools', currentWeekContent?.tools, '🛠️')}

        <QuizSection
          currentQuestionIndex={currentQuestionIndex}
          contentRepository={contentRepository}
          currentWeek={currentWeek}
          handleAnswerSubmit={handleAnswerSubmit}
          answerFeedback={answerFeedback}
        />
        </div>
      </main>
    </div>
  );
};

export default TrainingApp;

// Debugging logs for contentRepository
console.log('contentRepository:', contentRepository);
