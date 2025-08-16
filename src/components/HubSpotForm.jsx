import React, { useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 48px;
  background: #F7FAFC;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FormTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: #1B365D;
`;

const FormDescription = styled.p`
  margin-bottom: 32px;
  color: #2B517A;
  font-family: 'Open Sans', sans-serif;
  opacity: 0.9;
`;

const HubSpotFormWrapper = styled.div`
  .hs-form-frame {
    width: 100%;
  }
  
  /* Style the HubSpot form to match brand */
  .hs-form {
    font-family: 'Open Sans', sans-serif !important;
  }
  
  .hs-form-field label {
    color: #1B365D !important;
    font-weight: 500 !important;
    margin-bottom: 8px !important;
  }
  
  .hs-form-field input,
  .hs-form-field select {
    border: 1px solid #E8EEF4 !important;
    border-radius: 6px !important;
    padding: 12px !important;
    font-family: 'Open Sans', sans-serif !important;
    font-size: 14px !important;
  }
  
  .hs-form-field input:focus,
  .hs-form-field select:focus {
    border-color: #FF6A3D !important;
    box-shadow: 0 0 0 2px rgba(255, 106, 61, 0.1) !important;
    outline: none !important;
  }
  
  .hs-button {
    background: #FF6A3D !important;
    color: #FFFFFF !important;
    border: none !important;
    border-radius: 6px !important;
    padding: 12px 24px !important;
    font-family: 'Inter', sans-serif !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
  }
  
  .hs-button:hover {
    background: #e55a35 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 12px rgba(255, 106, 61, 0.3) !important;
  }
  
  .hs-error-msgs {
    color: #DC2626 !important;
    font-size: 12px !important;
    margin-top: 4px !important;
  }
`;

const HubSpotForm = () => {
  useEffect(() => {
    const scriptId = "hs-form-script";
    
    // Check if script is already loaded
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://js-na2.hsforms.net/forms/embed/243001979.js";
      script.defer = true;
      script.async = true;
      
      // Add error handling
      script.onerror = () => {
        console.error("Failed to load HubSpot form script");
      };
      
      document.body.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      // Note: We don't remove the script on unmount as it might be needed elsewhere
    };
  }, []);

  return (
    <FormContainer>
      <FormTitle>Enrollment is open for the September cohort</FormTitle>
      <FormDescription>
        Seats are limited. Reserve your spot today and start your AI transformation journey.
      </FormDescription>
      <HubSpotFormWrapper>
        <div
          className="hs-form-frame"
          data-region="na2"
          data-form-id="af95dab6-e285-4ac0-b3d3-9091945a27ca"
          data-portal-id="243001979"
        />
      </HubSpotFormWrapper>
    </FormContainer>
  );
};

export default HubSpotForm;
