import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { FormStatus } from '../FormStatus';

describe('FormStatus', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders nothing when status is idle', () => {
    render(<FormStatus status="idle" />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders with correct role for error state', () => {
    render(<FormStatus status="error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders success message with correct attributes', () => {
    render(<FormStatus status="success" />);
    const status = screen.getByRole('status');

    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('Message sent successfully');
  });

  it('auto-hides after specified delay', () => {
    render(<FormStatus status="success" autoHideDelay={1000} />);

    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});