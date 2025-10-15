import { useEffect, useState } from 'react';

type LeaderboardProps = {
  score: number;
  roundsCompleted: number;
  rank: number;
};

export function Leaderboard({ score, roundsCompleted, rank }: LeaderboardProps) {
  const [displayScore, setDisplayScore] = useState(score);
  const [prevScore, setPrevScore] = useState(score);

  // Animate score changes
  useEffect(() => {
    if (score === prevScore) {
      setDisplayScore(score);
      return;
    }

    const diff = score - prevScore;
    const duration = 300; // ms
    const steps = 10;
    const increment = diff / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayScore(score);
        setPrevScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(Math.round(prevScore + increment * currentStep));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [score, prevScore]);

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 min-w-[200px] z-10">
      <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">
        Leaderboard
      </h3>
      
      <div className="space-y-2">
        {/* Rank */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Rank:</span>
          <span className="text-lg font-bold text-orange-600">#{rank}</span>
        </div>
        
        {/* Score */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Score:</span>
          <span className="text-2xl font-bold text-orange-600 transition-all duration-300">
            {displayScore}
          </span>
        </div>
        
        {/* Rounds */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Rounds:</span>
          <span className="text-lg font-semibold text-gray-700">{roundsCompleted}</span>
        </div>
      </div>
    </div>
  );
}
