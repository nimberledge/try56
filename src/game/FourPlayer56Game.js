import * as GameUtils from './GameUtils';
import { INVALID_MOVE } from 'boardgame.io/core';

const NUM_PLAYERS = 4;
const NUM_TABLE_ROUNDS = 8;
const BID_28_PTS = 1;
const BID_40_PTS = 2;
// const BID_TANI_PTS = NUM_PLAYERS;
const TANI_BID = 56;
const FIRST_BID_MINIMUM = 28;

function makeBid(G, ctx, amount) {
	// Make sure bids aren't nonsense
	if (amount > TANI_BID || amount < 0) {
		return INVALID_MOVE;
	}
	// Make sure first bid is >= 28
	if (G.bids.length === 0) {
		if (amount < FIRST_BID_MINIMUM) {
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
		G.chat.push(ctx.currentPlayer + " takes the bid at " + amount);
	}
	if (amount === 0) {
		G.chat.push(ctx.currentPlayer + " opts to pass");
	}

	// Log the history
	G.bids.push({ player: ctx.currentPlayer, bid_value: amount });
	if (isBiddingDone(G, ctx)) {
		ctx.events.endPhase();
	} else {
		ctx.events.endTurn();
	}
}

function isBiddingDone(G, ctx) {
	// If the current bid can't be outbid we're done
	if (G.game_bid != null && G.game_bid.bid_value === TANI_BID) {
		G.chat.push(G.game_bid.player + " wins the bid at " + G.game_bid.bid_value);
		return true;
	}
	// If there's < N bids bidding can't be done
	// Else bidding is done when there are N-1 passes in a row
	if (G.bids.length >= NUM_PLAYERS) {
		var bid_sum = 0;
		for (let i = G.bids.length - NUM_PLAYERS + 1; i < G.bids.length; i++) {
			bid_sum += G.bids[i].bid_value;
		}
		if (bid_sum === 0) {
			G.chat.push(G.game_bid.player + " wins the bid at " + G.game_bid.bid_value);
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

	// If a player requests trump, they're forced to play that suit
	// unless they don't have the suit
	if (G.imminent_trump_request) {
		if (card.suit !== G.trump_suit) {
			for (let i = 0; i < player_cards.length; i++) {
				if (player_cards[i].suit === G.trump_suit) {
					return false;
				}
			}
		}
		G.imminent_trump_request = false;
		return true;
	}
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

function computeGameWinner(G, ctx) {
	// Sum up each round's points, check if bidding team made their bid
	var team_totals = [0, 0];
	for (let i = 0; i < G.rounds.length; i++) {
		var round_total = 0;
		for (let j = 0; j < G.rounds[i].length; j++) {
			round_total += G.rounds[i][j].card.value;
		}
		team_totals[G.players[G.round_winners[i]].team] += round_total;
	}
	var bid_team = G.players[G.game_bid.player].team;
	var def_team = -1 * bid_team + 1;
	G.chat.push("Team " + bid_team + " made " + team_totals[bid_team] + " points");
	if (team_totals[bid_team] >= G.game_bid.bid_value) {
		G.chat.push("Team " + bid_team + " made their bid of " + G.game_bid.bid_value);
		if (G.game_bid.bid_value < 40) {
			G.overall_pts[bid_team] += BID_28_PTS;
		} else {
			G.overall_pts[bid_team] += BID_40_PTS;
		}
	} else {
		G.chat.push("Team " + bid_team + " failed to make their bid of " + G.game_bid.bid_value);
		if (G.game_bid.bid_value < 40) {
			G.overall_pts[def_team] += BID_28_PTS + 1;
		} else {
			G.overall_pts[def_team] += BID_40_PTS + 1;
		}
	}
	G.chat.push("Team 0 total: " + G.overall_pts[0]);
	G.chat.push("Team 1 total: " + G.overall_pts[1]);
}

function resetGameState(G, ctx) {
	G.game_bid = null;
	G.starting_player = (G.starting_player + 1) % NUM_PLAYERS;
	G.hidden_trump_card = null;
	G.trump_revealed = false;
	G.trump_suit = null;
	G.bids = [];
	G.rounds = [];
	G.round_winners = [];
	G.current_round = [];
	G.current_round_idx = null;
	G.imminent_trump_request = false;
	for (let i = 0; i < NUM_PLAYERS; i++) {
		G.players[i].cards = [];
	}
	// G.chat.push("");
	G.chat.push("Starting a new round");
	// Deal cards
	G.deck = GameUtils.generate4PDeck();
	var deck_length = G.deck.length;
	for (let i = 0; i < deck_length; i++) {
		G.players[i % NUM_PLAYERS].cards.push(G.deck.pop());
	}
	// Sort cards for the lads
	for (let i = 0; i < NUM_PLAYERS; i++) {
		GameUtils.sortHand(G.players[i].cards);
	}
	ctx.events.setPhase('bid_phase');
}

function playCardFromHand(G, ctx, card_index) {
	if (G.current_round.length === 0) {
		// Ensure bidding player does not lead trump suit
		if (!checkValidLead(G, ctx, card_index)) {
			return INVALID_MOVE;
		}
	} else {
		if (!checkValidSuit(G, ctx, G.current_round, card_index)) {
			return INVALID_MOVE;
		}
	}
	var card = G.players[ctx.currentPlayer].cards[card_index];
	G.current_round.push({ player: ctx.currentPlayer, card: card });
	G.players[ctx.currentPlayer].cards.splice(card_index, 1);
	G.chat.push(ctx.currentPlayer + " played " + card.rank + card.suit);

	// Once all cards in a round are played, log the round and
	// determine the next round's starter
	if (G.current_round.length === NUM_PLAYERS) {
		G.rounds.push(G.current_round);
		var next_starter = GameUtils.computeRoundWinner(G.current_round, G.trump_suit);
		G.round_winners.push(next_starter);
		G.current_round = [];
		G.current_round_idx++;
		G.chat.push(next_starter + " won round " + G.current_round_idx);

		// If we've played all the rounds, compute whether teams made their bid amounts
		if (G.rounds.length === NUM_TABLE_ROUNDS) {
			computeGameWinner(G, ctx);
			resetGameState(G, ctx);
		} else {
			ctx.events.endTurn({ next: next_starter });
		}
	} else {
		ctx.events.endTurn();
	}
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
	G.chat.push(ctx.currentPlayer + " asked for the trump card.");
	G.chat.push("It was " + G.hidden_trump_card.rank + G.hidden_trump_card.suit);
	G.players[G.game_bid.player].cards.push(G.hidden_trump_card);
	GameUtils.sortHand(G.players[G.game_bid.player].cards);
	G.imminent_trump_request = true;
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
			imminent_trump_request: false,
			rounds: [],
			round_winners: [],
			current_round_idx: null,
			current_round: [],
			bids: [],
			overall_pts: [0, 0]
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
			turn: {
				order: {
					first: (G, ctx) => G.starting_player,
					next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
				}
			},
			start: true,
			next: 'hide_trump_phase',
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
			},
			moves: {
				playCardFromHand,
				// Don't count trump request as a move, as you still have to play a card
				requestTrump: {
					move: requestTrumpReveal,
					noLimit: true
				}
			},
		},
	},
};
