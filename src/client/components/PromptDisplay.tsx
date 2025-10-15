import { Timer } from './Timer';

type PromptDisplayProps = {
  promptText: string;
  timeRemaining: number;
  onComplete: () => void;
};

export function PromptDisplay({ promptText, timeRemaining, onComplete }: PromptDisplayProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 animate-fade-in">
      {/* Timer */}
      <div className="mb-8">
        <Timer duration={timeRemaining} onComplete={onComplete} variant="display" />
      </div>
      
      {/* Prompt Text */}
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
        <p className="text-2xl md:text-4xl font-semibold text-gray-800 text-center leading-relaxed">
          {promptText}
        </p>
      </div>
      
      {/* Instruction */}
      <p className="text-center text-gray-600 mt-6 text-base md:text-lg">
        Memorize this description!
      </p>
    </div>
  );
}
