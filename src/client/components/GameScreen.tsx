import { PromptDisplay } from './PromptDisplay';
import { GuessInput } from './GuessInput';
import { ResultsDisplay } from './ResultsDisplay';
import { Leaderboard } from './Leaderboard';
import type { GameState } from '../../shared/types/game';

type GameScreenProps = {
  gameState: GameState;
  onSubmitGuess: (guess: string) => void;
  onNextRound: () => void;
  onDisplayComplete: () => void;
  onGuessComplete: () => void;
  lastResult?: {
    isCorrect: boolean;
    isClose: boolean;
    pointsEarned: number;
    correctAnswer: string;
  } | null;
};

export function GameScreen({
  gameState,
  onSubmitGuess,
  onNextRound,
  onDisplayComplete,
  onGuessComplete,
  lastResult,
}: GameScreenProps) {
  const { phase, currentPrompt, playerGuess, score, roundsCompleted } = gameState;

  // Phase durations (in seconds)
  const DISPLAY_DURATION = 5;
  const GUESS_DURATION = 20;
  const RESULTS_DURATION = 10;

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
      {/* Persistent Leaderboard */}
      <Leaderboard score={score} roundsCompleted={roundsCompleted} rank={1} />

      {/* Main Content Area */}
      <div className="container mx-auto">
        {/* Display Phase */}
        {phase === 'display' && currentPrompt && (
          <div className="transition-opacity duration-300 ease-in-out">
            <PromptDisplay
              promptText={currentPrompt.promptText}
              timeRemaining={DISPLAY_DURATION}
              onComplete={onDisplayComplete}
            />
          </div>
        )}

        {/* Guess Phase */}
        {phase === 'guess' && (
          <div className="transition-opacity duration-300 ease-in-out">
            <GuessInput
              onSubmit={onSubmitGuess}
              timeRemaining={GUESS_DURATION}
              disabled={false}
              onComplete={onGuessComplete}
            />
          </div>
        )}

        {/* Results Phase */}
        {phase === 'results' && lastResult && (
          <div className="transition-opacity duration-300 ease-in-out">
            <ResultsDisplay
              correctAnswer={lastResult.correctAnswer}
              playerGuess={playerGuess}
              isCorrect={lastResult.isCorrect}
              isClose={lastResult.isClose}
              pointsEarned={lastResult.pointsEarned}
              totalScore={score}
              timeRemaining={RESULTS_DURATION}
              onComplete={onNextRound}
            />
          </div>
        )}
      </div>
    </div>
  );
}
