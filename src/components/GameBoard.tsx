// src/components/GameBoard.tsx

import React, { useContext, useEffect } from 'react';
import GameContext from '../context/GameContext';
import '../styles/GameBoard.css';

const GameBoard: React.FC = () => {
    const { gameState, makeMove, players, resetGame, error } = useContext(GameContext)!;

    const handleClick = async (position: number) => {
        const currentPlayer = players.find(p => p.symbol === gameState?.currentPlayer.symbol);
        if (currentPlayer) {
            await makeMove(currentPlayer.id, position);
        }
    };

    useEffect(() => {
        if (gameState?.winner) {
            alert(`Player ${gameState.winner.symbol} wins!`);
        } else if (gameState && !gameState.board.includes(null)) {
            alert('The game is a draw!');
        }
    }, [gameState]);

    return (
        <div>
            <div className="board">
                {gameState?.board.map((cell, index) => (
                    <div
                        key={index}
                        className="cell"
                        onClick={() => handleClick(index)}
                    >
                        {cell}
                    </div>
                ))}
            </div>
            <button onClick={resetGame}>Restart Game</button>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default GameBoard;
