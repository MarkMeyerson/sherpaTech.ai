import React from 'react';

const QuizSection = ({
  currentQuestionIndex,
  contentRepository,
  currentWeek,
  handleAnswerSubmit,
  answerFeedback,
  quizAnswers, // Added quizAnswers to destructuring
  quizSummaryData, // New prop
  exitQuiz,        // New prop
  score            // New prop
}) => {
  const currentQuiz = contentRepository.quizzes[`week${currentWeek}`];

  if (!currentQuiz || currentQuiz.length === 0) {
    return (
      <div className="mt-12 text-center">
        <p className="text-gray-600">No quiz available for this week.</p>
        <button
          onClick={exitQuiz} // Allow exiting if no quiz
          className="mt-4 bg-navy-blue text-white font-semibold py-2 px-6 rounded-lg hover:bg-mountain-blue transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-blue"
        >
          Back to Content
        </button>
      </div>
    );
  }

  // If quizSummaryData exists, the quiz is complete, show summary
  if (quizSummaryData) {
    return (
      <div className="mt-12">
        <div className="bg-white rounded-xl shadow-sm border border-ice-blue overflow-hidden p-6">
          <h3 className="text-2xl font-semibold text-navy-blue mb-4 text-center">Quiz Summary</h3>
          <p className="text-lg text-center text-gray-700 mb-2">
            You scored: <span className="font-bold">{quizSummaryData.score}</span> out of {' '} <span className="font-bold">{quizSummaryData.totalQuestions}</span>
          </p>
          {quizSummaryData.missedQuestions.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xl font-semibold text-mountain-blue mb-3">Review Topics:</h4>
              <ul className="space-y-4">
                {quizSummaryData.missedQuestions.map((item, index) => (
                  <li key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="font-medium text-red-700">Q: {item.question}</p>
                    <p className="text-sm text-red-600">Your answer: {item.yourAnswer}</p>
                    <p className="text-sm text-green-600">Correct answer: {item.correctAnswer}</p>
                    {item.explanation && <p className="text-sm text-gray-600 mt-1">Explanation: {item.explanation}</p>}
                    {item.reviewLink && (
                      <a
                        href={item.reviewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        Learn more <span className="ml-1">➔</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {quizSummaryData.missedQuestions.length === 0 && (
             <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h4 className="text-xl font-semibold text-green-700 mb-2">Excellent! You got all questions correct!</h4>
            </div>
          )}
          <div className="mt-8 text-center">
            <button
              onClick={exitQuiz}
              className="bg-navy-blue text-white font-semibold py-3 px-8 rounded-lg hover:bg-mountain-blue transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-blue"
            >
              Back to Week Content
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Display current question
  const currentQuestion = currentQuiz[currentQuestionIndex];
  if (!currentQuestion) {
    // Should ideally not happen if quizSummaryData is handled correctly
    return <p className="text-center text-red-500">Error: Question not found.</p>; 
  }

  const progressPercentage = Math.round(((currentQuestionIndex) / currentQuiz.length) * 100);

  return (
    <div className="mt-12">
      <div className="bg-white rounded-xl shadow-sm border border-ice-blue overflow-hidden">
        <div className="bg-gradient-to-r from-navy-blue to-mountain-blue px-6 py-4 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-white flex items-center">
              <span className="text-2xl mr-3">📝</span>
              Weekly Quiz: Week {currentWeek}
            </h3>
            <p className="text-ice-blue mt-1 text-sm">
              Question {currentQuestionIndex + 1} of {currentQuiz.length}
            </p>
          </div>
          <button 
            onClick={exitQuiz}
            className="text-sm text-white hover:text-ice-blue transition-colors duration-200 bg-white/20 hover:bg-white/30 py-1 px-3 rounded-md"
            title="Exit Quiz"
          >
            Exit
          </button>
        </div>
        <div className="p-6">
          {/* Progress Bar and Score */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Progress: {progressPercentage}%
              </span>
              <span className="text-sm font-medium text-navy-blue">
                Score: {score} / {currentQuiz.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question */}
          <div className="mb-6">
            <h4 className="text-lg sm:text-xl font-medium text-navy-blue mb-4 leading-relaxed">
              {currentQuestion.question}
            </h4>
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSubmit(idx)}
                  disabled={!!answerFeedback} // Disable options after an answer is submitted, until next question
                  className={`w-full text-left py-4 px-5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 group quiz-option-mobile min-h-[60px] sm:min-h-[auto] ${
                    answerFeedback && idx === currentQuestion.correct ? 'border-green-500 bg-green-50 ring-green-500' : 
                    answerFeedback && idx !== currentQuestion.correct && quizAnswers[currentQuestionIndex] === idx ? 'border-red-500 bg-red-50 ring-red-500' : 
                    'border-gray-200 hover:border-navy-blue hover:bg-ice-blue focus:ring-navy-blue'
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${
                       answerFeedback && idx === currentQuestion.correct ? 'border-green-600 bg-green-600' : 
                       answerFeedback && idx !== currentQuestion.correct && quizAnswers[currentQuestionIndex] === idx ? 'border-red-600 bg-red-600' : 
                       'border-gray-300 group-hover:border-navy-blue'
                    }`}>
                      {answerFeedback && idx === currentQuestion.correct && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                      {answerFeedback && idx !== currentQuestion.correct && quizAnswers[currentQuestionIndex] === idx && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>}
                    </span>
                    <span className={`transition-colors duration-200 text-base sm:text-sm ${
                       answerFeedback && idx === currentQuestion.correct ? 'text-green-700 font-medium' : 
                       answerFeedback && idx !== currentQuestion.correct && quizAnswers[currentQuestionIndex] === idx ? 'text-red-700 font-medium' : 
                       'text-gray-700 group-hover:text-navy-blue'
                    }`}>
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Answer Feedback */}
          {answerFeedback && (
            <div className={`mt-6 p-5 border-l-4 rounded-lg ${
              answerFeedback.type === 'error' 
                ? 'bg-red-50 border-red-400' 
                : 'bg-green-50 border-green-400'
            }`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {answerFeedback.type === 'error' ? (
                    <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className={`font-medium ${answerFeedback.type === 'error' ? 'text-red-800' : 'text-green-800'}`}>
                    {answerFeedback.message}
                  </p>
                  {answerFeedback.type === 'error' && answerFeedback.reviewLink && (
                    <a
                      href={answerFeedback.reviewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-3 text-sm font-medium text-red-600 hover:text-red-500 transition-colors duration-200"
                    >
                      Learn more about this topic
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
