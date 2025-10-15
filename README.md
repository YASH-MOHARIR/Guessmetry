## Guessmetry - Geometric Pictionary

A fast-paced guessing game built on Reddit's Devvit platform where players decode geometric shape descriptions to guess everyday objects.

### What is Guessmetry?

Guessmetry (Geometric Pictionary) is a single-player word guessing game that challenges your spatial reasoning and creativity. Instead of seeing drawings, you read descriptions of geometric shapes arranged in specific ways (like "a triangle sitting on top of a square") and race against the clock to guess what object is being described (answer: "house").

The game features:
- **25 unique prompts** across multiple categories (everyday objects, animals, Reddit-themed, abstract concepts)
- **Timed gameplay** with three distinct phases per round:
  - 5 seconds to memorize the geometric description
  - 20 seconds to submit your guess
  - 10 seconds to see results and your score
- **Smart scoring system** that awards:
  - 10 points for exact matches
  - 5 points for close answers (70%+ similarity using Levenshtein distance)
  - 0 points for incorrect guesses
- **Session-based progression** where you never see the same prompt twice until you've played them all
- **Mobile-responsive design** optimized for both desktop and mobile Reddit users

### What Makes This Game Innovative?

1. **Reverse Pictionary Concept**: Instead of drawing pictures, the game describes geometric arrangements, flipping the traditional Pictionary format and creating a unique mental visualization challenge.

2. **Intelligent Answer Matching**: The game uses string similarity algorithms (Levenshtein distance) to recognize close answers (like "hous" for "house"), making it forgiving while still challenging. Alternative spellings and variations are automatically accepted.

3. **Reddit-Native Experience**: Built specifically for Reddit using Devvit, the game runs directly in Reddit posts with full integration of Reddit's authentication and community features. No external websites or apps required.

4. **Minimalist Design Philosophy**: Clean, mobile-first interface with Reddit's signature orange-and-white color scheme, smooth animations, and accessibility features built in from the ground up.

5. **Progressive Difficulty**: Prompts range from easy everyday objects (house, tree) to harder abstract concepts (infinity, diamond), with the game tracking which prompts you've seen to ensure variety and prevent repetition within a session.

### How to Play

#### Setup for Developers
1. Make sure you have Node.js 22+ installed on your machine
2. Clone this repository and run `npm install`
3. Run `npm run dev` to start the development server
4. Open the playtest URL provided in your terminal (e.g., `https://www.reddit.com/r/your-app_dev?playtest=your-app`)
5. Click "Launch App" in the Reddit post to start playing

#### Gameplay Instructions

**Starting the Game:**
1. When you open the app in a Reddit post, you'll see the home screen with the game title "Guessmetry"
2. Read the brief instructions explaining the gameplay concept
3. Click the orange "Play" button to start a new game session
4. The game will initialize your session and load the first prompt

**Round Flow (repeats for each prompt):**

**Phase 1 - Display Phase (5 seconds):**
- A geometric description appears on screen in a white card (e.g., "A circle on top of a rectangle")
- Read and memorize the description carefully
- Watch the orange countdown timer at the top showing remaining seconds
- The instruction "Memorize this description!" appears below the card
- You cannot guess yet - use this time to visualize what object the shapes might represent
- The timer will automatically transition you to the guess phase when it reaches zero

**Phase 2 - Guess Phase (20 seconds):**
- The prompt disappears and an input field appears with automatic focus
- The question "What is being described?" appears above the input
- Type your answer for what object the geometric description represents
- Press Enter or click the "Submit Guess" button to lock in your answer
- The blue countdown timer shows how much time you have left
- A character counter shows your input length (max 100 characters)
- If time runs out, your current guess (or empty answer) is automatically submitted
- Once submitted, the input and button are disabled

**Phase 3 - Results Phase (10 seconds):**
- See the correct answer revealed prominently with "The answer was:" label
- Your guess is displayed below with "You guessed:" label (if you submitted one)
- Result indicator at the top shows if you were:
  - **Correct!** (green background) - Exact match or alternative answer
  - **Close!** (yellow background) - 70%+ similarity to the correct answer
  - **Incorrect** (red background) - Too different from the correct answer
- Points earned this round are displayed with color coding:
  - +10 points (green) for correct answers
  - +5 points (yellow) for close matches
  - +0 points (gray) for incorrect answers
- Watch your total score count up with a smooth animation
- The green countdown timer shows time until the next round
- A message "Next round starting soon..." appears at the bottom
- The next round automatically begins when the timer reaches zero

**Persistent UI Elements:**
- **Leaderboard** (fixed at top-right corner): Shows your current stats
  - Rank: #1 (always 1 in single-player Phase 1)
  - Score: Your total points with animated updates
  - Rounds: Number of rounds completed
- The leaderboard stays visible throughout all phases and updates in real-time

**Scoring System:**
- **Correct answer**: +10 points (exact match or any alternative answer)
- **Close answer**: +5 points (70%+ similarity using Levenshtein distance algorithm)
- **Incorrect answer**: 0 points

**Tips for Success:**
- **Visualize**: Picture the shapes in your mind during the display phase
- **Think common**: Start with everyday objects that match the description
- **Trust your instincts**: First thoughts are often correct
- **Watch for themes**: Some prompts are Reddit-themed (like "upvote" or "snoo")
- **Spelling flexibility**: Alternative spellings are accepted (e.g., "ice cream" vs "icecream")
- **Close counts**: Even if you misspell slightly, you might get 5 points for a close match
- **Act fast**: You can submit early if you're confident - no need to wait for the timer

**Session End:**
- After playing through all 25 prompts, your session is complete
- Your final score is displayed
- Start a new session to play again with reshuffled prompts
- Each session tracks which prompts you've seen to prevent duplicates within that session

### Technology Stack

- [Devvit](https://developers.reddit.com/): Reddit's developer platform for building immersive games
- [React](https://react.dev/): UI framework with hooks for state management
- [Vite](https://vite.dev/): Fast build tool and development server
- [Express](https://expressjs.com/): Backend API server
- [Redis](https://redis.io/): Session storage and game state persistence
- [Tailwind CSS](https://tailwindcss.com/): Utility-first styling
- [TypeScript](https://www.typescriptlang.org/): Type-safe development

### Development Commands

- `npm run dev`: Start development server with live reload on Reddit
- `npm run build`: Build client and server for production
- `npm run deploy`: Upload new version to Reddit
- `npm run launch`: Publish app for Reddit review
- `npm run check`: Run type checking, linting, and formatting
- `npm test`: Run test suite with Vitest

### Project Structure

```
src/
├── client/          # React frontend
│   ├── components/  # UI components (to be implemented)
│   ├── hooks/       # Custom React hooks (useGame, useTimer)
│   └── App.tsx      # Main application component
├── server/          # Express backend
│   ├── data/        # Game prompts database
│   ├── utils/       # Helper functions (scoring, prompt selection)
│   └── index.ts     # API endpoints
└── shared/          # Shared TypeScript types
    └── types/       # API and game state types
```

### Current Development Status

**Phase 1 - Core Gameplay (In Progress)**

**Completed:**
- ✅ Backend API endpoints (init, game start, prompt fetching, guess submission)
- ✅ Game state management hooks (useGame with useReducer, useTimer)
- ✅ 25 geometric prompts with categories and difficulty levels
- ✅ String similarity algorithm for close match detection (Levenshtein distance)
- ✅ Redis session management with 1-hour TTL
- ✅ Comprehensive test coverage for utilities and hooks
- ✅ Timer component with visual countdown and urgency states
- ✅ PromptDisplay component with animations
- ✅ GuessInput component with keyboard support
- ✅ ResultsDisplay component with score animations
- ✅ Leaderboard component with real-time updates
- ✅ Mobile-responsive styling with Tailwind CSS

**In Progress:**
- 🚧 HomeScreen component (landing page with instructions)
- 🚧 GameScreen component (phase orchestration)
- 🚧 App.tsx integration (replace counter demo with game)
- 🚧 Error boundary and loading states
- 🚧 Accessibility features (ARIA labels, keyboard navigation)
- 🚧 Animation polish (prefers-reduced-motion support)

**Next Steps:**
- ⏳ End-to-end testing
- ⏳ Mobile device testing
- ⏳ Edge case handling (network errors, prompt exhaustion)
- ⏳ Final polish and deployment

### Contributing

This game is in active development. Phase 1 focuses on single-player gameplay. Future phases will add multiplayer support, user-generated prompts, and community features.

### Cursor Integration

This project includes pre-configured Cursor IDE integration. [Download Cursor](https://www.cursor.com/downloads) and enable the `devvit-mcp` when prompted for enhanced development experience.
