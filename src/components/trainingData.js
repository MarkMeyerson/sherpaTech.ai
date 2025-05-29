// Training data for the SherpaTech.ai Training App

const trainingData = [
  {
    week: 1,
    title: "Foundations of AI",
    content: [
      {
        id: 1,
        type: "video",
        title: "What is AI? Core Concepts",
        duration: "30 minutes",
        url: "https://www.youtube.com/embed/ad79nYk2keg",
        description: "Learn the basics of Artificial Intelligence and its applications."
      },
      {
        id: 2,
        type: "video",
        title: "What is Artificial Intelligence? In 5 minutes",
        duration: "5 minutes",
        url: "https://www.youtube.com/embed/2ePf9rue1Ao",
        description: "Quick overview of AI fundamentals."
      },
      {
        id: 3,
        type: "reading",
        title: "Understanding Artificial Intelligence",
        description: "Explore the core concepts of AI.",
        content: "Artificial Intelligence (AI) is the simulation of human intelligence in machines programmed to think and learn. AI systems can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation."
      },
      {
        id: 4,
        type: "activity",
        title: "Sign up for Microsoft Learn AI Track",
        url: "https://learn.microsoft.com/en-us/training/browse/?products=ai-services",
        description: "Free, self-paced learning paths for AI fundamentals, Azure AI services, and more."
      },
      {
        id: 5,
        type: "reading",
        title: "History of AI",
        description: "Dive into the history and evolution of Artificial Intelligence.",
        content: "The history of AI dates back to ancient times, with myths and stories of artificial beings endowed with intelligence. Modern AI began in the mid-20th century with the development of computers and the exploration of machine learning algorithms."
      },
      {
        id: 6,
        type: "video",
        title: "AI in Everyday Life",
        duration: "15 minutes",
        url: "https://www.youtube.com/embed/8hSyX6D1n_I",
        description: "Discover how AI is integrated into our daily lives."
      }
    ],
    quiz: [
      {
        question: "What is AI?",
        options: [
          "A type of computer virus",
          "A simulation of human intelligence in machines",
          "A programming language",
          "A hardware device"
        ],
        correct: 1,
        explanation: "AI is the simulation of human intelligence in machines programmed to think and learn."
      },
      {
        question: "Which of the following is an application of AI?",
        options: [
          "Speech recognition",
          "Data entry",
          "Manual calculations",
          "Paper filing"
        ],
        correct: 0,
        explanation: "Speech recognition is a common application of AI, enabling machines to understand and process human language."
      }
    ]
  },
  {
    week: 2,
    title: "Machine Learning Basics",
    content: [
      {
        id: 5,
        type: "video",
        title: "Supervised vs Unsupervised Learning",
        duration: "45 minutes",
        url: "https://www.youtube.com/embed/2ePf9rue1Ao",
        description: "Learn the differences between supervised and unsupervised learning techniques."
      },
      {
        id: 6,
        type: "reading",
        title: "Applications of Machine Learning",
        description: "Discover how machine learning is applied in various industries.",
        content: "Machine learning is used in healthcare, finance, retail, and more to make predictions and automate tasks."
      },
      {
        id: 7,
        type: "activity",
        title: "Explore IBM AI Chatbots",
        url: "https://www.ibm.com/blog/ai-chatbots-vs-rule-based-chatbots/",
        description: "Learn about the differences between AI-powered and rule-based chatbots."
      }
    ],
    quiz: [
      {
        question: "What is supervised learning?",
        options: [
          "Learning without labeled data",
          "Learning with labeled data",
          "Learning by trial and error",
          "Learning through observation"
        ],
        correct: 1,
        explanation: "Supervised learning uses labeled data to train models."
      },
      {
        question: "What can modern AI agents do that simple chatbots cannot?",
        options: [
          "Display text",
          "Use tools and access external data",
          "Accept user input",
          "Show error messages"
        ],
        correct: 1,
        explanation: "Modern AI agents can use tools, access databases, call APIs, and complete complex multi-step tasks beyond simple conversation."
      }
    ]
  },
  {
    week: 3,
    title: "AI in Business",
    content: [
      {
        id: 8,
        type: "video",
        title: "AI for Small Businesses",
        duration: "40 minutes",
        url: "https://www.youtube.com/embed/ad79nYk2keg",
        description: "Discover how AI can help small businesses grow and succeed."
      },
      {
        id: 9,
        type: "reading",
        title: "Future of AI",
        description: "Discuss the potential future developments and ethical considerations in AI.",
        content: "The future of AI includes advancements in natural language processing, robotics, and ethical AI frameworks."
      },
      {
        id: 10,
        type: "activity",
        title: "Explore OpenAI Function Calling",
        url: "https://platform.openai.com/docs/guides/function-calling",
        description: "Learn how AI agents use tools and APIs to complete tasks."
      }
    ],
    quiz: [
      {
        question: "What is one benefit of AI for small businesses?",
        options: [
          "Increased costs",
          "Improved efficiency",
          "Reduced customer satisfaction",
          "Decreased productivity"
        ],
        correct: 1,
        explanation: "AI helps small businesses improve efficiency by automating tasks and providing insights."
      },
      {
        question: "What is 'tool use' in AI agents?",
        options: [
          "Agents using hammers and screwdrivers",
          "The ability to call functions and APIs to complete tasks",
          "Agents breaking down",
          "Manual configuration"
        ],
        correct: 1,
        explanation: "Tool use refers to AI agents' ability to call functions, APIs, and external services to gather information and complete tasks."
      }
    ]
  }
];

export default trainingData;
