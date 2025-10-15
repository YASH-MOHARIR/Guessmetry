## Guessmetry - Geometric Pictionary

A fast-paced crowd-consensus guessing game built on Reddit's Devvit platform where players decode geometric shape descriptions and earn points by matching what the community thinks.

### What is Guessmetry?

Guessmetry (Geometric Pictionary) is a multiplayer word guessing game that challenges your spatial reasoning and ability to think like the crowd. Instead of seeing drawings, you read descriptions of geometric shapes arranged in specific ways (like "a triangle sitting on top of a square") and race against the clock to guess what object is being described.

The game features **two distinct modes**:

**Classic Mode (Single-Player):**
- Traditional gameplay where you match pre-defined correct answers
- 10 points for exact matches, 5 points for close answers
- Perfect for practicing and learning the prompts

**Consensus Mode (Multiplayer):**
- Revolutionary crowd-sourced gameplay inspired by r/place
- Earn points by matching what other players guess, not a "correct" answer
- Live poll visualization showing real-time voting results
- The community determines what's "correct" - even if it differs from the creator's intent
- 100 points for majority answers (≥50%), scaling down to unique guesses (0 points)

Core Features:
- **25 unique prompts** across multiple categories (everyday objects, animals, Reddit-themed, abstract concepts)
- **Timed gameplay** with three distinct phases per round:
  - 5 seconds to memorize the geometric description
  - 20 seconds to submit your guess
  - 10-15 seconds to see results and your score (15s in Consensus Mode for live updates)
- **Smart scoring system** with string similarity matching (70%+ threshold)
- **Session-based progression** where you never see the same prompt twice until you've played them all
- **Mobile-responsive design** optimized for both desktop and mobile Reddit users with full accessibility support

### What Makes This Game Innovative?

1. **Crowd-Consensus Gameplay**: Inspired by r/place's voting visualization, Consensus Mode transforms the game from matching a single "correct" answer to earning points by thinking like the crowd. If 85% of players say "jellyfish" but the creator intended "house," jellyfish becomes the culturally correct answer.

2. **Live Poll Visualization**: Real-time aggregation displays all player guesses as animated percentage bars, updating every 2 seconds during the results phase. Watch the consensus emerge as more players join, with rankings shifting dynamically.

3. **Emergent Viral Moments**: When the crowd's top answer differs significantly from the creator's intent, the game highlights these "viral moments" - celebrating when the community collectively reinterprets a prompt in unexpected ways.

4. **Reverse Pictionary Concept**: Instead of drawing pictures, the game describes geometric arrangements, flipping the traditional Pictionary format and creating a unique mental visualization challenge.

5. **Intelligent Answer Matching**: The game uses string similarity algorithms (Levenshtein distance) to recognize close answers (like "hous" for "house") and groups similar spellings together, making it forgiving while still challenging.

6. **Reddit-Native Experience**: Built specifically for Reddit using Devvit, the game runs directly in Reddit posts with full integration of Reddit's authentication and community features. No external websites or apps required.

7. **Tiered Consensus Scoring**: Sophisticated scoring system rewards popular answers:
   - 🏆 Majority (≥50%): 100 points
   - 🥈 Common (20-49%): 50 points
   - 🥉 Uncommon (5-19%): 25 points
   - 💎 Rare (1-4%): 10 points
   - ❄️ Unique (<1%): 0 points

8. **Minimalist Design Philosophy**: Clean, mobile-first interface with Reddit's signature orange-and-white color scheme, smooth animations, and accessibility features built in from the ground up (ARIA labels, keyboard navigation, screen reader support).

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
2. If you're logged into Reddit, you'll see a personalized greeting with your username
3. Read the brief instructions explaining the gameplay concept
4. Choose your game mode:
   - **Classic Mode**: Traditional single-player with pre-defined answers
   - **Consensus Mode**: Multiplayer crowd-consensus gameplay (coming soon)
5. Click the orange "Play" button to start a new game session
6. The game will initialize your session and automatically load the first prompt

---

### Classic Mode Gameplay

**Round Flow (repeats for each prompt):**

The game cycles through three phases for each round:

**Phase 1 - Display Phase (5 seconds):**

- A geometric description appears on screen in large, readable text (e.g., "A circle on top of a rectangle")
- Read and memorize the description carefully
- Watch the orange countdown timer showing remaining seconds
- The instruction "Memorize this description!" appears below the prompt
- You cannot guess yet - use this time to visualize what object the shapes might represent
- The timer automatically transitions you to the guess phase when it reaches zero

**Phase 2 - Guess Phase (20 seconds):**

- The prompt disappears and an input field appears with automatic keyboard focus
- The question "What is being described?" appears above the input
- Type your answer for what object the geometric description represents
- Press Enter or click the "Submit Guess" button to lock in your answer
- The blue countdown timer shows how much time you have left
- A character counter displays your input length (max 100 characters)
- If time runs out, your current guess (or empty answer) is automatically submitted
- Once submitted, the input and button are disabled and show "Submitted!"

**Phase 3 - Results Phase (10 seconds):**

- The correct answer is revealed prominently with "The answer was:" label
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

**Classic Mode Scoring:**

- **Correct answer**: +10 points (exact match or any alternative answer)
- **Close answer**: +5 points (70%+ similarity using Levenshtein distance algorithm)
- **Incorrect answer**: 0 points

---

### Consensus Mode Gameplay (In Development)

**How It Works:**

Instead of matching a pre-defined answer, you earn points by guessing what other players guess. The crowd determines what's "correct"!

**Round Flow:**

**Phase 1 - Display Phase (5 seconds):** Same as Classic Mode

**Phase 2 - Guess Phase (20 seconds):** Same as Classic Mode
- Your guess is submitted to the crowd aggregation system
- All players viewing the same prompt contribute to the same pool

**Phase 3 - Results Phase (15 seconds with live updates):**

- **Live Poll Visualization**: See all player guesses displayed as animated percentage bars
- **Top 10 Guesses**: Ranked by popularity with real-time vote counts
- **Your Guess Highlighted**: Orange border marks your answer in the list
- **Creator's Answer Marked**: Gold star (⭐) shows what the prompt creator intended
- **Live Updates**: Poll refreshes every 2 seconds as more players submit guesses
- **Consensus Score Display**: Shows your tier badge and match percentage
  - 🏆 **MAJORITY ANSWER** (≥50%): +100 points - "You matched 85% of players!"
  - 🥈 **COMMON ANSWER** (20-49%): +50 points
  - 🥉 **UNCOMMON ANSWER** (5-19%): +25 points
  - 💎 **RARE ANSWER** (1-4%): +10 points
  - ❄️ **UNIQUE ANSWER** (<1%): 0 points
- **Total Players**: Bottom summary shows unique player count and total guesses
- **Viral Moments**: Special badge when crowd consensus differs from creator's intent

**Consensus Mode Features:**

- **Guess Aggregation**: All guesses are normalized (lowercase, trimmed) and grouped
- **Similar Spelling Grouping**: Variants like "jelly fish" and "jellyfish" are combined
- **Close Match Bonus**: 70%+ similarity to a popular answer earns 5 points
- **Historical Results**: View final poll results for 24 hours after the round ends
- **Community Dynamics**: Watch consensus emerge in real-time as rankings shift

**Example Scenario:**

Prompt: "A circle with wavy lines around it"
- Creator's answer: "sun"
- Top community guess: "jellyfish" (85% of players)
- Your guess: "jellyfish"
- **Result**: You earn 100 points for matching the majority, even though the creator said "sun"!
- The game celebrates this as a "Viral Moment" where the crowd reinterpreted the prompt

---

### General Tips for Success

**Strategy Tips:**

- **Visualize**: Picture the shapes in your mind during the display phase
- **Think common**: Start with everyday objects that match the description
- **Trust your instincts**: First thoughts are often correct
- **Watch for themes**: Some prompts are Reddit-themed (like "upvote" or "snoo")
- **Spelling flexibility**: Alternative spellings are accepted (e.g., "ice cream" vs "icecream")
- **Close counts**: Even if you misspell slightly, you might get 5 points for a close match
- **Act fast**: You can submit early if you're confident - no need to wait for the timer

**Consensus Mode Strategy:**

- **Think like the crowd**: What would most people guess first?
- **Avoid overthinking**: The most obvious answer is often the most popular
- **Learn from results**: Watch which answers become popular to calibrate your thinking
- **Creative answers**: Unique guesses won't score points, but they're fun to see in the poll!

**Persistent UI Elements:**

- **Leaderboard** (fixed at top-right corner): Shows your current stats throughout the game
  - Rank: Your position (always #1 in Classic Mode single-player)
  - Score: Your total points with animated updates
  - Rounds: Number of rounds completed
- The leaderboard stays visible throughout all phases and updates in real-time

**Accessibility Features:**

- Keyboard navigation supported (Tab to navigate, Enter to submit)
- Screen reader announcements for phase changes and score updates
- Reduced motion support for users with motion sensitivity preferences
- High contrast colors meeting WCAG AA standards
- Touch targets at least 44x44px on mobile devices
- ARIA labels for all interactive elements

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

**Phase 1 - Classic Mode (Complete) ✅**

- ✅ Backend API endpoints (init, game start, prompt fetching, guess submission)
- ✅ Game state management hooks (useGame with useReducer, useTimer)
- ✅ 25 geometric prompts with categories and difficulty levels
- ✅ String similarity algorithm for close match detection (Levenshtein distance)
- ✅ Redis session management with 1-hour TTL
- ✅ Comprehensive test coverage for utilities and hooks
- ✅ Timer component with visual countdown and urgency states
- ✅ PromptDisplay component with fade-in animations
- ✅ GuessInput component with keyboard support and auto-focus
- ✅ ResultsDisplay component with bounce-in and score count-up animations
- ✅ Leaderboard component with real-time score updates
- ✅ HomeScreen component with game instructions
- ✅ GameScreen component with phase orchestration
- ✅ App.tsx integration with error handling and loading states
- ✅ Mobile-responsive styling with Tailwind CSS
- ✅ Accessibility features (ARIA labels, keyboard navigation, screen reader support)
- ✅ Animation system (fade, bounce, pulse, slide, count-up)
- ✅ Reduced motion support for accessibility

**Phase 2 - Consensus Mode (In Progress) 🚧**

**Completed:**
- ✅ Shared types for consensus voting (GuessAggregation, ConsensusScore, ConsensusScoreTier)
- ✅ Guess normalization utility (lowercase, trim whitespace)
- ✅ Redis aggregation service (storeGuess, addPlayerToSet, storePlayerGuess, getAggregatedGuesses, getTotalPlayers)
- ✅ Consensus scoring algorithm with tier calculation (majority, common, uncommon, rare, unique)
- ✅ String similarity grouping for close matches (≥70% threshold)
- ✅ POST /api/consensus/submit-guess endpoint with retry logic
- ✅ POST /api/consensus/get-results endpoint with aggregation and scoring
- ✅ GuessAggregationBar component with animated percentage bars
- ✅ PollResultsDisplay component with top 10 display and error handling
- ✅ Comprehensive test coverage for all consensus utilities and components

**In Progress:**
- ⏳ useConsensusPolling hook for live updates (every 2 seconds)
- ⏳ ConsensusScoreDisplay component with tier badges and animations
- ⏳ Mode selection UI on HomeScreen (Classic vs Consensus)
- ⏳ GameScreen integration for consensus mode switching
- ⏳ Real-time polling integration with animated rank changes
- ⏳ Creator's answer fallback display when not in top 10
- ⏳ Viral moment detection and highlighting
- ⏳ Historical results viewing capability

**Ready for Testing:**

- 🧪 End-to-end Classic Mode gameplay testing
- 🧪 Mobile device testing (iOS/Android)
- 🧪 Edge case validation (network errors, prompt exhaustion)
- 🧪 Cross-browser compatibility testing

**Next Steps:**

- ⏳ Complete Consensus Mode UI integration
- ⏳ Implement real-time polling and live updates
- ⏳ Add mode selection and switching
- ⏳ Final polish and bug fixes based on testing
- ⏳ Deployment to Reddit for review

### Contributing

This game is in active development. Phase 1 focuses on single-player gameplay. Future phases will add multiplayer support, user-generated prompts, and community features.

### Cursor Integration

This project includes pre-configured Cursor IDE integration. [Download Cursor](https://www.cursor.com/downloads) and enable the `devvit-mcp` when prompted for enhanced development experience.
