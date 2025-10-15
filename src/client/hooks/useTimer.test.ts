import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTimer } from './useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with correct duration', () => {
    const { result } = renderHook(() =>
      useTimer({ duration: 10, autoStart: false })
    );

    expect(result.current.timeRemaining).toBe(10);
    expect(result.current.progress).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it('should auto-start when autoStart is true', () => {
    const { result } = renderHook(() =>
      useTimer({ duration: 10, autoStart: true })
    );

    expect(result.current.isRunning).toBe(true);
  });

  it('should start countdown when start is called', () => {
    const { result } = renderHook(() =>
      useTimer({ duration: 10, autoStart: false })
    );

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.timeRemaining).toBe(9);
  });

  it('should pause countdown when pause is called', () => {
    const { result } = renderHook(() =>
      useTimer({ duration: 10, autoStart: true })
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.timeRemaining).toBe(7);

    act(() => {
      result.current.pause();
    });

    expect(result.current.isRunning).toBe(false);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Should still be 7 since paused
    expect(result.current.timeRemaining).toBe(7);
  });

  it('should reset timer to initial duration', () => {
    const { result } = renderHook(() =>
      useTimer({ duration: 10, autoStart: true })
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.timeRemaining).toBe(5);

    act(() => {
      result.current.reset();
    });

    expect(result.current.timeRemaining).toBe(10);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it('should calculate progress percentage correctly', () => {
    const { result } = renderHook(() =>
      useTimer({ duration: 10, autoStart: true })
    );

    expect(result.current.progress).toBe(0);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.progress).toBe(50);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.progress).toBe(80);
  });

  it('should call onComplete when timer reaches 0', () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useTimer({ duration: 3, onComplete, autoStart: true })
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.timeRemaining).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('should stop at 0 and not go negative', () => {
    const { result } = renderHook(() =>
      useTimer({ duration: 2, autoStart: true })
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.timeRemaining).toBe(0);
    expect(result.current.progress).toBe(100);
  });

  it('should cleanup interval on unmount', () => {
    const { result, unmount } = renderHook(() =>
      useTimer({ duration: 10, autoStart: true })
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.timeRemaining).toBe(8);

    unmount();

    // Advance time after unmount - should not cause errors
    act(() => {
      vi.advanceTimersByTime(5000);
    });
  });

  it('should handle duration changes on reset', () => {
    const { result, rerender } = renderHook(
      ({ duration }) => useTimer({ duration, autoStart: false }),
      { initialProps: { duration: 10 } }
    );

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.timeRemaining).toBe(5);

    // Change duration
    rerender({ duration: 20 });

    act(() => {
      result.current.reset();
    });

    expect(result.current.timeRemaining).toBe(20);
  });

  it('should handle onComplete callback updates', () => {
    const onComplete1 = vi.fn();
    const onComplete2 = vi.fn();

    const { result, rerender } = renderHook(
      ({ onComplete }) => useTimer({ duration: 2, onComplete, autoStart: true }),
      { initialProps: { onComplete: onComplete1 } }
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Update callback
    rerender({ onComplete: onComplete2 });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onComplete1).not.toHaveBeenCalled();
    expect(onComplete2).toHaveBeenCalledTimes(1);
  });
});
