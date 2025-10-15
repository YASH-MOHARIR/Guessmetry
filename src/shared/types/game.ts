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
