import { API_ENDPOINTS } from '../constants';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  source?: string;
}

export class ContactFormService {
  static async submit(data: ContactFormData): Promise<Response> {
    const url = `${API_ENDPOINTS.CONTACT}?${API_ENDPOINTS.VERSION}&${API_ENDPOINTS.SIGNATURE}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response;
    } catch (error) {
      console.error('Contact form submission error:', error);
      throw error;
    }
  }
}