# Guessmetry - Geometric Pictionary

A fast-paced guessing game built on Reddit's Devvit platform where players decode geometric shape descriptions and race against the clock to identify everyday objects. Choose between Classic Mode (match the correct answer) or Consensus Mode (match what the crowd guesses).

**Play it on Reddit**: Find a Guessmetry post and click "Launch App" to start playing instantly!

## 🎮 What is Guessmetry?

Guessmetry is a unique word guessing game that flips traditional Pictionary on its head. Instead of seeing drawings, you read descriptions of geometric shapes arranged in specific ways (like "a triangle sitting on top of a square") and race against the clock to guess what object is being described. It's a mental visualization challenge that tests your spatial reasoning and creative thinking.

The game runs directly inside Reddit posts as a native Devvit app, providing a seamless experience without leaving the platform. Built with React and powered by Devvit's serverless infrastructure, it combines fast-paced gameplay with Reddit's community features.

## 🚀 Quick Start

**🆕 What's New:**
- **Mode Selection**: Choose between Classic Mode and Consensus Mode from the home screen
- **Dual Gameplay Styles**: Experience traditional answer-matching or revolutionary crowd-consensus gameplay
- **Live Consensus Polling**: Real-time updates showing how other players are guessing
- **Seamless Mode Switching**: Start a new session in either mode with a single click

**🎯 Quick Summary:**
- Read geometric descriptions like "a triangle sitting on top of a square"
- Visualize the shapes in your mind and guess what object they form
- Choose your gameplay style: Classic Mode or Consensus Mode
- Race against the clock in three timed phases: Display (5s) → Guess (20s) → Results (10-15s)
- **Classic Mode**: Earn points for correct answers (10pts) and close matches (5pts) using smart string similarity
- **Consensus Mode**: Earn points by matching what other players guess - the crowd determines what's "correct"!
- Play through 25 unique prompts without repeats in each session
- Built natively for Reddit - runs directly in posts with no external apps or logins required

## 💡 What Makes Guessmetry Innovative?

Guessmetry stands out from traditional guessing games with several unique innovations:

### 1. **Reverse Pictionary Concept**
Instead of drawing pictures, the game describes geometric arrangements, flipping the traditional Pictionary format. You must imagine the shapes and deduce what object they form - turning abstract descriptions into concrete objects in your mind. For example, "a triangle sitting on top of a square" becomes "house" in your imagination. This creates a unique mental visualization challenge that's different from any other game on Reddit.

### 2. **Dual Gameplay Modes**
Guessmetry offers two distinct ways to play, each with its own strategic depth:

- **Classic Mode**: Test your spatial reasoning against pre-defined answers with intelligent fuzzy matching. Perfect for solo play and quick sessions.
- **Consensus Mode**: Think like the crowd and earn points by matching popular opinion rather than a single "correct" answer. The community determines what's right - even if it differs from the creator's intent!

Seamlessly switch between modes from the home screen to experience both gameplay styles.

### 3. **Intelligent Answer Matching**
The game uses advanced string similarity algorithms (Levenshtein distance) to recognize close answers (like "hous" for "house" or "bycicle" for "bicycle"), making it forgiving while still challenging. You get partial credit (5 points) for being close with a 70%+ similarity threshold! The algorithm calculates the minimum number of single-character edits needed to transform one string into another, then converts this to a percentage similarity score.

### 4. **Reddit-Native Experience**
Built specifically for Reddit using Devvit Web, the game runs directly in Reddit posts with full integration of Reddit's authentication and community features. No external websites, apps, or logins required - just click "Launch App" in the post and start playing right in your feed. Your Reddit username is automatically recognized and displayed throughout the game.

### 5. **Live Crowd-Consensus Innovation** (Consensus Mode)
Inspired by r/place's voting visualization, Consensus Mode transforms the game from matching a single "correct" answer to earning points by thinking like the crowd. If 85% of players say "jellyfish" but the creator intended "house," jellyfish becomes the culturally correct answer. Features include:

- **Live poll visualization** with animated percentage bars showing each guess's popularity
- **Real-time updates** every 2 seconds as more players join the session
- **Tiered scoring system** rewarding popular thinking (Majority: 100pts, Common: 50pts, Uncommon: 25pts, Rare: 10pts, Unique: 0pts)
- **Viral moment detection** when crowd consensus differs significantly from creator's intent
- **Creator's answer marked** with gold star (⭐) even if unpopular, showing what was intended vs. what the crowd chose

### 6. **Three-Phase Gameplay Loop**
Each round follows a carefully timed sequence that creates a perfect rhythm:
- **Display Phase** (5s): Read and memorize the geometric description
- **Guess Phase** (20s): Type your answer before time runs out
- **Results Phase** (10-15s): See if you were right and watch your score update

This creates a fast-paced rhythm that keeps you engaged without feeling rushed, perfect for quick Reddit browsing sessions.

### 7. **Session-Based Prompt Management**
The game tracks which prompts you've seen using Redis sorted sets, ensuring you never encounter the same prompt twice in a session. Once you've played all 25 prompts, the session completes gracefully. Each session is isolated with a unique ID, and session data expires after 1 hour to prevent memory bloat.

### 8. **Mobile-First Design**
Clean, responsive interface optimized for both desktop and mobile Reddit users with Reddit's signature orange (#FF4500) color scheme, smooth CSS animations, and comprehensive accessibility features built in from the ground up (ARIA labels, keyboard navigation, reduced motion support, high contrast colors).

## ✨ Core Features

### Game Content
- **25 unique prompts** across multiple categories:
  - Everyday objects (house, tree, car, ice cream, etc.)
  - Animals (cat, turtle, fish)
  - Reddit-themed (upvote, snoo/Reddit alien)
  - Abstract concepts (infinity, diamond)

### Classic Mode Features
- Traditional gameplay where you match pre-defined correct answers
- 10 points for exact matches, 5 points for close answers using intelligent string similarity (Levenshtein distance algorithm)
- Perfect for quick 3-5 minute gameplay sessions
- Smart scoring with alternative answer support (e.g., "home" for "house", "bike" for "bicycle")

### Consensus Mode Features (In Active Development)
- Revolutionary crowd-sourced gameplay inspired by r/place's voting visualization
- Earn points by matching what other players guess, not a "correct" answer
- Live poll visualization with animated percentage bars showing real-time voting results
- Tiered scoring: 100 points for majority answers (≥50%), 50 for common (20-49%), 25 for uncommon (5-19%), 10 for rare (1-4%), 0 for unique (<1%)
- Real-time updates every 2 seconds as more players join the session
- Viral moment detection when crowd consensus differs from creator's intent
- Creator's answer marked with gold star (⭐) even if unpopular
- **Status**: Core components built, backend aggregation complete, frontend integration in progress

### Technical Features
- **Session-based progression** using Redis sorted sets:
  - Never see the same prompt twice in a session
  - Unique session IDs with 1-hour TTL
  - Automatic prompt reshuffling when all 25 are exhausted
- **Mobile-responsive design** optimized for both desktop and mobile:
  - Single-column layout on mobile (<768px)
  - Touch targets at least 44x44px
  - Prevents iOS zoom with 16px minimum font size
- **Full accessibility support**:
  - ARIA labels and live regions for screen readers
  - Keyboard navigation (Tab, Enter)
  - Focus indicators with 2px orange outline
  - Reduced motion support
  - High contrast colors (4.5:1 minimum)

## 📖 How to Play

### For Players

#### Step 1: Launch the Game

1. Find a Guessmetry post on Reddit
2. Click the **"Launch App"** button in the post
3. The game opens in full-screen mode within Reddit
4. You'll see the home screen with:
   - The game title "Guessmetry" in large, bold orange text
   - A personalized greeting with your Reddit username (e.g., "Welcome, u/username!")
   - Brief instructions explaining the gameplay concept
   - Two mode selection buttons

#### Step 2: Choose Your Game Mode

**Classic Mode** (Orange Button)
- Traditional gameplay where you match pre-defined correct answers
- Earn 10 points for exact matches, 5 points for close answers
- Perfect for solo play and testing your spatial reasoning skills
- Best for: Quick sessions, learning the game, competing against yourself

**Consensus Mode** (Blue Button)
- Revolutionary crowd-sourced gameplay where you match what other players guess
- Earn points based on how popular your answer is (100pts for majority, down to 0pts for unique)
- The community determines what's "correct" - even if it differs from the creator's intent
- Best for: Social play, seeing how you think compared to the crowd, viral moments

Click your preferred mode button to start a new game session.

#### Step 3: Play Through Each Round

Each round has three timed phases:

**Phase 1: Display Phase (5 seconds)**
- A geometric description appears on screen (e.g., "A circle on top of a rectangle")
- Read and memorize the description carefully
- Visualize the shapes in your mind - imagine how they connect
- Watch the countdown timer at the top
- You cannot guess yet - use this time to think!

**Phase 2: Guess Phase (20 seconds)**
- The prompt disappears and an input field appears
- Type your answer for what object the geometric description represents
- Press **Enter** or click **"Submit Guess"** to lock in your answer
- Watch the countdown timer - it turns red when time is running low (last 5 seconds)
- If time runs out, your current guess (or empty answer) is automatically submitted

**Phase 3: Results Phase (10-15 seconds)**

**In Classic Mode:**
- See if you were **Correct** (green), **Close** (yellow), or **Incorrect** (red)
- The correct answer is revealed
- Your guess is displayed
- Points earned this round are shown (+10, +5, or 0)
- Your total score updates with a smooth animation
- Next round starts automatically when timer reaches zero

**In Consensus Mode:**
- See a live poll showing all player guesses as animated percentage bars
- Top 10 most popular guesses are displayed, ranked by popularity
- Your guess is highlighted with an orange border
- Creator's intended answer is marked with a gold star (⭐)
- Watch the poll update in real-time every 2 seconds as more players join
- See your consensus score and tier badge:
  - 🏆 **MAJORITY** (≥50%): +100 points
  - 🥈 **COMMON** (20-49%): +50 points
  - 🥉 **UNCOMMON** (5-19%): +25 points
  - 💎 **RARE** (1-4%): +10 points
  - ❄️ **UNIQUE** (<1%): 0 points
- Total players and total guesses shown at bottom
- Next round starts automatically after 15 seconds

#### Step 4: Complete Your Session

- Play through all 25 unique prompts (no repeats in a session)
- Your score accumulates across all rounds
- Track your progress in the leaderboard (top-right corner)
- After completing all prompts, your final score is displayed
- Click **"Play Again"** to start a new session with reshuffled prompts

### For Developers

#### Setup and Development

1. **Prerequisites**: Make sure you have Node.js 22.2.0 or higher installed
2. **Installation**: Clone this repository and run `npm install`
3. **Development**: Run `npm run dev` to start the development server
4. **Testing**: Open the playtest URL provided in your terminal
5. **Building**: Run `npm run build` to create production builds
6. **Deployment**: Run `npm run deploy` to upload to Reddit, then `npm run launch` to publish

---

### Classic Mode Gameplay

**Round Flow (repeats for each prompt):**

The game cycles through three phases for each round:

**Phase 1 - Display Phase (5 seconds):**

- A geometric description appears on screen in large, readable text (e.g., "A circle on top of a rectangle")
- The prompt text is displayed prominently in the center (2rem/32px font size) with a smooth fade-in animation (300ms)
- Read and memorize the description carefully - visualize the shapes in your mind
- Watch the orange countdown timer at the top showing remaining seconds with a horizontal progress bar
- The instruction "Memorize this description!" appears below the prompt in gray text
- You cannot guess yet - use this time to imagine what object the shapes might represent
- The timer automatically transitions you to the guess phase when it reaches zero
- The prompt fades out smoothly as the phase ends (300ms fade-out transition)
- The component uses the PromptDisplay component which handles the display logic and animations

**Phase 2 - Guess Phase (20 seconds):**

- The prompt disappears and an input field appears with automatic keyboard focus (using autoFocus prop)
- The question "What is being described?" appears above the input in large text (1.5rem/24px)
- Type your answer for what object the geometric description represents
- The input field has a white background with a 2px gray border (#E5E7EB) that turns orange (#FF4500) on focus
- Press Enter or click the orange "Submit Guess" button to lock in your answer
  - The button has hover effects (darker orange #D93900, scale 1.02) and active states (scale 0.98)
  - Minimum height of 48px for easy tapping on mobile devices
- The blue countdown timer at the top shows how much time you have left with a horizontal progress bar
- When time is running low (last 5 seconds), the timer pulses (scale 1.0 → 1.05) and turns red (#EA0027) to create urgency
- If time runs out, your current guess (or empty answer if you didn't type anything) is automatically submitted
- Once submitted, the input and button are disabled and the button text changes to "Submitted!" with a checkmark (✓)
  - The button turns gray and has reduced opacity (0.5) when disabled
- The guess is sent to the server via POST /api/game/submit-guess for validation and scoring
- The component uses the GuessInput component which handles input state, submission, and timer integration

**Phase 3 - Results Phase (10 seconds):**

- The results screen appears with a bounce-in animation for visual impact (animate-bounce-in class)
- **Result indicator** at the top shows if you were:
  - **"Correct!"** (green background #46D160 with ✓) - Exact match or alternative answer accepted
  - **"Close!"** (yellow background #FFB000 with ~) - 70%+ similarity to the correct answer using Levenshtein distance
  - **"Incorrect"** (red background #EA0027 with ✗) - Too different from the correct answer
- **The correct answer** is revealed prominently with "The answer was:" label in large text (1.5rem/24px)
  - Displayed in a white card with rounded corners (12px) and subtle shadow
- **Your guess** is displayed below with "You guessed:" label (if you submitted one, otherwise shows "No answer submitted")
  - Shows in gray text to differentiate from the correct answer
- **Points earned** this round are displayed with color coding and smooth fade-in animation:
  - **+10 points** (green text #46D160) for correct answers
  - **+5 points** (yellow text #FFB000) for close matches
  - **+0 points** (gray text #878A8C) for incorrect answers
- **Total score** updates with a smooth count-up animation from previous score to new score (200ms duration)
  - The animation uses a custom count-up effect that increments the displayed number
- The green countdown timer at the top shows time until the next round with a horizontal progress bar
- A message "Next round starting soon..." appears at the bottom in gray text
- The next round automatically begins when the timer reaches zero, loading a new prompt via POST /api/game/next-prompt
- The leaderboard in the top-right corner updates in real-time to reflect your new score with animated transitions
- The component uses the ResultsDisplay component which handles result presentation and animations

**Classic Mode Scoring:**

- **Correct answer**: +10 points
  - Exact match (case-insensitive, whitespace-trimmed)
  - Any alternative answer (e.g., "home" for "house", "bike" for "bicycle")
- **Close answer**: +5 points
  - 70%+ similarity using Levenshtein distance algorithm
  - Examples: "hous" for "house" (80% similar), "bycicle" for "bicycle" (85% similar)
- **Incorrect answer**: 0 points
  - Less than 70% similarity
  - Empty submission (timeout without typing)

**Scoring Algorithm Details:**
- All guesses are normalized (lowercase, trimmed) before comparison
- Levenshtein distance calculates minimum single-character edits needed
- Similarity percentage = (maxLength - distance) / maxLength × 100
- Alternative answers are checked first before similarity calculation

---

### Consensus Mode Gameplay (In Active Development)

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

## 💡 Tips for Success

### Classic Mode Strategy

1. **Visualize carefully**: Picture the shapes in your mind during the 5-second display phase - imagine how they connect
2. **Think common first**: Start with everyday objects that match the description (house, tree, car, etc.)
3. **Trust your instincts**: First thoughts are often correct - don't overthink it
4. **Watch for themes**: Some prompts are Reddit-themed (like "upvote" or "snoo" for the Reddit alien)
5. **Spelling flexibility**: Alternative spellings are accepted (e.g., "ice cream" vs "icecream", "bow tie" vs "bowtie")
6. **Close counts**: Even if you misspell slightly, you might get 5 points for a close match (70%+ similarity)
7. **Act fast**: You can submit early if you're confident - no need to wait for the timer
8. **Learn from mistakes**: Pay attention to correct answers to improve your spatial reasoning

### Consensus Mode Strategy

1. **Think like the crowd**: What would most people guess first? The obvious answer is often the most popular
2. **Avoid overthinking**: Complex or creative answers might be unique (0 points) - simple is better
3. **Learn from results**: Watch which answers become popular to calibrate your thinking for future rounds
4. **First impressions matter**: What's the first thing that comes to mind? That's probably what others will guess too
5. **Creative answers are fun**: Unique guesses won't score points, but they're entertaining to see in the poll!
6. **Watch the live updates**: See how consensus emerges in real-time as more players join

### General Tips

- **Keyboard shortcuts**: Press Enter to submit your guess quickly
- **Mobile-friendly**: The game works great on phones - perfect for playing on the go
- **Accessibility**: Full keyboard navigation and screen reader support available
- **Session tracking**: Your score persists across all 25 prompts in a session
- **No repeats**: You'll never see the same prompt twice in a single session

**Persistent UI Elements:**

- **Leaderboard** (fixed at top-right corner on desktop, top on mobile): Shows your current stats throughout the game
  - **Rank**: Your position (always #1 in Classic Mode single-player, shown with 🏆 trophy icon)
  - **Score**: Your total points with animated count-up updates (200ms duration)
  - **Rounds**: Number of rounds completed out of 25 total (e.g., "Round 3/25")
- The leaderboard stays visible throughout all phases and updates in real-time
- On mobile devices (<768px), the leaderboard appears at the top in a compact format with reduced padding
- The leaderboard has a white background with subtle shadow (0 2px 8px rgba(0,0,0,0.1)) for visibility
- The component uses the Leaderboard component which handles score display and animations
- Score updates trigger a smooth transition effect to draw attention to the change

**Accessibility Features:**

- Keyboard navigation supported (Tab to navigate, Enter to submit)
- Screen reader announcements for phase changes and score updates
- Reduced motion support for users with motion sensitivity preferences
- High contrast colors meeting WCAG AA standards
- Touch targets at least 44x44px on mobile devices
- ARIA labels for all interactive elements

**Session End:**

- After playing through all 25 prompts, your session is complete
- The game detects when all prompts have been used (Redis sorted set `session:{sessionId}:used` contains all 25 prompt IDs)
- The server returns null from the selectNextPrompt function, indicating no more prompts available
- Your final score is displayed with a completion message
- Click "Play Again" to start a new session with reshuffled prompts
- Each session has a unique ID (format: `postId_username_timestamp_random`) and tracks which prompts you've seen using Redis sorted sets
- Session data expires after 1 hour (3600 seconds TTL) to prevent memory bloat
- Starting a new session resets your score to 0 and clears the used prompts list
- Session metadata is stored in Redis with keys:
  - `session:{sessionId}:score` - Current session score (String)
  - `session:{sessionId}:used` - Set of used prompt IDs (Sorted Set with timestamp scores)
  - `session:{sessionId}:meta` - Session metadata like username, startTime, roundsCompleted (Hash)

### Game Architecture

**State Management:**

The game uses React's useReducer hook for complex state management through the custom `useGame` hook:

- **Game State**: Centralized state object containing:
  - `phase`: Current game phase ('home' | 'display' | 'guess' | 'results' | 'error')
  - `currentPrompt`: Active prompt object with id, promptText, answer, alternativeAnswers, difficulty, category
  - `playerGuess`: User's submitted guess for the current round
  - `score`: Total session score (cumulative across all rounds)
  - `roundsCompleted`: Number of rounds finished
  - `usedPromptIds`: Array of prompt IDs already shown in this session
  - `username`: Reddit username from authentication
  - `postId`: Reddit post ID where the game is running
  - `sessionId`: Unique session identifier
  - `loading`: Loading state for async operations
  - `error`: Error message if something goes wrong

- **Actions**: Dispatched to update state:
  - `START_GAME`: Initialize new game session
  - `LOAD_PROMPT`: Load next prompt from server
  - `START_DISPLAY_PHASE`: Begin 5-second display phase
  - `START_GUESS_PHASE`: Begin 20-second guess phase
  - `SUBMIT_GUESS`: Submit player's guess
  - `START_RESULTS_PHASE`: Show results for 10 seconds
  - `NEXT_ROUND`: Advance to next prompt
  - `SET_ERROR`: Handle error states

**Component Hierarchy:**

```
App (Root)
├── HomeScreen (phase === 'home')
│   └── Play button → startGame()
└── GameScreen (phase === 'display' | 'guess' | 'results')
    ├── Leaderboard (persistent, top-right)
    ├── PromptDisplay (phase === 'display')
    │   └── Timer (5 seconds)
    ├── GuessInput (phase === 'guess')
    │   ├── Input field (auto-focus)
    │   ├── Submit button
    │   └── Timer (20 seconds)
    └── ResultsDisplay (phase === 'results')
        ├── Result indicator (Correct/Close/Incorrect)
        ├── Correct answer display
        ├── Player guess display
        ├── Points earned display
        ├── Total score display
        └── Timer (10 seconds)
```

**API Communication:**

The client communicates with the Express server through RESTful API endpoints:

1. **GET /api/init**: Initialize game with user context (username, postId)
2. **POST /api/game/start**: Create new session, return sessionId
3. **POST /api/game/next-prompt**: Fetch next unused prompt for session
4. **POST /api/game/submit-guess**: Validate guess, calculate score, return results

All API calls use standard `fetch()` with JSON payloads and handle errors gracefully with try-catch blocks.

### Technology Stack

- **[Devvit Web 0.12.1](https://developers.reddit.com/)**: Reddit's developer platform for building immersive games that run in posts
- **[React 19.1.0](https://react.dev/)**: UI framework with hooks for state management (useReducer, useEffect, useState, useCallback, useRef)
- **[Vite 6.2.4](https://vite.dev/)**: Fast build tool and development server with hot module replacement (HMR)
- **[Express 5.1.0](https://expressjs.com/)**: Backend API server running in serverless environment
- **[Redis](https://redis.io/)**: Session storage and game state persistence (via @devvit/web/server)
  - Operations: SADD, SMEMBERS, SET, GET, EXPIRE, HINCRBY, HGETALL, ZADD, ZRANGE, ZCARD
- **[Tailwind CSS 4.1.6](https://tailwindcss.com/)**: Utility-first styling with mobile-first responsive design
- **[TypeScript 5.7.3](https://www.typescriptlang.org/)**: Type-safe development with strict mode enabled
- **[Vitest](https://vitest.dev/)**: Unit testing framework with React Testing Library integration
- **[ESLint](https://eslint.org/)**: Code quality and consistency checking
- **[Prettier](https://prettier.io/)**: Code formatting

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
├── client/                    # React frontend (runs in browser)
│   ├── components/            # UI components
│   │   ├── HomeScreen.tsx     # Landing page with Play button
│   │   ├── GameScreen.tsx     # Main game container
│   │   ├── PromptDisplay.tsx  # Display phase component
│   │   ├── GuessInput.tsx     # Guess phase input component
│   │   ├── ResultsDisplay.tsx # Results phase component
│   │   ├── Timer.tsx          # Reusable countdown timer
│   │   ├── Leaderboard.tsx    # Score display component
│   │   ├── GuessAggregationBar.tsx      # Consensus mode bar (in progress)
│   │   ├── PollResultsDisplay.tsx       # Consensus mode results (in progress)
│   │   └── ConsensusScoreDisplay.tsx    # Consensus mode scoring (in progress)
│   ├── hooks/                 # Custom React hooks
│   │   ├── useGame.ts         # Main game state management (useReducer)
│   │   ├── useTimer.ts        # Countdown timer logic
│   │   └── useConsensusPolling.ts       # Live polling for consensus mode (in progress)
│   ├── App.tsx                # Root component with phase routing
│   ├── main.tsx               # Entry point (React render)
│   ├── index.html             # HTML template
│   ├── index.css              # Global styles and Tailwind imports
│   └── vite.config.ts         # Client build configuration
├── server/                    # Express backend (serverless)
│   ├── api/                   # API endpoint implementations
│   │   └── consensus-get-results.test.ts  # Consensus API tests
│   ├── data/                  # Static data
│   │   └── prompts.ts         # 25 geometric prompts with answers
│   ├── services/              # Business logic services
│   │   └── redisAggregation.ts           # Redis operations for consensus mode
│   ├── utils/                 # Helper functions
│   │   ├── stringSimilarity.ts           # Levenshtein distance algorithm
│   │   ├── promptSelector.ts             # Random prompt selection logic
│   │   ├── sessionId.ts                  # Session ID generation
│   │   ├── guessNormalization.ts         # Guess text normalization
│   │   └── consensusScoring.ts           # Consensus tier calculation
│   ├── index.ts               # Express app with API routes
│   └── vite.config.ts         # Server build configuration (SSR, CommonJS)
└── shared/                    # Shared TypeScript types
    └── types/                 # Type definitions
        ├── api.ts             # API request/response types
        ├── game.ts            # Game state and phase types
        └── prompt.ts          # Prompt data structure type
```

### Current Development Status

**Phase 1 - Classic Mode (Complete) ✅**

**Mode Selection (Complete) ✅**
- ✅ HomeScreen updated with dual mode selection buttons
- ✅ Classic Mode button (orange) and Consensus Mode button (blue)
- ✅ Mode parameter passed through game initialization
- ✅ GameScreen accepts and handles mode prop
- ✅ Keyboard navigation support (Tab, Enter, Space)
- ✅ Hover and active states for both buttons
- ✅ Mobile-responsive button layout

**Backend Infrastructure:**
- ✅ Express server with Devvit Web integration
- ✅ GET /api/init endpoint (user context initialization)
- ✅ POST /api/game/start endpoint (session creation)
- ✅ POST /api/game/next-prompt endpoint (prompt selection)
- ✅ POST /api/game/submit-guess endpoint (guess validation and scoring)
- ✅ Redis session management with sorted sets and 1-hour TTL
- ✅ 25 geometric prompts with categories (everyday, animals, reddit, abstract) and difficulty levels
- ✅ String similarity algorithm using Levenshtein distance (70% threshold)
- ✅ Prompt selector with duplicate prevention using Redis sorted sets
- ✅ Session ID generator with unique identifiers

**Frontend Components:**
- ✅ App.tsx root component with phase routing and error boundaries
- ✅ HomeScreen component with personalized greeting and instructions
- ✅ GameScreen component orchestrating phase transitions
- ✅ PromptDisplay component with fade-in animations
- ✅ GuessInput component with keyboard support, auto-focus, and character limit
- ✅ ResultsDisplay component with bounce-in animations and score count-up
- ✅ Timer component with visual countdown, progress bar, and urgency states (pulse animation at <5s)
- ✅ Leaderboard component with real-time score updates and trophy icon

**State Management:**
- ✅ useGame hook with useReducer for complex game state
- ✅ useTimer hook for reusable countdown logic
- ✅ Actions: START_GAME, LOAD_PROMPT, START_DISPLAY_PHASE, START_GUESS_PHASE, SUBMIT_GUESS, START_RESULTS_PHASE, NEXT_ROUND, SET_ERROR

**Styling & UX:**
- ✅ Mobile-responsive design with Tailwind CSS (breakpoints: <768px mobile, 768-1024px tablet, >1024px desktop)
- ✅ Reddit-inspired color scheme (orange #FF4500, white, gray)
- ✅ Smooth animations (fade, bounce, pulse, slide, count-up) with 300-500ms durations
- ✅ Reduced motion support respecting prefers-reduced-motion
- ✅ Touch targets at least 44x44px on mobile

**Accessibility:**
- ✅ ARIA labels and live regions for screen readers
- ✅ Full keyboard navigation (Tab, Enter)
- ✅ Focus indicators with 2px orange outline
- ✅ High contrast colors (4.5:1 minimum)
- ✅ Semantic HTML with proper heading hierarchy

**Testing:**
- ✅ Comprehensive unit tests for all utilities (stringSimilarity, promptSelector, sessionId)
- ✅ Component tests for all UI components
- ✅ Hook tests for useGame and useTimer
- ✅ Test coverage using Vitest and React Testing Library

---

**Phase 2 - Consensus Mode (In Active Development) 🚧**

**Completed:**
- ✅ Shared types (GuessAggregation, ConsensusScore, ConsensusScoreTier, API response types)
- ✅ Guess normalization utility (lowercase, trim whitespace)
- ✅ Redis aggregation service with atomic operations:
  - storeGuess (HINCRBY for atomic increment)
  - addPlayerToSet (ZADD for unique player tracking)
  - storePlayerGuess (SET with 24-hour TTL)
  - getAggregatedGuesses (HGETALL)
  - getTotalPlayers (ZCARD)
- ✅ Consensus scoring algorithm with tier calculation:
  - Majority (≥50%): 100 points
  - Common (20-49%): 50 points
  - Uncommon (5-19%): 25 points
  - Rare (1-4%): 10 points
  - Unique (<1%): 0 points
  - Close match bonus (≥70% similarity): 5 points
- ✅ POST /api/consensus/submit-guess endpoint with validation and error handling
- ✅ POST /api/consensus/get-results endpoint with aggregation, sorting, and player score calculation
- ✅ GuessAggregationBar component with:
  - Animated percentage bars (0 to percentage over 500ms)
  - Color coding (green ≥50%, blue 20-49%, yellow 5-19%, gray <5%)
  - Player guess highlighting (orange border)
  - Creator answer marking (gold border + star icon)
- ✅ PollResultsDisplay component with:
  - Top 10 guess display sorted by count
  - Loading and error states
  - Empty state handling
  - Total players and guesses summary
- ✅ useConsensusPolling hook with:
  - 2-second polling interval
  - Automatic start/stop based on enabled flag
  - Consecutive failure tracking (stops after 3 failures)
  - Error handling and retry logic
- ✅ ConsensusScoreDisplay component with:
  - Tier badges (🏆 Majority, 🥈 Common, 🥉 Uncommon, 💎 Rare, ❄️ Unique)
  - Animated score reveal (count-up from 0 to earned points)
  - Match percentage display
  - Total score count-up animation
- ✅ Comprehensive test coverage for all consensus features

**In Progress:**
- ⏳ Integration of useConsensusPolling into PollResultsDisplay for live updates
- ⏳ Integration of ConsensusScoreDisplay into PollResultsDisplay
- ⏳ Mode selection UI on HomeScreen (Classic vs Consensus buttons)
- ⏳ GameScreen modifications to support mode switching
- ⏳ Animated rank changes when guesses move up/down in polling
- ⏳ Creator's answer fallback display when not in top 10
- ⏳ Viral moment detection and highlighting
- ⏳ Historical results viewing capability

**Remaining Tasks:**
- ⏳ Task 9: Integrate real-time polling into PollResultsDisplay
- ⏳ Task 11: Integrate ConsensusScoreDisplay into PollResultsDisplay
- ⏳ Task 12: Add mode selection to HomeScreen
- ⏳ Task 13: Update GameScreen to support consensus mode
- ⏳ Task 14: Add creator's answer display when not in top 10
- ⏳ Task 15: Add consensus vs creator comparison messages
- ⏳ Task 16: Implement mobile responsiveness for poll display
- ⏳ Task 17: Add error handling for aggregation failures
- ⏳ Task 18: Implement guess similarity grouping
- ⏳ Task 19: Add session management for multiplayer prompts
- ⏳ Task 20: Add historical results viewing capability
- ⏳ Task 21: Implement viral moment detection and highlighting
- ⏳ Task 22: Add comprehensive integration tests
- ⏳ Task 23: Update documentation and README

**Ready for Testing:**
- 🧪 Classic Mode end-to-end gameplay testing
- 🧪 Mobile device testing (iOS Safari, Android Chrome)
- 🧪 Edge case validation (network errors, prompt exhaustion, Redis failures)
- 🧪 Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- 🧪 Accessibility testing with screen readers (NVDA, JAWS, VoiceOver)
- 🧪 Performance testing (load times, animation smoothness)

**Next Steps:**
1. Complete remaining Consensus Mode UI integration tasks (9-15)
2. Implement mobile responsiveness and error handling (16-17)
3. Add advanced features (similarity grouping, viral moments, historical results) (18-21)
4. Comprehensive integration testing (22)
5. Final documentation updates (23)
6. Deploy to Reddit for review

### Contributing

This game is in active development. Phase 1 focuses on single-player gameplay. Future phases will add multiplayer support, user-generated prompts, and community features.

### Cursor Integration

This project includes pre-configured Cursor IDE integration. [Download Cursor](https://www.cursor.com/downloads) and enable the `devvit-mcp` when prompted for enhanced development experience.
