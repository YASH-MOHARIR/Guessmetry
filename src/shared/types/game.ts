import type { Prompt } from './prompt';

export type GamePhase = 'home' | 'display' | 'guess' | 'results' | 'error';

export type GameState = {
  phase: GamePhase;
  currentPrompt: Prompt | null;
  playerGuess: string | null;
  score: number;
  roundsCompleted: number;
  usedPromptIds: number[];
  username: string | null;
  postId: string | null;
  sessionId: string | null;
  loading: boolean;
  error: string | null;
};

// Consensus voting types
export type ConsensusScoreTier = 'majority' | 'common' | 'uncommon' | 'rare' | 'unique';

export type ConsensusScore = {
  pointsEarned: number; // 100, 50, 25, 10, or 0
  matchPercentage: number; // Percentage of players who guessed the same
  tier: ConsensusScoreTier; // Which tier the guess falls into
};

export type GuessAggregation = {
  guess: string; // "jellyfish"
  count: number; // 5183
  percentage: number; // 85.2
  isPlayerGuess: boolean; // true if this is the current player's guess
  isCreatorAnswer: boolean; // true if this matches creator's intended answer
  rank: number; // 1-10 position in top guesses
};
