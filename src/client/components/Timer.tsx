import { useTimer } from '../hooks/useTimer';

type TimerVariant = 'display' | 'guess' | 'results';

type TimerProps = {
  duration: number;
  onComplete: () => void;
  variant?: TimerVariant;
};

export function Timer({ duration, onComplete, variant = 'display' }: TimerProps) {
  const { timeRemaining, progress } = useTimer({ duration, onComplete, autoStart: true });
  
  const isUrgent = timeRemaining <= 5;
  
  // Color scheme based on variant and urgency
  const getColors = () => {
    if (isUrgent) {
      return {
        text: 'text-red-600',
        bg: 'bg-red-100',
        fill: 'bg-red-500',
      };
    }
    
    switch (variant) {
      case 'display':
        return {
          text: 'text-orange-600',
          bg: 'bg-orange-100',
          fill: 'bg-orange-500',
        };
      case 'guess':
        return {
          text: 'text-blue-600',
          bg: 'bg-blue-100',
          fill: 'bg-blue-500',
        };
      case 'results':
        return {
          text: 'text-green-600',
          bg: 'bg-green-100',
          fill: 'bg-green-500',
        };
      default:
        return {
          text: 'text-orange-600',
          bg: 'bg-orange-100',
          fill: 'bg-orange-500',
        };
    }
  };
  
  const colors = getColors();
  
  return (
    <div className="w-full max-w-md mx-auto" role="timer" aria-label={`${variant} phase timer`}>
      {/* Screen reader announcement for urgent state */}
      {isUrgent && (
        <div className="sr-only" role="status" aria-live="polite">
          Warning: {timeRemaining} seconds remaining
        </div>
      )}
      
      {/* Numeric countdown */}
      <div 
        className={`text-center text-xl md:text-2xl font-bold mb-2 transition-all duration-200 ${colors.text} ${
          isUrgent ? 'animate-pulse scale-105' : ''
        }`}
        aria-label={`${timeRemaining} seconds remaining`}
      >
        {timeRemaining}s
      </div>
      
      {/* Progress bar */}
      <div 
        className={`w-full h-2 md:h-2.5 rounded-full overflow-hidden ${colors.bg}`}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Time progress: ${progress}% complete`}
      >
        <div
          className={`h-full transition-all duration-1000 linear ${colors.fill} ${
            isUrgent ? 'animate-pulse' : ''
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
