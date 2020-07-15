import * as GameUtils from './GameUtils';
import { INVALID_MOVE } from 'boardgame.io/core';

const NUM_PLAYERS = 4;
const NUM_TABLE_ROUNDS = 8;

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
	// If there's < N bids bidding can't be done
	// Else bidding is done when there are N-1 passes in a row
	if (G.bids.length >= NUM_PLAYERS) {
		var bid_sum = 0;
		for (let i = G.bids.length - NUM_PLAYERS + 1; i < G.bids.length; i++) {
			bid_sum += G.bids[i].bid_value;
		}
		console.log(bid_sum);
		if (bid_sum === 0) {
			return true;
		}
	}
	return false;
}

function selectHideTrump(G, ctx, card_index) {
	G.hidden_trump_card = G.players[ctx.currentPlayer].cards[card_index];
	G.players[ctx.currentPlayer].cards.splice(card_index, 1);
	ctx.events.endPhase();
}

function checkValidSuit(G, ctx, round, card_index) {
	if (round.length === 0) {
		return true;
	}
	var round_suit = round[0].card.suit;
	var player_cards = G.players[ctx.currentPlayer].cards;
	var card = player_cards[card_index];
	// Only allow a mismatch of suits if player has no option
	if (card.suit !== round_suit) {
		for (let i = 0; i < player_cards.length; i++) {
			if (player_cards[i].suit === round_suit) {
				return false;
			}
		}
		return true;
	}
	return true;
}

function checkValidLead(G, ctx, card_index) {
	// If you're not the bidder there are no invalid leads
	// If the trump is revealed there are no invalid leads
	if (ctx.currentPlayer !== G.game_bid.player || G.trump_revealed) {
		return true;
	}
	// Only allow trump lead when it hasn't been revealed and bidder
	// has no alternative
	var player_cards = G.players[ctx.currentPlayer].cards;
	var card = player_cards[card_index];
	if (card.suit === G.hidden_trump_card.suit) {
		for (let i = 0; i < player_cards.length; i++) {
			if (player_cards[i].suit !== card.suit) {
				return false;
			}
		}
	}
	return true;
}

function playCardFromHand(G, ctx, card_index) {
	if (G.current_round.length !== 0) {
		if (!checkValidSuit(G, ctx, G.current_round, card_index)) {
			return INVALID_MOVE;
		}
	} else {
			// Ensure bidding player does not lead trump suit
			if (!checkValidLead(G, ctx, card_index)) {
				return INVALID_MOVE;
			}
	}
	G.current_round.push({ player: ctx.currentPlayer,
			card: G.players[ctx.currentPlayer].cards[card_index] });
	G.players[ctx.currentPlayer].cards.splice(card_index, 1);

	// Once all cards in a round are played, log the round and
	// determine the next round's starter
	if (G.current_round.length === NUM_PLAYERS) {
		G.rounds.push(G.current_round);
		G.current_round = [];
		G.current_round_idx++;
		if (G.rounds.length === NUM_TABLE_ROUNDS) {
			ctx.events.endPhase();
		}
	}
	ctx.events.endTurn();
}

function validTrumpRequst(G, ctx, round) {
	if (G.trump_revealed) {
		return false;
	}
	// If on the first move, there are no valid trump requests
	if (round.length === 0) {
		return false;
	}
	// Make sure trump request is forced by not having round_suit
	var round_suit = round[0].card.suit;
	var player_cards = G.players[ctx.currentPlayer].cards;
	for (let i = 0; i < player_cards.length; i++) {
		if (player_cards[i].suit === round_suit) {
			return false;
		}
	}
	return true;
}

function requestTrumpReveal(G, ctx) {
	// TODO: Validate move
	if (!validTrumpRequst(G, ctx, G.current_round)) {
		return INVALID_MOVE;
	}
	G.trump_revealed = true;
	G.trump_suit = G.hidden_trump_card.suit;
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
			trump_revealed: false,
			trump_suit: null,
			rounds: [],
			current_round_idx: null,
			current_round: [],
			bids: []
		};
		// Deal cards to all players
		var deck_length = deck.length;
		for (let i = 0; i < deck_length; i++) {
			start.players[i % NUM_PLAYERS].cards.push(start.deck.pop());
		}
		// Sort cards for the lads
		for (let i = 0; i < NUM_PLAYERS; i++) {
			GameUtils.sortHand(start.players[i].cards);
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
			next: 'hide_trump_phase',
			endIf: isBiddingDone,
		},
		hide_trump_phase: {
			// Winning bidder's turn to select a trump card
			turn: {
				order: {
					first: (G, ctx) => G.game_bid.player,
				}
			},
			moves: { selectHideTrump },
			next: 'table_play_phase'
		},
		table_play_phase: {
			// Left of the dealer starts the roundplay
			onBegin: (G, ctx) => {
				G.current_round_idx = 0;
				G.current_round = [];
			},
			turn: {
				order: {
					first: (G, ctx) => G.starting_player,
					next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
				},
				moveLimit: 1,
			},
			moves: {
				playCardFromHand,
				requestTrump: {
					move: requestTrumpReveal,
					noLimit: true
				}
			},
		},
	},
};
