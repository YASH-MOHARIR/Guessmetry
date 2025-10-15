// Init response for game initialization
export type InitResponse = {
  type: 'init';
  postId: string;
  username: string;
};

export type IncrementResponse = {
  type: 'increment';
  postId: string;
  count: number;
};

export type DecrementResponse = {
  type: 'decrement';
  postId: string;
  count: number;
};

// Game-specific API types
export type GameStartResponse = {
  type: 'game-start';
  sessionId: string;
  username: string;
};

export type NextPromptResponse = {
  type: 'next-prompt';
  prompt: {
    id: number;
    promptText: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
  };
};

export type GuessResultResponse = {
  type: 'guess-result';
  isCorrect: boolean;
  isClose: boolean;
  correctAnswer: string;
  pointsEarned: number;
  totalScore: number;
};

export type ErrorResponse = {
  status: 'error';
  message: string;
};
