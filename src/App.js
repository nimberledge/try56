import { Client } from 'boardgame.io/react';
import { FourPlayer56Game } from './game/FourPlayer56Game';
import { FourPlayerGameTable } from './components/FourPlayerGameTable';

const App = Client({ game: FourPlayer56Game, board: FourPlayerGameTable, numPlayers: 4 });

export default App;
