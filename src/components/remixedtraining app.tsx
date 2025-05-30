import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Play, BookOpen, CheckCircle, Award, BarChart3, Clock, Target, User, AlertCircle } from 'lucide-react';

const AITrainingApp = () => {
  // Load saved data from localStorage
  const loadFromStorage = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(`ai-training-${key}`);
      if (saved) {
        if (key === 'completedDays') {
          return new Set(JSON.parse(saved));
        }
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
    }
    return defaultValue;
  };

  // State with localStorage persistence
  const [currentWeek, setCurrentWeek] = useState(() => loadFromStorage('currentWeek', 1));
  const [currentDay, setCurrentDay] = useState(() => loadFromStorage('currentDay', 1));
  const [completedDays, setCompletedDays] = useState(() => loadFromStorage('completedDays', new Set()));
  const [quizScores, setQuizScores] = useState(() => loadFromStorage('quizScores', {}));
  const [userData, setUserData] = useState(() => loadFromStorage('userData', { name: '', email: '' }));
  const [showWelcome, setShowWelcome] = useState(() => !loadFromStorage('userData', { name: '' }).name);
  
  // Session state (not persisted)
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [readingCompleted, setReadingCompleted] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const [activeTab, setActiveTab] = useState('video');

  // Training data structure
  const trainingData = {
    week1: {
      title: "AI Foundations & Understanding",
      days: [
        {
          day: 1,
          title: "What is AI? Core Concepts",
          video: "https://www.youtube.com/embed/ad79nYk2keg",
          reading: {
            title: "Understanding Artificial Intelligence",
            content: "Artificial Intelligence (AI) is the simulation of human intelligence in machines..."
          },
          quiz: [
            {
              question: "What is the main difference between Narrow AI and General AI?",
              options: [
                "Narrow AI is faster than General AI",
                "Narrow AI is designed for specific tasks, General AI has human-level intelligence across all domains",
                "General AI is cheaper to develop",
                "There is no difference"
              ],
              correct: 1
            },
            {
              question: "Which of these is an example of Machine Learning?",
              options: [
                "A calculator performing arithmetic",
                "A recommendation system learning from user behavior",
                "A word processor checking spelling",
                "A digital clock showing time"
              ],
              correct: 1
            }
          ]
        },
        {
          day: 2,
          title: "Machine Learning Basics",
          video: "https://www.youtube.com/embed/ukzFI9rgwfU",
          reading: {
            title: "Introduction to Machine Learning",
            content: "Machine Learning (ML) is a subset of AI..."
          },
          quiz: [
            {
              question: "What type of machine learning uses labeled training data?",
              options: [
                "Unsupervised Learning",
                "Reinforcement Learning", 
                "Supervised Learning",
                "Deep Learning"
              ],
              correct: 2
            }
          ]
        },
        {
          day: 3,
          title: "Neural Networks & Deep Learning",
          video: "https://www.youtube.com/embed/aircAruvnKk",
          reading: {
            title: "Understanding Neural Networks",
            content: "Neural networks are computing systems inspired by biological neural networks..."
          },
          quiz: [
            {
              question: "What makes 'deep learning' deep?",
              options: [
                "It uses very large datasets",
                "It processes data very quickly",
                "It uses neural networks with multiple hidden layers",
                "It can solve complex problems"
              ],
              correct: 2
            }
          ]
        },
        {
          day: 4,
          title: "Natural Language Processing",
          video: "https://www.youtube.com/embed/CMrHM8a3hqw",
          reading: {
            title: "Understanding Natural Language Processing",
            content: "Natural Language Processing (NLP) is a branch of AI..."
          },
          quiz: [
            {
              question: "What is sentiment analysis in NLP?",
              options: [
                "Translating text between languages",
                "Determining the emotional tone of text",
                "Identifying grammatical errors",
                "Generating new text content"
              ],
              correct: 1
            }
          ]
        },
        {
          day: 5,
          title: "AI Ethics & Bias",
          video: "https://www.youtube.com/embed/UG_X_7g63rY",
          reading: {
            title: "AI Ethics and Responsible AI",
            content: "As AI becomes more prevalent, understanding and addressing ethical considerations..."
          },
          quiz: [
            {
              question: "What is a major source of bias in AI systems?",
              options: [
                "Computer processing speed",
                "Internet connectivity issues",
                "Biased training data",
                "Software bugs"
              ],
              correct: 2
            }
          ]
        }
      ]
    },
    week2: {
      title: "AI Tools & Practical Applications",
      days: [
        {
          day: 6,
          title: "Large Language Models",
          video: "https://www.youtube.com/embed/zjkBMFhNj_g",
          reading: {
            title: "Understanding Large Language Models",
            content: "Large Language Models (LLMs) are AI systems trained on vast amounts of text data..."
          },
          quiz: [
            {
              question: "What is prompt engineering?",
              options: [
                "Building the computer hardware for AI",
                "Programming the AI model",
                "Crafting inputs to get desired outputs from AI models",
                "Testing AI models for errors"
              ],
              correct: 2
            }
          ]
        },
        {
          day: 7,
          title: "AI Image Generation",
          video: "https://www.youtube.com/embed/SVcsDDABEkM",
          reading: {
            title: "AI Image Generation Technologies",
            content: "AI image generation has revolutionized digital art..."
          },
          quiz: [
            {
              question: "What are diffusion models in AI image generation?",
              options: [
                "Models that create images by starting with noise and gradually refining",
                "Models that copy existing images",
                "Models that only work with photographs",
                "Models that require manual drawing skills"
              ],
              correct: 0
            }
          ]
        },
        {
          day: 8,
          title: "AI Code Assistants",
          video: "https://www.youtube.com/embed/Fi3AJZZregI",
          reading: {
            title: "AI-Powered Code Assistance",
            content: "AI code assistants have transformed software development..."
          },
          quiz: [
            {
              question: "What should you always do with AI-generated code?",
              options: [
                "Use it immediately without changes",
                "Delete it and write your own",
                "Review, test, and understand it before using",
                "Share it publicly for others to review"
              ],
              correct: 2
            }
          ]
        },
        {
          day: 9,
          title: "AI Automation Tools",
          video: "https://www.youtube.com/embed/yEi6XFqn8l8",
          reading: {
            title: "AI-Powered Automation and Workflows",
            content: "AI automation tools are revolutionizing how businesses handle repetitive tasks..."
          },
          quiz: [
            {
              question: "What type of tasks are best suited for AI automation?",
              options: [
                "Creative and strategic tasks",
                "Repetitive, rule-based tasks",
                "Complex problem-solving tasks",
                "Tasks requiring human empathy"
              ],
              correct: 1
            }
          ]
        },
        {
          day: 10,
          title: "AI in Business",
          video: "https://www.youtube.com/embed/Ok-xpKjKp2g",
          reading: {
            title: "AI Applications Across Business Functions",
            content: "AI is transforming every aspect of business operations..."
          },
          quiz: [
            {
              question: "What is a key benefit of AI-powered chatbots?",
              options: [
                "They replace all human customer service",
                "24/7 availability and instant responses",
                "They only work during business hours",
                "They can only handle yes/no questions"
              ],
              correct: 1
            }
          ]
        }
      ]
    },
    week3: {
      title: "Advanced AI & Future Trends",
      days: [
        {
          day: 11,
          title: "Building AI Agents",
          video: "https://www.youtube.com/embed/pGAg4C9CqIE",
          reading: {
            title: "Creating AI Agents and Conversational Systems",
            content: "AI agents and chatbots represent the practical application of conversational AI..."
          },
          quiz: [
            {
              question: "What is the main difference between rule-based and AI-powered chatbots?",
              options: [
                "Rule-based chatbots are more expensive",
                "AI-powered chatbots can handle more complex conversations",
                "Rule-based chatbots work faster",
                "There is no significant difference"
              ],
              correct: 1
            }
          ]
        },
        {
          day: 12,
          title: "AI in Data Analysis",
          video: "https://www.youtube.com/embed/X3paOmcrTjQ",
          reading: {
            title: "AI-Enhanced Data Analysis and Visualization",
            content: "AI is revolutionizing how we analyze data and create visualizations..."
          },
          quiz: [
            {
              question: "What is a key benefit of natural language querying?",
              options: [
                "It requires advanced programming skills",
                "Users can ask questions in plain English",
                "It only works with numerical data",
                "It replaces all traditional methods"
              ],
              correct: 1
            }
          ]
        },
        {
          day: 13,
          title: "Computer Vision",
          video: "https://www.youtube.com/embed/OcycT1Jwsns",
          reading: {
            title: "Computer Vision and Image Recognition",
            content: "Computer vision enables machines to interpret visual information..."
          },
          quiz: [
            {
              question: "What is object detection in computer vision?",
              options: [
                "Only identifying what objects are present",
                "Finding where objects are located in images",
                "Only working with photographs",
                "Requiring manual input"
              ],
              correct: 1
            }
          ]
        },
        {
          day: 14,
          title: "AI Governance",
          video: "https://www.youtube.com/embed/ORHFOnaEzPc",
          reading: {
            title: "AI Governance and Implementation",
            content: "Effective AI governance ensures responsible AI implementation..."
          },
          quiz: [
            {
              question: "What is a key component of AI governance?",
              options: [
                "Using only open-source tools",
                "Clear roles and ethical guidelines",
                "Avoiding all regulations",
                "Implementing AI quickly without oversight"
              ],
              correct: 1
            }
          ]
        },
        {
          day: 15,
          title: "Future of AI & Careers",
          video: "https://www.youtube.com/embed/Gg-w915FmIQ",
          reading: {
            title: "The Future of AI and Career Development",
            content: "The AI landscape is evolving rapidly, creating new opportunities..."
          },
          quiz: [
            {
              question: "What is the most important strategy for AI era success?",
              options: [
                "Learning only technical skills",
                "Avoiding AI tools completely",
                "Embracing lifelong learning and AI collaboration",
                "Focusing only on traditional skills"
              ],
              correct: 2
            }
          ]
        }
      ]
    }
  };

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('ai-training-currentWeek', JSON.stringify(currentWeek));
  }, [currentWeek]);

  useEffect(() => {
    localStorage.setItem('ai-training-currentDay', JSON.stringify(currentDay));
  }, [currentDay]);

  useEffect(() => {
    localStorage.setItem('ai-training-completedDays', JSON.stringify([...completedDays]));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem('ai-training-quizScores', JSON.stringify(quizScores));
  }, [quizScores]);

  useEffect(() => {
    localStorage.setItem('ai-training-userData', JSON.stringify(userData));
  }, [userData]);

  // Get current day data
  const getCurrentDayData = () => {
    const weekKey = `week${currentWeek}`;
    const week = trainingData[weekKey];
    if (!week) return null;
    return week.days.find(day => day.day === currentDay);
  };

  // Calculate progress
  const calculateProgress = () => {
    const totalDays = 15;
    const completed = completedDays.size;
    return Math.round((completed / totalDays) * 100);
  };

  // Handle quiz answer selection
  const handleQuizAnswer = (questionIndex, selectedAnswer) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = selectedAnswer;
    setQuizAnswers(newAnswers);
  };

  // Submit quiz
  const submitQuiz = () => {
    const dayData = getCurrentDayData();
    if (!dayData) return;

    let correct = 0;
    dayData.quiz.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        correct++;
      }
    });

    const score = Math.round((correct / dayData.quiz.length) * 100);
    const dayKey = `week${currentWeek}-day${currentDay}`;
    
    setQuizScores(prev => ({
      ...prev,
      [dayKey]: score
    }));

    setQuizSubmitted(true);
    
    // Mark day as completed if all requirements met
    if (readingCompleted && videoWatched && score >= 70) {
      setCompletedDays(prev => new Set([...prev, currentDay]));
    }
  };

  // Reset day state when changing days
  const changeDay = (week, day) => {
    setCurrentWeek(week);
    setCurrentDay(day);
    setQuizAnswers([]);
    setQuizSubmitted(false);
    setReadingCompleted(false);
    setVideoWatched(false);
    setActiveTab('video');
  };

  // Get week data
  const getWeekData = (weekNum) => {
    return trainingData[`week${weekNum}`];
  };

  const dayData = getCurrentDayData();
  const currentWeekData = getWeekData(currentWeek);

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to AI Mastery</h1>
            <p className="text-gray-600">Your 3-week journey to AI expertise starts here</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              disabled={!userData.name.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Start Learning Journey
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AI Mastery Training</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{userData.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{calculateProgress()}% Complete</span>
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
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Overall Progress</span>
                  <span>{calculateProgress()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
              </div>

              {/* Week Navigation */}
              <div className="space-y-4">
                {[1, 2, 3].map(weekNum => {
                  const week = getWeekData(weekNum);
                  return (
                    <div key={weekNum} className="border rounded-lg p-3">
                      <h3 className={`font-medium text-sm mb-2 ${currentWeek === weekNum ? 'text-blue-600' : 'text-gray-700'}`}>
                        Week {weekNum}: {week.title}
                      </h3>
                      <div className="grid grid-cols-5 gap-1">
                        {week.days.map(day => {
                          const isCompleted = completedDays.has(day.day);
                          const isCurrent = currentWeek === weekNum && currentDay === day.day;
                          return (
                            <button
                              key={day.day}
                              onClick={() => changeDay(weekNum, day.day)}
                              className={`w-8 h-8 rounded text-xs font-medium transition-colors flex items-center justify-center ${
                                isCurrent 
                                  ? 'bg-blue-600 text-white' 
                                  : isCompleted 
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {isCompleted ? <CheckCircle className="w-4 h-4" /> : day.day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {dayData && (
              <div className="bg-white rounded-lg shadow">
                {/* Day Header */}
                <div className="border-b border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">Day {currentDay}: {dayData.title}</h1>
                      <p className="text-gray-600">Week {currentWeek}: {currentWeekData.title}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => currentDay > 1 ? changeDay(currentWeek, currentDay - 1) : null}
                        disabled={currentDay === 1}
                        className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                      </button>
                      <button
                        onClick={() => currentDay < 15 ? changeDay(currentWeek, currentDay + 1) : null}
                        disabled={currentDay === 15}
                        className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="flex space-x-4">
                    <div className={`flex items-center space-x-2 ${videoWatched ? 'text-green-600' : 'text-gray-400'}`}>
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Video {videoWatched ? 'Completed' : 'Pending'}</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${readingCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm">Reading {readingCompleted ? 'Completed' : 'Pending'}</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${quizSubmitted ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Quiz {quizSubmitted ? 'Completed' : 'Pending'}</span>
                    </div>
                  </div>
                </div>

                {/* Content Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {['video', 'reading', 'quiz'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                          activeTab === tab
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab === 'quiz' ? 'Knowledge Check' : `${tab} ${tab === 'video' ? 'Lesson' : 'Material'}`}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  {/* Video Tab */}
                  {activeTab === 'video' && (
                    <div>
                      <div className="aspect-video bg-gray-900 rounded-lg mb-4 overflow-hidden">
                        <iframe
                          src={dayData.video}
                          className="w-full h-full"
                          allowFullScreen
                          title={`Day ${currentDay} Video`}
                        />
                      </div>
                      <button
                        onClick={() => setVideoWatched(true)}
                        disabled={videoWatched}
                        className={`px-4 py-2 rounded-md ${
                          videoWatched
                            ? 'bg-green-100 text-green-800 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {videoWatched ? 'Video Completed ✓' : 'Mark Video as Watched'}
                      </button>
                    </div>
                  )}

                  {/* Reading Tab */}
                  {activeTab === 'reading' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">{dayData.reading.title}</h2>
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">{dayData.reading.content}</p>
                      </div>
                      <button
                        onClick={() => setReadingCompleted(true)}
                        disabled={readingCompleted}
                        className={`mt-6 px-4 py-2 rounded-md ${
                          readingCompleted
                            ? 'bg-green-100 text-green-800 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {readingCompleted ? 'Reading Completed ✓' : 'Mark Reading as Complete'}
                      </button>
                    </div>
                  )}

                  {/* Quiz Tab */}
                  {activeTab === 'quiz' && (
                    <div>
                      {!readingCompleted || !videoWatched ? (
                        <div className="text-center py-8">
                          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Complete Prerequisites First</h3>
                          <p className="text-gray-600">
                            Please watch the video and complete the reading before taking the quiz.
                          </p>
                        </div>
                      ) : quizSubmitted ? (
                        <div className="text-center py-8">
                          <Award className={`w-12 h-12 mx-auto mb-4 ${
                            quizScores[`week${currentWeek}-day${currentDay}`] >= 70 ? 'text-green-500' : 'text-yellow-500'
                          }`} />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz Completed!</h3>
                          <p className="text-gray-600 mb-4">
                            Your Score: {quizScores[`week${currentWeek}-day${currentDay}`]}%
                          </p>
                          {quizScores[`week${currentWeek}-day${currentDay}`] >= 70 ? (
                            <p className="text-green-600 font-medium">Great job! You've mastered this lesson.</p>
                          ) : (
                            <div>
                              <p className="text-yellow-600 font-medium mb-4">
                                You need 70% or higher to complete this day. Review the material and try again!
                              </p>
                              <button
                                onClick={() => {
                                  setQuizSubmitted(false);
                                  setQuizAnswers([]);
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                              >
                                Retake Quiz
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Knowledge Check - Day {currentDay}</h3>
                          <div className="space-y-6">
                            {dayData.quiz.map((question, qIndex) => (
                              <div key={qIndex} className="border rounded-lg p-4">
                                <h4 className="font-medium mb-3">
                                  Question {qIndex + 1}: {question.question}
                                </h4>
                                <div className="space-y-2">
                                  {question.options.map((option, oIndex) => (
                                    <label key={oIndex} className="flex items-center space-x-3 cursor-pointer">
                                      <input
                                        type="radio"
                                        name={`question-${qIndex}`}
                                        value={oIndex}
                                        checked={quizAnswers[qIndex] === oIndex}
                                        onChange={() => handleQuizAnswer(qIndex, oIndex)}
                                        className="text-blue-600"
                                      />
                                      <span className="text-gray-700">{option}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={submitQuiz}
                            disabled={quizAnswers.length !== dayData.quiz.length}
                            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                          >
                            Submit Quiz
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITrainingApp;