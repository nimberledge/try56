import React from 'react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { FourPlayer56Game } from './game/FourPlayer56Game';
import { FourPlayerGameTable } from './components/FourPlayerGameTable';

const FourPlayer56Client = (props) => {
  const { playerID } = props;
  const { name } = props.players[playerID]; // Get the player name from the players prop
  const { gameID } = props;
  const { credentials } = props;
  const playerNames = props.players.map((player) => player.name); // Get the names of all the players

  return (
    <div>
      <FourPlayerGameTable playerID={playerID} gameID={gameID} credentials={credentials} players={props.players} />
      <Client
        game={FourPlayer56Game}
        playerID={playerID}
        gameID={gameID}
        credentials={credentials}
        multiplayer={SocketIO({ server: 'localhost:8000' })}
        debug={false}
      />
    </div>
  );
};

export default FourPlayer56Client;