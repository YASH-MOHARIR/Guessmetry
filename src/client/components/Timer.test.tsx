import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Timer } from './Timer';

describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render with initial time', () => {
    const onComplete = vi.fn();
    render(<Timer duration={10} onComplete={onComplete} />);

    expect(screen.getByText(/10s/)).toBeInTheDocument();
  });

  it('should display countdown timer', () => {
    const onComplete = vi.fn();
    render(<Timer duration={10} onComplete={onComplete} />);

    // Advance time by 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/9s/)).toBeInTheDocument();
  });

  it('should show progress bar', () => {
    const onComplete = vi.fn();
    const { container } = render(<Timer duration={10} onComplete={onComplete} />);

    const progressBar = container.querySelector('[style*="width"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('should call onComplete when timer reaches 0', () => {
    const onComplete = vi.fn();
    render(<Timer duration={3} onComplete={onComplete} />);

    // Advance time to completion
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('should show urgent state when time < 5 seconds', () => {
    const onComplete = vi.fn();
    render(<Timer duration={10} onComplete={onComplete} />);

    // Advance to 4 seconds remaining
    act(() => {
      vi.advanceTimersByTime(6000);
    });

    const timerText = screen.getByText(/4s/);
    expect(timerText.className).toContain('text-red-600');
    expect(timerText.className).toContain('animate-pulse');
  });

  it('should not show urgent state when time >= 5 seconds', () => {
    const onComplete = vi.fn();
    render(<Timer duration={10} onComplete={onComplete} />);

    const timerText = screen.getByText(/10s/);
    expect(timerText.className).not.toContain('text-red-600');
    expect(timerText.className).not.toContain('animate-pulse');
  });

  it('should apply display variant styling', () => {
    const onComplete = vi.fn();
    render(<Timer duration={10} onComplete={onComplete} variant="display" />);

    const timerText = screen.getByText(/10s/);
    expect(timerText.className).toContain('text-orange-600');
  });

  it('should apply guess variant styling', () => {
    const onComplete = vi.fn();
    render(<Timer duration={20} onComplete={onComplete} variant="guess" />);

    const timerText = screen.getByText(/20s/);
    expect(timerText.className).toContain('text-blue-600');
  });

  it('should apply results variant styling', () => {
    const onComplete = vi.fn();
    render(<Timer duration={10} onComplete={onComplete} variant="results" />);

    const timerText = screen.getByText(/10s/);
    expect(timerText.className).toContain('text-green-600');
  });

  it('should update progress bar as time decreases', () => {
    const onComplete = vi.fn();
    const { container } = render(<Timer duration={10} onComplete={onComplete} />);

    // Initial progress should be 100%
    let progressBar = container.querySelector('[style*="width"]') as HTMLElement;
    expect(progressBar.style.width).toBe('100%');

    // After 5 seconds, progress should be 50%
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    progressBar = container.querySelector('[style*="width"]') as HTMLElement;
    expect(progressBar.style.width).toBe('50%');
  });
});
