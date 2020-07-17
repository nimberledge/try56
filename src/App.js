import { Client } from 'boardgame.io/react';
import { FourPlayer56Game } from './game/FourPlayer56Game';
import { DummyDebugTable } from './components/DummyDebugTable';

const App = Client({ game: FourPlayer56Game, board: DummyDebugTable, numPlayers: 4 });

export default App;
