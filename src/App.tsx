// src/App.tsx

import React from 'react';
import {GameProvider} from './context/GameContext';
import PlayerRegistration from './components/PlayerRegistration';
import GameBoard from './components/GameBoard';

const App: React.FC = () => {
    return (
        <GameProvider>
            <div>
                <h1>Tic-Tac-Toe</h1>
                <PlayerRegistration/>
                <GameBoard/>
            </div>
        </GameProvider>
    );
};

export default App;
