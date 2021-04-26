import React from 'react';
import StartArea from './views/start-area'
import GameArea from './views/game-area'
import { useSelector } from 'react-redux';
import { selectLevel } from './slices/gameSlice'
import './App.css';

function App() {

  const n = useSelector(selectLevel);
  const cards = useSelector(state => state.game.cards)
  return (
    <div className="app">
      {n
        ?<GameArea n={n} data={cards}/>
        :<StartArea/>
      }
    </div>
  );
}

export default App;
