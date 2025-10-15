import express from 'express';
import {
  InitResponse,
  IncrementResponse,
  DecrementResponse,
  GameStartResponse,
  NextPromptResponse,
  GuessResultResponse,
  ErrorResponse,
} from '../shared/types/api';
import { redis, reddit, createServer, context, getServerPort } from '@devvit/web/server';
import { createPost } from './core/post';
import { generateSessionId } from './utils/sessionId';
import { selectNextPrompt } from './utils/promptSelector';
import { prompts } from './data/prompts';
import { calculateSimilarity } from './utils/stringSimilarity';

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();

router.get<{ postId: string }, InitResponse | { status: string; message: string }>(
  '/api/init',
  async (_req, res): Promise<void> => {
    const { postId } = context;

    if (!postId) {
      console.error('API Init Error: postId not found in devvit context');
      res.status(400).json({
        status: 'error',
        message: 'postId is required but missing from context',
      });
      return;
    }

    try {
      const username = await reddit.getCurrentUsername();

      res.json({
        type: 'init',
        postId: postId,
        username: username ?? 'anonymous',
      });
    } catch (error) {
      console.error(`API Init Error for post ${postId}:`, error);
      let errorMessage = 'Unknown error during initialization';
      if (error instanceof Error) {
        errorMessage = `Initialization failed: ${error.message}`;
      }
      res.status(400).json({ status: 'error', message: errorMessage });
    }
  }
);

router.post<
  { postId: string },
  GameStartResponse | ErrorResponse,
  { postId: string }
>('/api/game/start', async (req, res): Promise<void> => {
  const { postId } = context;

  if (!postId) {
    console.error('API Game Start Error: postId not found in context');
    res.status(400).json({
      status: 'error',
      message: 'postId is required but missing from context',
    });
    return;
  }

  try {
    const username = await reddit.getCurrentUsername();
    const sessionId = generateSessionId(postId, username ?? 'anonymous');

    // Initialize session in Redis with 1 hour TTL (3600 seconds)
    const ttl = 3600;

    // Initialize session score to 0
    await redis.set(`session:${sessionId}:score`, '0', { expiration: new Date(Date.now() + ttl * 1000) });

    // Initialize session metadata
    await redis.hSet(`session:${sessionId}:meta`, {
      username: username ?? 'anonymous',
      startTime: Date.now().toString(),
      roundsCompleted: '0',
    });
    await redis.expire(`session:${sessionId}:meta`, ttl);

    // Initialize used prompts set (will be populated as prompts are used)
    // Using zAdd with empty set to create the key with TTL
    await redis.expire(`session:${sessionId}:used`, ttl);

    res.json({
      type: 'game-start',
      sessionId,
      username: username ?? 'anonymous',
    });
  } catch (error) {
    console.error(`API Game Start Error for post ${postId}:`, error);
    let errorMessage = 'Unknown error during game start';
    if (error instanceof Error) {
      errorMessage = `Game start failed: ${error.message}`;
    }
    res.status(500).json({ status: 'error', message: errorMessage });
  }
});

router.post<
  { postId: string },
  NextPromptResponse | ErrorResponse,
  { sessionId: string }
>('/api/game/next-prompt', async (req, res): Promise<void> => {
  const { postId } = context;

  if (!postId) {
    console.error('API Next Prompt Error: postId not found in context');
    res.status(400).json({
      status: 'error',
      message: 'postId is required but missing from context',
    });
    return;
  }

  const { sessionId } = req.body;

  if (!sessionId) {
    res.status(400).json({
      status: 'error',
      message: 'sessionId is required',
    });
    return;
  }

  try {
    // Select next unused prompt
    const selectedPrompt = await selectNextPrompt(redis, sessionId, prompts);

    if (!selectedPrompt) {
      res.status(404).json({
        status: 'error',
        message: 'No more prompts available. All prompts have been used in this session.',
      });
      return;
    }

    // Return prompt without answer field (client shouldn't see the answer)
    res.json({
      type: 'next-prompt',
      prompt: {
        id: selectedPrompt.id,
        promptText: selectedPrompt.promptText,
        difficulty: selectedPrompt.difficulty,
        category: selectedPrompt.category,
      },
    });
  } catch (error) {
    console.error(`API Next Prompt Error for session ${sessionId}:`, error);
    let errorMessage = 'Unknown error fetching next prompt';
    if (error instanceof Error) {
      errorMessage = `Failed to fetch prompt: ${error.message}`;
    }
    res.status(500).json({ status: 'error', message: errorMessage });
  }
});

router.post<
  { postId: string },
  GuessResultResponse | ErrorResponse,
  { sessionId: string; promptId: number; guess: string }
>('/api/game/submit-guess', async (req, res): Promise<void> => {
  const { postId } = context;

  if (!postId) {
    console.error('API Submit Guess Error: postId not found in context');
    res.status(400).json({
      status: 'error',
      message: 'postId is required but missing from context',
    });
    return;
  }

  const { sessionId, promptId, guess } = req.body;

  if (!sessionId || promptId === undefined || guess === undefined) {
    res.status(400).json({
      status: 'error',
      message: 'sessionId, promptId, and guess are required',
    });
    return;
  }

  try {
    // Find the prompt by ID
    const prompt = prompts.find((p) => p.id === promptId);

    if (!prompt) {
      res.status(404).json({
        status: 'error',
        message: 'Prompt not found',
      });
      return;
    }

    // Normalize guess (lowercase, trim)
    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedAnswer = prompt.answer.toLowerCase().trim();

    // Check for exact match against answer and alternative answers
    const allAcceptableAnswers = [
      normalizedAnswer,
      ...prompt.alternativeAnswers.map((a) => a.toLowerCase().trim()),
    ];

    let isCorrect = false;
    let isClose = false;
    let pointsEarned = 0;

    // Check exact match
    if (allAcceptableAnswers.includes(normalizedGuess)) {
      isCorrect = true;
      pointsEarned = 10;
    } else {
      // Check for close match using string similarity (≥70% threshold)
      for (const acceptableAnswer of allAcceptableAnswers) {
        const similarity = calculateSimilarity(normalizedGuess, acceptableAnswer);
        if (similarity >= 70) {
          isClose = true;
          pointsEarned = 5;
          break;
        }
      }
    }

    // Update session score in Redis
    const currentScoreStr = await redis.get(`session:${sessionId}:score`);
    const currentScore = currentScoreStr ? parseInt(currentScoreStr, 10) : 0;
    const newScore = currentScore + pointsEarned;
    await redis.set(`session:${sessionId}:score`, newScore.toString());

    // Update rounds completed
    const metaData = await redis.hGetAll(`session:${sessionId}:meta`);
    const roundsCompleted = metaData.roundsCompleted ? parseInt(metaData.roundsCompleted, 10) : 0;
    await redis.hSet(`session:${sessionId}:meta`, {
      roundsCompleted: (roundsCompleted + 1).toString(),
    });

    res.json({
      type: 'guess-result',
      isCorrect,
      isClose,
      correctAnswer: prompt.answer,
      pointsEarned,
      totalScore: newScore,
    });
  } catch (error) {
    console.error(`API Submit Guess Error for session ${sessionId}:`, error);
    let errorMessage = 'Unknown error submitting guess';
    if (error instanceof Error) {
      errorMessage = `Failed to submit guess: ${error.message}`;
    }
    res.status(500).json({ status: 'error', message: errorMessage });
  }
});

router.post<{ postId: string }, IncrementResponse | { status: string; message: string }, unknown>(
  '/api/increment',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    res.json({
      count: await redis.incrBy('count', 1),
      postId,
      type: 'increment',
    });
  }
);

router.post<{ postId: string }, DecrementResponse | { status: string; message: string }, unknown>(
  '/api/decrement',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    res.json({
      count: await redis.incrBy('count', -1),
      postId,
      type: 'decrement',
    });
  }
);

router.post('/internal/on-app-install', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      status: 'success',
      message: `Post created in subreddit ${context.subredditName} with id ${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

router.post('/internal/menu/post-create', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = getServerPort();

const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port);
