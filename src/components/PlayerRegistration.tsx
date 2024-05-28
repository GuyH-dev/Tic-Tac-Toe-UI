// src/components/PlayerRegistration.tsx

import React, {FormEvent, useContext, useState} from 'react';
import GameContext from '../context/GameContext';

const PlayerRegistration: React.FC = () => {
    const {registerPlayer, error} = useContext(GameContext)!;
    const [symbol, setSymbol] = useState<'X' | 'O' | ''>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (symbol) {
            await registerPlayer(symbol);
            setSymbol('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Symbol:
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value as 'X' | 'O')}
                    maxLength={1}
                />
            </label>
            <button type="submit">Register</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default PlayerRegistration;
