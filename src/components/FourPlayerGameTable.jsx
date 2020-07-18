import React from 'react';
import PlayerCards from './PlayerCards';
import TeammateCards from './TeammateCards';
import OpponentCards from './OpponentCards';

export class FourPlayerGameTable extends React.Component {
	render() {
		let current_player_cards = this.props.G.players[this.props.ctx.currentPlayer].cards;
		let teammate_cards = this.props.G.players[(this.props.ctx.currentPlayer + 2) % 4].cards;
		let opp_left_cards = this.props.G.players[(this.props.ctx.currentPlayer + 1) % 4].cards;
		let opp_right_cards = this.props.G.players[(this.props.ctx.currentPlayer + 3) % 4].cards;
		return <div className='GameTable' id='game_table'>
			<div id='player_cards_container'>
				<PlayerCards id="player_cards" cards= { current_player_cards } />
			</div>
			<div id='opp_left_cards_container'>
				<OpponentCards id="opp_left_cards" cards= { opp_left_cards } />
			</div>
			<div id='teammate_cards_container'>
				<TeammateCards id="teammate_cards" cards= { teammate_cards } />
			</div>
			<div id='opp_right_cards_container'>
				<OpponentCards id="opp_right_cards" cards= { opp_right_cards } />
			</div>
		</div>;
	}
};
