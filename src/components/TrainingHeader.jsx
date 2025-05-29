import React from 'react';

const TrainingHeader = ({ currentWeek, handlePreviousWeek, handleNextWeek, trainingData, deviceInfo, navigate, setShowMobileView, showMobileView }) => {
  return (
    <header className={`bg-white shadow-sm border-b border-ice-blue ${
      deviceInfo.isMobile ? 'mobile-header safe-area-inset-top' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button 
            onClick={() => navigate('/')} 
            className="bg-navy-blue text-alpine-white font-medium py-2 px-3 sm:px-4 rounded-lg shadow hover:bg-mountain-blue transition-colors duration-200 text-sm"
          >
            <span className="hidden sm:inline">← Home</span>
            <span className="sm:hidden">←</span>
          </button>
          {process.env.NODE_ENV === 'development' && (
            <button 
              onClick={() => setShowMobileView(!showMobileView)}
              className="bg-gray-600 text-white font-medium py-1 px-2 rounded text-xs hover:bg-gray-700 transition-colors duration-200"
              title="Toggle mobile view for testing"
            >
              📱 {showMobileView ? 'Desktop' : 'Mobile'}
            </button>
          )}
          <div className="flex items-center gap-1 sm:gap-4">
            <button 
              onClick={handlePreviousWeek} 
              disabled={currentWeek === 1} 
              className={`p-2 rounded-lg transition-colors duration-200 ${
                currentWeek === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-navy-blue text-alpine-white hover:bg-mountain-blue'
              }`}
              aria-label="Previous week"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm sm:text-base font-medium text-navy-blue px-2 min-w-[60px] text-center">
              <span className="hidden sm:inline">Week </span>{currentWeek}
            </span>
            <button 
              onClick={handleNextWeek} 
              disabled={currentWeek === trainingData.length} 
              className={`p-2 rounded-lg transition-colors duration-200 ${
                currentWeek === trainingData.length 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-navy-blue text-alpine-white hover:bg-mountain-blue'
              }`}
              aria-label="Next week"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TrainingHeader;
