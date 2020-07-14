import * as GameUtils from './GameUtils';
import { INVALID_MOVE } from 'boardgame.io/core';

function makeBid(G, ctx, amount) {
	// Make sure bids aren't nonsense
	if (amount > 56 || amount < 0) {
		return INVALID_MOVE;
	}
	// Make sure first bid is >= 28
	if (G.bids.length === 0) {
		if (amount < 28) {
			return INVALID_MOVE;
		}
	} else {
		// Make sure that you can only outbid or pass
		if (amount <= G.game_bid.bid_value && amount !== 0) {
			return INVALID_MOVE;
		}
	}
	// If you're outbidding a teammate in the 28-39 range
	// you must bid 40+
	if (G.game_bid != null && G.game_bid.bid_value < 40 && amount < 40 && amount !== 0) {
		if (G.players[G.game_bid.player].team === G.players[ctx.currentPlayer].team) {
			return INVALID_MOVE;
		}
	}
	// If you've outbid the current bid on table, congrats
	if (G.game_bid == null || amount > G.game_bid.bid_value) {
		G.game_bid = { player: ctx.currentPlayer, bid_value: amount };
	}

	// Log the history
	G.bids.push({ player: ctx.currentPlayer, bid_value: amount });
}

function isBiddingDone(G, ctx) {
	// If the current bid can't be outbid we're done
	if (G.game_bid != null && G.game_bid.bid_value === 56) {
		return true;
	}
	// If there's < 4 bids bidding can't be done
	// Else bidding is done when there are 3 passes in a row
	if (G.bids.length >= 4) {
		var bid_sum = 0;
		for (let i = G.bids.length - 3; i < G.bids.length; i++) {
			bid_sum += G.bids[i].bid_value;
		}
		console.log(bid_sum);
		if (bid_sum === 0) {
			return true;
		}
	}
	return false;
}

export const FourPlayer56Game = {
	name: "Four-Player-56",
	setup: () => {
		var deck = GameUtils.generate4PDeck();
		var start = {
			board: [],
			chat: [],
			players: {
				0: {cards: [], team: 0},
				1: {cards: [], team: 1},
				2: {cards: [], team: 0},
				3: {cards: [], team: 1},
			},
			deck: deck,
			game_bid: null,
			starting_player: 0,
			hidden_trump_card: null,
			bids: []
		};
		// Deal cards to all players
		var deck_length = deck.length;
		for (let i = 0; i < deck_length; i++) {
			start.players[i % 4].cards.push(start.deck.pop());
		}
		return start;
	},

	turn: {
		moveLimit: 1,
	},

	phases: {
		bid_phase: {
			moves: { makeBid },
			start: true,
			next: null,
			endIf: isBiddingDone,
		},
		// hide_trump_phase: {
		// 	moves: { hideTrump }
		// },
	},

	// moves: {
	// 	selectHideTrump: {
	// 		move: (G, ctx) => {}
	// 	},
	//
	// 	playCardFromHand: {
	// 		move: (G, ctx) => {}
	// 	}
	// }
};
