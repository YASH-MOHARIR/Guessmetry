import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PollResultsDisplay } from './PollResultsDisplay';
import type { ConsensusResultsResponse } from '../../shared/types/api';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('PollResultsDisplay', () => {
  const mockOnComplete = vi.fn();

  const mockResultsData: ConsensusResultsResponse = {
    type: 'consensus-results',
    aggregation: [
      {
        guess: 'jellyfish',
        count: 5183,
        percentage: 85.2,
        isPlayerGuess: true,
        isCreatorAnswer: false,
        rank: 1,
      },
      {
        guess: 'squid',
        count: 193,
        percentage: 3.2,
        isPlayerGuess: false,
        isCreatorAnswer: false,
        rank: 2,
      },
      {
        guess: 'octopus',
        count: 95,
        percentage: 1.6,
        isPlayerGuess: false,
        isCreatorAnswer: false,
        rank: 3,
      },
      {
        guess: 'house',
        count: 47,
        percentage: 0.8,
        isPlayerGuess: false,
        isCreatorAnswer: true,
        rank: 4,
      },
    ],
    playerGuess: 'jellyfish',
    creatorAnswer: 'house',
    totalPlayers: 6082,
    totalGuesses: 6518,
    playerScore: {
      pointsEarned: 100,
      matchPercentage: 85.2,
      tier: 'majority',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResultsData,
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should render loading state initially', () => {
    render(
      <PollResultsDisplay
        promptId={1}
        playerGuess="jellyfish"
        creatorAnswer="house"
        timeRemaining={15}
        onComplete={mockOnComplete}
      />
    );

    expect(screen.getByText('Loading results...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should fetch initial aggregation data on mount', async () => {
    render(
      <PollResultsDisplay
        promptId={42}
        playerGuess="jellyfish"
        creatorAnswer="house"
        timeRemaining={15}
        onComplete={mockOnComplete}
      />
    );

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/consensus/get-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promptId: 42,
          username: '',
        }),
      });
    });
  });

  it('should render top 10 GuessAggregationBar components sorted by count', async () => {
    render(
      <PollResultsDisplay
        promptId={1}
        playerGuess="jellyfish"
        creatorAnswer="house"
        timeRemaining={15}
        onComplete={mockOnComplete}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading results...')).not.toBeInTheDocument();
    });

    // Check that all 4 guesses are rendered
    expect(screen.getByText('jellyfish')).toBeInTheDocument();
    expect(screen.getByText('squid')).toBeInTheDocument();
    expect(screen.getByText('octopus')).toBeInTheDocument();
    expect(screen.getByText('house')).toBeInTheDocument();

    // Check ranks
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('#2')).toBeInTheDocument();
    expect(screen.getByText('#3')).toBeInTheDocument();
    expect(screen.getByText('#4')).toBeInTheDocument();
  });

  it('should display total players and total guesses at bottom', async () => {
    render(
      <PollResultsDisplay
        promptId={1}
        playerGuess="jellyfish"
        creatorAnswer="house"
        timeRemaining={15}
        onComplete={mockOnComplete}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading results...')).not.toBeInTheDocument();
    });

    // Check for the summary section with specific text pattern
    expect(screen.getByText(/6,082/)).toBeInTheDocument();
    expect(screen.getByText(/6,518/)).toBeInTheDocument();
    expect(screen.getByText(/total guesses/)).toBeInTheDocument();
    
    // Verify the summary container exists using getAllByText and checking the first match
    const summaryElements = screen.getAllByText((content, element) => {
      return element?.textContent === '📊 6,082 players • 6,518 total guesses';
    });
    expect(summaryElements.length).toBeGreaterThan(0);
  });

  it('should show error message if fetch fails with retry button', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <PollResultsDisplay
        promptId={1}
        playerGuess="jellyfish"
        creatorAnswer="house"
        timeRemaining={15}
        onComplete={mockOnComplete}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should retry fetching data when retry button is clicked', async () => {
    const user = userEvent.setup();
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <PollResultsDisplay
        promptId={1}
        playerGuess="jellyfish"
        creatorAnswer="house"
        timeRemaining={15}
        onComplete={mockOnComplete}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });

    // Reset mock to succeed on retry
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResultsData,
    });

    const retryButton = screen.getByRole('button', { name: /retry/i });
    await user.click(retryButton);

    await waitFor(() => {
      expect(screen.queryByText('Network error')).not.toBeInTheDocument();
      expect(screen.getByText('jellyfish')).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('should handle empty aggregation case with "Be the first to guess!" message', async () => {
    const emptyData: ConsensusResultsResponse = {
      ...mockResultsData,
      aggregation: [],
      totalPlayers: 0,
      totalGuesses: 0,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => emptyData,
    });

    render(
      <PollResultsDisplay
        promptId={1}
        playerGuess={null}
        creatorAnswer="house"
        timeRemaining={15}
        onComplete={mockOnComplete}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Be the first to guess!')).toBeInTheDocument();
    });

    expect(
      screen.getByText(/No guesses yet. Your answer will appear here once submitted./)
    ).toBeInTheDocument();
  });

  it('should auto-call onComplete when timeRemaining reaches 0', async () => {
    const { rerender } = render(
      <PollResultsDisplay
        promptId={1}
        playerGuess="jellyfish"
        creatorAnswer="house"
        timeRemaining={5}
        onComplete={mockOnComplete}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading results...')).not.toBeInTheDocument();
    });

    expect(mockOnComplete).not.toHaveBeenCalled();

    // Update timeRemaining to 0
    rerender(
      <PollResultsDisplay
        promptId={1}
        playerGuess="jellyfish"
        creatorAnswer="house"
        timeRemaining={0}
        onComplete={mockOnComplete}
      />
    );

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });
  });

  it('should use Tailwind CSS for layout with vertical stack, centered, max-width 800px', async () => {
    const { container } = render(
      <PollResultsDisplay
        promptId={1}
        playerGuess="jellyfish"
        creatorAnswer="house"
        timeRemaining={15}
        onComplete={mockOnComplete}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading results...')).not.toBeInTheDocument();
    });

    const mainContainer = container.querySelector('[role="region"]');
    expect(mainContainer).toHaveClass('max-w-[800px]');
    expect(mainContainer).toHaveClass('mx-auto');
  });

  it('should handle non-ok response from fetch', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(
      <PollResultsDisplay
        promptId={1}
        playerGuess="jellyfish"
        creatorAnswer="house"
        timeRemaining={15}
        onComplete={mockOnComplete}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch results')).toBeInTheDocument();
    });
  });

  it('should render only top 10 guesses when more than 10 exist', async () => {
    const manyGuesses: ConsensusResultsResponse = {
      ...mockResultsData,
      aggregation: Array.from({ length: 15 }, (_, i) => ({
        guess: `guess${i + 1}`,
        count: 100 - i * 5,
        percentage: 10 - i * 0.5,
        isPlayerGuess: i === 0,
        isCreatorAnswer: false,
        rank: i + 1,
      })),
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => manyGuesses,
    });

    render(
      <PollResultsDisplay
        promptId={1}
        playerGuess="guess1"
        creatorAnswer="house"
        timeRemaining={15}
        onComplete={mockOnComplete}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading results...')).not.toBeInTheDocument();
    });

    // Should render first 10
    expect(screen.getByText('guess1')).toBeInTheDocument();
    expect(screen.getByText('guess10')).toBeInTheDocument();

    // Should not render 11th and beyond
    expect(screen.queryByText('guess11')).not.toBeInTheDocument();
    expect(screen.queryByText('guess15')).not.toBeInTheDocument();
  });

  it('should display singular "player" and "guess" when counts are 1', async () => {
    const singlePlayerData: ConsensusResultsResponse = {
      ...mockResultsData,
      totalPlayers: 1,
      totalGuesses: 1,
      aggregation: [
        {
          guess: 'jellyfish',
          count: 1,
          percentage: 100,
          isPlayerGuess: true,
          isCreatorAnswer: false,
          rank: 1,
        },
      ],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => singlePlayerData,
    });

    render(
      <PollResultsDisplay
        promptId={1}
        playerGuess="jellyfish"
        creatorAnswer="house"
        timeRemaining={15}
        onComplete={mockOnComplete}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading results...')).not.toBeInTheDocument();
    });

    // Verify the summary container has singular forms using getAllByText
    const summaryElements = screen.getAllByText((content, element) => {
      return element?.textContent === '📊 1 player • 1 total guess';
    });
    expect(summaryElements.length).toBeGreaterThan(0);
  });
});
