import React from 'react';
import PlayerCards from './PlayerCards'

export class FourPlayerGameTable extends React.Component {
	render() {
		let current_player_cards = this.props.G.players[this.props.ctx.currentPlayer].cards;
		return <div className='GameTable' id='game_table'>
			<div id='player_cards_container'>
				<PlayerCards id="player_cards" cards= { current_player_cards } />
			</div>
		</div>;
	}
};
