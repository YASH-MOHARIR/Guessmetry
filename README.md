# Guessmetry - Geometric Pictionary

A community-driven guessing game built on Reddit's Devvit platform where creators craft custom geometric descriptions and players compete to guess what they represent. Think reverse Pictionary meets crowd consensus - where the community determines what's "correct"!

**Play it on Reddit**: Find a Guessmetry post and click "Play Now" to start playing instantly!

---

## 🎮 What is Guessmetry?

Guessmetry is a unique social guessing game that flips traditional Pictionary on its head. Instead of seeing drawings, you read user-created descriptions of geometric shapes arranged in specific ways (like "a triangle sitting on top of a square") and guess what object is being described. It's a mental visualization challenge that tests your spatial reasoning and creative thinking.

The game runs directly inside Reddit posts as a native Devvit app, providing a seamless experience without leaving the platform. Built with React 19 and powered by Devvit's serverless infrastructure, it combines creative user-generated content with Reddit's community features.

### How It Works

**For Creators**: Use Reddit's post creation form to write your own geometric description and set the answer. Your custom prompt becomes a playable game that anyone can enjoy!

**For Players**: Read the geometric description, visualize the shapes in your mind, and submit your guess. Earn points by matching what other players guess - the crowd determines what's "correct" through consensus scoring!

### Current Game State

The game follows a simple two-phase flow:

1. **Prompt Phase**: If you haven't guessed yet, you'll see the geometric description with an input field to submit your answer
2. **Results Phase**: After submitting (or if you've already guessed), you'll see live results showing the top 10 most popular guesses, your score, and how your answer compares to the community consensus

Results automatically refresh every 5 seconds to show updated statistics as more players join!

## 🚀 Quick Start

### How to Play in 30 Seconds

1. **Launch**: Click "Launch App" on any Guessmetry post on Reddit
2. **Read**: View the custom geometric description created by the post author
3. **Guess**: Type your answer for what the shapes represent
4. **Results**: See how your guess compares to other players and the creator's answer
5. **Refresh**: Watch the live results update as more players join!

### Scoring System

Guessmetry uses **consensus scoring** - you earn points by matching what other players guess:

- 🏆 **Majority** (≥50%): **+100 points** - You matched the crowd!
- 🥈 **Common** (20-49%): **+50 points** - Popular answer
- 🥉 **Uncommon** (5-19%): **+25 points** - Less common guess
- 💎 **Rare** (1-4%): **+10 points** - Unique thinking
- ❄️ **Unique** (<1%): **0 points** - One-of-a-kind answer

The creator's intended answer is shown with a ✓ badge, but the community determines what's truly "correct"!

## 💡 What Makes Guessmetry Innovative?

Guessmetry stands out from traditional guessing games with several groundbreaking innovations that make it uniquely suited for Reddit's community-driven platform:

### 1. **User-Generated Content**
Unlike traditional games with pre-defined prompts, Guessmetry empowers the Reddit community to create their own geometric descriptions. When creating a post, users fill out a simple form with:
- **Description**: The geometric shapes and their arrangement (e.g., "A circle on top of a rectangle")
- **Answer**: What the creator thinks it represents (e.g., "person")

This creates endless variety and allows for creative, funny, or challenging prompts that reflect the community's personality.

### 2. **Reverse Pictionary Concept**
Instead of drawing pictures, the game describes geometric arrangements, flipping the traditional Pictionary format. You must imagine the shapes and deduce what object they form - turning abstract descriptions into concrete objects in your mind. For example, "a triangle sitting on top of a square" becomes "house" in your imagination. This creates a unique mental visualization challenge that's different from any other game on Reddit.

### 3. **Crowd-Consensus Scoring**
Inspired by r/place's voting visualization, Guessmetry transforms the game from matching a single "correct" answer to earning points by thinking like the crowd. If 85% of players say "jellyfish" but the creator intended "sun," jellyfish becomes the culturally correct answer. Features include:

- **Live poll visualization** with animated horizontal bars showing each guess's popularity
- **Real-time updates** every 5 seconds as more players join
- **Tiered scoring system** rewarding popular thinking (Majority: 100pts, Common: 50pts, Uncommon: 25pts, Rare: 10pts, Unique: 0pts)
- **Creator's answer marked** with ✓ Correct badge even if unpopular, showing what was intended vs. what the crowd chose
- **Viral moment potential** when crowd consensus differs significantly from creator's intent

### 4. **Intelligent Answer Grouping**
The game uses advanced string similarity algorithms (Levenshtein distance with 85% threshold) to group similar answers together. Variants like "jelly fish" and "jellyfish" are combined into a single entry with the most common spelling shown. This creates cleaner results and more accurate consensus scoring.

### 5. **Reddit-Native Experience**
Built specifically for Reddit using Devvit Web, the game runs directly in Reddit posts with full integration of Reddit's authentication and community features. No external websites, apps, or logins required - just click "Play Now" in the post and start playing right in your feed. Your Reddit username is automatically recognized and used throughout the game.

### 6. **Single-Round Simplicity**
Each post is a single, focused challenge - no timers, no multi-round sessions, no pressure. Read the description, submit your guess, and immediately see how you compare to the community. Perfect for quick Reddit browsing sessions. The game automatically transitions from the prompt view to the results view after you submit your guess.

### 7. **Persistent Results**
Results are stored in Redis for 30 days, allowing players to return to a post and see updated statistics as more people play. The live leaderboard shows:
- Top 10 most popular guesses with percentages
- Total player count and guess count
- Your personal guess highlighted with an orange ring
- Creator's intended answer marked with a green bar and ✓ badge

### 8. **Mobile-First Design**
Clean, responsive interface optimized for both desktop and mobile Reddit users with Reddit's signature orange (#FF4500) color scheme, smooth CSS animations, and comprehensive accessibility features built in from the ground up (ARIA labels, keyboard navigation, reduced motion support, high contrast colors, 44px minimum touch targets).

## ✨ Core Features

### User-Generated Content
- **Custom post creation form** integrated into Reddit's post flow
- **Two-field form**: Description (geometric shapes) + Answer (what it represents)
- **Unlimited creativity**: Community creates their own prompts with any difficulty level
- **30-day persistence**: Prompts and results stored in Redis for long-term engagement

### Gameplay Features
- **Single-round format**: One prompt per post - simple and focused
- **Instant results**: Submit your guess and immediately see the community consensus
- **Live leaderboard**: Top 10 most popular guesses with animated percentage bars
- **Auto-refresh**: Results update every 5 seconds as more players join
- **Duplicate prevention**: Each user can only guess once per post
- **Your guess highlighted**: Orange border marks your answer in the results

### Consensus Scoring System
- **Crowd-sourced validation**: Earn points by matching what other players guess
- **Tiered rewards**: 100 points for majority (≥50%), down to 0 for unique (<1%)
- **Smart grouping**: Similar spellings combined using 85% similarity threshold
- **Creator's answer shown**: Marked with ✓ badge to show original intent
- **Match percentage displayed**: See exactly how many players agreed with you

### Technical Features
- **Redis-powered persistence**: All guesses and results stored for 30 days
- **Guess tracking**: Prevents duplicate submissions per user
- **Real-time aggregation**: Live vote counting and percentage calculations
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

#### Step 1: Find a Guessmetry Post

1. Browse Reddit and find a post created with Guessmetry
2. The post title will start with "Geometric Pictionary:" followed by a preview of the description
3. Click the **"Play Now"** button on the splash screen
4. The game opens in full-screen mode within Reddit

#### Step 2: Read the Description

Once the game loads, you'll see:
- The custom geometric description created by the post author
- Example: "A circle on top of a rectangle with two small circles on the sides"
- The description is displayed prominently with a 📐 icon in a blue box
- A text input field below where you can type your guess
- Take your time to visualize the shapes in your mind

#### Step 3: Submit Your Guess

- Type your answer in the input field (e.g., "person", "robot", "snowman")
- Click **"Submit Guess"** or press **Enter** to lock in your answer
- Your guess is immediately submitted to the community pool
- **Important**: You can only guess once per post - make it count!

#### Step 4: View the Results

After submitting, the game automatically transitions to the results screen showing:

**Top 10 Guesses**
- Animated horizontal bars showing the most popular answers
- Each bar displays: guess text, vote count, and percentage
- Bars are color-coded:
  - 🟢 **Green bar**: Creator's intended answer (marked with ✓ Correct badge)
  - 🟠 **Orange bar**: Your guess (highlighted with orange ring border)
  - 🔵 **Blue bars**: Other players' guesses
- Similar spellings are grouped together (e.g., "jellyfish" and "jelly fish")
- Variants shown below the main guess in smaller text

**Your Score Card** (blue box at bottom)
- Your specific guess displayed
- Points earned based on consensus tier
- Match percentage showing how many players agreed with you
- Score breakdown:
  - **Majority** (≥50%): 100 points
  - **Common** (20-49%): 50 points
  - **Uncommon** (5-19%): 25 points
  - **Rare** (1-4%): 10 points
  - **Unique** (<1%): 0 points

**Community Stats** (gray box)
- Total number of players who have guessed
- Total number of guesses submitted
- Displayed in compact format (e.g., "1.2k players • 1.5k guesses")

**Live Updates**
- Results automatically refresh every 5 seconds
- Watch the rankings shift as more players join
- Click "🔄 Refresh Results" button to manually update anytime
- Rankings may change as the community consensus evolves

#### Step 5: Share and Discuss

- Return to the Reddit post to discuss results in the comments
- See if the community consensus matches the creator's intent
- Share your thoughts on whether the description was clear or ambiguous
- Check back later to see how the results changed as more people played

### For Creators

#### How to Create a Guessmetry Post

1. **Navigate to your subreddit** where Guessmetry is installed
2. **Click "Create Post"** and select the Guessmetry post type
3. **Fill out the form** with two fields:
   - **Description**: Write your geometric description (e.g., "A triangle on top of a square with a small rectangle on the side")
   - **Answer**: What you think it represents (e.g., "house")
4. **Submit the post** - it will appear in your subreddit with a "Play Now" button
5. **Watch the results** as players submit their guesses and see if the community agrees with your answer!

#### Tips for Creating Good Prompts

- **Be clear but not too obvious**: "A circle on top of a rectangle" could be many things
- **Use simple shapes**: Stick to circles, squares, rectangles, triangles, and lines
- **Describe spatial relationships**: Use words like "on top of", "next to", "inside", "around"
- **Test your description**: Can you visualize it clearly? If not, revise it
- **Embrace ambiguity**: The best prompts have multiple valid interpretations
- **Have fun**: Creative, funny, or challenging descriptions make the best posts

### For Developers

#### Setup and Development

1. **Prerequisites**: Make sure you have Node.js 22.2.0 or higher installed
2. **Installation**: Clone this repository and run `npm install`
3. **Development**: Run `npm run dev` to start the development server
4. **Testing**: Open the playtest URL provided in your terminal
5. **Building**: Run `npm run build` to create production builds
6. **Deployment**: Run `npm run deploy` to upload to Reddit, then `npm run launch` to publish

---

### Technical Implementation Details

#### Game Flow

The game follows a simple two-state flow:

**State 1: Prompt View** (if user hasn't guessed yet)
- Display the custom geometric description created by the post author
- Show an input field for the user's guess
- Submit button sends guess to `/api/prompt/submit-guess` endpoint
- After submission, transition to Results View

**State 2: Results View** (if user has already guessed)
- Display top 10 most popular guesses with animated percentage bars
- Highlight the user's guess with an orange border
- Mark the creator's answer with a ✓ badge (green background)
- Show user's score based on consensus tier
- Auto-refresh every 5 seconds to show updated results
- Manual refresh button available

#### Consensus Scoring Algorithm

Points are awarded based on how popular your guess is:

- **Majority** (≥50%): 100 points
- **Common** (20-49%): 50 points
- **Uncommon** (5-19%): 25 points
- **Rare** (1-4%): 10 points
- **Unique** (<1%): 0 points

The algorithm:
1. Normalizes all guesses (lowercase, trim whitespace)
2. Groups similar spellings using 85% Levenshtein similarity threshold
3. Calculates percentage for each unique guess
4. Assigns tier based on percentage thresholds
5. Awards points accordingly

#### Answer Grouping

Similar answers are grouped together to create cleaner results:

- "jelly fish" and "jellyfish" → grouped as "jellyfish"
- "ice cream" and "icecream" → grouped as "ice cream"
- Uses Levenshtein distance with 85% similarity threshold
- Primary guess (most common spelling) is displayed
- Variants are shown below in smaller text

## 💡 Tips for Success

### For Players

1. **Think like the crowd**: What would most people guess first? The obvious answer is often the most popular
2. **Visualize carefully**: Picture the shapes in your mind - imagine how they connect
3. **First impressions matter**: What's the first thing that comes to mind? That's probably what others will guess too
4. **Avoid overthinking**: Complex or creative answers might be unique (0 points) - simple is better
5. **Spelling doesn't matter much**: Similar spellings are grouped together (e.g., "jelly fish" and "jellyfish")
6. **Learn from results**: Check back later to see how the consensus evolved as more players joined
7. **Embrace ambiguity**: Some descriptions have multiple valid interpretations - that's part of the fun!

### For Creators

1. **Test your description**: Can you visualize it clearly? If not, revise it
2. **Use simple shapes**: Stick to circles, squares, rectangles, triangles, and lines
3. **Describe spatial relationships**: Use words like "on top of", "next to", "inside", "around"
4. **Be clear but not too obvious**: Leave room for interpretation
5. **Embrace multiple answers**: The best prompts have several valid guesses
6. **Watch the results**: See if the community agrees with your intended answer
7. **Engage in comments**: Discuss the results and explain your thinking

### General Tips

- **Keyboard shortcuts**: Press Enter to submit your guess quickly
- **Mobile-friendly**: The game works great on phones - perfect for playing on the go
- **Accessibility**: Full keyboard navigation and screen reader support available
- **One guess per post**: You can only submit once, so make it count!
- **Return later**: Results persist for 30 days - check back to see updated statistics

**Accessibility Features:**

- Keyboard navigation supported (Tab to navigate, Enter to submit)
- Screen reader announcements for state changes
- Reduced motion support for users with motion sensitivity preferences
- High contrast colors meeting WCAG AA standards
- Touch targets at least 44x44px on mobile devices
- ARIA labels for all interactive elements
- Focus indicators with 2px orange outline

### Game Architecture

**State Management:**

The game uses React's useState and useEffect hooks for simple state management:

- **App State**: Current view state ('loading' | 'prompt' | 'results' | 'error' | 'no-prompt')
- **Custom Prompt**: Object containing description and hasGuessed flag
- **Post ID**: Reddit post ID where the game is running
- **Results Data**: Aggregation data, player guess, creator answer, scores, and statistics
- **Error**: Error message if something goes wrong

**Component Hierarchy:**

```
App (Root)
├── Loading State (appState === 'loading')
│   └── Spinner animation with "Loading..." text
├── Error State (appState === 'error' | 'no-prompt')
│   └── Red error box with ⚠️ icon and retry button
├── PromptView (appState === 'prompt' && !hasGuessed)
│   ├── Header ("Geometric Pictionary")
│   ├── Description display in blue box with 📐 icon
│   ├── Input field (auto-focus, max 100 chars)
│   └── Submit button (orange, disabled when empty)
└── ResultsView (appState === 'results' && hasGuessed)
    ├── Header with "Results" and creator's answer
    ├── Top 10 guesses with animated horizontal bars
    │   ├── Guess text and count
    │   ├── Percentage display
    │   ├── Color coding (green=correct, orange=yours, blue=others)
    │   ├── Badges (✓ Correct, Your Guess)
    │   └── Variants shown below (if multiple spellings)
    ├── Stats box (gray, total players • total guesses)
    ├── Player score card (blue box)
    │   ├── Your guess
    │   ├── Points earned (large orange text)
    │   └── Match percentage
    └── Refresh button (manual + auto every 5s)
```

**API Communication:**

The client communicates with the Express server through RESTful API endpoints:

1. **GET /api/init**: Initialize game with user context (username, postId, customPrompt, hasGuessed)
   - Called on app load
   - Returns custom prompt data and whether user has already guessed
   - If user already guessed, automatically fetches results

2. **POST /api/prompt/submit-guess**: Submit player's guess
   - Accepts: `{ guess: string }`
   - Normalizes guess, stores in Redis, marks user as guessed
   - Prevents duplicate submissions per user

3. **POST /api/prompt/get-results**: Fetch aggregated results
   - Returns top 10 guesses with percentages
   - Includes player's specific guess and score
   - Shows creator's intended answer
   - Called after guess submission and every 5 seconds for live updates

All API calls use standard `fetch()` with JSON payloads and handle errors gracefully with try-catch blocks. Console logging is enabled for debugging.

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
│   │   ├── PromptView.tsx     # Prompt display and guess input
│   │   └── ResultsView.tsx    # Results display with live updates
│   ├── App.tsx                # Root component with state routing
│   ├── main.tsx               # Entry point (React render)
│   ├── index.html             # HTML template
│   ├── index.css              # Global styles and Tailwind imports
│   └── vite.config.ts         # Client build configuration
├── server/                    # Express backend (serverless)
│   ├── core/                  # Core business logic
│   │   └── post.ts            # Post creation with custom prompt storage
│   ├── services/              # Service modules
│   │   ├── promptStorage.ts   # Custom prompt Redis operations
│   │   ├── guessTracking.ts   # User guess tracking (prevent duplicates)
│   │   └── redisAggregation.ts # Guess aggregation and consensus scoring
│   ├── utils/                 # Utility functions
│   │   ├── guessNormalization.ts # Normalize guesses (lowercase, trim)
│   │   ├── consensusScoring.ts   # Calculate consensus tiers
│   │   └── stringSimilarity.ts   # Levenshtein distance for grouping
│   ├── index.ts               # Express server with API routes
│   └── vite.config.ts         # Server build configuration (SSR)
├── shared/                    # Shared types between client/server
│   ├── types/
│   │   ├── api.ts             # API request/response types
│   │   └── game.ts            # Game state and consensus types
│   └── tsconfig.json          # Shared TypeScript config
├── assets/                    # Static assets
│   ├── default-icon.png       # App icon
│   ├── default-splash.png     # Splash screen background
│   └── loading.gif            # Loading animation
├── devvit.json                # Devvit app configuration (includes custom post form)
├── package.json               # Dependencies and scripts
└── tsconfig.json              # Root TypeScript config
```

### Redis Data Structure

The game stores data in Redis with 30-day TTL:

**Custom Prompts:**
- `post:{postId}:prompt:description` - The geometric description (String)
- `post:{postId}:prompt:answer` - Creator's intended answer (String)
- `post:{postId}:prompt:meta` - Metadata (Hash: createdBy, createdAt, postId)

**Guess Tracking:**
- `post:{postId}:player:{username}:guessed` - Flag indicating user has guessed (String: "1")
- `{postId}:player:{username}:guess` - User's specific guess (String)

**Guess Aggregation:**
- `{postId}:guess:{normalizedGuess}` - Count for each unique guess (String)
- `{postId}:players` - Set of unique player usernames (Set)

All keys expire after 30 days (2,592,000 seconds) to prevent memory bloat.

---

## 🚧 Development Status

### Current Implementation (Complete) ✅

**User-Generated Content System:**
- ✅ Custom post creation form integrated into Reddit's post flow
- ✅ Two-field form: Description (geometric shapes) + Answer (what it represents)
- ✅ Post creation handler stores custom prompts in Redis
- ✅ 30-day persistence for prompts and results

**Backend Infrastructure:**
- ✅ Express server with Devvit Web integration
- ✅ GET /api/init endpoint (user context, custom prompt, guess status)
- ✅ POST /api/prompt/submit-guess endpoint (guess submission and tracking)
- ✅ POST /api/prompt/get-results endpoint (aggregated results and consensus scoring)
- ✅ Custom prompt storage service (promptStorage.ts)
- ✅ Guess tracking service (guessTracking.ts) - prevents duplicate submissions
- ✅ Redis aggregation service (redisAggregation.ts) - vote counting and grouping
- ✅ String similarity algorithm using Levenshtein distance (85% threshold for grouping)
- ✅ Consensus scoring algorithm with tiered rewards

**Frontend Components:**
- ✅ App.tsx root component with state routing (loading, prompt, results, error)
- ✅ PromptView component - displays description and guess input
- ✅ ResultsView component - live leaderboard with animated bars
- ✅ Auto-refresh every 5 seconds for live updates
- ✅ Manual refresh button
- ✅ Color-coded results (green=correct, orange=yours, blue=others)
- ✅ Badge system (✓ Correct, Your Guess)

**State Management:**
- ✅ Simple useState/useEffect hooks for app state
- ✅ States: loading, prompt, results, error, no-prompt
- ✅ Automatic state transitions based on guess status

**Styling & UX:**
- ✅ Mobile-responsive design with Tailwind CSS
- ✅ Reddit-inspired color scheme (orange #FF4500, white, gray)
- ✅ Smooth animations for bars and transitions
- ✅ Touch targets at least 44x44px on mobile

**Accessibility:**
- ✅ ARIA labels for all interactive elements
- ✅ Full keyboard navigation (Tab, Enter)
- ✅ Focus indicators with 2px orange outline
- ✅ High contrast colors (4.5:1 minimum)
- ✅ Reduced motion support
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
### Future Enhancements

**Potential Features:**
- 📊 Leaderboards showing top creators and players
- 🎨 Rich text formatting for descriptions
- 🖼️ Optional image uploads alongside geometric descriptions
- 🏆 Achievement system for creative prompts
- 💬 In-app commenting on results
- 📈 Analytics dashboard for creators
- 🔔 Notifications when your post gets popular
- 🎯 Difficulty ratings based on consensus variance
- 🌐 Multi-language support

### Contributing

Contributions are welcome! This is an open-source project built on Reddit's Devvit platform. Feel free to:
- Report bugs or suggest features via GitHub issues
- Submit pull requests with improvements
- Create your own prompts and share them on Reddit
- Help improve documentation

### License

See LICENSE file for details.

---

**Built with ❤️ for the Reddit community using Devvit Web**
