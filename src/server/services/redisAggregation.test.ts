import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  storeGuess,
  addPlayerToSet,
  storePlayerGuess,
  getAggregatedGuesses,
  getTotalPlayers,
} from './redisAggregation';
import type { RedisClient } from '@devvit/web/server';

describe('Redis Aggregation Service', () => {
  let mockRedis: RedisClient;

  beforeEach(() => {
    // Create a mock Redis client
    mockRedis = {
      hIncrBy: vi.fn(),
      expire: vi.fn(),
      sAdd: vi.fn(),
      sCard: vi.fn(),
      set: vi.fn(),
      hGetAll: vi.fn(),
    } as unknown as RedisClient;
  });

  describe('storeGuess', () => {
    it('should normalize and store a guess with HINCRBY', async () => {
      vi.mocked(mockRedis.hIncrBy).mockResolvedValue(1);
      vi.mocked(mockRedis.expire).mockResolvedValue(true);

      const result = await storeGuess(mockRedis, 42, 'JellyFish');

      expect(mockRedis.hIncrBy).toHaveBeenCalledWith('prompt:42:guesses', 'jellyfish', 1);
      expect(mockRedis.expire).toHaveBeenCalledWith('prompt:42:guesses', 86400);
      expect(result).toBe(1);
    });

    it('should handle multiple increments', async () => {
      vi.mocked(mockRedis.hIncrBy).mockResolvedValue(5);
      vi.mocked(mockRedis.expire).mockResolvedValue(true);

      const result = await storeGuess(mockRedis, 42, 'jellyfish');

      expect(result).toBe(5);
    });

    it('should trim whitespace from guess', async () => {
      vi.mocked(mockRedis.hIncrBy).mockResolvedValue(1);
      vi.mocked(mockRedis.expire).mockResolvedValue(true);

      await storeGuess(mockRedis, 42, '  jellyfish  ');

      expect(mockRedis.hIncrBy).toHaveBeenCalledWith('prompt:42:guesses', 'jellyfish', 1);
    });

    it('should throw error on Redis failure', async () => {
      vi.mocked(mockRedis.hIncrBy).mockRejectedValue(new Error('Redis error'));

      await expect(storeGuess(mockRedis, 42, 'jellyfish')).rejects.toThrow(
        'Failed to store guess'
      );
    });
  });

  describe('addPlayerToSet', () => {
    it('should add player to set and return size', async () => {
      vi.mocked(mockRedis.sAdd).mockResolvedValue(1);
      vi.mocked(mockRedis.expire).mockResolvedValue(true);
      vi.mocked(mockRedis.sCard).mockResolvedValue(1);

      const result = await addPlayerToSet(mockRedis, 42, 'user123');

      expect(mockRedis.sAdd).toHaveBeenCalledWith('prompt:42:players', 'user123');
      expect(mockRedis.expire).toHaveBeenCalledWith('prompt:42:players', 86400);
      expect(mockRedis.sCard).toHaveBeenCalledWith('prompt:42:players');
      expect(result).toBe(1);
    });

    it('should handle multiple players', async () => {
      vi.mocked(mockRedis.sAdd).mockResolvedValue(1);
      vi.mocked(mockRedis.expire).mockResolvedValue(true);
      vi.mocked(mockRedis.sCard).mockResolvedValue(5);

      const result = await addPlayerToSet(mockRedis, 42, 'user456');

      expect(result).toBe(5);
    });

    it('should throw error on Redis failure', async () => {
      vi.mocked(mockRedis.sAdd).mockRejectedValue(new Error('Redis error'));

      await expect(addPlayerToSet(mockRedis, 42, 'user123')).rejects.toThrow(
        'Failed to add player'
      );
    });
  });

  describe('storePlayerGuess', () => {
    it('should store normalized player guess with TTL', async () => {
      vi.mocked(mockRedis.set).mockResolvedValue('OK');

      await storePlayerGuess(mockRedis, 42, 'user123', 'JellyFish');

      expect(mockRedis.set).toHaveBeenCalledWith(
        'prompt:42:player:user123:guess',
        'jellyfish',
        expect.objectContaining({
          expiration: expect.any(Date),
        })
      );
    });

    it('should trim whitespace from player guess', async () => {
      vi.mocked(mockRedis.set).mockResolvedValue('OK');

      await storePlayerGuess(mockRedis, 42, 'user123', '  octopus  ');

      expect(mockRedis.set).toHaveBeenCalledWith(
        'prompt:42:player:user123:guess',
        'octopus',
        expect.any(Object)
      );
    });

    it('should throw error on Redis failure', async () => {
      vi.mocked(mockRedis.set).mockRejectedValue(new Error('Redis error'));

      await expect(storePlayerGuess(mockRedis, 42, 'user123', 'jellyfish')).rejects.toThrow(
        'Failed to store player guess'
      );
    });
  });

  describe('getAggregatedGuesses', () => {
    it('should fetch and parse aggregated guesses', async () => {
      vi.mocked(mockRedis.hGetAll).mockResolvedValue({
        jellyfish: '5183',
        squid: '193',
        octopus: '95',
      });

      const result = await getAggregatedGuesses(mockRedis, 42);

      expect(mockRedis.hGetAll).toHaveBeenCalledWith('prompt:42:guesses');
      expect(result).toEqual({
        jellyfish: 5183,
        squid: 193,
        octopus: 95,
      });
    });

    it('should return empty object when no guesses exist', async () => {
      vi.mocked(mockRedis.hGetAll).mockResolvedValue({});

      const result = await getAggregatedGuesses(mockRedis, 42);

      expect(result).toEqual({});
    });

    it('should throw error on Redis failure', async () => {
      vi.mocked(mockRedis.hGetAll).mockRejectedValue(new Error('Redis error'));

      await expect(getAggregatedGuesses(mockRedis, 42)).rejects.toThrow(
        'Failed to get aggregated guesses'
      );
    });
  });

  describe('getTotalPlayers', () => {
    it('should return count of unique players', async () => {
      vi.mocked(mockRedis.sCard).mockResolvedValue(5518);

      const result = await getTotalPlayers(mockRedis, 42);

      expect(mockRedis.sCard).toHaveBeenCalledWith('prompt:42:players');
      expect(result).toBe(5518);
    });

    it('should return 0 when no players exist', async () => {
      vi.mocked(mockRedis.sCard).mockResolvedValue(0);

      const result = await getTotalPlayers(mockRedis, 42);

      expect(result).toBe(0);
    });

    it('should throw error on Redis failure', async () => {
      vi.mocked(mockRedis.sCard).mockRejectedValue(new Error('Redis error'));

      await expect(getTotalPlayers(mockRedis, 42)).rejects.toThrow(
        'Failed to get total players'
      );
    });
  });

  describe('Integration scenarios', () => {
    it('should handle complete guess submission flow', async () => {
      // Mock all Redis operations
      vi.mocked(mockRedis.hIncrBy).mockResolvedValue(1);
      vi.mocked(mockRedis.expire).mockResolvedValue(true);
      vi.mocked(mockRedis.sAdd).mockResolvedValue(1);
      vi.mocked(mockRedis.sCard).mockResolvedValue(1);
      vi.mocked(mockRedis.set).mockResolvedValue('OK');

      // Simulate a player submitting a guess
      const guessCount = await storeGuess(mockRedis, 42, 'jellyfish');
      const playerCount = await addPlayerToSet(mockRedis, 42, 'user123');
      await storePlayerGuess(mockRedis, 42, 'user123', 'jellyfish');

      expect(guessCount).toBe(1);
      expect(playerCount).toBe(1);
    });

    it('should handle retrieving results', async () => {
      vi.mocked(mockRedis.hGetAll).mockResolvedValue({
        jellyfish: '5183',
        squid: '193',
      });
      vi.mocked(mockRedis.sCard).mockResolvedValue(5518);

      const guesses = await getAggregatedGuesses(mockRedis, 42);
      const totalPlayers = await getTotalPlayers(mockRedis, 42);

      expect(guesses).toEqual({
        jellyfish: 5183,
        squid: 193,
      });
      expect(totalPlayers).toBe(5518);
    });
  });
});
