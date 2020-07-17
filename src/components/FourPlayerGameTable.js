import React from 'react';

function generateCard(card) {
	let retval = document.createElement('img');
	retval.className = 'card';
	retval.src = 'cards/' + card.rank + card.suit + '.svg';
	return retval;
}

export class FourPlayerGameTable extends React.Component {
	render() {
		let phase = <div id="Current phase">Current game phase: {this.props.ctx.phase}</div>;
		let current_player_id = this.props.ctx.currentPlayer;
		let current_player = <div id="Current player">Current player: { current_player_id }</div>;
		let player_cards = [];
		let alt_card_str = '';
		let cards = []
		for (let i = 0; i < this.props.G.players[current_player_id].cards.length; i++) {
			var card = this.props.G.players[current_player_id].cards[i];
			let card_src = 'cards/' + card.rank + card.suit + '.svg'
			cards.push(<img class='card' src={ card_src } />);
		}
		let hand_div = <div class='hand hhand-compact active-hand'>
			{ cards }
		</div>
		// let alt_cards = <div id="Cards-text"> Cards: { alt_card_str }</div>;
		// let data_hand_str = "cards: " + player_cards;
		// let player_hand = <div className="hand hhand-compact active-hand"
		// 		data-hand={ data_hand_str } />;
		return <div>
		{ phase }
		{ current_player }
		{ hand_div }
		</div>
	}
};
