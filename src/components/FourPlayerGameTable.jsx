import React from 'react';
import PlayerCards from './PlayerCards';
import TeammateCards from './TeammateCards';
import OpponentCards from './OpponentCards';
import ScoreBoard from './ScoreBoard';
import CurrentRound from './CurrentRound';
import HiddenTrumpCard from './HiddenTrumpCard';

export class FourPlayerGameTable extends React.Component {
	render() {
		let current_player = this.props.playerID;
		// let current_player_cards = this.props.G.players[this.props.playerID].cards;
		// let current_player = this.props.ctx.currentPlayer;
		let current_player_cards = this.props.G.players[current_player].cards;
		// multiply by 1 so JS treats as an integer
		let teammate_cards = this.props.G.players[(current_player*1 + 2) % 4].cards;
		let opp_left_cards = this.props.G.players[(current_player*1 + 1) % 4].cards;
		let opp_right_cards = this.props.G.players[(current_player*1 + 3) % 4].cards;
		let is_bid_phase = this.props.ctx.phase === 'bid_phase' || this.props.ctx.phase === 'hide_trump_phase';
		// console.log(is_bid_phase);
		// console.log(this.props.ctx.phase);
		// console.log(this.props.playerID);
		let table_id = 'game_table';
		let game_table_div = <div className='GameTable' id={ table_id }>
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
			<div id='table_cards_container'>
				<CurrentRound id="round_cards" round={ this.props.G.current_round } current_player={ current_player } />
			</div>
			<div id='trump_card_container'>
				<HiddenTrumpCard id="hidden-trump-card" game_bid={ this.props.G.game_bid } current_player={ current_player }
					trump_revealed={ this.props.G.trump_revealed } imminent_trump_request={ this.props.G.imminent_trump_request }
					trump_card={ this.props.G.hidden_trump_card } bid_phase={ is_bid_phase } />
			</div>
		</div>;
		// Scoreboard
		let score_board_container = <div id='scoreboard-container'>
			<ScoreBoard id='score-board' score={ this.props.G.overall_pts } />
		</div>;




		return <div>
			{ game_table_div }
			{ score_board_container }
		</div>;
	}
};
