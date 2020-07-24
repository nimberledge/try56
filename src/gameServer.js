import { Server } from 'boardgame.io/server';
import { FourPlayer56Game } from './game/FourPlayer56Game';

const server = Server({ games: [ FourPlayer56Game ]});

server.run({port: 8000});
