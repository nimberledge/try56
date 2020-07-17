import React from 'react';

export class DummyDebugTable extends React.Component {
	render() {
		let phase = <div id="Current phase">Current game phase: {this.props.ctx.phase}</div>;
		let current_player_id = this.props.ctx.currentPlayer;
		let current_player = <div id="Current player">Current player: { current_player_id }</div>;
		let opp1 = <div id="opp1">Opponent 1: { (current_player_id + 1) % 4 }</div>;
		let teammate = <div id="teammate">Teammate: { (current_player_id + 2) % 4 }</div>;
		let opp2 = <div id="opp2">Opponent 2: { (current_player_id + 3) % 4 }</div>;
		let round = <div id="round">Current round: { this.props.G.rounds.length + 1 }</div>;
		let all_player_cards = [];

		for (let j = 0; j < 4; j++) {
			let t_player_id = (current_player_id + j) % 4;
			let cards = [];
			for (let i = 0; i < this.props.G.players[t_player_id].cards.length; i++) {
				var card = this.props.G.players[t_player_id].cards[i];
				let card_src = 'cards/' + card.rank + card.suit + '.svg';
				cards.push(<img class='card' src={ card_src } alt={ card_src } />);
			}
			all_player_cards.push(cards);
		}

		let current_round = '';
		if (this.props.ctx.phase === 'table_play_phase') {
			let current_round_cards = [];
			for (let i = 0; i < this.props.G.current_round.length; i++) {
				card = this.props.G.current_round[i].card;
				let card_src = 'cards/' + card.rank + card.suit + '.svg'
				current_round_cards.push(<img class='card' src={ card_src } alt={ card_src } />);
			}
			current_round = <div class='fan' data-fan='radius: 0'> { current_round_cards } </div>;
		} else {
			current_round = <div> No round to display </div>;
		}

		let hand0_div = <div class='hand hhand-compact active-hand'>
			{ all_player_cards[0] }
		</div>;
		let hand1_div = <div class='hand hhand-compact active-hand'>
			{ all_player_cards[1] }
		</div>;
		let hand2_div = <div class='hand hhand-compact active-hand'>
			{ all_player_cards[2] }
		</div>;
		let hand3_div = <div class='hand hhand-compact active-hand'>
			{ all_player_cards[3] }
		</div>;
		return <div>
		{ phase }
		{ current_player }
		{ hand0_div }
		{ opp1 }
		{ hand1_div }
		{ teammate }
		{ hand2_div }
		{ opp2 }
		{ hand3_div }
		{ round }
		{ current_round }
		</div>
	}
};
