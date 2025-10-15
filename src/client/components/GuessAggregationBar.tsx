import { useEffect, useState, useRef } from 'react';

type GuessAggregationBarProps = {
  guess: string;
  count: number;
  percentage: number;
  isPlayerGuess: boolean;
  isCreatorAnswer: boolean;
  rank: number;
};

export function GuessAggregationBar({
  guess,
  count,
  percentage,
  isPlayerGuess,
  isCreatorAnswer,
  rank,
}: GuessAggregationBarProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [displayPercentage, setDisplayPercentage] = useState(percentage);
  const prevPercentageRef = useRef(percentage);
  const animationFrameRef = useRef<number | null>(null);

  // Animate bar width from 0 to percentage on initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(percentage);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Animate percentage changes with count-up effect
  useEffect(() => {
    const prevPercentage = prevPercentageRef.current;
    
    if (prevPercentage === percentage) {
      return;
    }

    // Animate width
    setAnimatedWidth(percentage);

    // Animate count-up for percentage text
    const startTime = Date.now();
    const duration = 300;
    const startValue = prevPercentage;
    const endValue = percentage;
    const diff = endValue - startValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + diff * easeOut;
      
      setDisplayPercentage(currentValue);
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayPercentage(endValue);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    prevPercentageRef.current = percentage;

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [percentage]);

  // Determine bar color based on percentage
  const getBarColor = () => {
    if (percentage >= 50) return 'bg-green-500';
    if (percentage >= 20) return 'bg-blue-500';
    if (percentage >= 5) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  // Determine border styling
  const getBorderClass = () => {
    if (isPlayerGuess) return 'border-2 border-[#FF4500]';
    if (isCreatorAnswer) return 'border-2 border-[#FFD700]';
    return 'border border-gray-300';
  };

  return (
    <div
      className={`p-3 rounded-lg ${getBorderClass()} bg-white mb-2`}
      data-testid="guess-aggregation-bar"
    >
      {/* Top row: Rank, Guess, Count, Percentage */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-gray-600 font-bold text-base flex-shrink-0">
            #{rank}
          </span>
          <span
            className="text-gray-800 font-semibold text-lg truncate"
            title={guess}
          >
            {guess}
          </span>
          {isCreatorAnswer && (
            <span className="text-xl flex-shrink-0" aria-label="Creator's answer">
              ⭐
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-gray-600 text-sm">
            {count.toLocaleString()} {count === 1 ? 'player' : 'players'}
          </span>
          <span className="text-gray-800 font-bold text-base">
            {displayPercentage.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${getBarColor()} transition-all duration-500 ease-out`}
          style={{ width: `${animatedWidth}%` }}
          data-testid="progress-bar"
        />
      </div>
    </div>
  );
}
