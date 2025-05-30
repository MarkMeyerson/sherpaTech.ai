// Enhanced Training App - combines remixed architecture with existing content
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Play, BookOpen, CheckCircle, Award, BarChart3, Clock, Target, User, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import contentRepository from './contentRepository';
import UserRegistration from './UserRegistration';
import trainingService from '../services/trainingService';
import EnvDebug from './EnvDebug';

const TrainingApp = () => {
  const navigate = useNavigate();
  
  // Load saved data from localStorage
  const loadFromStorage = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(`sherpa-training-${key}`);
      if (saved) {
        if (key === 'completedItems') {
          return new Set(JSON.parse(saved));
        }
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
    }
    return defaultValue;
  };
  
  // State with localStorage persistence and backend sync
  const [currentWeek, setCurrentWeek] = useState(() => loadFromStorage('currentWeek', 1));
  const [completedItems, setCompletedItems] = useState(() => loadFromStorage('completedItems', new Set()));
  const [quizScores, setQuizScores] = useState(() => loadFromStorage('quizScores', {}));
  const [userData, setUserData] = useState(() => loadFromStorage('userData', { name: '', email: '' }));
  const [showWelcome, setShowWelcome] = useState(() => !loadFromStorage('userData', { name: '' }).name);
  const [userId, setUserId] = useState(() => loadFromStorage('userId', null));
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  
  // Session state (not persisted)
  const [quizAnswers, setQuizAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [isQuizActive, setIsQuizActive] = useState(false);

  // Combined useEffect for localStorage updates and backend sync
  useEffect(() => {
    localStorage.setItem('sherpa-training-currentWeek', JSON.stringify(currentWeek));
    localStorage.setItem('sherpa-training-completedItems', JSON.stringify([...completedItems]));
    localStorage.setItem('sherpa-training-quizScores', JSON.stringify(quizScores));
    localStorage.setItem('sherpa-training-userData', JSON.stringify(userData));
    if (userId) {
      localStorage.setItem('sherpa-training-userId', JSON.stringify(userId));
    }

    if (userId && !isOfflineMode) {
      // Consider debouncing this call if frequent updates are an issue
      syncProgressToBackend();
    }
  }, [currentWeek, completedItems, quizScores, userData, userId, isOfflineMode]);

  // Get weeks data from contentRepository
  const getWeeksData = () => {
    return Object.keys(contentRepository)
      .filter(key => /^week\d+$/.test(key))
      .map(key => ({
        week: parseInt(key.replace('week', '')),
        title: contentRepository[key].title,
        description: contentRepository[key].description,
        data: contentRepository[key]
      }))
      .sort((a, b) => a.week - b.week);
  };

  // Sync progress to backend
  const syncProgressToBackend = async () => {
    if (!userId || isOfflineMode) return;

    try {
      await trainingService.saveProgress(userId, {
        currentWeek,
        completedItems,
        quizScores
      });
    } catch (error) {
      console.error('Failed to sync progress to backend:', error);
    }
  };

  // Handle user registration/login
  const handleUserLogin = async (loginResult) => {
    if (loginResult.isOffline) {
      // Offline mode - use local data only
      setUserData(loginResult.user);
      setIsOfflineMode(true);
      setShowWelcome(false);
    } else {
      // Backend mode - merge server data with local data
      setUserData(loginResult.user);
      setUserId(loginResult.user.id);
      setIsOfflineMode(false);

      if (loginResult.progress) {
        // Merge server progress with local progress
        const mergedProgress = trainingService.mergeProgressData({
          currentWeek,
          completedItems,
          quizScores
        }, loginResult.progress);

        setCurrentWeek(mergedProgress.currentWeek);
        setCompletedItems(mergedProgress.completedItems);
        setQuizScores(mergedProgress.quizScores);
      }

      setShowWelcome(false);

      // Log login activity
      await trainingService.logActivity(loginResult.user.id, 'login', {
        timestamp: new Date().toISOString()
      });
    }
  };

  const weeksData = getWeeksData();
  const totalWeeks = weeksData.length;

  // Get current week data
  const getCurrentWeekData = () => {
    return weeksData.find(w => w.week === currentWeek)?.data || {};
  };

  // Calculate overall progress
  const calculateOverallProgress = () => {
    let totalItems = 0;
    let completedCount = 0;

    weeksData.forEach(week => {
      Object.values(week.data).forEach(category => {
        if (Array.isArray(category)) {
          totalItems += category.length;
          category.forEach(item => {
            if (completedItems.has(item.id)) {
              completedCount++;
            }
          });
        }
      });
    });

    return totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
  };

  // Calculate week progress
  const calculateWeekProgress = (weekNum) => {
    const weekData = weeksData.find(w => w.week === weekNum)?.data || {};
    let totalItems = 0;
    let completedCount = 0;

    Object.values(weekData).forEach(category => {
      if (Array.isArray(category)) {
        totalItems += category.length;
        category.forEach(item => {
          if (completedItems.has(item.id)) {
            completedCount++;
          }
        });
      }
    });

    return totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
  };

  // Toggle item completion
  const toggleItemCompletion = async (itemId) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });

    // Log activity to backend
    if (userId && !isOfflineMode) {
      await trainingService.logActivity(userId, 'item_completed', {
        itemId,
        week: currentWeek,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Quiz functionality
  const startQuiz = () => {
    const currentQuiz = contentRepository.quizzes?.[`week${currentWeek}`];
    if (!currentQuiz || currentQuiz.length === 0) {
      alert("No quiz available for this week.");
      return;
    }
    setIsQuizActive(true);
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setAnswerFeedback(null);
    setQuizSubmitted(false);
  };

  const handleQuizAnswer = (selectedOptionIndex) => {
    const currentQuiz = contentRepository.quizzes?.[`week${currentWeek}`];
    if (!currentQuiz || !currentQuiz[currentQuestionIndex]) return;

    const currentQuestion = currentQuiz[currentQuestionIndex];
    const isCorrect = selectedOptionIndex === currentQuestion.correct;

    setQuizAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: selectedOptionIndex
    }));

    setAnswerFeedback({
      isCorrect,
      explanation: currentQuestion.explanation,
      reviewLink: currentQuestion.reviewLink
    });

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < currentQuiz.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setAnswerFeedback(null);
      } else {
        submitQuiz();
      }
    }, 3000);
  };

  const submitQuiz = async () => {
    const currentQuiz = contentRepository.quizzes?.[`week${currentWeek}`];
    if (!currentQuiz) return;

    let correctCount = 0;
    Object.entries(quizAnswers).forEach(([index, answer]) => {
      if (currentQuiz[parseInt(index)]?.correct === answer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / currentQuiz.length) * 100);
    setQuizScores(prev => ({
      ...prev,
      [`week${currentWeek}`]: score
    }));

    setQuizSubmitted(true);
    setIsQuizActive(false);

    // Log quiz activity to backend
    if (userId && !isOfflineMode) {
      await trainingService.logActivity(userId, 'quiz_submitted', {
        week: currentWeek,
        score,
        correct: correctCount,
        total: currentQuiz.length,
        timestamp: new Date().toISOString()
      });
    }

    // Send email report if user data available
    if (userData.name && userData.email) {
      sendSummaryReport(score, correctCount, currentQuiz.length);
    }
  };

  const sendSummaryReport = async (score, correct, total) => {
    const summaryReportUrl = import.meta.env.VITE_SUMMARY_REPORT_URL;
    if (!summaryReportUrl) {
      console.warn('Summary report URL not configured. Skipping email report.');
      return;
    }

    const emailContent = {
      name: userData.name,
      email: userData.email,
      week: currentWeek,
      score: score,
      correct: correct,
      total: total,
      source: 'Training App Enhanced'
    };

    try {
      const response = await fetch(summaryReportUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailContent),
      });

      if (response.ok) {
        console.log('Summary report sent successfully');
      }
    } catch (error) {
      console.error('Error sending summary report:', error);
    }
  };

  const renderContentSection = (title, items, icon, type) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">{icon}</span>
          {title}
        </h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  {item.duration && (
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {item.duration}
                    </span>
                  )}
                  {item.estimatedTime && (
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {item.estimatedTime}
                    </span>
                  )}
                  {item.url && item.url !== '#' && (
                    <div className="mt-3">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        {type === 'videos' ? 'Watch Video' : type === 'readings' ? 'Read Article' : 'Access Resource'} →
                      </a>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => toggleItemCompletion(item.id)}
                  className={`ml-4 p-2 rounded-full ${
                    completedItems.has(item.id)
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Welcome screen
  if (showWelcome) {
    return (
      <UserRegistration
        onRegister={handleUserLogin}
      />
    );
  }

  const currentWeekData = getCurrentWeekData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')} 
                className="bg-navy-blue text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 text-sm mr-4"
              >
                <Home className="w-4 h-4 inline mr-2" />
                Home
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SherpaTech.AI Training</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{userData.name}</span>
                {isOfflineMode && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Offline Mode
                  </span>
                )}
                {!isOfflineMode && userId && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Synced
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{calculateOverallProgress()}% Overall Complete</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Training Progress</h2>
              
              {/* Overall Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Overall Progress</span>
                  <span>{calculateOverallProgress()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${calculateOverallProgress()}%` }}
                  ></div>
                </div>
              </div>

              {/* Week Navigation */}
              <div className="space-y-4">
                {weeksData.map(week => {
                  const weekProgress = calculateWeekProgress(week.week);
                  const hasQuiz = contentRepository.quizzes?.[`week${week.week}`]?.length > 0;
                  const quizScore = quizScores[`week${week.week}`];
                  
                  return (
                    <div key={week.week} className="border rounded-lg p-4">
                      <button
                        onClick={() => setCurrentWeek(week.week)}
                        className={`w-full text-left ${currentWeek === week.week ? 'bg-blue-50' : ''}`}
                      >
                        <h3 className={`font-medium text-sm mb-2 ${currentWeek === week.week ? 'text-blue-600' : 'text-gray-700'}`}>
                          Week {week.week}: {week.title}
                        </h3>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${weekProgress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{weekProgress}% Complete</span>
                          {hasQuiz && quizScore !== undefined && (
                            <span className={quizScore >= 70 ? 'text-green-600' : 'text-yellow-600'}>
                              Quiz: {quizScore}%
                            </span>
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              {/* Week Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Week {currentWeek}: {currentWeekData.title}</h1>
                    <p className="text-gray-600">{currentWeekData.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                      disabled={currentWeek === 1}
                      className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentWeek(Math.min(totalWeeks, currentWeek + 1))}
                      disabled={currentWeek === totalWeeks}
                      className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>

                {/* Week Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Week {currentWeek} Progress</span>
                    <span>{calculateWeekProgress(currentWeek)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateWeekProgress(currentWeek)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Content Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {['videos', 'readings', 'activities', 'podcasts', 'tools'].map((tab) => {
                    const items = currentWeekData[tab];
                    const hasContent = items && items.length > 0;
                    if (!hasContent) return null;
                    
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                          activeTab === tab
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'quiz'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Quiz
                  </button>
                </nav>
              </div>

              {/* Content Area */}
              <div className="p-6">
                {/* Quiz Section */}
                {activeTab === 'quiz' && (
                  <div>
                    {isQuizActive ? (
                      <div>
                        {/* Quiz in progress */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Week {currentWeek} Quiz</h3>
                            <span className="text-sm text-gray-500">
                              Question {currentQuestionIndex + 1} of {contentRepository.quizzes[`week${currentWeek}`]?.length || 0}
                            </span>
                          </div>
                          
                          {contentRepository.quizzes[`week${currentWeek}`] && (
                            <div className="border rounded-lg p-6">
                              <h4 className="font-medium mb-4">
                                {contentRepository.quizzes[`week${currentWeek}`][currentQuestionIndex]?.question}
                              </h4>
                              
                              {answerFeedback ? (
                                <div className={`p-4 rounded-lg mb-4 ${
                                  answerFeedback.isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                                }`}>
                                  <p className="font-medium mb-2">
                                    {answerFeedback.isCorrect ? 'Correct!' : 'Incorrect'}
                                  </p>
                                  <p className="text-sm">{answerFeedback.explanation}</p>
                                  {answerFeedback.reviewLink && (
                                    <a 
                                      href={answerFeedback.reviewLink} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-sm underline mt-2 block"
                                    >
                                      Review this topic →
                                    </a>
                                  )}
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  {contentRepository.quizzes[`week${currentWeek}`][currentQuestionIndex]?.options.map((option, index) => (
                                    <button
                                      key={index}
                                      onClick={() => handleQuizAnswer(index)}
                                      className="w-full text-left p-3 border rounded-lg hover:bg-gray-50"
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : quizSubmitted ? (
                      <div className="text-center py-8">
                        <Award className={`w-12 h-12 mx-auto mb-4 ${
                          quizScores[`week${currentWeek}`] >= 70 ? 'text-green-500' : 'text-yellow-500'
                        }`} />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz Completed!</h3>
                        <p className="text-gray-600 mb-4">
                          Your Score: {quizScores[`week${currentWeek}`]}%
                        </p>
                        {quizScores[`week${currentWeek}`] >= 70 ? (
                          <p className="text-green-600 font-medium">Great job! You've mastered this week's content.</p>
                        ) : (
                          <div>
                            <p className="text-yellow-600 font-medium mb-4">
                              Review the material and try again to improve your score!
                            </p>
                            <button
                              onClick={startQuiz}
                              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                              Retake Quiz
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Ready for the Quiz?</h3>
                        <p className="text-gray-600 mb-6">
                          Test your knowledge of Week {currentWeek} content.
                        </p>
                        <button
                          onClick={startQuiz}
                          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium"
                        >
                          Start Week {currentWeek} Quiz
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Content Sections */}
                {activeTab === 'videos' && renderContentSection('Videos', currentWeekData.videos, '📹', 'videos')}
                {activeTab === 'readings' && renderContentSection('Readings', currentWeekData.readings, '📖', 'readings')}
                {activeTab === 'activities' && renderContentSection('Activities', currentWeekData.activities, '🎯', 'activities')}
                {activeTab === 'podcasts' && renderContentSection('Podcasts', currentWeekData.podcasts, '🎧', 'podcasts')}
                {activeTab === 'tools' && renderContentSection('Tools', currentWeekData.tools, '🛠️', 'tools')}
              </div>
            </div>
          </div>
        </div>
      </div>
      {import.meta.env.DEV && <EnvDebug />}
    </div>
  );
};

export default TrainingApp;
