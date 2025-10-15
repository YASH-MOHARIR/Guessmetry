import { useState, useEffect, useCallback, useRef } from 'react';

type UseTimerReturn = {
  timeRemaining: number;
  progress: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

type UseTimerOptions = {
  duration: number;
  onComplete?: () => void;
  autoStart?: boolean;
};

export function useTimer({
  duration,
  onComplete,
  autoStart = false,
}: UseTimerOptions): UseTimerReturn {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep onComplete callback ref up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeRemaining(duration);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [duration]);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            setIsRunning(false);
            if (onCompleteRef.current) {
              onCompleteRef.current();
            }
            return 0;
          }
          return next;
        });
      }, 1000);
    } else if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, timeRemaining]);

  // Calculate progress percentage (0-100)
  const progress = duration > 0 ? ((duration - timeRemaining) / duration) * 100 : 0;

  return {
    timeRemaining,
    progress,
    isRunning,
    start,
    pause,
    reset,
  };
}
