import { Assessment } from '../features/assessment/components/Assessment';

export const SmallBusinesses: React.FC = () => {
  return (
    <div>
      {/* ...existing content... */}
      
      <div id="ai-readiness-assessment" className="py-12">
        <h2 className="text-3xl font-bold text-center mb-6">AI Readiness Assessment</h2>
        <p className="text-center mb-8">
          Our AI Readiness Assessment helps you understand where your business stands 
          in terms of AI adoption potential and identifies key opportunities for implementation.
        </p>
        <Assessment />
      </div>
      
      {/* ...existing content... */}
    </div>
  );
};