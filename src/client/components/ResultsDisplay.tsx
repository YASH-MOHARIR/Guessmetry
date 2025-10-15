import { useEffect, useState } from 'react';
import { Timer } from './Timer';

type ResultsDisplayProps = {
  correctAnswer: string;
  playerGuess: string | null;
  isCorrect: boolean;
  isClose: boolean;
  pointsEarned: number;
  totalScore: number;
  timeRemaining: number;
  onComplete: () => void;
};

export function ResultsDisplay({
  correctAnswer,
  playerGuess,
  isCorrect,
  isClose,
  pointsEarned,
  totalScore,
  timeRemaining,
  onComplete,
}: ResultsDisplayProps) {
  const [displayScore, setDisplayScore] = useState(totalScore - pointsEarned);

  // Count-up animation for score
  useEffect(() => {
    if (pointsEarned === 0) {
      setDisplayScore(totalScore);
      return;
    }

    const startScore = totalScore - pointsEarned;
    const duration = 200; // ms
    const steps = 10;
    const increment = pointsEarned / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayScore(totalScore);
        clearInterval(interval);
      } else {
        setDisplayScore(Math.round(startScore + increment * currentStep));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [totalScore, pointsEarned]);

  const getResultColor = () => {
    if (isCorrect) return 'text-green-600';
    if (isClose) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getResultBgColor = () => {
    if (isCorrect) return 'bg-green-50';
    if (isClose) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  const getResultText = () => {
    if (isCorrect) return 'Correct!';
    if (isClose) return 'Close!';
    return 'Incorrect';
  };

  const getPointsColor = () => {
    if (pointsEarned === 10) return 'text-green-600';
    if (pointsEarned === 5) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 animate-fade-in">
      {/* Timer */}
      <div className="mb-8">
        <Timer duration={timeRemaining} onComplete={onComplete} variant="results" />
      </div>

      {/* Results Card */}
      <div className={`rounded-xl shadow-lg p-8 md:p-12 ${getResultBgColor()} animate-bounce-in`}>
        {/* Result Status */}
        <div className="text-center mb-6">
          <h2 className={`text-3xl md:text-4xl font-bold ${getResultColor()}`}>
            {getResultText()}
          </h2>
        </div>

        {/* Correct Answer */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm md:text-base mb-2">The answer was:</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 capitalize">
            {correctAnswer}
          </p>
        </div>

        {/* Player's Guess */}
        {playerGuess && (
          <div className="mb-6">
            <p className="text-gray-600 text-sm md:text-base mb-2">You guessed:</p>
            <p className="text-xl md:text-2xl font-semibold text-gray-700 capitalize">
              {playerGuess}
            </p>
          </div>
        )}

        {/* Points Earned */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg md:text-xl font-semibold text-gray-700">
              Points Earned:
            </span>
            <span className={`text-2xl md:text-3xl font-bold ${getPointsColor()}`}>
              +{pointsEarned}
            </span>
          </div>

          {/* Total Score */}
          <div className="flex justify-between items-center">
            <span className="text-lg md:text-xl font-semibold text-gray-700">
              Total Score:
            </span>
            <span className="text-2xl md:text-3xl font-bold text-orange-600">
              {displayScore}
            </span>
          </div>
        </div>
      </div>

      {/* Next Round Message */}
      <p className="text-center text-gray-600 mt-6 text-base md:text-lg">
        Next round starting soon...
      </p>
    </div>
  );
}
