import { useEffect, useState } from 'react';

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

  // Animate bar width from 0 to percentage
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(percentage);
    }, 50);
    return () => clearTimeout(timer);
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
            {percentage.toFixed(1)}%
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
