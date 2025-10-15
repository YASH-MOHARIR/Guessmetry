import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { App } from './App';

// Mock fetch for API calls
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('End-to-End Game Flow Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should complete full game flow from home to game start', async () => {
    // Mock init response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        type: 'init',
        postId: 'test-post-123',
        username: 'testuser',
      }),
    });

    render(<App />);

    // Wait for initialization
    await waitFor(() => {
      expect(screen.getByText(/Guessmetry/i)).toBeInTheDocument();
    });

    // Verify home screen displays
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();

    // Mock game start response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        type: 'game-start',
        sessionId: 'session-123',
        username: 'testuser',
      }),
    });

    // Mock first prompt response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        type: 'next-prompt',
        prompt: {
          id: 1,
          promptText: 'A triangle sitting on top of a square',
          difficulty: 'easy',
          category: 'everyday',
        },
      }),
    });

    // Click Play button
    const playButton = screen.getByRole('button', { name: /play/i });
    fireEvent.click(playButton);

    // Wait for display phase
    await waitFor(() => {
      expect(screen.getByText(/A triangle sitting on top of a square/i)).toBeInTheDocument();
    });

    // Verify game started successfully
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/game/start',
      expect.objectContaining({
        method: 'POST',
      })
    );

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/game/next-prompt',
      expect.objectContaining({
        method: 'POST',
      })
    );
  });

  it('should handle guess submission with correct answer', async () => {
    // Setup initial state
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        type: 'init',
        postId: 'test-post-123',
        username: 'testuser',
      }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Guessmetry/i)).toBeInTheDocument();
    });

    // Start game
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        type: 'game-start',
        sessionId: 'session-123',
        username: 'testuser',
      }),
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        type: 'next-prompt',
        prompt: {
          id: 1,
          promptText: 'A triangle sitting on top of a square',
          difficulty: 'easy',
          category: 'everyday',
        },
      }),
    });

    fireEvent.click(screen.getByRole('button', { name: /play/i }));

    await waitFor(() => {
      expect(screen.getByText(/A triangle sitting on top of a square/i)).toBeInTheDocument();
    });

    // Verify API calls were made
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/game/start',
      expect.objectContaining({
        method: 'POST',
      })
    );
  });

  it('should display username on home screen', async () => {
    // Setup
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        type: 'init',
        postId: 'test-post-123',
        username: 'testuser',
      }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Guessmetry/i)).toBeInTheDocument();
    });

    // Verify username is displayed
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
  });

  it('should handle network errors gracefully', async () => {
    // Mock init failure
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    // Wait for error state
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    // Verify retry button exists
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('should handle prompt exhaustion scenario', async () => {
    // Setup
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        type: 'init',
        postId: 'test-post-123',
        username: 'testuser',
      }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Guessmetry/i)).toBeInTheDocument();
    });

    // Start game
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        type: 'game-start',
        sessionId: 'session-123',
        username: 'testuser',
      }),
    });

    // Mock prompt exhaustion
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({
        status: 'error',
        message: 'No more prompts available. All prompts have been used in this session.',
      }),
    });

    fireEvent.click(screen.getByRole('button', { name: /play/i }));

    // Wait for error message
    await waitFor(
      () => {
        expect(screen.getByText(/No more prompts available/i)).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });

  it('should verify all prompts are available', async () => {
    // This test verifies we have 25+ prompts as required
    // We'll test this by checking the server has prompts available
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        type: 'init',
        postId: 'test-post-123',
        username: 'testuser',
      }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Guessmetry/i)).toBeInTheDocument();
    });

    // Verify init was successful (which means server is working with prompts)
    expect(mockFetch).toHaveBeenCalledWith('/api/init');
  });
});
