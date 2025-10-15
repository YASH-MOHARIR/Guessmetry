## Geometric Pictionary

A fast-paced guessing game built on Reddit's Devvit platform where players decode geometric shape descriptions to guess everyday objects.

### What is Geometric Pictionary?

Geometric Pictionary is a single-player word guessing game that challenges your spatial reasoning and creativity. Instead of seeing drawings, you read descriptions of geometric shapes arranged in specific ways (like "a triangle sitting on top of a square") and race against the clock to guess what object is being described (answer: "house").

The game features:
- **25+ unique prompts** across multiple categories (everyday objects, animals, Reddit-themed, abstract concepts)
- **Timed gameplay** with three distinct phases per round:
  - 5 seconds to memorize the geometric description
  - 20 seconds to submit your guess
  - 10 seconds to see results and your score
- **Smart scoring system** that awards:
  - 10 points for exact matches
  - 5 points for close answers (70%+ similarity using Levenshtein distance)
  - 0 points for incorrect guesses
- **Session-based progression** where you never see the same prompt twice until you've played them all

### What Makes This Game Innovative?

1. **Reverse Pictionary Concept**: Instead of drawing pictures, the game describes geometric arrangements, flipping the traditional Pictionary format and creating a unique mental visualization challenge.

2. **Intelligent Answer Matching**: The game uses string similarity algorithms to recognize close answers (like "hous" for "house" or "bike" for "bicycle"), making it forgiving while still challenging.

3. **Reddit-Native Experience**: Built specifically for Reddit using Devvit, the game runs directly in Reddit posts with full integration of Reddit's authentication and community features.

4. **Minimalist Design Philosophy**: Clean, mobile-first interface with Reddit's signature orange-and-white color scheme, smooth animations, and accessibility features built in from the ground up.

5. **Progressive Difficulty**: Prompts range from easy everyday objects to harder abstract concepts, with the game tracking which prompts you've seen to ensure variety.

### How to Play

#### Setup
1. Make sure you have Node.js 22+ installed on your machine
2. Clone this repository and run `npm install`
3. Run `npm run dev` to start the development server
4. Open the playtest URL provided in your browser (e.g., `https://www.reddit.com/r/your-app_dev?playtest=your-app`)

#### Gameplay Instructions

**Starting the Game:**
1. Click the "Play" button on the home screen
2. The game will initialize your session and load the first prompt

**Round Flow (repeats for each prompt):**

**Phase 1 - Display (5 seconds):**
- Read and memorize the geometric description shown on screen
- Example: "A circle on top of a rectangle"
- Watch the countdown timer - you can't guess yet!

**Phase 2 - Guess (20 seconds):**
- Type your answer in the input field
- Press Enter or click Submit to lock in your guess
- The timer is ticking - think fast!
- If time runs out, your current guess (or empty answer) is automatically submitted

**Phase 3 - Results (10 seconds):**
- See the correct answer revealed
- Find out if you were correct (green), close (yellow), or incorrect (red)
- Watch your score update with points earned
- The next round automatically begins after 10 seconds

**Scoring:**
- **Correct answer**: +10 points (exact match or alternative answer)
- **Close answer**: +5 points (70%+ similarity to correct answer)
- **Incorrect answer**: 0 points

**Tips for Success:**
- Visualize the shapes in your mind during the display phase
- Think of common objects that match the geometric description
- Don't overthink it - first instincts are often correct
- Watch for Reddit-themed prompts (like "upvote" or "snoo")
- Alternative spellings and variations are accepted (e.g., "ice cream" vs "icecream")

**Session End:**
- After playing through all available prompts, your final score is displayed
- Start a new session to play again with reshuffled prompts

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

**Completed:**
- ✅ Backend API endpoints (game start, prompt fetching, guess submission)
- ✅ Game state management hooks (useGame, useTimer)
- ✅ 25 geometric prompts with categories and difficulty levels
- ✅ String similarity algorithm for close match detection
- ✅ Redis session management with TTL
- ✅ Comprehensive test coverage for utilities

**In Progress:**
- 🚧 UI components (HomeScreen, GameScreen, PromptDisplay, GuessInput, ResultsDisplay)
- 🚧 Timer component with visual countdown
- 🚧 Animations and transitions
- 🚧 Mobile responsive design

### Contributing

This game is in active development. Phase 1 focuses on single-player gameplay. Future phases will add multiplayer support, user-generated prompts, and community features.

### Cursor Integration

This project includes pre-configured Cursor IDE integration. [Download Cursor](https://www.cursor.com/downloads) and enable the `devvit-mcp` when prompted for enhanced development experience.
