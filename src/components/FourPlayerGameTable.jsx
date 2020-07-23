import React from 'react';
import TeammateCards from './TeammateCards';
import OpponentCards from './OpponentCards';
import ScoreBoard from './ScoreBoard';
import CurrentRound from './CurrentRound';
import HiddenTrumpCard from './HiddenTrumpCard';
import BidTable from './BidTable';
import GameInfo from './GameInfo';
import CurrentPlayerInfo from './CurrentPlayerInfo';
import { INVALID_MOVE } from 'boardgame.io/core';

export class FourPlayerGameTable extends React.Component {
	playCard(card_key, ctx, playerID) {
		// Make clicks invalid if it's not the current player's turn
		if (ctx.phase === 'bid_phase' || ctx.currentPlayer !== playerID) {
			alert("Wait for your turn");
			return;
		}
		let card_index = card_key.slice(9);
		// alert(card_index);
		if (ctx.phase === 'hide_trump_phase') {
			this.props.moves.selectHideTrump(card_index*1);
		} else if (ctx.phase === 'table_play_phase') {
			if (this.props.moves.playCardFromHand(card_index*1) === INVALID_MOVE) {
				alert("Invalid move");
			};
		}
	}

	getPlayerCardImgs(hand, ctx, playerID) {
		let card_imgs = [];
		for (let i = 0; i < hand.length; i++) {
			let card_src = 'cards/' + hand[i].rank + hand[i].suit + '.svg';
			let card_key = 'play_card' + i;
			card_imgs.push(<img className='card' id={ card_key } src={ card_src } alt={ card_src }
			onClick={(() => this.playCard(card_key, ctx, playerID))} />);
		}
		return card_imgs;
	}

	triggerStartNewRound() {
		this.props.moves.startNewRound();
	}

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

		let bid_table_div = '';
		if (this.props.ctx.phase === 'bid_phase') {
			bid_table_div = <BidTable game_bid={ this.props.G.game_bid } ctx={ this.props.ctx } moves={ this.props.moves } />;
		} else {
			bid_table_div = <div />;
		}

		// Was not able to make a hand active, so let's try what I did with the debug table
		let select_trump_div = '';
		if (this.props.ctx.phase ==='hide_trump_phase') {
			if (this.props.ctx.currentPlayer === this.props.playerID) {
				select_trump_div = <div id='select-trump-div'> Select your trump card to hide </div>;
			} else {
				select_trump_div = <div id='select-trump-div'> { this.props.ctx.currentPlayer } is choosing a trump card</div>;
			}
		} else {
			select_trump_div = <div id='select-trump-div'> </div>;
		}

		let start_new_round_button = '';
		if (this.props.ctx.phase === 'start_new_round_phase' && this.props.ctx.currentPlayer == current_player) {
			start_new_round_button = <div id='new-round-div' style={{'z-index': +2}}>
				<button id='new-round-button' onClick={ (() => this.triggerStartNewRound()) }> Start new round </button>
			</div>;
		} else {
			start_new_round_button = <div id='new-round-div'>
			</div>;
		}


		let play_card_imgs = this.getPlayerCardImgs(current_player_cards, this.props.ctx, current_player);
		let table_id = 'game_table';
		let game_table_div =
		<div className='GameTable' id={ table_id }>
			<div id='player_cards_container'>
				<div id="player_cards"  className="hand hhand-compact active-hand">
					{ play_card_imgs }
				</div>
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
					trump_card={ this.props.G.hidden_trump_card } bid_phase={ is_bid_phase } moves={ this.props.moves } />
			</div>
			<div id='bid_table_container'>
				{ bid_table_div }
			</div>
			{ select_trump_div }
			{ start_new_round_button }
		</div>;
		let info_div = <div id='game-info-container'>
			<GameInfo score={ this.props.G.overall_pts } last_round_info={ this.props.G.last_round_info }
				game_bid={ this.props.G.game_bid } bids={ this.props.G.bids } starting_player={ this.props.G.starting_player }
				round_winners={ this.props.G.round_winners } />
		</div>;

		let player_info = <CurrentPlayerInfo playerID={ current_player } playing={ this.props.ctx.currentPlayer } />;

		return <div id='main-container'>
			{ game_table_div }
			{ info_div }
			{ player_info }
		</div>;
	}
};
