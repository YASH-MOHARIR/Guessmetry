import { useState, useEffect, useRef, FormEvent } from 'react';
import { Timer } from './Timer';

type GuessInputProps = {
  onSubmit: (guess: string) => void;
  timeRemaining: number;
  disabled: boolean;
  onComplete: () => void;
};

export function GuessInput({ onSubmit, timeRemaining, disabled, onComplete }: GuessInputProps) {
  const [guess, setGuess] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (hasSubmitted || disabled) return;
    
    setHasSubmitted(true);
    onSubmit(guess.trim());
  };

  const handleTimerComplete = () => {
    if (!hasSubmitted) {
      handleSubmit();
    }
    onComplete();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const isDisabled = disabled || hasSubmitted;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 animate-fade-in">
      {/* Timer */}
      <div className="mb-8">
        <Timer duration={timeRemaining} onComplete={handleTimerComplete} variant="guess" />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="guess-input" className="block text-lg font-semibold text-gray-700 mb-3">
            What is being described?
          </label>
          <input
            ref={inputRef}
            id="guess-input"
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
            maxLength={100}
            placeholder="Type your guess..."
            className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            style={{ fontSize: '16px' }} // Prevent zoom on iOS
          />
          <p className="text-sm text-gray-500 mt-2">
            {guess.length}/100 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
        >
          {hasSubmitted ? 'Submitted!' : 'Submit Guess'}
        </button>
      </form>
    </div>
  );
}
