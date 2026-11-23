# 2048 Game

A classic browser implementation of the popular **2048** sliding tile puzzle game. The objective is to slide numbered tiles on a 4×4 grid to combine them and create a tile with the number **2048**.

## Live Preview

- [DEMO LINK](https://adadiada.github.io/2048_game/)

## Technologies Used

- **HTML5** — semantic page structure
- **SCSS / CSS3** — styling, animations, and responsive grid layout
- **JavaScript (ES6+)** — object-oriented game engine (`Game` class) and DOM manipulation
- **Parcel / Vite** — project bundling and local development server
- **Cypress / Jest** — automated end-to-end and unit testing

## Getting Started

Follow these instructions to set up and run the project locally on your machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adadiada/2048_game
   cd your-repo-name
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the project locally:**
   ```bash
   npm start
   ```

## Features

- **Smooth Keyboard Controls:** Navigate tiles using the `ArrowUp`, `ArrowDown`, `ArrowLeft`, and `ArrowRight` keys.
- **Dynamic Score Tracking:** Real-time score updates as matching tiles merge.
- **Game State Management:** Automatic detection of win (`2048` tile reached) and game-over (no valid moves left) conditions with status notifications.
- **Instant Restart:** Reset the board and score at any moment with a single click.
