// src/context/GameContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

interface Player {
    id: string;
    symbol: 'X' | 'O';
}

interface GameState {
    board: (string | null)[];
    currentPlayer: Player;
    winner: Player | null;
    moves: { playerId: string; position: number }[];
}

interface GameContextType {
    gameState: GameState | null;
    players: Player[];
    registerPlayer: (symbol: 'X' | 'O') => Promise<void>;
    makeMove: (playerId: string, position: number) => Promise<string>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const socket = io('http://localhost:3000');

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            const gameResponse = await axios.get('http://localhost:3000/game/state');
            setGameState(gameResponse.data);

            const playersResponse = await axios.get('http://localhost:3000/game/players');
            setPlayers(playersResponse.data);
        };

        fetchInitialData();

        socket.on('gameState', (updatedState: GameState) => {
            setGameState(updatedState);
        });

        return () => {
            socket.off('gameState');
        };
    }, []);

    const registerPlayer = async (symbol: 'X' | 'O') => {
        const response = await axios.post('http://localhost:3000/game/register', { symbol });
        setPlayers([...players, response.data]);
    };

    const makeMove = async (playerId: string, position: number) => {
        const response = await axios.post('http://localhost:3000/game/move', { playerId, position });
        setGameState(response.data.gameState);
        return response.data.message;
    };

    return (
        <GameContext.Provider value={{ gameState, players, registerPlayer, makeMove }}>
    {children}
    </GameContext.Provider>
);
};

export default GameContext;
