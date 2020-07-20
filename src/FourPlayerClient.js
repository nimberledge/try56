import { Client } from 'boardgame.io/react';
import { FourPlayer56Game } from './game/FourPlayer56Game';
// import { DummyDebugTable } from './components/DummyDebugTable';
import { FourPlayerGameTable } from './components/FourPlayerGameTable';
import { Local } from 'boardgame.io/multiplayer';
import React from 'react';

const FourPlayerClient = Client({ game: FourPlayer56Game, board: FourPlayerGameTable, numPlayers: 4, multiplayer: Local() });

export default FourPlayerClient;
