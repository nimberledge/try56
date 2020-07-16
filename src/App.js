import { Client } from 'boardgame.io/react';
import { FourPlayer56Game } from './game/FourPlayer56Game';

const App = Client({ game: FourPlayer56Game, numPlayers: 4 });

export default App;
