import React from 'react';

export class DummyDebugTable extends React.Component {
	render() {
		let phase = <div id="Current phase">Current game phase: {this.props.ctx.phase}</div>;
		let current_player_id = this.props.ctx.currentPlayer;
		let current_player = <div id="Current player">Current player: { current_player_id }</div>;
		let p0 = <div id="p0">Player: { 0 }</div>;
		let p1 = <div id="p1">Player: { 1 }</div>;
		let p2 = <div id="p2">Player: { 2 }</div>;
		let p3 = <div id="p3">Player: { 3 }</div>;
		let round = <div id="round">Current round: { this.props.G.rounds.length + 1 }</div>;
		let all_player_cards = [];

		for (let j = 0; j < 4; j++) {
			let cards = [];
			for (let i = 0; i < this.props.G.players[j].cards.length; i++) {
				var card = this.props.G.players[j].cards[i];
				let card_src = 'cards/' + card.rank + card.suit + '.svg';
				cards.push(<img className='card' src={ card_src } alt={ card_src } />);
			}
			all_player_cards.push(cards);
		}

		let current_round = '';
		if (this.props.ctx.phase === 'table_play_phase') {
			let current_round_cards = [];
			for (let i = 0; i < this.props.G.current_round.length; i++) {
				card = this.props.G.current_round[i].card;
				let card_src = 'cards/' + card.rank + card.suit + '.svg'
				current_round_cards.push(<img className='card' src={ card_src } alt={ card_src } />);
			}
			current_round = <div className='hand hhand'> { current_round_cards } </div>;
		} else {
			current_round = <div> No round to display </div>;
		}

		let game_bid_div = '';
		if (this.props.G.game_bid !== null) {
			game_bid_div = <div id="game_bid"> Game bid: { this.props.G.game_bid.bid_value } by { this.props.G.game_bid.player}</div>;
		} else {
			game_bid_div = <div id="game_bid"> No current bid </div>;
		}

		// Display bid history
		let bid_history = [];
		let bids = this.props.G.bids;
		let bid_history_div = '';
		console.log(bids);
		if (bids.length > 0) {
			bid_history.push(<p> Bid history </p>);
			for (let i = 0; i < bids.length; i++) {
				bid_history.push(<p> { bids[i].bid_value === 0? "Pass" : bids[i].bid_value } by { bids[i].player } </p>);
			}
			bid_history_div = <div id="bid_history_div"> { bid_history } </div>;
		} else {
			bid_history_div = <div id="bid_history_div"> No bids to show </div>;
		}

		let hand0_div = <div className='hand hhand-compact active-hand'>
			{ all_player_cards[0] }
		</div>;
		let hand1_div = <div className='hand hhand-compact active-hand'>
			{ all_player_cards[1] }
		</div>;
		let hand2_div = <div className='hand hhand-compact active-hand'>
			{ all_player_cards[2] }
		</div>;
		let hand3_div = <div className='hand hhand-compact active-hand'>
			{ all_player_cards[3] }
		</div>;
		return <div>
		{ bid_history_div }
		{ round }
		{ current_round }
		{ phase }
		{ current_player }
		{ game_bid_div }
		{ p0 }
		{ hand0_div }
		{ p1 }
		{ hand1_div }
		{ p2 }
		{ hand2_div }
		{ p3 }
		{ hand3_div }
		</div>
	}
};
