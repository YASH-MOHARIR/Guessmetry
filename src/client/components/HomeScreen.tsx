import React from 'react';

type HomeScreenProps = {
  onStartGame: () => void;
  username: string | null;
};

export function HomeScreen({ onStartGame, username }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Game Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 text-center mb-8">
          Guessmetry
        </h1>

        {/* Personalized Greeting */}
        {username && (
          <p className="text-xl text-gray-700 text-center mb-6">
            Welcome, {username}!
          </p>
        )}

        {/* Instructions Card */}
        <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            How to Play
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            You'll see geometric shape descriptions like "a circle on top of a
            rectangle." Your goal is to guess what object is being described!
            You'll have 5 seconds to memorize the prompt, then 20 seconds to
            type your guess. Earn 10 points for correct answers and 5 points
            for close matches. Can you guess them all?
          </p>
        </div>

        {/* Play Button */}
        <button
          onClick={onStartGame}
          className="w-full bg-[#FF4500] hover:bg-[#D93900] text-white text-xl md:text-2xl font-semibold py-4 md:py-5 px-8 rounded-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] shadow-md min-h-[44px]"
          aria-label="Start playing Guessmetry"
        >
          Play
        </button>
      </div>
    </div>
  );
}
