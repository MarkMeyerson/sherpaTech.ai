import { render, screen, act } from '@testing-library/react';
import { FormStatus } from '../FormStatus';

describe('FormStatus', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders nothing when status is idle', () => {
    render(<FormStatus status="idle" />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders with correct role for error state', () => {
    render(<FormStatus status="error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('auto hides success message after delay', () => {
    render(<FormStatus status="success" autoHideDelay={1000} />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});