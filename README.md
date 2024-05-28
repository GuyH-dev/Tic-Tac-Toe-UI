# Tic-Tac-Toe Game UI

## Description
This project is a real-time Tic-Tac-Toe game built with React and TypeScript.
Two players can play against each other, making moves from different clients and seeing the game state updated in real-time.
The game integrates with a NestJS backend for managing the game logic.

## Installation
### Prerequisites
- Node.js and npm

### Steps
1. Clone the repository.
    ```sh
    git clone https://github.com/GuyH-dev/Tic-Tac-Toe-UI.git
   ```
2. Install the dependencies.
   ```bash
   npm install
   ```

3. Start the development server.
   ```bash
    npm start
    ```
   
4. Open the game in a web browser.
    ```
    http://localhost:3001
    ```
   (make sure your NestJS server is running on port 3000)

## Components
The project is structured into the following components:
- **Player Registration**: The `PlayerRegistration` component provides a form for players to register with either 'X' or 'O'.
- **Game Board**: The `GameBoard` component displays the game board, allows players to make moves, includes a restart button,
and shows alerts for wins and draws.
- **Context**: The `GameContext` provides the game state and functions to the rest of the app. It handles player registration,
making moves, resetting the game, and error handling.
- **App Component**: The main `App` component uses the `GameProvider` context and includes the `PlayerRegistration` and `GameBoard` components.
- **CSS for Game Board**: The `GameBoard.css` file styles the game board and error messages.