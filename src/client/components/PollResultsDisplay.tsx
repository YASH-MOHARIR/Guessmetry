import { useEffect, useState, useRef } from 'react';
import { GuessAggregationBar } from './GuessAggregationBar';
import { ConsensusScoreDisplay } from './ConsensusScoreDisplay';
import { Timer } from './Timer';
import { useConsensusPolling } from '../hooks/useConsensusPolling';
import type { GuessAggregation } from '../../shared/types/game';

type PollResultsDisplayProps = {
  promptId: number;
  playerGuess: string | null;
  creatorAnswer: string;
  timeRemaining: number;
  totalScore: number;
  onComplete: () => void;
};

export function PollResultsDisplay({
  promptId,
  playerGuess,
  creatorAnswer,
  timeRemaining,
  totalScore,
  onComplete,
}: PollResultsDisplayProps) {
  // Enable polling only when timeRemaining > 0
  const pollingEnabled = timeRemaining > 0;
  
  const {
    aggregation,
    totalPlayers,
    totalGuesses,
    playerScore,
    loading,
    error,
  } = useConsensusPolling({
    promptId,
    enabled: pollingEnabled,
    interval: 2000,
  });

  // Track previous aggregation for animations
  const prevAggregationRef = useRef<GuessAggregation[]>([]);
  const [animatingRanks, setAnimatingRanks] = useState<Set<string>>(new Set());

  // Detect rank changes and trigger slide animations
  useEffect(() => {
    if (aggregation.length === 0) return;

    const prevAgg = prevAggregationRef.current;
    if (prevAgg.length === 0) {
      prevAggregationRef.current = aggregation;
      return;
    }

    const newAnimatingRanks = new Set<string>();

    aggregation.forEach((current) => {
      const previous = prevAgg.find((p) => p.guess === current.guess);
      
      // Check if rank changed
      if (previous && previous.rank !== current.rank) {
        newAnimatingRanks.add(current.guess);
      }
    });

    if (newAnimatingRanks.size > 0) {
      setAnimatingRanks(newAnimatingRanks);
      setTimeout(() => setAnimatingRanks(new Set()), 300);
    }

    prevAggregationRef.current = aggregation;
  }, [aggregation]);

  // Auto-call onComplete when timeRemaining reaches 0
  useEffect(() => {
    if (timeRemaining === 0) {
      onComplete();
    }
  }, [timeRemaining, onComplete]);

  // Check if polling has failed 3 times
  const pollingFailed = error?.includes('3 consecutive failures');

  const handleRetry = () => {
    // Reset by toggling polling - this will be handled by re-enabling
    window.location.reload();
  };

  return (
    <div
      className="w-full max-w-[800px] mx-auto px-4 md:px-6 lg:px-8 animate-fade-in"
      role="region"
      aria-label="Poll results phase"
    >
      {/* Timer */}
      <div className="mb-6 md:mb-8">
        <Timer duration={timeRemaining} onComplete={onComplete} variant="results" />
      </div>

      {/* Loading State (initial load only) */}
      {loading && aggregation.length === 0 && (
        <div className="text-center py-12" role="status" aria-live="polite">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading results...</p>
        </div>
      )}

      {/* Polling Failed Warning */}
      {pollingFailed && aggregation.length > 0 && (
        <div
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-center"
          role="alert"
          aria-live="polite"
        >
          <p className="text-yellow-800 font-semibold mb-2">⚠️ Live updates paused</p>
          <p className="text-yellow-700 text-sm mb-3">
            Unable to fetch live updates. Showing last known results.
          </p>
          <button
            onClick={handleRetry}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            aria-label="Retry polling"
          >
            Retry
          </button>
        </div>
      )}

      {/* Error State (initial load failure) */}
      {error && aggregation.length === 0 && !loading && (
        <div
          className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            aria-label="Retry loading results"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && aggregation.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <p className="text-blue-800 text-xl font-semibold mb-2">
            Be the first to guess!
          </p>
          <p className="text-blue-600">
            No guesses yet. Your answer will appear here once submitted.
          </p>
        </div>
      )}

      {/* Results Display */}
      {aggregation.length > 0 && (
        <div className="animate-bounce-in">
          {/* Screen reader announcement */}
          <div className="sr-only" role="status" aria-live="assertive">
            Poll results: {aggregation.length} different guesses from{' '}
            {totalPlayers} players. Top guess is {aggregation[0].guess}{' '}
            with {aggregation[0].percentage.toFixed(1)}% of votes.
          </div>

          {/* Top 10 Guesses */}
          <div className="mb-6">
            {aggregation.slice(0, 10).map((agg) => {
              const isAnimating = animatingRanks.has(agg.guess);
              
              return (
                <div
                  key={agg.guess}
                  className={`transition-all duration-300 ease-in-out ${
                    isAnimating ? 'scale-105' : 'scale-100'
                  }`}
                >
                  <GuessAggregationBar
                    guess={agg.guess}
                    count={agg.count}
                    percentage={agg.percentage}
                    isPlayerGuess={agg.isPlayerGuess}
                    isCreatorAnswer={agg.isCreatorAnswer}
                    rank={agg.rank}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center mb-6">
            <p className="text-gray-700 text-base md:text-lg">
              <span className="font-semibold">📊 {totalPlayers.toLocaleString()}</span>{' '}
              {totalPlayers === 1 ? 'player' : 'players'} •{' '}
              <span className="font-semibold">{totalGuesses.toLocaleString()}</span>{' '}
              total {totalGuesses === 1 ? 'guess' : 'guesses'}
            </p>
          </div>

          {/* Consensus Score Display */}
          {playerScore && (
            <div className="animate-fade-in">
              <ConsensusScoreDisplay
                pointsEarned={playerScore.pointsEarned}
                matchPercentage={playerScore.matchPercentage}
                tier={playerScore.tier}
                totalScore={totalScore}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
