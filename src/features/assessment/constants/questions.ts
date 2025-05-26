import { AssessmentQuestion } from '../types/assessment.types';

export const INITIAL_QUESTIONS = [
  {
    id: 'familiarity',
    type: 'single',
    text: 'How would you describe your current understanding of "AI"?',
    options: [
      { id: 'f1', text: "I've never heard of it", value: '0' },
      { id: 'f2', text: "I've heard the term but don't know what it does", value: '1' },
      { id: 'f3', text: "I know a little (e.g. chatbots, image generators)", value: '2' },
      { id: 'f4', text: "I use / experiment with AI tools already", value: '3' },
    ],
    required: true,
  },
];

export const ZERO_KNOWLEDGE_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'key_barriers',
    type: 'single',
    text: 'Which barrier feels most daunting right now?',
    options: [
      { id: 'b1', text: 'Technical complexity', value: 'technical' },
      { id: 'b2', text: 'Cost/investment', value: 'cost' },
      { id: 'b3', text: 'Lack of clear ROI', value: 'roi' },
      { id: 'b4', text: 'Fear of change', value: 'change' }
    ],
    required: true
  },
  {
    id: 'info_needs',
    type: 'multiple',
    text: 'What would help you feel less overwhelmed?',
    maxSelections: 2,
    options: [
      { id: 'in1', text: 'Simple case studies from businesses like mine', value: 'cases' },
      { id: 'in2', text: 'Step-by-step tutorials', value: 'tutorials' },
      { id: 'in3', text: 'One-on-one coaching', value: 'coaching' },
      { id: 'in4', text: 'Budget-friendly tool recommendations', value: 'tools' }
    ],
    required: true
  },
  {
    id: 'trust_building',
    type: 'multiple',
    text: 'What would increase your trust in AI solutions?',
    maxSelections: 2,
    options: [
      { id: 't1', text: 'Transparent explanations of how decisions are made', value: 'transparency' },
      { id: 't2', text: 'Human oversight controls', value: 'oversight' },
      { id: 't3', text: 'Vendor/customer testimonials', value: 'testimonials' },
      { id: 't4', text: 'Industry certifications', value: 'certifications' }
    ],
    required: true
  },
  {
    id: 'pilot_comfort',
    type: 'single',
    text: 'If you were to try one small AI experiment, what would you feel comfortable starting with?',
    options: [
      { id: 'p1', text: 'Automating email responses', value: 'email' },
      { id: 'p2', text: 'Basic data analysis (e.g., sales trends)', value: 'analysis' },
      { id: 'p3', text: 'Social-media post suggestions', value: 'social' },
      { id: 'p4', text: 'None–not ready yet', value: 'none' }
    ],
    required: true
  }
];

export const SOME_AWARENESS_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'immediate_opportunities',
    type: 'single',
    text: 'Which area of your business seems most ripe for AI help?',
    options: [
      { id: 'o1', text: 'Customer service (chatbots, triage)', value: 'customer_service' },
      { id: 'o2', text: 'Marketing (content, segmentation)', value: 'marketing' },
      { id: 'o3', text: 'Operations (inventory, scheduling)', value: 'operations' },
      { id: 'o4', text: 'Finance (invoicing, forecasting)', value: 'finance' }
    ],
    required: true
  },
  {
    id: 'pilot_goals',
    type: 'multiple',
    text: 'What would you measure to call an AI pilot a success?',
    maxSelections: 2,
    options: [
      { id: 'pg1', text: '% time saved', value: 'time' },
      { id: 'pg2', text: 'Increased leads or sales', value: 'revenue' },
      { id: 'pg3', text: 'Error reduction', value: 'errors' },
      { id: 'pg4', text: 'Improved customer satisfaction', value: 'satisfaction' }
    ],
    required: true
  },
  {
    id: 'tech_stack',
    type: 'multiple',
    text: 'Which of these tools do you already use or have access to?',
    options: [
      { id: 'ts1', text: 'Microsoft 365 / Power Platform', value: 'microsoft' },
      { id: 'ts2', text: 'Google Workspace', value: 'google' },
      { id: 'ts3', text: 'CRM (e.g. Salesforce, HubSpot)', value: 'crm' },
      { id: 'ts4', text: 'None of the above', value: 'none' }
    ],
    required: true
  },
  {
    id: 'risk_appetite',
    type: 'scale',
    text: 'How comfortable are you with experimenting on a small scale?',
    options: [
      { id: 'ra1', text: 'Not at all comfortable', value: '1' },
      { id: 'ra2', text: 'Slightly uncomfortable', value: '2' },
      { id: 'ra3', text: 'Neutral', value: '3' },
      { id: 'ra4', text: 'Somewhat comfortable', value: '4' },
      { id: 'ra5', text: 'Very comfortable', value: '5' }
    ],
    required: true
  }
];

export const KNOWLEDGEABLE_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'strategic_objectives',
    type: 'multiple',
    text: 'Which high-level goals would AI help you achieve next?',
    maxSelections: 2,
    options: [
      { id: 'so1', text: 'Automate complex workflows', value: 'automation' },
      { id: 'so2', text: 'Personalize customer experiences at scale', value: 'personalization' },
      { id: 'so3', text: 'Generate new product or service ideas', value: 'innovation' },
      { id: 'so4', text: 'Enhance data-driven decision making', value: 'decisions' }
    ],
    required: true
  },
  {
    id: 'data_readiness',
    type: 'single',
    text: 'Which best describes your data situation?',
    options: [
      { id: 'dr1', text: 'Centralized & clean (ready for modeling)', value: 'ready' },
      { id: 'dr2', text: 'Siloed but accessible with effort', value: 'siloed' },
      { id: 'dr3', text: 'Unstructured (e.g., documents, customer remarks)', value: 'unstructured' },
      { id: 'dr4', text: 'Minimal / no data captured', value: 'minimal' }
    ],
    required: true
  },
  {
    id: 'integration_needs',
    type: 'multiple',
    text: 'What systems would you need to integrate AI into?',
    options: [
      { id: 'in1', text: 'ERP / accounting software', value: 'erp' },
      { id: 'in2', text: 'CRM / marketing platform', value: 'crm' },
      { id: 'in3', text: 'E-commerce or POS systems', value: 'ecommerce' },
      { id: 'in4', text: 'All of the above', value: 'all' }
    ],
    required: true
  },
  {
    id: 'team_readiness',
    type: 'single',
    text: 'Do you have an internal champion or team assigned to lead AI initiatives?',
    options: [
      { id: 'tr1', text: 'Yes, dedicated team', value: 'dedicated' },
      { id: 'tr2', text: 'Yes, but shared responsibilities', value: 'shared' },
      { id: 'tr3', text: "No, it's ad-hoc", value: 'adhoc' },
      { id: 'tr4', text: 'No, not yet considered', value: 'none' }
    ],
    required: true
  }
];