import React from 'react';

type HomeScreenProps = {
  onStartGame: () => void;
  username: string | null;
};

export function HomeScreen({ onStartGame, username }: HomeScreenProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onStartGame();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-6 lg:p-8" role="main">
      <div className="max-w-2xl w-full">
        {/* Game Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-6 md:mb-8">
          Guessmetry
        </h1>

        {/* Personalized Greeting */}
        {username && (
          <p className="text-lg md:text-xl text-gray-700 text-center mb-4 md:mb-6" aria-live="polite">
            Welcome, {username}!
          </p>
        )}

        {/* Instructions Card */}
        <section className="bg-gray-50 rounded-xl p-5 md:p-7 lg:p-8 mb-6 md:mb-8 shadow-sm" aria-labelledby="instructions-heading">
          <h2 id="instructions-heading" className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
            How to Play
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            You'll see geometric shape descriptions like "a circle on top of a
            rectangle." Your goal is to guess what object is being described!
            You'll have 5 seconds to memorize the prompt, then 20 seconds to
            type your guess. Earn 10 points for correct answers and 5 points
            for close matches. Can you guess them all?
          </p>
        </section>

        {/* Play Button */}
        <button
          onClick={onStartGame}
          onKeyDown={handleKeyDown}
          className="w-full bg-[#FF4500] hover:bg-[#D93900] text-white text-lg md:text-xl lg:text-2xl font-semibold py-3 md:py-4 lg:py-5 px-8 rounded-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] shadow-md min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:ring-offset-2"
          aria-label="Start playing Guessmetry game"
          type="button"
        >
          Play
        </button>
      </div>
    </div>
  );
}
