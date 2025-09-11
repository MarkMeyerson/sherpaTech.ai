import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Brand Colors
const colors = {
  navyBlue: '#1B365D',
  mountainBlue: '#2B517A',
  iceBlue: '#E8EEF4',
  pearlWhite: '#F7FAFC',
  accentOrange: '#FF6A3D',
  alpineWhite: '#FFFFFF'
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 24px;
  background: ${colors.alpineWhite};
  
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  color: ${colors.navyBlue};
  margin-bottom: 24px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LastUpdated = styled.p`
  font-family: 'Open Sans', sans-serif;
  color: ${colors.mountainBlue};
  text-align: center;
  margin-bottom: 48px;
  font-style: italic;
`;

const Section = styled.section`
  margin-bottom: 32px;
  
  h2 {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 1.4rem;
    color: ${colors.navyBlue};
    margin-bottom: 16px;
    border-bottom: 2px solid ${colors.iceBlue};
    padding-bottom: 8px;
  }
  
  h3 {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 1.2rem;
    color: ${colors.mountainBlue};
    margin: 24px 0 12px 0;
  }
  
  p, li {
    font-family: 'Open Sans', sans-serif;
    color: ${colors.navyBlue};
    line-height: 1.6;
    margin-bottom: 12px;
  }
  
  ul {
    margin: 16px 0;
    padding-left: 24px;
  }
  
  li {
    margin-bottom: 8px;
  }
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, ${colors.iceBlue} 0%, ${colors.pearlWhite} 100%);
  padding: 24px;
  border-radius: 12px;
  border-left: 4px solid ${colors.accentOrange};
  margin: 24px 0;
  
  p {
    margin: 0;
    font-weight: 500;
  }
`;

const ContactBox = styled.div`
  background: linear-gradient(135deg, ${colors.iceBlue} 0%, ${colors.pearlWhite} 100%);
  padding: 24px;
  border-radius: 12px;
  border-left: 4px solid ${colors.accentOrange};
  margin: 24px 0;
  
  p {
    margin: 0;
    font-weight: 500;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${colors.accentOrange};
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  margin-top: 40px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #e55a35;
  }
`;

function TermsOfService() {
  return (
    <Container>
      <Title>Terms of Service</Title>
      <LastUpdated>Effective: September 11, 2025</LastUpdated>
      
      <Section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By purchasing or participating in SherpaTech programs or using our site, you agree to these Terms.
        </p>
      </Section>
      
      <Section>
        <h2>2. Services Description</h2>
        <p>We provide live and recorded training cohorts, workshops, consulting, and related digital resources delivered primarily through Microsoft Teams and SharePoint.</p>
        
        <h3>SherpaTech.AI Training Programs</h3>
        <p>Included in the description above.</p>
        
        <h3>Website and Platform Services</h3>
        <p>Included in the description above.</p>
      </Section>
      
      <Section>
        <h2>3. Course Enrollment and Participation</h2>
        
        <h3>Eligibility Requirements</h3>
        <p>You must provide accurate enrollment information and meet basic technical requirements (modern browser, reliable internet, a Microsoft account for Teams access). Participation should be respectful and professional.</p>
        
        <h3>Registration Process</h3>
        <p>Complete enrollment and payment as directed on our website.</p>
        
        <h3>Course Access and Duration</h3>
        <p>Access details and duration vary by program and will be provided upon enrollment.</p>
        
        <h3>Attendance and Participation Requirements</h3>
        <p>Requirements vary by program and will be communicated during enrollment.</p>
      </Section>
      
      <Section>
        <h2>4. Payment Terms and Pricing</h2>
        
        <h3>Course Fees</h3>
        <p>Fees are shown at checkout and processed securely by Stripe. Taxes may apply based on your location. Access is granted after successful payment.</p>
        
        <h3>Payment Methods</h3>
        <p>We accept major credit cards and other methods available through Stripe.</p>
        
        <h3>Payment Schedule</h3>
        <p>Payment is typically due at enrollment unless otherwise specified.</p>
        
        <h3>Late Payment Policy</h3>
        <p>Late payments may result in suspended access until resolved.</p>
      </Section>
      
      <Section>
        <h2>5. Refund and Cancellation Policy</h2>
        
        <HighlightBox>
          <p><strong>SherpaSkill Evening Cohort (Fall 2025):</strong> 100% refund available until Sept 18, 2025; 50% refund until Sept 24, 2025; no refunds after the first session begins.</p>
        </HighlightBox>
        
        <h3>Full Refund Eligibility</h3>
        <p>As described in the policy above.</p>
        
        <h3>Partial Refund Policy</h3>
        <p>As described in the policy above.</p>
        
        <h3>No Refund Conditions</h3>
        <p>After the first session begins, no refunds are available.</p>
        
        <h3>Refund Processing</h3>
        <p>Approved refunds are processed within 5-10 business days to the original payment method.</p>
      </Section>
      
      <Section>
        <h2>6. Course Transfers and Rescheduling</h2>
        
        <h3>Transfer to Different Cohort</h3>
        <p>You may request one free transfer to the next available SherpaSkill cohort if requested before Session 2.</p>
        
        <h3>Schedule Changes by SherpaTech.AI</h3>
        <p>We will notify participants of any schedule changes and work to minimize disruption.</p>
        
        <h3>Emergency Rescheduling</h3>
        <p>In case of emergencies, we may need to reschedule sessions with as much notice as possible.</p>
      </Section>
      
      <Section>
        <h2>7. Code of Conduct and Participation Standards</h2>
        
        <h3>Professional Behavior Standards</h3>
        <p>We may remove participants who disrupt learning, share inappropriate content, or violate others' rights. If removed for cause, refunds do not apply.</p>
        
        <h3>Prohibited Conduct</h3>
        <p>Disruption of learning activities, inappropriate content sharing, and violation of others' rights are prohibited.</p>
        
        <h3>Consequences for Violations</h3>
        <p>Violations may result in removal from the program without refund.</p>
      </Section>
      
      <Section>
        <h2>8. Intellectual Property Rights</h2>
        
        <h3>SherpaTech.AI Content</h3>
        <p>All course materials, recordings, and resources are owned by SherpaTech or our licensors. Personal, non-commercial use only. Do not copy, distribute, or publish without permission.</p>
        
        <h3>User-Generated Content</h3>
        <p>You retain ownership of content you create, but grant us license to use it for program purposes.</p>
        
        <h3>Use Restrictions</h3>
        <p>Personal, non-commercial use only as described above.</p>
      </Section>
      
      <Section>
        <h2>9. Privacy and Data Protection</h2>
        <p>Your use of our services is also governed by our Privacy Policy: https://sherpatech.ai/privacy-policy.</p>
        <p>
          For detailed information about how we collect, use, and protect your personal data, 
          please review our <Link to="/privacy-policy" style={{color: colors.accentOrange}}>Privacy Policy</Link>.
        </p>
      </Section>
      
      <Section>
        <h2>10. Technical Requirements and Support</h2>
        
        <h3>System Requirements</h3>
        <p>You are responsible for your equipment, connectivity, and any required software. For help, contact Info@sherpatech.ai.</p>
        
        <h3>Technical Support</h3>
        <p>Support is available via email at Info@sherpatech.ai.</p>
        
        <h3>Platform Availability</h3>
        <p>We strive for high availability but cannot guarantee uninterrupted service.</p>
      </Section>
      
      <Section>
        <h2>11. Limitation of Liability</h2>
        <p>Training and resources are for educational purposes; results vary. To the maximum extent permitted by law, SherpaTech is not liable for indirect, incidental, or consequential damages.</p>
        
        <h3>Service Interruptions</h3>
        <p>We are not liable for service interruptions beyond our reasonable control.</p>
        
        <h3>Educational Outcomes</h3>
        <p>Results from training programs may vary and are not guaranteed.</p>
      </Section>
      
      <Section>
        <h2>12. Dispute Resolution</h2>
        
        <h3>Informal Resolution</h3>
        <p>Contact us first to resolve any issue informally. If unresolved, disputes will be governed by the laws of the Commonwealth of Virginia, excluding conflict-of-law rules.</p>
        
        <h3>Formal Dispute Process</h3>
        <p>Unresolved disputes will be handled under Virginia law.</p>
        
        <h3>Governing Law</h3>
        <p>These Terms are governed by the laws of the Commonwealth of Virginia.</p>
      </Section>
      
      <Section>
        <h2>13. Changes to Terms</h2>
        <p>We may update these Terms. The 'Effective' date shows the latest version. Material changes will be noted on this page.</p>
      </Section>
      
      <Section>
        <h2>14. Termination</h2>
        
        <h3>Termination by User</h3>
        <p>We may suspend or terminate access for violations of these Terms or legal requirements. You may stop using our services at any time.</p>
        
        <h3>Termination by SherpaTech.AI</h3>
        <p>We may terminate access for violations of these Terms.</p>
        
        <h3>Effect of Termination</h3>
        <p>Upon termination, access to services will cease.</p>
      </Section>
      
      <Section>
        <h2>15. Contact Information</h2>
        <p>For questions about these Terms:</p>
        
        <ContactBox>
          <p><strong>SherpaTech.AI</strong></p>
          <p>5209 S. 12th Street, Arlington, VA 22204, USA</p>
          <p>Email: Info@sherpatech.ai</p>
        </ContactBox>
      </Section>
      
      <BackLink to="/">
        ← Back to Home
      </BackLink>
    </Container>
  );
}

export default TermsOfService;