import type { RedisClient } from '@devvit/web/server';
import { normalizeGuess } from '../utils/guessNormalization';

const TTL_SECONDS = 24 * 60 * 60; // 24 hours

/**
 * Stores a guess in Redis and increments its count atomically
 * @param redis - Redis client instance
 * @param promptId - The prompt ID
 * @param guess - The raw guess string
 * @returns The new count for this guess
 */
export async function storeGuess(
  redis: RedisClient,
  promptId: number,
  guess: string
): Promise<number> {
  try {
    const normalizedGuess = normalizeGuess(guess);
    const key = `prompt:${promptId}:guesses`;

    // Use HINCRBY for atomic increment
    const newCount = await redis.hIncrBy(key, normalizedGuess, 1);

    // Set TTL on the key (only needs to be done once, but safe to repeat)
    await redis.expire(key, TTL_SECONDS);

    return newCount;
  } catch (error) {
    console.error(`Error storing guess for prompt ${promptId}:`, error);
    throw new Error(
      `Failed to store guess: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Adds a player to the unique players set for a prompt
 * Uses a sorted set (zset) with timestamp as score since Redis sets aren't available
 * @param redis - Redis client instance
 * @param promptId - The prompt ID
 * @param username - The player's username
 * @returns The new size of the players set
 */
export async function addPlayerToSet(
  redis: RedisClient,
  promptId: number,
  username: string
): Promise<number> {
  try {
    const key = `prompt:${promptId}:players`;

    // Use ZADD to add player to sorted set (automatically handles duplicates)
    // Using timestamp as score for ordering
    await redis.zAdd(key, {
      member: username,
      score: Date.now(),
    });

    // Set TTL on the key
    await redis.expire(key, TTL_SECONDS);

    // Get the size of the sorted set
    const size = await redis.zCard(key);

    return size;
  } catch (error) {
    console.error(`Error adding player to set for prompt ${promptId}:`, error);
    throw new Error(
      `Failed to add player: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Stores an individual player's guess for a prompt
 * @param redis - Redis client instance
 * @param promptId - The prompt ID
 * @param username - The player's username
 * @param guess - The raw guess string
 */
export async function storePlayerGuess(
  redis: RedisClient,
  promptId: number,
  username: string,
  guess: string
): Promise<void> {
  try {
    const normalizedGuess = normalizeGuess(guess);
    const key = `prompt:${promptId}:player:${username}:guess`;

    // Store the player's guess
    await redis.set(key, normalizedGuess, {
      expiration: new Date(Date.now() + TTL_SECONDS * 1000),
    });
  } catch (error) {
    console.error(`Error storing player guess for prompt ${promptId}, user ${username}:`, error);
    throw new Error(
      `Failed to store player guess: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Retrieves all aggregated guesses for a prompt
 * @param redis - Redis client instance
 * @param promptId - The prompt ID
 * @returns Object mapping guess text to count
 */
export async function getAggregatedGuesses(
  redis: RedisClient,
  promptId: number
): Promise<Record<string, number>> {
  try {
    const key = `prompt:${promptId}:guesses`;

    // Use HGETALL to fetch all guesses and counts
    const guesses = await redis.hGetAll(key);

    // Convert string values to numbers
    const result: Record<string, number> = {};
    for (const [guess, countStr] of Object.entries(guesses)) {
      result[guess] = parseInt(countStr, 10);
    }

    return result;
  } catch (error) {
    console.error(`Error getting aggregated guesses for prompt ${promptId}:`, error);
    throw new Error(
      `Failed to get aggregated guesses: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Gets the total number of unique players who guessed for a prompt
 * Uses zCard since we're using a sorted set for players
 * @param redis - Redis client instance
 * @param promptId - The prompt ID
 * @returns The number of unique players
 */
export async function getTotalPlayers(redis: RedisClient, promptId: number): Promise<number> {
  try {
    const key = `prompt:${promptId}:players`;

    // Use ZCARD to count unique players in sorted set
    const count = await redis.zCard(key);

    return count;
  } catch (error) {
    console.error(`Error getting total players for prompt ${promptId}:`, error);
    throw new Error(
      `Failed to get total players: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
