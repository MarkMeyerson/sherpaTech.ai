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

function PrivacyPolicy() {
  return (
    <Container>
      <Title>Privacy Policy</Title>
      <LastUpdated>Effective: September 11, 2025</LastUpdated>
      
      <Section>
        <h2>1. Introduction</h2>
        <p>
          SherpaTech.AI ("SherpaTech," "we," "us") respects your privacy. This notice explains what we collect, why we collect it, and the choices you have. It applies to our website, programs, cohorts, forms, and related services.
        </p>
      </Section>
      
      <Section>
        <h2>2. Information We Collect</h2>
        
        <h3>Personal Information</h3>
        <p>We collect: (a) contact details (name, email, organization, role); (b) purchase and enrollment details; (c) content you submit in forms, quizzes, chats, and assignments; (d) technical data such as IP, device/browser info, and page interactions; (e) limited payment metadata from Stripe (we never store full card numbers).</p>
        
        <h3>Technical Information</h3>
        <p>Included in the data above.</p>
        
        <h3>Course and Training Data</h3>
        <p>Included in the data above.</p>
      </Section>
      
      <Section>
        <h2>3. How We Use Your Information</h2>
        <p>We use data to: deliver programs and support; process payments and send receipts; send service messages and resources; personalize content; improve our offerings; protect our services; comply with law.</p>
        
        <h3>Service Delivery</h3>
        <p>Included in the uses above.</p>
        
        <h3>Communication</h3>
        <p>Included in the uses above.</p>
        
        <h3>Improvement and Analytics</h3>
        <p>Included in the uses above.</p>
      </Section>
      
      <Section>
        <h2>4. Cookies and Tracking Technologies</h2>
        <p>We may use essential cookies for site functionality and optional analytics to understand usage. You can manage cookies in your browser settings. Disabling some cookies may impact site features.</p>
        
        <h3>Types of Cookies We Use</h3>
        <p>Essential and analytics cookies as described above.</p>
        
        <h3>Managing Cookies</h3>
        <p>Use your browser settings to manage cookie preferences.</p>
      </Section>
      
      <Section>
        <h2>5. Data Sharing and Disclosure</h2>
        <p>We share data with trusted providers who help us operate: Stripe (payments), HubSpot (CRM/email), Microsoft (Teams/SharePoint/Forms), n8n (workflow automation), and Vercel (hosting/CDN). They process data under their own privacy terms. We may disclose data if required by law or to protect rights, safety, and security. We do not sell personal data.</p>
        
        <h3>Service Providers</h3>
        <p>As described above - Stripe, HubSpot, Microsoft, n8n, and Vercel.</p>
        
        <h3>Legal Requirements</h3>
        <p>We may disclose data when required by law or to protect rights, safety, and security.</p>
        
        <h3>Business Transfers</h3>
        <p>In the event of a business transfer, data may be transferred as part of the transaction.</p>
      </Section>
      
      <Section>
        <h2>6. Data Security</h2>
        <p>We apply administrative, technical, and physical safeguards appropriate to the risk, including account/access controls, encryption in transit, and least-privilege principles. If a breach creates a material risk of harm, we will notify affected users and regulators as required.</p>
      </Section>
      
      <Section>
        <h2>7. Data Retention</h2>
        <p>We keep data only as long as needed for the purposes above, to provide services you requested, and to meet legal/accounting obligations. When no longer needed, we delete or de-identify it.</p>
      </Section>
      
      <Section>
        <h2>8. Your Rights</h2>
        <p>You can request access, correction, deletion, restriction, or portability of your data, and you may object to certain processing. To exercise rights, email Info@sherpatech.ai. We will verify your request and respond consistent with applicable law.</p>
      </Section>
      
      <Section>
        <h2>9. International Data Transfers</h2>
        <p>Our providers may process data in the United States and other countries. Where required, we rely on appropriate safeguards for transfers.</p>
      </Section>
      
      <Section>
        <h2>10. Children's Privacy</h2>
        <p>Our services are not directed to children under 13 (or the applicable minimum age). We do not knowingly collect their data. If you believe a child has provided data, contact us to delete it.</p>
      </Section>
      
      <Section>
        <h2>11. Changes to This Policy</h2>
        <p>We may update this notice from time to time. The 'Effective' date shows the latest version. Material changes will be highlighted on this page.</p>
      </Section>
      
      <Section>
        <h2>12. Contact Information</h2>
        <p>Questions or requests:</p>
        
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

export default PrivacyPolicy;