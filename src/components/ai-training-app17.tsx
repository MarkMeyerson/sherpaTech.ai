import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Play, BookOpen, CheckCircle, Award, BarChart3, Clock, Target, User, AlertCircle, Headphones, ExternalLink, Book } from 'lucide-react';

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
  const [quizResults, setQuizResults] = useState(null);

  // Training data structure
  const trainingData = {
    week1: {
      title: "AI Foundations & Understanding",
      days: [
        {
          day: 1,
          title: "What is AI? Core Concepts",
          video: "https://www.youtube.com/embed/ad79nYk2keg",
          additionalVideo: {
            title: "What is Artificial Intelligence? In 5 minutes",
            url: "https://www.youtube.com/embed/2ePf9rue1Ao",
            description: "Quick overview of AI fundamentals"
          },
          reading: {
            title: "Understanding Artificial Intelligence",
            content: "Artificial Intelligence (AI) is the simulation of human intelligence in machines programmed to think and learn. AI systems can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation. There are two main types: Narrow AI (designed for specific tasks) and General AI (human-level intelligence across all domains). Currently, all AI implementations are Narrow AI, excelling in specific domains like chess, image recognition, or language processing."
          },
          platformSignup: {
            title: "Get Started with Free AI Learning Platforms",
            platforms: [
              {
                name: "Microsoft Learn AI Track",
                description: "Free, self-paced learning paths for AI fundamentals, Azure AI services, and more",
                link: "https://learn.microsoft.com/en-us/training/browse/?products=ai-services",
                guidance: "Start with 'AI Fundamentals' learning path, then explore 'Azure AI Fundamentals'"
              },
              {
                name: "OpenAI Learning Resources",
                description: "Official tutorials and documentation for GPT models and API usage",
                link: "https://platform.openai.com/docs/tutorials",
                guidance: "Begin with 'Getting Started' guide and explore the Playground"
              }
            ]
          },
          quiz: [
            {
              question: "What does AI stand for?",
              options: [
                "Automated Intelligence",
                "Artificial Intelligence",
                "Advanced Integration",
                "Analytical Information"
              ],
              correct: 1,
              explanation: "AI stands for Artificial Intelligence, which refers to machines programmed to simulate human intelligence.",
              reviewLink: "https://www.ibm.com/cloud/learn/what-is-artificial-intelligence"
            },
            {
              question: "Which type of AI are we currently using in the real world?",
              options: [
                "General AI",
                "Super AI",
                "Narrow AI",
                "Universal AI"
              ],
              correct: 2,
              explanation: "We currently use Narrow AI, which is designed for specific tasks. General AI (human-level intelligence) doesn't exist yet.",
              reviewLink: "https://www.ibm.com/topics/artificial-intelligence"
            },
            {
              question: "AI can help with which of the following tasks?",
              options: [
                "Image recognition",
                "Language translation",
                "Decision making",
                "All of the above"
              ],
              correct: 3,
              explanation: "AI can assist with all these tasks - image recognition, language translation, and decision making are all common AI applications.",
              reviewLink: "https://www.coursera.org/articles/ai-applications"
            },
            {
              question: "What is the main difference between Narrow AI and General AI?",
              options: [
                "Narrow AI is faster than General AI",
                "Narrow AI is designed for specific tasks, General AI has human-level intelligence across all domains",
                "General AI is cheaper to develop",
                "There is no difference"
              ],
              correct: 1,
              explanation: "Narrow AI excels at specific tasks (like playing chess), while General AI would have human-level intelligence across all domains.",
              reviewLink: "https://www.ibm.com/topics/artificial-general-intelligence"
            },
            {
              question: "Which of these is an example of AI in daily life?",
              options: [
                "Email spam filters",
                "Voice assistants like Siri",
                "Netflix recommendations",
                "All of the above"
              ],
              correct: 3,
              explanation: "All of these are examples of AI in daily life - spam filters use machine learning, voice assistants use NLP, and Netflix uses recommendation algorithms.",
              reviewLink: "https://www.tableau.com/data-insights/ai/examples"
            },
            {
              question: "What enables machines to 'learn' in AI?",
              options: [
                "Programming every possible scenario",
                "Machine Learning algorithms",
                "Human operators controlling them",
                "Random chance"
              ],
              correct: 1,
              explanation: "Machine Learning algorithms enable AI systems to learn from data and improve their performance without being explicitly programmed for every scenario.",
              reviewLink: "https://www.ibm.com/topics/machine-learning"
            },
            {
              question: "True or False: AI can only work with numbers and cannot understand text or images.",
              options: [
                "True",
                "False"
              ],
              correct: 1,
              explanation: "False. Modern AI can process and understand text (NLP), images (computer vision), audio, and many other data types.",
              reviewLink: "https://www.sas.com/en_us/insights/analytics/what-is-artificial-intelligence.html"
            },
            {
              question: "What is a key benefit of using AI in business?",
              options: [
                "It completely replaces all human workers",
                "It can automate repetitive tasks and improve efficiency",
                "It eliminates the need for decision making",
                "It works without any data"
              ],
              correct: 1,
              explanation: "AI's key benefit is automating repetitive tasks and improving efficiency, allowing humans to focus on more creative and strategic work.",
              reviewLink: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai"
            },
            {
              question: "Which industry has NOT been significantly impacted by AI?",
              options: [
                "Healthcare",
                "Finance",
                "Transportation",
                "None - AI impacts all industries"
              ],
              correct: 3,
              explanation: "AI has impacted virtually every industry, from healthcare diagnostics to financial fraud detection to autonomous vehicles.",
              reviewLink: "https://www.pwc.com/gx/en/issues/data-and-analytics/artificial-intelligence.html"
            },
            {
              question: "What should be a primary consideration when implementing AI?",
              options: [
                "Using it for everything possible",
                "Ethical use and bias prevention",
                "Keeping it secret from competitors",
                "Avoiding all regulations"
              ],
              correct: 1,
              explanation: "Ethical considerations and bias prevention are crucial when implementing AI to ensure fair and responsible use of the technology.",
              reviewLink: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics"
            }
          ]
        },
        {
          day: 2,
          title: "Machine Learning Basics",
          video: "https://www.youtube.com/embed/ukzFI9rgwfU",
          additionalVideo: {
            title: "Jevons Intelligence: Why Agent Coders Will Turn Everyone Into Software Developers",
            url: "https://www.youtube.com/embed/dhcvEmlFAZE",
            description: "8 mins – A bright outlook for the future of coding with AI"
          },
          reading: {
            title: "Introduction to Machine Learning",
            content: "Machine Learning (ML) is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed. There are three main types: Supervised Learning (learning from labeled examples), Unsupervised Learning (finding patterns in unlabeled data), and Reinforcement Learning (learning through trial and error with rewards). ML algorithms identify patterns in data and use these patterns to make predictions or decisions on new, unseen data."
          },
          quiz: [
            {
              question: "What is Machine Learning?",
              options: [
                "Programming computers with specific rules",
                "Systems that learn and improve from experience",
                "Robots that move on their own",
                "Computer hardware components"
              ],
              correct: 1,
              explanation: "Machine Learning enables systems to learn and improve from experience without being explicitly programmed for every scenario.",
              reviewLink: "https://www.ibm.com/topics/machine-learning"
            },
            {
              question: "Which type of machine learning uses labeled training data?",
              options: [
                "Unsupervised Learning",
                "Reinforcement Learning",
                "Supervised Learning",
                "Deep Learning"
              ],
              correct: 2,
              explanation: "Supervised Learning uses labeled data where the correct answers are provided during training.",
              reviewLink: "https://www.ibm.com/topics/supervised-learning"
            },
            {
              question: "What is an example of Supervised Learning?",
              options: [
                "Grouping similar customers together",
                "Email spam classification",
                "Finding patterns in unlabeled data",
                "A robot learning to walk"
              ],
              correct: 1,
              explanation: "Email spam classification is supervised learning - the algorithm learns from emails labeled as 'spam' or 'not spam'.",
              reviewLink: "https://www.datacamp.com/blog/supervised-machine-learning"
            },
            {
              question: "What type of ML would you use to discover hidden patterns in customer data?",
              options: [
                "Supervised Learning",
                "Unsupervised Learning",
                "Reinforcement Learning",
                "Transfer Learning"
              ],
              correct: 1,
              explanation: "Unsupervised Learning is used to find hidden patterns in data without predefined labels.",
              reviewLink: "https://www.ibm.com/topics/unsupervised-learning"
            },
            {
              question: "True or False: Machine Learning requires huge amounts of data to work effectively.",
              options: [
                "True - always needs massive datasets",
                "False - can work with small datasets depending on the problem"
              ],
              correct: 1,
              explanation: "False. While more data often helps, many ML techniques can work effectively with smaller, quality datasets depending on the problem complexity.",
              reviewLink: "https://towardsdatascience.com/how-much-data-do-you-need-for-machine-learning-8b7f8dbb9dc2"
            },
            {
              question: "What is Reinforcement Learning?",
              options: [
                "Learning from labeled examples",
                "Learning through trial and error with rewards",
                "Copying human behavior exactly",
                "Memorizing all possible outcomes"
              ],
              correct: 1,
              explanation: "Reinforcement Learning involves an agent learning through trial and error, receiving rewards for good actions and penalties for bad ones.",
              reviewLink: "https://www.ibm.com/topics/reinforcement-learning"
            },
            {
              question: "Which of these is NOT a common application of Machine Learning?",
              options: [
                "Product recommendations",
                "Fraud detection",
                "Weather prediction",
                "All of these use ML"
              ],
              correct: 3,
              explanation: "All of these are common ML applications - recommendations use collaborative filtering, fraud detection uses anomaly detection, and weather prediction uses complex ML models.",
              reviewLink: "https://www.tableau.com/learn/articles/machine-learning-applications"
            },
            {
              question: "What is 'training' in Machine Learning?",
              options: [
                "Teaching humans to use ML",
                "The process of an algorithm learning patterns from data",
                "Installing ML software",
                "Debugging ML code"
              ],
              correct: 1,
              explanation: "Training is the process where an ML algorithm learns patterns from data to make predictions or decisions.",
              reviewLink: "https://developers.google.com/machine-learning/crash-course/training-and-loss/video-lecture"
            },
            {
              question: "What happens during the 'testing' phase of ML?",
              options: [
                "The model is built",
                "The model's performance is evaluated on new data",
                "Data is collected",
                "Features are selected"
              ],
              correct: 1,
              explanation: "During testing, the model's performance is evaluated on new data it hasn't seen before to assess how well it generalizes.",
              reviewLink: "https://machinelearningmastery.com/train-test-split-for-evaluating-machine-learning-algorithms/"
            },
            {
              question: "Why is Machine Learning important for the future of work?",
              options: [
                "It will replace all human jobs",
                "It augments human capabilities and automates routine tasks",
                "It makes computers slower",
                "It's just a temporary trend"
              ],
              correct: 1,
              explanation: "ML augments human capabilities by automating routine tasks, allowing people to focus on creative and strategic work.",
              reviewLink: "https://www.mckinsey.com/featured-insights/future-of-work/ai-automation-and-the-future-of-work-ten-things-to-solve-for"
            }
          ]
        },
        {
          day: 3,
          title: "Neural Networks & Deep Learning",
          video: "https://www.youtube.com/embed/aircAruvnKk",
          reading: {
            title: "Understanding Neural Networks",
            content: "Neural networks are computing systems inspired by biological neural networks in the brain. They consist of interconnected nodes (neurons) organized in layers: input layer, hidden layers, and output layer. Deep Learning refers to neural networks with multiple hidden layers, enabling them to learn complex patterns. These networks excel at tasks like image recognition, natural language processing, and game playing. The 'deep' in deep learning refers to the number of layers, not the depth of understanding."
          },
          quiz: [
            {
              question: "What are neural networks inspired by?",
              options: [
                "Computer circuits",
                "The human brain",
                "The internet",
                "Mathematical equations"
              ],
              correct: 1,
              explanation: "Neural networks are inspired by biological neural networks in the human brain.",
              reviewLink: "https://www.ibm.com/topics/neural-networks"
            },
            {
              question: "What makes 'deep learning' deep?",
              options: [
                "It uses very large datasets",
                "It processes data very quickly",
                "It uses neural networks with multiple hidden layers",
                "It can solve complex problems"
              ],
              correct: 2,
              explanation: "The 'deep' in deep learning refers to neural networks with many layers (depth), not the complexity or size of data.",
              reviewLink: "https://www.ibm.com/topics/deep-learning"
            },
            {
              question: "What is a 'layer' in a neural network?",
              options: [
                "A type of data",
                "A group of interconnected neurons",
                "A programming language",
                "A type of computer chip"
              ],
              correct: 1,
              explanation: "A layer is a group of neurons that process information at the same stage in the network.",
              reviewLink: "https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/anatomy"
            },
            {
              question: "Which task is deep learning particularly good at?",
              options: [
                "Simple arithmetic",
                "Image recognition",
                "Storing data",
                "Running operating systems"
              ],
              correct: 1,
              explanation: "Deep learning excels at complex pattern recognition tasks like image recognition, outperforming traditional methods.",
              reviewLink: "https://www.techtarget.com/searchenterpriseai/definition/deep-learning-deep-neural-network"
            },
            {
              question: "True or False: All neural networks are considered deep learning.",
              options: [
                "True",
                "False"
              ],
              correct: 1,
              explanation: "False. Only neural networks with multiple hidden layers are considered deep learning. Simple networks with few layers are not 'deep'.",
              reviewLink: "https://machinelearningmastery.com/what-is-deep-learning/"
            },
            {
              question: "What is the main advantage of deep learning over traditional programming?",
              options: [
                "It's faster to code",
                "It can learn features automatically from data",
                "It uses less computer memory",
                "It doesn't need any data"
              ],
              correct: 1,
              explanation: "Deep learning can automatically learn features and patterns from data without manual feature engineering.",
              reviewLink: "https://www.sas.com/en_us/insights/analytics/deep-learning.html"
            },
            {
              question: "Which of these breakthroughs was achieved by deep learning?",
              options: [
                "Defeating world champions in Go",
                "Accurate speech recognition",
                "Advanced image generation",
                "All of the above"
              ],
              correct: 3,
              explanation: "Deep learning has achieved all these breakthroughs - AlphaGo, speech recognition systems, and image generation models like DALL-E.",
              reviewLink: "https://www.nature.com/articles/nature14539"
            },
            {
              question: "What is a common challenge with deep learning?",
              options: [
                "It's too simple",
                "It requires significant computational resources",
                "It can't handle images",
                "It only works with text"
              ],
              correct: 1,
              explanation: "Deep learning models require significant computational resources (GPUs/TPUs) and large amounts of data for training.",
              reviewLink: "https://towardsdatascience.com/challenges-in-deep-learning-57e7e90c0f39"
            },
            {
              question: "How do neural networks 'learn'?",
              options: [
                "By memorizing all examples",
                "By adjusting connection weights based on errors",
                "By following pre-programmed rules",
                "By random guessing"
              ],
              correct: 1,
              explanation: "Neural networks learn by adjusting the weights of connections between neurons based on the errors in their predictions.",
              reviewLink: "https://www.ibm.com/topics/backpropagation"
            },
            {
              question: "What industry has NOT been transformed by deep learning?",
              options: [
                "Healthcare (medical imaging)",
                "Automotive (self-driving cars)",
                "Finance (fraud detection)",
                "None - deep learning impacts all industries"
              ],
              correct: 3,
              explanation: "Deep learning has transformed virtually every industry with applications in medical diagnosis, autonomous vehicles, fraud detection, and more.",
              reviewLink: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/an-executives-guide-to-ai"
            }
          ]
        },
        {
          day: 4,
          title: "Natural Language Processing",
          video: "https://www.youtube.com/embed/CMrHM8a3hqw",
          additionalVideo: {
            title: "The Dr. Strange Theory of AI Agent Work",
            url: "https://www.youtube.com/embed/EALDPBYz1hQ",
            description: "7 mins - AI agents will completely reinvent how we approach work"
          },
          reading: {
            title: "Understanding Natural Language Processing",
            content: "Natural Language Processing (NLP) is a branch of AI that helps computers understand, interpret, and generate human language. It combines computational linguistics with machine learning to process text and speech. Key NLP tasks include sentiment analysis (determining emotional tone), named entity recognition (identifying people, places, organizations), machine translation, text summarization, and question answering. Modern NLP uses transformer models like GPT and BERT."
          },
          quiz: [
            {
              question: "What does NLP stand for?",
              options: [
                "Neural Learning Process",
                "Natural Language Processing",
                "Network Layer Protocol",
                "New Learning Platform"
              ],
              correct: 1,
              explanation: "NLP stands for Natural Language Processing, which helps computers understand human language.",
              reviewLink: "https://www.ibm.com/topics/natural-language-processing"
            },
            {
              question: "Which of these is an example of NLP in daily life?",
              options: [
                "Voice assistants like Alexa",
                "Auto-complete in search engines",
                "Language translation apps",
                "All of the above"
              ],
              correct: 3,
              explanation: "All of these use NLP - voice assistants for speech recognition, auto-complete for text prediction, and translation apps for language conversion.",
              reviewLink: "https://www.sas.com/en_us/insights/analytics/what-is-natural-language-processing-nlp.html"
            },
            {
              question: "What is sentiment analysis in NLP?",
              options: [
                "Translating text between languages",
                "Determining the emotional tone of text",
                "Identifying grammatical errors",
                "Generating new text content"
              ],
              correct: 1,
              explanation: "Sentiment analysis determines the emotional tone or opinion expressed in text (positive, negative, neutral).",
              reviewLink: "https://monkeylearn.com/sentiment-analysis/"
            },
            {
              question: "What breakthrough technology powers modern NLP systems like ChatGPT?",
              options: [
                "Rule-based systems",
                "Transformer architecture",
                "Simple statistics",
                "Keyword matching"
              ],
              correct: 1,
              explanation: "The Transformer architecture, introduced in 2017, revolutionized NLP and powers systems like GPT and BERT.",
              reviewLink: "https://arxiv.org/abs/1706.03762"
            },
            {
              question: "True or False: NLP can only work with written text, not spoken language.",
              options: [
                "True",
                "False"
              ],
              correct: 1,
              explanation: "False. NLP works with both written text and spoken language (through speech recognition and synthesis).",
              reviewLink: "https://www.techtarget.com/searchenterpriseai/definition/natural-language-processing-NLP"
            },
            {
              question: "What is 'named entity recognition' in NLP?",
              options: [
                "Creating new names for things",
                "Identifying people, places, and organizations in text",
                "Checking if names are spelled correctly",
                "Translating names between languages"
              ],
              correct: 1,
              explanation: "Named Entity Recognition (NER) identifies and classifies named entities like people, places, organizations, and dates in text.",
              reviewLink: "https://www.ibm.com/topics/named-entity-recognition"
            },
            {
              question: "Which task is NOT typically handled by NLP?",
              options: [
                "Language translation",
                "Text summarization",
                "Image editing",
                "Chatbot conversations"
              ],
              correct: 2,
              explanation: "Image editing is handled by computer vision, not NLP. NLP focuses on understanding and generating text/speech.",
              reviewLink: "https://www.datasciencecentral.com/nlp-vs-computer-vision-understanding-the-differences/"
            },
            {
              question: "What makes modern NLP models like GPT special?",
              options: [
                "They memorize the entire internet",
                "They understand context and can generate coherent text",
                "They only work in English",
                "They require constant human supervision"
              ],
              correct: 1,
              explanation: "Modern NLP models understand context and relationships in language, allowing them to generate coherent, contextually appropriate text.",
              reviewLink: "https://openai.com/blog/better-language-models/"
            },
            {
              question: "How has NLP changed customer service?",
              options: [
                "It eliminated all human agents",
                "It enables 24/7 chatbots and automated responses",
                "It made customer service slower",
                "It only works for phone calls"
              ],
              correct: 1,
              explanation: "NLP powers intelligent chatbots that can handle customer queries 24/7, complementing human agents for better service.",
              reviewLink: "https://www.ibm.com/topics/chatbots"
            },
            {
              question: "What is a current limitation of NLP?",
              options: [
                "It works perfectly in all contexts",
                "It can struggle with sarcasm, humor, and cultural nuances",
                "It only works with short sentences",
                "It can't process multiple languages"
              ],
              correct: 1,
              explanation: "NLP systems can struggle with sarcasm, humor, idioms, and cultural nuances that require deep contextual understanding.",
              reviewLink: "https://research.aimultiple.com/nlp-challenges/"
            }
          ]
        },
        {
          day: 5,
          title: "AI Ethics & Bias",
          video: "https://www.youtube.com/embed/UG_X_7g63rY",
          reading: {
            title: "AI Ethics and Responsible AI",
            content: "As AI becomes more prevalent, ethical considerations are crucial. Key concerns include bias in AI systems (often reflecting biases in training data), privacy and data protection, transparency and explainability (understanding how AI makes decisions), accountability for AI decisions, and the impact on employment. Responsible AI development requires diverse teams, careful data curation, regular bias testing, clear governance frameworks, and ongoing monitoring of AI systems in production."
          },
          quiz: [
            {
              question: "Why is AI ethics important?",
              options: [
                "To make AI systems slower",
                "To ensure AI benefits society fairly and responsibly",
                "To prevent AI from working",
                "It's not actually important"
              ],
              correct: 1,
              explanation: "AI ethics ensures that AI systems are developed and used in ways that benefit society fairly, without causing harm or perpetuating discrimination.",
              reviewLink: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics"
            },
            {
              question: "What is a major source of bias in AI systems?",
              options: [
                "Computer processing speed",
                "Internet connectivity issues",
                "Biased training data",
                "Software bugs"
              ],
              correct: 2,
              explanation: "AI systems learn from their training data, so biases present in that data get reflected and potentially amplified in the AI's decisions.",
              reviewLink: "https://www.ibm.com/topics/ai-bias"
            },
            {
              question: "What does 'explainable AI' mean?",
              options: [
                "AI that can talk",
                "AI whose decision-making process can be understood by humans",
                "AI that teaches courses",
                "AI that writes documentation"
              ],
              correct: 1,
              explanation: "Explainable AI refers to AI systems whose decision-making processes can be understood and interpreted by humans.",
              reviewLink: "https://www.ibm.com/topics/explainable-ai"
            },
            {
              question: "True or False: Once an AI system is deployed, bias checking is complete.",
              options: [
                "True",
                "False"
              ],
              correct: 1,
              explanation: "False. AI systems need continuous monitoring for bias and fairness even after deployment, as they may develop new biases over time.",
              reviewLink: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/confronting-bias-in-ai-and-ourselves"
            },
            {
              question: "Which of these is NOT a key principle of responsible AI?",
              options: [
                "Transparency",
                "Fairness",
                "Maximum profitability at any cost",
                "Accountability"
              ],
              correct: 2,
              explanation: "Responsible AI prioritizes ethical principles like transparency, fairness, and accountability over profit maximization at any cost.",
              reviewLink: "https://www.microsoft.com/en-us/ai/responsible-ai"
            },
            {
              question: "How can we reduce bias in AI systems?",
              options: [
                "Use diverse training data and development teams",
                "Ignore the problem",
                "Only use AI for simple tasks",
                "Avoid testing for bias"
              ],
              correct: 0,
              explanation: "Diverse training data and diverse development teams help identify and reduce various types of bias in AI systems.",
              reviewLink: "https://www.accenture.com/us-en/insights/artificial-intelligence/ai-fairness-and-bias"
            },
            {
              question: "What is 'algorithmic accountability'?",
              options: [
                "Making algorithms run faster",
                "Holding organizations responsible for their AI systems' decisions",
                "Teaching algorithms to count",
                "Deleting all algorithms"
              ],
              correct: 1,
              explanation: "Algorithmic accountability means organizations are responsible for the decisions and impacts of their AI systems.",
              reviewLink: "https://www.brookings.edu/research/algorithmic-accountability-a-primer/"
            },
            {
              question: "Why is privacy a concern with AI?",
              options: [
                "AI systems don't use any data",
                "AI often requires large amounts of personal data",
                "AI makes computers private",
                "Privacy isn't actually a concern"
              ],
              correct: 1,
              explanation: "AI systems often require large amounts of data, including personal information, raising concerns about data protection and privacy.",
              reviewLink: "https://www.weforum.org/agenda/2023/03/ai-privacy-data-protection/"
            },
            {
              question: "What role should humans play in AI decision-making?",
              options: [
                "No role - AI should decide everything",
                "Humans should maintain oversight and final decision authority",
                "Humans should avoid using AI",
                "Only programmers should be involved"
              ],
              correct: 1,
              explanation: "Humans should maintain meaningful oversight and final decision authority, especially for high-stakes decisions affecting people's lives.",
              reviewLink: "https://www.nature.com/articles/s41562-019-0746-8"
            },
            {
              question: "What is the 'black box' problem in AI?",
              options: [
                "AI systems are painted black",
                "AI decisions are difficult to understand or explain",
                "AI systems break easily",
                "AI only works in dark rooms"
              ],
              correct: 1,
              explanation: "