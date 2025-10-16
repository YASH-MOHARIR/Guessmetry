import { useEffect, useState } from 'react';
import { useGame } from './hooks/useGame';
import { HomeScreen } from './components/HomeScreen';
import { GameScreen } from './components/GameScreen';

type GameMode = 'classic' | 'consensus';

export const App = () => {
  const { state, init, startGame, fetchNextPrompt, submitGuess, startGuessPhase, nextRound } =
    useGame();

  const [lastResult, setLastResult] = useState<{
    isCorrect: boolean;
    isClose: boolean;
    pointsEarned: number;
    correctAnswer: string;
  } | null>(null);
  const [previousScore, setPreviousScore] = useState(0);
  const [gameMode, setGameMode] = useState<GameMode>('classic');

  // Initialize game on mount
  useEffect(() => {
    void init();
  }, [init]);

  // Handle game start
  const handleStartGame = async (mode: GameMode) => {
    setGameMode(mode);
    await startGame(); // startGame now fetches the first prompt internally
    setPreviousScore(0);
    setLastResult(null);
  };

  // Handle display phase complete
  const handleDisplayComplete = () => {
    startGuessPhase();
  };

  // Handle guess phase complete (timeout)
  const handleGuessComplete = async () => {
    // Submit empty guess if no guess was made
    await submitGuess('', gameMode);
  };

  // Handle guess submission
  const handleSubmitGuess = async (guess: string) => {
    await submitGuess(guess, gameMode);
  };

  // Handle next round
  const handleNextRound = async () => {
    nextRound();
    await fetchNextPrompt();
  };

  // Store last result when entering results phase
  useEffect(() => {
    if (state.phase === 'results' && state.currentPrompt) {
      if (gameMode === 'classic') {
        // Classic mode: calculate from score difference
        const pointsEarned = state.score - previousScore;
        setLastResult({
          isCorrect: pointsEarned === 10,
          isClose: pointsEarned === 5,
          pointsEarned,
          correctAnswer: state.currentPrompt.answer,
        });
        setPreviousScore(state.score);
      } else {
        // Consensus mode: PollResultsDisplay will handle scoring
        // Just set placeholder result with correct answer
        setLastResult({
          isCorrect: false,
          isClose: false,
          pointsEarned: 0,
          correctAnswer: state.currentPrompt.answer,
        });
      }
    }
  }, [state.phase, state.currentPrompt, state.score, previousScore, gameMode]);

  // Loading state
  if (state.loading && state.phase === 'home') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" role="main">
        <div className="text-center">
          <div
            className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4500] mb-4"
            role="status"
            aria-label="Loading game"
          ></div>
          <p className="text-lg text-gray-600" aria-live="polite">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.phase === 'error') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4" role="main">
        <div
          className="max-w-md w-full bg-red-50 rounded-xl p-6 md:p-8 text-center"
          role="alert"
          aria-live="assertive"
        >
          <div className="text-red-500 text-5xl mb-4" aria-hidden="true">
            ⚠️
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-base text-gray-700 mb-6">
            {state.error || 'An unexpected error occurred. Please try again.'}
          </p>
          <button
            onClick={() => init()}
            className="w-full bg-[#FF4500] hover:bg-[#D93900] text-white text-lg font-semibold py-3 px-6 rounded-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:ring-offset-2"
            aria-label="Retry loading the game"
            type="button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Home screen
  if (state.phase === 'home') {
    return <HomeScreen onStartGame={handleStartGame} username={state.username} />;
  }

  // Game screen (display, guess, results phases)
  return (
    <GameScreen
      gameState={state}
      mode={gameMode}
      onSubmitGuess={handleSubmitGuess}
      onNextRound={handleNextRound}
      onDisplayComplete={handleDisplayComplete}
      onGuessComplete={handleGuessComplete}
      lastResult={lastResult}
    />
  );
};
