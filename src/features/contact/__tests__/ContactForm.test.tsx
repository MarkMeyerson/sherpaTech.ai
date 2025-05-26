import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '../ContactForm';
import { ERROR_MESSAGES } from '../constants';
import { submitContactForm } from '../contactForm.service';

jest.mock('../contactForm.service');

describe('ContactForm', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('validates required fields', async () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    
    expect(await screen.findByText(ERROR_MESSAGES.REQUIRED_NAME)).toBeInTheDocument();
    expect(await screen.findByText(ERROR_MESSAGES.REQUIRED_EMAIL)).toBeInTheDocument();
    expect(await screen.findByText(ERROR_MESSAGES.REQUIRED_MESSAGE)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
    
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});