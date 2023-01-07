import { Lobby } from 'boardgame.io/react';
import { FourPlayer56Game } from './game/FourPlayer56Game';
import { FourPlayerGameTable } from './components/FourPlayerGameTable';

const MyLobby = () => (
  <Lobby
    gameServer={`http://localhost:8000`}
    lobbyServer={`http://localhost:8000`}
    gameComponents={[{ game: FourPlayer56Game, board: FourPlayerGameTable }]}
  />
);

render(<MyLobby />, document.getElementById('root'));
