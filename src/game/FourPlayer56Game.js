import * as GameUtils from './GameUtils';
import { INVALID_MOVE } from 'boardgame.io/core';

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
	moves: {
		makeBid: {
				move: (G, ctx, amount) => {
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
					if (G.game_bid == null || amount > G.game_bid.bid_value) {
						G.game_bid = { player: ctx.currentPlayer, bid_value: amount };
					}
					G.bids.push({ player: ctx.currentPlayer, bid_value: amount });
			}
		},

		selectHideTrump: {
			move: (G, ctx) => {}
		},

		playCardFromHand: {
			move: (G, ctx) => {}
		}
	}
};
