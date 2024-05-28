// src/context/GameContext.tsx

import React, {createContext, ReactNode, useEffect, useState} from 'react';
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
    resetGame: () => Promise<void>;
    error: string | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const socket = io('http://localhost:3000');

export const GameProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: unknown) => {
        if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message || 'An error occurred');
        } else {
            setError('An unexpected error occurred');
        }
    };

    const registerPlayer = async (symbol: 'X' | 'O') => {
        try {
            const response = await axios.post('http://localhost:3000/game/register', {symbol});
            setPlayers([...players, response.data]);
            setError(null);
        } catch (err) {
            handleError(err);
        }
    };

    const makeMove = async (playerId: string, position: number) => {
        try {
            const response = await axios.post('http://localhost:3000/game/move', {playerId, position});
            setGameState(response.data.gameState);
            setError(null);
            return response.data.message;
        } catch (err) {
            handleError(err);
        }
    };

    const resetGame = async () => {
        try {
            await axios.post('http://localhost:3000/game/reset');
            const gameResponse = await axios.get('http://localhost:3000/game/state');
            setGameState(gameResponse.data);
            const playersResponse = await axios.get('http://localhost:3000/game/players');
            setPlayers(playersResponse.data);
            setError(null);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            const gameResponse = await axios.get('http://localhost:3000/game/state');
            setGameState(gameResponse.data);

            const playersResponse = await axios.get('http://localhost:3000/game/players');
            setPlayers(playersResponse.data);
        };

        fetchInitialData();

        socket.on('connect', () => {
            console.log('Connected to backend server');
        });

        socket.on('gameState', (updatedState: GameState) => {
            setGameState(updatedState);
        });

        return () => {
            socket.off('connect');
            socket.off('gameState');
        };
    }, []);

    return (
        <GameContext.Provider value={{gameState, players, registerPlayer, makeMove, resetGame, error}}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
