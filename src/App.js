import React from 'react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { FourPlayer56Game } from './game/FourPlayer56Game';
import { FourPlayerGameTable } from './components/FourPlayerGameTable';

const FourPlayer56Client = Client({
  game: FourPlayer56Game,
  board: FourPlayerGameTable,
	numPlayers: 4,
  multiplayer: SocketIO({ server: "192.168.1.16:8000" }),
  debug: false
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button id='player0-button' onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button id='player1-button' onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
					<button id='player2-button' onClick={() => this.setState({ playerID: "2" })}>
            Player 2
          </button>
					<button id='player3-button' onClick={() => this.setState({ playerID: "3" })}>
            Player 3
          </button>
        </div>
      );
    }
    return (
      <div>
        <FourPlayer56Client playerID={this.state.playerID} />
      </div>
    );
  }
}

export default App;
