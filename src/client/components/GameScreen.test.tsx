import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameScreen } from './GameScreen';
import type { GameState } from '../../shared/types/game';

// Mock child components
vi.mock('./PromptDisplay', () => ({
  PromptDisplay: ({ promptText, onComplete }: any) => (
    <div data-testid="prompt-display">
      <p>{promptText}</p>
      <button onClick={onComplete}>Complete Display</button>
    </div>
  ),
}));

vi.mock('./GuessInput', () => ({
  GuessInput: ({ onSubmit, onComplete }: any) => (
    <div data-testid="guess-input">
      <button onClick={() => onSubmit('test guess')}>Submit</button>
      <button onClick={onComplete}>Complete Guess</button>
    </div>
  ),
}));

vi.mock('./ResultsDisplay', () => ({
  ResultsDisplay: ({ correctAnswer, pointsEarned, onComplete }: any) => (
    <div data-testid="results-display">
      <p>Answer: {correctAnswer}</p>
      <p>Points: {pointsEarned}</p>
      <button onClick={onComplete}>Next Round</button>
    </div>
  ),
}));

vi.mock('./Leaderboard', () => ({
  Leaderboard: ({ score, roundsCompleted, rank }: any) => (
    <div data-testid="leaderboard">
      <p>Score: {score}</p>
      <p>Rounds: {roundsCompleted}</p>
      <p>Rank: {rank}</p>
    </div>
  ),
}));

describe('GameScreen', () => {
  const mockGameState: GameState = {
    phase: 'display',
    currentPrompt: {
      id: 1,
      promptText: 'A circle on top of a rectangle',
      answer: 'tree',
      alternativeAnswers: ['palm tree'],
      difficulty: 'easy',
      category: 'everyday',
    },
    playerGuess: null,
    score: 0,
    roundsCompleted: 0,
    usedPromptIds: [],
    username: 'TestUser',
    postId: 'test123',
    sessionId: 'session123',
    loading: false,
    error: null,
  };

  it('renders leaderboard persistently', () => {
    const mockProps = {
      gameState: mockGameState,
      onSubmitGuess: vi.fn(),
      onNextRound: vi.fn(),
      onDisplayComplete: vi.fn(),
      onGuessComplete: vi.fn(),
    };

    render(<GameScreen {...mockProps} />);

    expect(screen.getByTestId('leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
    expect(screen.getByText('Rounds: 0')).toBeInTheDocument();
    expect(screen.getByText('Rank: 1')).toBeInTheDocument();
  });

  it('renders PromptDisplay during display phase', () => {
    const mockProps = {
      gameState: mockGameState,
      onSubmitGuess: vi.fn(),
      onNextRound: vi.fn(),
      onDisplayComplete: vi.fn(),
      onGuessComplete: vi.fn(),
    };

    render(<GameScreen {...mockProps} />);

    expect(screen.getByTestId('prompt-display')).toBeInTheDocument();
    expect(screen.getByText('A circle on top of a rectangle')).toBeInTheDocument();
  });

  it('renders GuessInput during guess phase', () => {
    const guessState = { ...mockGameState, phase: 'guess' as const };
    const mockProps = {
      gameState: guessState,
      onSubmitGuess: vi.fn(),
      onNextRound: vi.fn(),
      onDisplayComplete: vi.fn(),
      onGuessComplete: vi.fn(),
    };

    render(<GameScreen {...mockProps} />);

    expect(screen.getByTestId('guess-input')).toBeInTheDocument();
  });

  it('renders ResultsDisplay during results phase', () => {
    const resultsState = { ...mockGameState, phase: 'results' as const, playerGuess: 'tree' };
    const lastResult = {
      isCorrect: true,
      isClose: false,
      pointsEarned: 10,
      correctAnswer: 'tree',
    };
    const mockProps = {
      gameState: resultsState,
      onSubmitGuess: vi.fn(),
      onNextRound: vi.fn(),
      onDisplayComplete: vi.fn(),
      onGuessComplete: vi.fn(),
      lastResult,
    };

    render(<GameScreen {...mockProps} />);

    expect(screen.getByTestId('results-display')).toBeInTheDocument();
    expect(screen.getByText('Answer: tree')).toBeInTheDocument();
    expect(screen.getByText('Points: 10')).toBeInTheDocument();
  });

  it('calls onDisplayComplete when display phase completes', () => {
    const mockOnDisplayComplete = vi.fn();
    const mockProps = {
      gameState: mockGameState,
      onSubmitGuess: vi.fn(),
      onNextRound: vi.fn(),
      onDisplayComplete: mockOnDisplayComplete,
      onGuessComplete: vi.fn(),
    };

    render(<GameScreen {...mockProps} />);

    const completeButton = screen.getByText('Complete Display');
    completeButton.click();

    expect(mockOnDisplayComplete).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmitGuess when guess is submitted', () => {
    const guessState = { ...mockGameState, phase: 'guess' as const };
    const mockOnSubmitGuess = vi.fn();
    const mockProps = {
      gameState: guessState,
      onSubmitGuess: mockOnSubmitGuess,
      onNextRound: vi.fn(),
      onDisplayComplete: vi.fn(),
      onGuessComplete: vi.fn(),
    };

    render(<GameScreen {...mockProps} />);

    const submitButton = screen.getByText('Submit');
    submitButton.click();

    expect(mockOnSubmitGuess).toHaveBeenCalledWith('test guess');
  });

  it('calls onGuessComplete when guess phase completes', () => {
    const guessState = { ...mockGameState, phase: 'guess' as const };
    const mockOnGuessComplete = vi.fn();
    const mockProps = {
      gameState: guessState,
      onSubmitGuess: vi.fn(),
      onNextRound: vi.fn(),
      onDisplayComplete: vi.fn(),
      onGuessComplete: mockOnGuessComplete,
    };

    render(<GameScreen {...mockProps} />);

    const completeButton = screen.getByText('Complete Guess');
    completeButton.click();

    expect(mockOnGuessComplete).toHaveBeenCalledTimes(1);
  });

  it('calls onNextRound when results phase completes', () => {
    const resultsState = { ...mockGameState, phase: 'results' as const, playerGuess: 'tree' };
    const lastResult = {
      isCorrect: true,
      isClose: false,
      pointsEarned: 10,
      correctAnswer: 'tree',
    };
    const mockOnNextRound = vi.fn();
    const mockProps = {
      gameState: resultsState,
      onSubmitGuess: vi.fn(),
      onNextRound: mockOnNextRound,
      onDisplayComplete: vi.fn(),
      onGuessComplete: vi.fn(),
      lastResult,
    };

    render(<GameScreen {...mockProps} />);

    const nextButton = screen.getByText('Next Round');
    nextButton.click();

    expect(mockOnNextRound).toHaveBeenCalledTimes(1);
  });

  it('updates leaderboard with current score and rounds', () => {
    const updatedState = {
      ...mockGameState,
      score: 25,
      roundsCompleted: 3,
    };
    const mockProps = {
      gameState: updatedState,
      onSubmitGuess: vi.fn(),
      onNextRound: vi.fn(),
      onDisplayComplete: vi.fn(),
      onGuessComplete: vi.fn(),
    };

    render(<GameScreen {...mockProps} />);

    expect(screen.getByText('Score: 25')).toBeInTheDocument();
    expect(screen.getByText('Rounds: 3')).toBeInTheDocument();
  });

  it('applies transition classes for phase animations', () => {
    const mockProps = {
      gameState: mockGameState,
      onSubmitGuess: vi.fn(),
      onNextRound: vi.fn(),
      onDisplayComplete: vi.fn(),
      onGuessComplete: vi.fn(),
    };

    const { container } = render(<GameScreen {...mockProps} />);

    const transitionDiv = container.querySelector('.transition-opacity');
    expect(transitionDiv).toBeInTheDocument();
    expect(transitionDiv).toHaveClass('duration-300');
    expect(transitionDiv).toHaveClass('ease-in-out');
  });
});
