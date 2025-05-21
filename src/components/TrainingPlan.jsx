import React, { useState } from 'react';
import { CheckCircle, Circle, ChevronRight, ChevronDown } from 'lucide-react';

const TrainingPlan = () => {
  const [expandedModules, setExpandedModules] = useState({});
  const [completedLessons, setCompletedLessons] = useState({});

  // Toggle module expansion
  const toggleModule = (moduleId) => {
    setExpandedModules({
      ...expandedModules,
      [moduleId]: !expandedModules[moduleId]
    });
  };

  // Toggle lesson completion status
  const toggleLessonCompletion = (lessonId) => {
    setCompletedLessons({
      ...completedLessons,
      [lessonId]: !completedLessons[lessonId]
    });
  };

  // Sample training plan data
  const trainingModules = [
    {
      id: 'module-1',
      title: 'AI Foundations',
      description: 'Understand core AI concepts and terminology',
      lessons: [
        { id: 'lesson-1-1', title: 'What is AI? Demystifying the Technology', duration: '15 min' },
        { id: 'lesson-1-2', title: 'Types of AI: Narrow, General, and Super Intelligence', duration: '20 min' },
        { id: 'lesson-1-3', title: 'How AI is Transforming Business Operations', duration: '25 min' },
        { id: 'lesson-1-4', title: 'Ethics and Responsibility in AI Implementation', duration: '30 min' }
      ]
    },
    {
      id: 'module-2',
      title: 'Practical AI Tools',
      description: 'Hands-on experience with business-ready AI solutions',
      lessons: [
        { id: 'lesson-2-1', title: 'Introduction to Microsoft Copilot', duration: '20 min' },
        { id: 'lesson-2-2', title: 'Leveraging ChatGPT for Business Tasks', duration: '25 min' },
        { id: 'lesson-2-3', title: 'AI-Powered Analytics Tools Overview', duration: '30 min' },
        { id: 'lesson-2-4', title: 'Automating Workflows with AI Assistants', duration: '35 min' }
      ]
    },
    {
      id: 'module-3',
      title: 'Strategic AI Implementation',
      description: 'Apply AI to solve real business challenges',
      lessons: [
        { id: 'lesson-3-1', title: 'Identifying AI Opportunities in Your Business', duration: '30 min' },
        { id: 'lesson-3-2', title: 'Building Your First AI-Enhanced Process', duration: '45 min' },
        { id: 'lesson-3-3', title: 'Measuring ROI of AI Initiatives', duration: '25 min' },
        { id: 'lesson-3-4', title: 'Creating an AI Roadmap for Your Organization', duration: '40 min' }
      ]
    },
    {
      id: 'module-4',
      title: 'Advanced AI Applications',
      description: 'Explore cutting-edge AI use cases and future trends',
      lessons: [
        { id: 'lesson-4-1', title: 'Generative AI for Content Creation', duration: '35 min' },
        { id: 'lesson-4-2', title: 'Predictive Analytics and Forecasting', duration: '40 min' },
        { id: 'lesson-4-3', title: 'Natural Language Processing in Customer Service', duration: '30 min' },
        { id: 'lesson-4-4', title: 'Future Trends: What's Next in Business AI', duration: '25 min' }
      ]
    }
  ];

  // Calculate progress for each module
  const calculateModuleProgress = (moduleId) => {
    const module = trainingModules.find(m => m.id === moduleId);
    if (!module) return 0;
    
    const totalLessons = module.lessons.length;
    if (totalLessons === 0) return 0;
    
    const completedCount = module.lessons.filter(lesson => 
      completedLessons[lesson.id]
    ).length;
    
    return Math.round((completedCount / totalLessons) * 100);
  };

  // Calculate overall progress
  const calculateOverallProgress = () => {
    const totalLessons = trainingModules.reduce((acc, module) => 
      acc + module.lessons.length, 0);
    
    if (totalLessons === 0) return 0;
    
    const totalCompleted = Object.values(completedLessons).filter(Boolean).length;
    return Math.round((totalCompleted / totalLessons) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-pearl-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-blue mb-4">Your AI Training Plan</h1>
        <p className="text-mountain-blue mb-4">Complete these modules to build your AI skills and confidence.</p>
        
        {/* Overall progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-navy-blue">Overall Progress</span>
            <span className="text-mountain-blue">{calculateOverallProgress()}%</span>
          </div>
          <div className="h-3 bg-ice-blue rounded-full overflow-hidden">
            <div 
              className="h-full bg-navy-blue rounded-full transition-all duration-300"
              style={{ width: `${calculateOverallProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Training modules */}
      <div className="space-y-4">
        {trainingModules.map((module) => (
          <div key={module.id} className="border border-mountain-blue border-opacity-20 rounded-lg overflow-hidden bg-alpine-white">
            {/* Module header */}
            <div 
              className="p-4 cursor-pointer flex justify-between items-center hover:bg-ice-blue transition-colors duration-200"
              onClick={() => toggleModule(module.id)}
            >
              <div>
                <h3 className="font-semibold text-navy-blue text-lg">{module.title}</h3>
                <p className="text-mountain-blue text-sm">{module.description}</p>
              </div>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-mountain-blue mr-2">{calculateModuleProgress(module.id)}%</span>
                    <span className="text-deep-navy">
                      {expandedModules[module.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </span>
                  </div>
                  <div className="h-2 w-24 bg-ice-blue rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-navy-blue rounded-full transition-all duration-300"
                      style={{ width: `${calculateModuleProgress(module.id)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Module lessons */}
            {expandedModules[module.id] && (
              <div className="border-t border-mountain-blue border-opacity-10">
                {module.lessons.map((lesson) => (
                  <div 
                    key={lesson.id} 
                    className="p-3 border-b border-mountain-blue border-opacity-10 last:border-0 flex justify-between items-center hover:bg-ice-blue transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <button 
                        className="mr-3 text-navy-blue focus:outline-none"
                        onClick={() => toggleLessonCompletion(lesson.id)}
                      >
                        {completedLessons[lesson.id] ? 
                          <CheckCircle size={20} className="text-navy-blue" /> : 
                          <Circle size={20} className="text-mountain-blue" />
                        }
                      </button>
                      <span className={`${completedLessons[lesson.id] ? 'line-through text-mountain-blue' : 'text-deep-navy'}`}>
                        {lesson.title}
                      </span>
                    </div>
                    <span className="text-sm text-mountain-blue">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button className="bg-navy-blue text-alpine-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-200 font-semibold">
          Continue Learning
        </button>
        <button className="bg-mountain-blue text-alpine-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-200 font-semibold">
          Download Plan
        </button>
      </div>
    </div>
  );
};

export default TrainingPlan;