// Content Repository for SherpaTech.AI Training Program
// This file contains all the training materials organized by week and type

const contentRepository = {
  // Week 1: AI Foundations & Understanding
  week1: {
    title: "AI Foundations & Understanding",
    description: "Introduction to AI concepts, history, and basic applications",
    
    videos: [
      {
        id: "w1_v1",
        title: "What is AI? Core Concepts",
        duration: "15 minutes",
        link: "https://www.youtube.com/embed/ad79nYk2keg",
        description: "Learn the basics of Artificial Intelligence and its applications",
        definition: "Video content providing visual and auditory learning about AI fundamentals"
      },
      {
        id: "w1_v2", 
        title: "AI in Everyday Life",
        duration: "12 minutes",
        link: "https://www.youtube.com/embed/2ePf9rue1Ao",
        description: "Discover how AI is integrated into our daily lives",
        definition: "Practical examples of AI applications we encounter daily"
      },
      {
        id: "w1_v3",
        title: "History of Artificial Intelligence",
        duration: "20 minutes", 
        link: "https://www.youtube.com/embed/8hSyX6D1n_I",
        description: "Journey through the evolution of AI from concept to reality",
        definition: "Historical overview of AI development and milestones"
      }
    ],

    readings: [
      {
        id: "w1_r1",
        title: "Understanding Artificial Intelligence",
        type: "article",
        link: "https://www.ibm.com/topics/artificial-intelligence",
        description: "Comprehensive overview of AI concepts and terminology",
        definition: "Written content for deep understanding of AI principles",
        estimatedTime: "15 minutes"
      },
      {
        id: "w1_r2",
        title: "The AI Revolution: How It Started",
        type: "blog",
        link: "https://www.sas.com/en_us/insights/analytics/what-is-artificial-intelligence.html#history", // Updated link
        description: "Historical perspective on AI development",
        definition: "Educational article tracing AI's origins and growth",
        estimatedTime: "10 minutes"
      },
      {
        id: "w1_r3",
        title: "AI vs Machine Learning vs Deep Learning",
        type: "guide",
        link: "https://www.nvidia.com/en-us/glossary/data-science/machine-learning/", // Updated link
        description: "Clear distinctions between AI, ML, and DL concepts",
        definition: "Explanatory content differentiating key AI terms",
        estimatedTime: "12 minutes"
      }
    ],

    activities: [
      {
        id: "w1_a1",
        title: "AI Recognition Exercise",
        type: "interactive",
        link: "https://teachablemachine.withgoogle.com/",
        description: "Hands-on experience with Google's Teachable Machine",
        definition: "Practical exercise to understand AI training concepts",
        estimatedTime: "30 minutes"
      },
      {
        id: "w1_a2",
        title: "AI Ethics Discussion Forum", 
        type: "forum",
        link: "https://www.futureoflife.org/ai-principles/",
        description: "Explore AI ethics principles and participate in discussions",
        definition: "Collaborative learning about responsible AI development",
        estimatedTime: "20 minutes"
      }
    ],

    podcasts: [
      {
        id: "w1_p1",
        title: "AI Today Podcast - AI Fundamentals",
        duration: "25 minutes",
        link: {
          apple: "https://podcasts.apple.com/us/podcast/ai-today-podcast/id1291999617",
          youtube_playlist: "https://www.youtube.com/playlist?list=PLhFKie92GeJ7gA9t0tHkX5_pZ0Z7Y5Z6Z"
        },
        description: "Expert discussions on current AI trends and basics",
        definition: "Audio content for learning while multitasking"
      }
    ],

    tools: [
      {
        id: "w1_t1",
        title: "ChatGPT Playground",
        type: "interactive_tool",
        link: "https://chat.openai.com/",
        description: "Hands-on experience with conversational AI",
        definition: "Practical tool for understanding AI capabilities",
        estimatedTime: "15 minutes"
      }
    ]
  },

  // Week 2: Building on Foundations
  week2: {
    title: "Machine Learning & AI Applications",
    description: "Deep dive into machine learning concepts and practical AI applications",
    
    videos: [
      {
        id: "w2_v1",
        title: "Introduction to Machine Learning",
        duration: "18 minutes",
        link: "https://www.youtube.com/embed/ukzFI9rgwfU",
        description: "Understanding ML algorithms and their applications",
        definition: "Educational video explaining machine learning fundamentals"
      },
      {
        id: "w2_v2",
        title: "Supervised vs Unsupervised Learning",
        duration: "15 minutes",
        link: "https://www.youtube.com/embed/1FZ0A1QCMWc",
        description: "Distinguishing between different learning approaches",
        definition: "Comparative analysis of ML learning methodologies"
      },
      {
        id: "w2_v3",
        title: "AI in Business Applications",
        duration: "22 minutes",
        link: "https://www.youtube.com/embed/O5xeyoRL95U",
        description: "Real-world business use cases for AI implementation",
        definition: "Practical examples of AI solving business problems"
      }
    ],

    readings: [
      {
        id: "w2_r1",
        title: "Machine Learning Algorithms Explained",
        type: "technical_guide",
        link: "https://towardsdatascience.com/machine-learning-algorithms-explained-3ff8c3d2c50e",
        description: "Comprehensive guide to popular ML algorithms",
        definition: "Technical documentation for understanding algorithm types",
        estimatedTime: "20 minutes"
      },
      {
        id: "w2_r2",
        title: "AI Implementation Success Stories",
        type: "case_studies",
        link: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2023",
        description: "Real business cases of successful AI implementation",
        definition: "Evidence-based examples of AI business impact",
        estimatedTime: "25 minutes"
      }
    ],

    activities: [
      {
        id: "w2_a1",
        title: "Build Your First ML Model",
        type: "hands_on",
        link: "https://www.kaggle.com/learn/intro-to-machine-learning",
        description: "Step-by-step ML model creation on Kaggle",
        definition: "Practical coding exercise for ML understanding",
        estimatedTime: "45 minutes"
      },
      {
        id: "w2_a2",
        title: "AI Use Case Brainstorming",
        type: "worksheet",
        link: "#", // Internal worksheet
        description: "Identify AI opportunities in your industry",
        definition: "Strategic thinking exercise for AI application",
        estimatedTime: "30 minutes"
      }
    ],

    tools: [
      {
        id: "w2_t1",
        title: "Scratch for Machine Learning",
        type: "visual_programming",
        link: "https://machinelearningforkids.co.uk/",
        description: "Visual introduction to ML concepts",
        definition: "User-friendly tool for understanding ML basics",
        estimatedTime: "20 minutes"
      }
    ]
  },

  // Week 3: Practical AI Use Cases & Implementation
  week3: {
    title: "Practical AI Implementation",
    description: "Advanced AI applications, implementation strategies, and future trends",
    
    videos: [
      {
        id: "w3_v1",
        title: "AI Implementation Strategy",
        duration: "20 minutes",
        link: "https://www.youtube.com/embed/example1",
        description: "Strategic approach to implementing AI in organizations",
        definition: "Strategic guidance for successful AI adoption"
      },
      {
        id: "w3_v2",
        title: "Advanced AI Applications",
        duration: "25 minutes",
        link: "https://www.youtube.com/embed/example2",
        description: "Cutting-edge AI applications across industries",
        definition: "Showcase of sophisticated AI use cases"
      },
      {
        id: "w3_v3",
        title: "Future of AI",
        duration: "18 minutes",
        link: "https://www.youtube.com/embed/example3",
        description: "Trends and predictions for AI development",
        definition: "Forward-looking perspective on AI evolution"
      }
    ],

    readings: [
      {
        id: "w3_r1",
        title: "AI Implementation Framework",
        type: "methodology",
        link: "https://hbr.org/2021/07/how-to-choose-your-first-ai-project",
        description: "Harvard Business Review guide to AI project selection",
        definition: "Structured approach to AI initiative planning",
        estimatedTime: "18 minutes"
      },
      {
        id: "w3_r2",
        title: "AI Ethics and Governance",
        type: "policy_guide",
        link: "https://www.brookings.edu/articles/algorithmic-bias-detection-and-mitigation/",
        description: "Understanding AI bias and ethical considerations",
        definition: "Critical thinking about responsible AI development",
        estimatedTime: "22 minutes"
      }
    ],

    activities: [
      {
        id: "w3_a1",
        title: "AI Strategy Development",
        type: "planning_exercise",
        link: "#", // Internal planning template
        description: "Create an AI implementation roadmap for your organization",
        definition: "Strategic planning exercise for AI adoption",
        estimatedTime: "60 minutes"
      },
      {
        id: "w3_a2",
        title: "AI ROI Calculator",
        type: "tool_usage",
        link: "#", // Internal calculator
        description: "Calculate potential return on investment for AI projects",
        definition: "Financial analysis tool for AI business cases",
        estimatedTime: "30 minutes"
      }
    ],

    tools: [
      {
        id: "w3_t1",
        title: "AI Project Canvas",
        type: "planning_tool",
        link: "#", // Internal canvas
        description: "Visual tool for planning AI initiatives",
        definition: "Structured framework for AI project design",
        estimatedTime: "45 minutes"
      }
    ]
  },

  // Quiz questions for each week
  quizzes: {
    week1: {
      title: "Week 1 Assessment",
      shortQuizLabel: "Quick Check: AI Foundations",
      shortQuizQuestions: [
        {
          question: "What is the primary goal of Artificial Intelligence?",
          options: [
            "To replace all human workers",
            "To simulate human intelligence in machines",
            "To create robots",
            "To process data faster"
          ],
          correct: 1,
          explanation: "AI aims to simulate human intelligence processes like learning, reasoning, and problem-solving in machines.",
          reviewLink: "https://www.ibm.com/topics/artificial-intelligence"
        },
        {
          question: "Which of the following is NOT a type of machine learning?",
          options: [
            "Supervised learning",
            "Unsupervised learning", 
            "Reinforcement learning",
            "Cognitive learning"
          ],
          correct: 3,
          explanation: "The three main types of machine learning are supervised, unsupervised, and reinforcement learning. Cognitive learning is not a standard ML category.",
          reviewLink: "https://www.nvidia.com/en-us/glossary/data-science/machine-learning/" // Updated link
        },
        {
          question: "AI systems require which of the following to function effectively?",
          options: [
            "Data",
            "Algorithms", 
            "Computing power",
            "All of the above"
          ],
          correct: 3,
          explanation: "AI systems need data to learn from, algorithms to process information, and computing power to execute complex calculations.",
          reviewLink: "https://www.sas.com/en_us/insights/analytics/what-is-artificial-intelligence.html#history" // Updated link
        },
        {
          question: "What year is considered the birth of AI as a field of study?",
          options: [
            "1950",
            "1956",
            "1960",
            "1965"
          ],
          correct: 1,
          explanation: "1956 is widely considered the birth year of AI when the term 'artificial intelligence' was coined at the Dartmouth Conference.",
          reviewLink: "https://www.sas.com/en_us/insights/analytics/what-is-artificial-intelligence.html#history" // Updated link
        },
        {
          question: "Which AI application do most people interact with daily?",
          options: [
            "Autonomous vehicles",
            "Recommendation systems",
            "Industrial robots",
            "Medical diagnosis systems"
          ],
          correct: 1,
          explanation: "Recommendation systems are embedded in platforms like Netflix, Amazon, and social media that most people use daily.",
          reviewLink: "https://teachablemachine.withgoogle.com/"
        }
      ],
      shortFormLabel: "Brief Feedback: Week 1",
      shortFormLink: "https://forms.office.com/r/DXiGNpzgeq",
      longFormLabel: "Comprehensive Review: Week 1 Goals & Insights",
      longFormLink: "https://forms.office.com/r/hrts0SiY6K"
    },

    week2: {
      title: "Week 2 Assessment",
      shortQuizLabel: "Quick Check: Machine Learning",
      shortQuizQuestions: [
        {
          question: "What is the main difference between supervised and unsupervised learning?",
          options: [
            "Supervised learning uses more data",
            "Supervised learning uses labeled data, unsupervised uses unlabeled data",
            "Unsupervised learning is more accurate",
            "There is no significant difference"
          ],
          correct: 1,
          explanation: "Supervised learning trains on labeled data with known outcomes, while unsupervised learning finds patterns in unlabeled data.",
          reviewLink: "https://towardsdatascience.com/machine-learning-algorithms-explained-3ff8c3d2c50e"
        },
        {
          question: "Which business function is MOST commonly enhanced by AI implementation?",
          options: [
            "Customer service",
            "Marketing and sales",
            "Data analysis",
            "All of the above"
          ],
          correct: 3,
          explanation: "AI enhances multiple business functions including customer service (chatbots), marketing (personalization), and data analysis (insights).",
          reviewLink: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2023"
        },
        {
          question: "What is a neural network?",
          options: [
            "A computer network",
            "A mathematical model inspired by biological neural networks",
            "A social network for AI researchers",
            "A type of database"
          ],
          correct: 1,
          explanation: "Neural networks are mathematical models inspired by biological neural networks, used in deep learning to process complex data.",
          reviewLink: "https://www.kaggle.com/learn/intro-to-machine-learning"
        },
        {
          question: "Which factor is MOST critical for successful AI implementation in business?",
          options: [
            "Expensive hardware",
            "Large development team",
            "Quality data",
            "Complex algorithms"
          ],
          correct: 2,
          explanation: "Quality data is the foundation of successful AI implementation - without good data, even the best algorithms will fail.",
          reviewLink: "https://machinelearningforkids.co.uk/"
        },
        {
          question: "What is 'training data' in machine learning?",
          options: [
            "Data used to test the final model",
            "Data used to teach the algorithm patterns",
            "Data stored in databases",
            "Data from training courses"
          ],
          correct: 1,
          explanation: "Training data is the dataset used to teach machine learning algorithms to recognize patterns and make predictions.",
          reviewLink: "https://towardsdatascience.com/machine-learning-algorithms-explained-3ff8c3d2c50e"
        }
      ],
      shortFormLabel: "Brief Feedback: Week 2",
      shortFormLink: "https://forms.office.com/r/DXiGNpzgeq",
      longFormLabel: "Comprehensive Review: Week 2 Goals & Insights",
      longFormLink: "https://forms.office.com/r/hrts0SiY6K"
    },

    week3: {
      title: "Week 3 Assessment",
      shortQuizLabel: "Quick Check: AI Implementation",
      shortQuizQuestions: [
        {
          question: "What should be the first step in an AI implementation strategy?",
          options: [
            "Buy AI software",
            "Hire AI engineers",
            "Identify specific business problems to solve",
            "Collect all available data"
          ],
          correct: 2,
          explanation: "Successful AI implementation starts with identifying specific business problems that AI can solve, not with technology acquisition.",
          reviewLink: "https://hbr.org/2021/07/how-to-choose-your-first-ai-project"
        },
        {
          question: "What is algorithmic bias?",
          options: [
            "When algorithms work too slowly",
            "When AI systems reflect unfair prejudices from training data",
            "When algorithms are too complex",
            "When AI costs too much"
          ],
          correct: 1,
          explanation: "Algorithmic bias occurs when AI systems perpetuate or amplify unfair prejudices present in their training data.",
          reviewLink: "https://www.brookings.edu/articles/algorithmic-bias-detection-and-mitigation/"
        },
        {
          question: "Which metric is MOST important for measuring AI project success?",
          options: [
            "Technical accuracy only",
            "Speed of implementation",
            "Business impact and ROI",
            "Number of features"
          ],
          correct: 2,
          explanation: "Business impact and ROI are the most important metrics as they demonstrate real value creation from AI investments.",
          reviewLink: "https://hbr.org/2021/07/how-to-choose-your-first-ai-project"
        },
        {
          question: "What is the primary challenge in AI ethics?",
          options: [
            "Technical complexity",
            "Cost of implementation",
            "Balancing innovation with responsible use",
            "Lack of data"
          ],
          correct: 2,
          explanation: "The main ethical challenge is balancing AI innovation and capabilities with responsible, fair, and safe deployment.",
          reviewLink: "https://www.brookings.edu/articles/algorithmic-bias-detection-and-mitigation/"
        },
        {
          question: "What trend is expected to shape the future of AI?",
          options: [
            "Decreased automation",
            "More specialized and domain-specific AI",
            "Less data requirements",
            "Simpler algorithms"
          ],
          correct: 1,
          explanation: "The future of AI is moving toward more specialized, domain-specific applications rather than general-purpose systems.",
          reviewLink: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2023"
        }
      ],
      shortFormLabel: "Brief Feedback: Week 3",
      shortFormLink: "https://forms.office.com/r/DXiGNpzgeq",
      longFormLabel: "Comprehensive Review: Week 3 Goals & Insights",
      longFormLink: "https://forms.office.com/r/hrts0SiY6K"
    }
  }
};

export default contentRepository;
