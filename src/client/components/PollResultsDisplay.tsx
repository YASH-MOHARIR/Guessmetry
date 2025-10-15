import { useEffect, useState } from 'react';
import { GuessAggregationBar } from './GuessAggregationBar';
import { Timer } from './Timer';
import type { ConsensusResultsResponse } from '../../shared/types/api';

type PollResultsDisplayProps = {
  promptId: number;
  playerGuess: string | null;
  creatorAnswer: string;
  timeRemaining: number;
  onComplete: () => void;
};

export function PollResultsDisplay({
  promptId,
  playerGuess,
  creatorAnswer,
  timeRemaining,
  onComplete,
}: PollResultsDisplayProps) {
  const [data, setData] = useState<ConsensusResultsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial aggregation data on mount
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/consensus/get-results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            promptId,
            username: '', // Will be populated by server from context
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }

        const result: ConsensusResultsResponse = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [promptId]);

  // Auto-call onComplete when timeRemaining reaches 0
  useEffect(() => {
    if (timeRemaining === 0) {
      onComplete();
    }
  }, [timeRemaining, onComplete]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Trigger re-fetch by updating a dependency
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/consensus/get-results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            promptId,
            username: '',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }

        const result: ConsensusResultsResponse = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
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

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12" role="status" aria-live="polite">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading results...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
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
      {!loading && !error && data && data.aggregation.length === 0 && (
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
      {!loading && !error && data && data.aggregation.length > 0 && (
        <div className="animate-bounce-in">
          {/* Screen reader announcement */}
          <div className="sr-only" role="status" aria-live="assertive">
            Poll results: {data.aggregation.length} different guesses from{' '}
            {data.totalPlayers} players. Top guess is {data.aggregation[0].guess}{' '}
            with {data.aggregation[0].percentage.toFixed(1)}% of votes.
          </div>

          {/* Top 10 Guesses */}
          <div className="mb-6">
            {data.aggregation.slice(0, 10).map((agg) => (
              <GuessAggregationBar
                key={agg.rank}
                guess={agg.guess}
                count={agg.count}
                percentage={agg.percentage}
                isPlayerGuess={agg.isPlayerGuess}
                isCreatorAnswer={agg.isCreatorAnswer}
                rank={agg.rank}
              />
            ))}
          </div>

          {/* Bottom Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-gray-700 text-base md:text-lg">
              <span className="font-semibold">📊 {data.totalPlayers.toLocaleString()}</span>{' '}
              {data.totalPlayers === 1 ? 'player' : 'players'} •{' '}
              <span className="font-semibold">{data.totalGuesses.toLocaleString()}</span>{' '}
              total {data.totalGuesses === 1 ? 'guess' : 'guesses'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
