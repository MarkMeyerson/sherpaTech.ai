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
  const [sendEmailReportChecked, setSendEmailReportChecked] = useState(true); // Added for email report checkbox

  // Function to render content sections
  const renderContentSection = (title, items, icon, categoryKey) => {
    if (!items || items.length === 0) {
      return (
        <div className="text-center py-10">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No {title.toLowerCase()} available for this week.</h3>
          <p className="text-gray-500">Check back later or move to another section.</p>
        </div>
      );
    }

    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <span role="img" aria-label={title} className="mr-3 text-2xl">{icon}</span>
          {title}
        </h3>
        <div className="space-y-6">
          {items.map((item, index) => (
            <div 
              key={item.id || index} 
              className={`p-6 border rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:shadow-md ${
                completedItems.has(item.id) ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex-grow mb-4 sm:mb-0">
                  <h4 className="text-lg font-medium text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  {item.duration && (
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <Clock className="w-3 h-3 mr-1.5" />
                      <span>{item.duration}</span>
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {categoryKey === 'videos' ? 'Watch' : categoryKey === 'readings' ? 'Read' : categoryKey === 'podcasts' ? 'Listen' : 'Open'}
                    </a>
                  )}
                  <button
                    onClick={() => toggleItemCompletion(item.id)}
                    className={`flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 shadow-sm ${
                      completedItems.has(item.id)
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {completedItems.has(item.id) ? 'Completed' : 'Mark as Complete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Effect to reset quiz state when currentWeek changes
  useEffect(() => {
    setIsQuizActive(false);
    setQuizSubmitted(false);
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setAnswerFeedback(null);
  }, [currentWeek]);

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
  const weeksData = getWeeksData(); // Define weeksData here to be used by calculateOverallProgress

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

  // Sync progress to backend
  const syncProgressToBackend = async () => {
    if (!userId || isOfflineMode) return;
    // Log a deep clone to avoid console mutation issues when inspecting objects
    console.log('[TrainingApp] syncProgressToBackend called. Data to save (cloned):', JSON.parse(JSON.stringify({ currentWeek, completedItems: Array.from(completedItems), quizScores })));

    try {
      await trainingService.saveProgress(userId, {
        currentWeek,
        completedItems: Array.from(completedItems), // Ensure completedItems is an array
        quizScores
      });
      console.log('[TrainingApp] Progress synced to backend successfully.');
    } catch (error) {
      console.error('Failed to sync progress to backend:', error);
    }
  };

  // Handle user registration/login
  const handleUserLogin = async (loginResult) => {
    console.log('[TrainingApp] handleUserLogin triggered. Login Result:', loginResult);
    if (loginResult.isOffline) {
      // Offline mode - use local data only
      setUserData(loginResult.user);
      setIsOfflineMode(true);
      setShowWelcome(false);
      console.log('[TrainingApp] Offline mode activated for user:', loginResult.user.name);
    } else {
      // Backend mode - merge server data with local data
      console.log('[TrainingApp] Backend mode. User:', loginResult.user);
      console.log('[TrainingApp] Backend progress received:', loginResult.progress);
      
      setUserData(loginResult.user);
      setUserId(loginResult.user.id);
      setIsOfflineMode(false);

      if (loginResult.progress) {
        console.log('[TrainingApp] Merging progress. Current local states before merge:', { currentWeek, completedItems: [...completedItems], quizScores });
        const mergedProgress = trainingService.mergeProgressData({
          currentWeek,
          completedItems, // Pass the Set directly
          quizScores
        }, loginResult.progress);
        console.log('[TrainingApp] Merged progress:', { currentWeek: mergedProgress.currentWeek, completedItems: [...mergedProgress.completedItems], quizScores: mergedProgress.quizScores });

        setCurrentWeek(mergedProgress.currentWeek);
        setCompletedItems(mergedProgress.completedItems); // Expecting a Set from mergeProgressData if server had items
        setQuizScores(mergedProgress.quizScores);
        console.log('[TrainingApp] States after setting from merged progress (will log actual state in next render cycle).');
      } else {
        console.log('[TrainingApp] No progress found on backend for this user. Using local/default states.');
      }

      setShowWelcome(false);

      // Log login activity
      await trainingService.logActivity(loginResult.user.id, 'login', {
        timestamp: new Date().toISOString()
      });
    }
  };

  const totalWeeks = weeksData.length;

  // Get current week data
  const getCurrentWeekData = () => {
    return weeksData.find(w => w.week === currentWeek)?.data || {};
  };
  
  const currentWeekData = getCurrentWeekData();
  const weekKeyForQuiz = `week${currentWeek}`;
  const currentWeekQuizContent = contentRepository.quizzes?.[weekKeyForQuiz];
  const PASSING_GRADE = 50; // Define passing grade

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
  const startQuiz = () => { // Will only start the 'shortQuiz' for now
    const weekKey = `week${currentWeek}`;
    const currentQuizData = contentRepository.quizzes?.[weekKey];
    const shortQuizQuestions = currentQuizData?.shortQuizQuestions;

    if (!shortQuizQuestions || shortQuizQuestions.length === 0) {
      alert("No short quiz available for this week.");
      return;
    }
    setIsQuizActive(true);
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setAnswerFeedback(null);
    setQuizSubmitted(false);
  };

  const handleQuizAnswer = (selectedOptionIndex) => {
    const weekKey = `week${currentWeek}`;
    const shortQuizQuestions = contentRepository.quizzes?.[weekKey]?.shortQuizQuestions;

    if (!shortQuizQuestions || !shortQuizQuestions[currentQuestionIndex]) return;

    const currentQuestion = shortQuizQuestions[currentQuestionIndex];
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

    // User will now click a button to proceed
  };

  const handleNextQuestion = () => {
    const weekKey = `week${currentWeek}`;
    const shortQuizQuestions = contentRepository.quizzes?.[weekKey]?.shortQuizQuestions;
    if (!shortQuizQuestions) return;

    if (currentQuestionIndex < shortQuizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswerFeedback(null); // Clear feedback for the next question
    } else {
      submitQuiz(); // If it's the last question, submit the quiz
    }
  };

  const submitQuiz = async () => {
    const weekKey = `week${currentWeek}`;
    const score = Object.values(quizAnswers).filter((answer, index) => {
      const question = contentRepository.quizzes?.[weekKey]?.shortQuizQuestions?.[index];
      return question ? answer === question.correct : false;
    }).length;

    const currentQuizQuestions = contentRepository.quizzes?.[weekKey]?.shortQuizQuestions;
    const totalQuestions = currentQuizQuestions ? currentQuizQuestions.length : 0;
    const finalScorePercentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    setQuizSubmitted(true);
    setIsQuizActive(false);

    // Save quiz score
    setQuizScores(prevScores => ({
      ...prevScores,
      [weekKey]: finalScorePercentage
    }));

    // Log quiz activity to backend
    if (userId && !isOfflineMode) {
      await trainingService.logActivity(userId, 'quiz_submitted', {
        week: currentWeek,
        score: finalScorePercentage, // Log percentage score
        totalCorrect: score,
        totalQuestions: totalQuestions,
        timestamp: new Date().toISOString()
      });
    }

    // Auto-save progress on quiz completion
    if (userId && !isOfflineMode) {
      syncProgressToBackend(); // This will save the latest quizScores and currentWeek
    }

    // Conditionally send email report
    if (sendEmailReportChecked) {
      sendSummaryReport();
    }
  };

  const sendSummaryReport = async () => {
    const reportUrl = import.meta.env.VITE_SUMMARY_REPORT_URL;
    if (!reportUrl) {
      console.warn("VITE_SUMMARY_REPORT_URL is not set. Cannot send summary report.");
      alert("Email reporting is not configured. Please contact support.");
      return;
    }

    const weekKey = `week${currentWeek}`;
    const currentWeekContent = weeksData.find(w => w.week === currentWeek);
    const nextWeekContent = weeksData.find(w => w.week === currentWeek + 1);
    const currentQuizData = contentRepository.quizzes?.[weekKey];
    const shortQuizQuestions = currentQuizData?.shortQuizQuestions || [];

    const completedItemsForWeek = [];
    Object.keys(currentWeekContent?.data || {}).forEach(categoryKey => {
      if (Array.isArray(currentWeekContent.data[categoryKey])) {
        currentWeekContent.data[categoryKey].forEach(item => {
          if (completedItems.has(item.id)) {
            completedItemsForWeek.push({ title: item.title, type: categoryKey });
          }
        });
      }
    });

    const incorrectAnswers = [];
    if (quizSubmitted && shortQuizQuestions.length > 0) {
      shortQuizQuestions.forEach((question, index) => {
        const userAnswerIndex = quizAnswers[index];
        if (userAnswerIndex !== question.correct) {
          incorrectAnswers.push({
            question: question.question,
            userAnswer: question.options[userAnswerIndex] || "Not answered",
            correctAnswer: question.options[question.correct],
            explanation: question.explanation,
            reviewLink: question.reviewLink
          });
        }
      });
    }

    // build simple flat payload
    const subject = `Weekly Summary – Week ${currentWeek}: ${currentWeekContent?.title || ''}`;
    let bodyHtml = `<h1>Week ${currentWeek}: ${currentWeekContent?.title || 'N/A'}</h1>`;
    bodyHtml += `<p><strong>Quiz Score:</strong> ${quizScores[weekKey] !== undefined ? `${quizScores[weekKey]}%` : 'Not taken'}</p>`;
    bodyHtml += `<h2>Completed Items This Week</h2><ul>`;
    completedItemsForWeek.forEach(item => {
      bodyHtml += `<li>${item.title} (${item.type})</li>`;
    });
    bodyHtml += `</ul>`;
    if (incorrectAnswers.length) {
      bodyHtml += `<h2>Incorrectly Answered Questions</h2><ul>`;
      incorrectAnswers.forEach(q => {
        bodyHtml += `<li><strong>${q.question}</strong><br/>Your answer: ${q.userAnswer}<br/>Correct: ${q.correctAnswer}</li>`;
      });
      bodyHtml += `</ul>`;
    }
    if (nextWeekPreview) {
      bodyHtml += `<h2>Next Week Preview</h2><p><strong>${nextWeekPreview.title}</strong>: ${nextWeekPreview.description}</p>`;
    }
    bodyHtml += `<p>Report Date: ${new Date().toLocaleDateString()}</p>`;
    const payload = { to: userData.email, subject, bodyHtml };

    console.log("Preparing to send email report:", payload);

    try {
      const response = await fetch(reportUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log('Summary report sent successfully.');
        alert('Summary report sent to your email!');
      } else {
        const errorData = await response.text();
        console.error('Failed to send summary report:', response.status, errorData);
        alert(`Failed to send summary report. Status: ${response.status}. Please try again or contact support.`);
      }
    } catch (error) {
      console.error('Error sending summary report:', error);
      alert('An error occurred while sending the summary report. Please check your connection or contact support.');
    }
  };
  
  const handleSkipQuizAndEmailResults = () => {
    const weekKey = `week${currentWeek}`;
    // Mark quiz as "skipped" or assign a specific score if needed
    setQuizScores(prevScores => ({
      ...prevScores,
      [weekKey]: "Skipped" // Or 0, or a specific indicator
    }));
    setQuizSubmitted(true); // Mark as submitted to show results/options view
    setIsQuizActive(false);
    
    if (sendEmailReportChecked) { // Ensure checkbox is still respected
        sendSummaryReport(); // Send report with "Skipped" status
    } else {
        alert("Quiz skipped. To receive an email report, please check the 'Send me a summary report' option.");
    }
    // Potentially log this action
    if (userId && !isOfflineMode) {
      trainingService.logActivity(userId, 'quiz_skipped', {
        week: currentWeek,
        timestamp: new Date().toISOString()
      });
      syncProgressToBackend(); // Save the "Skipped" status
    }
  };

  // Welcome screen
  if (showWelcome) {
    return (
      <UserRegistration
        onRegister={handleUserLogin}
      />
    );
  }

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
                  // Check for shortQuizQuestions specifically
                  const hasQuiz = contentRepository.quizzes?.[`week${week.week}`]?.shortQuizQuestions?.length > 0;
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
                            <span className={quizScore >= PASSING_GRADE ? 'text-green-600' : 'text-yellow-600'}>
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
                {activeTab === 'quiz' && (() => {
                  const weekKey = `week${currentWeek}`;
                  const quizContentForTab = contentRepository.quizzes?.[weekKey];
                  const shortQuizQuestionsForTab = quizContentForTab?.shortQuizQuestions;

                  return (
                    <div>
                      {isQuizActive ? (
                        <div>
                          {/* Quiz in progress */}
                          <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-semibold">{quizContentForTab?.shortQuizLabel || `Week ${currentWeek} Quiz`}</h3>
                              <span className="text-sm text-gray-500">
                                Question {currentQuestionIndex + 1} of {shortQuizQuestionsForTab?.length || 0}
                              </span>
                            </div>
                            
                            {shortQuizQuestionsForTab && shortQuizQuestionsForTab.length > 0 && currentQuestionIndex < shortQuizQuestionsForTab.length && (
                              <div className="border rounded-lg p-6">
                                <h4 className="font-medium mb-4">
                                  {shortQuizQuestionsForTab[currentQuestionIndex]?.question}
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
                                        className="text-sm underline mt-2 block hover:text-blue-700"
                                      >
                                        Review this topic →
                                      </a>
                                    )}
                                    <button
                                      onClick={handleNextQuestion}
                                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                                    >
                                      {currentQuestionIndex < (shortQuizQuestionsForTab?.length || 0) - 1 ? 'Next Question' : 'Finish Quiz'}
                                    </button>
                                  </div>
                                ) : (
                                  <div className="space-y-3">
                                    {shortQuizQuestionsForTab[currentQuestionIndex]?.options.map((option, index) => (
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
                            quizScores[weekKey] >= PASSING_GRADE ? 'text-green-500' : 'text-yellow-500'
                          }`} />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz Completed!</h3>
                          <p className="text-gray-600 mb-4">
                            Your Score: {quizScores[weekKey]}%
                          </p>
                          
                          {quizScores[weekKey] >= PASSING_GRADE ? (
                            <p className="text-green-600 font-medium mb-4">Good effort! You've met the passing grade.</p>
                          ) : (
                            <p className="text-yellow-600 font-medium mb-4">
                              Review the material and try again to improve your score!
                            </p>
                          )}

                          <div className="space-y-2 mt-4">
                            {quizScores[weekKey] >= PASSING_GRADE && currentWeek < totalWeeks && (
                                <button
                                  onClick={() => {
                                    const nextWeek = currentWeek + 1;
                                    if (nextWeek <= totalWeeks) {
                                      setCurrentWeek(nextWeek);
                                    }
                                    setActiveTab('videos'); 
                                    // Quiz states are reset by useEffect on currentWeek change
                                  }}
                                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2"
                                >
                                  Proceed to Next Week
                                </button>
                              )}
                            <button
                                onClick={startQuiz} // Retake current week's short quiz
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
                              >
                                Retake Quiz
                              </button>
                            <button
                                onClick={() => {
                                  setActiveTab('videos');
                                  // Optionally reset quiz states if leaving the quiz results view
                                  // setQuizSubmitted(false);
                                  // setCurrentQuestionIndex(0);
                                  // setQuizAnswers({});
                                  // setAnswerFeedback(null);
                                  // setIsQuizActive(false);
                                }}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                              >
                                Review Content
                              </button>
                            {quizContentForTab?.shortFormLink && (
                              <a
                                href={quizContentForTab.shortFormLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 ml-2"
                              >
                                {quizContentForTab.shortFormLabel || 'Short Feedback Form'}
                              </a>
                            )}
                          </div>

                          {/* Email Report Checkbox */}
                          <div className="mt-6 text-sm text-gray-600">
                            <label htmlFor="sendEmailReport" className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                id="sendEmailReport"
                                checked={sendEmailReportChecked}
                                onChange={(e) => setSendEmailReportChecked(e.target.checked)}
                                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              Send me a summary report email for this week.
                            </label>
                          </div>
                        </div>
                      ) : ( // Initial Quiz Tab View: !isQuizActive && !quizSubmitted
                        <div className="text-center py-8 space-y-4"> {/* Reduced space-y-6 to space-y-4 for tighter layout */}
                          <div>
                            <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">Ready for your Weekly Check-in?</h3>
                            <p className="text-gray-600 mb-6"> {/* Added mb-6 for spacing */}
                              Assess your understanding and provide feedback for Week {currentWeek}.
                            </p>
                          </div>

                          {/* New Button: Skip Quiz and Email Results */}
                          <button
                            onClick={handleSkipQuizAndEmailResults}
                            className="w-full max-w-md mx-auto bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 font-medium text-base"
                          >
                            Skip Quick Check & Email Weekly Summary
                          </button>
                          
                          {/* Existing Button: Start Short Quiz */}
                          {quizContentForTab?.shortQuizQuestions && quizContentForTab.shortQuizQuestions.length > 0 ? (
                            <button
                              onClick={startQuiz} // This will start the shortQuiz
                              className="w-full max-w-md mx-auto bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium text-base"
                            >
                              {quizContentForTab.shortQuizLabel || `Start Week ${currentWeek} Quick Check`}
                            </button>
                          ) : (
                            <p className="text-gray-500">No quick check quiz available for this week.</p>
                          )}

                          {/* Existing Button: Short Feedback Form (External) */}
                          {quizContentForTab?.shortFormLink && (
                            <a
                              href={quizContentForTab.shortFormLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full max-w-md mx-auto bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 font-medium text-base"
                            >
                              {quizContentForTab.shortFormLabel || `Provide Short Feedback (Form)`}
                            </a>
                          )}

                          {/* Existing Button: Long Review Form (External) */}
                          {quizContentForTab?.longFormLink && (
                            <a
                              href={quizContentForTab.longFormLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full max-w-md mx-auto bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 font-medium text-base"
                            >
                              {quizContentForTab.longFormLabel || `Comprehensive Review (Form)`}
                            </a>
                          )}
                           {/* Email Report Checkbox - Moved here to be always visible on this initial screen */}
                           <div className="mt-6 text-sm text-gray-600">
                            <label htmlFor="sendEmailReport" className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                id="sendEmailReport"
                                checked={sendEmailReportChecked}
                                onChange={(e) => setSendEmailReportChecked(e.target.checked)}
                                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              Send me a summary report email for this week.
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
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
