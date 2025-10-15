import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HomeScreen } from './HomeScreen';

describe('HomeScreen', () => {
  it('renders game title', () => {
    const mockStartGame = vi.fn();
    render(<HomeScreen onStartGame={mockStartGame} username={null} />);

    expect(screen.getByText('Guessmetry')).toBeInTheDocument();
  });

  it('renders instructions', () => {
    const mockStartGame = vi.fn();
    render(<HomeScreen onStartGame={mockStartGame} username={null} />);

    expect(screen.getByText('How to Play')).toBeInTheDocument();
    expect(
      screen.getByText(/geometric shape descriptions/i)
    ).toBeInTheDocument();
  });

  it('renders Play button', () => {
    const mockStartGame = vi.fn();
    render(<HomeScreen onStartGame={mockStartGame} username={null} />);

    const playButton = screen.getByRole('button', { name: /start playing/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toHaveClass('bg-[#FF4500]');
  });

  it('calls onStartGame when Play button is clicked', () => {
    const mockStartGame = vi.fn();
    render(<HomeScreen onStartGame={mockStartGame} username={null} />);

    const playButton = screen.getByRole('button', { name: /start playing/i });
    fireEvent.click(playButton);

    expect(mockStartGame).toHaveBeenCalledTimes(1);
  });

  it('displays personalized greeting when username is provided', () => {
    const mockStartGame = vi.fn();
    render(<HomeScreen onStartGame={mockStartGame} username="TestUser" />);

    expect(screen.getByText('Welcome, TestUser!')).toBeInTheDocument();
  });

  it('does not display greeting when username is null', () => {
    const mockStartGame = vi.fn();
    render(<HomeScreen onStartGame={mockStartGame} username={null} />);

    expect(screen.queryByText(/Welcome/)).not.toBeInTheDocument();
  });

  it('has mobile-friendly touch targets', () => {
    const mockStartGame = vi.fn();
    render(<HomeScreen onStartGame={mockStartGame} username={null} />);

    const playButton = screen.getByRole('button', { name: /start playing/i });
    expect(playButton).toHaveClass('min-h-[48px]');
  });

  it('applies Reddit-inspired color scheme', () => {
    const mockStartGame = vi.fn();
    render(<HomeScreen onStartGame={mockStartGame} username={null} />);

    const playButton = screen.getByRole('button', { name: /start playing/i });
    expect(playButton).toHaveClass('bg-[#FF4500]');
    expect(playButton).toHaveClass('hover:bg-[#D93900]');
  });
});
