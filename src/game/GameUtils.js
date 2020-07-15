export const RANK_ORDER = ['J', '9', 'A', 'T', 'K', 'Q'];
export const SUIT_ORDER = ['C', 'D', 'S', 'H'];

export const shuffleDeck = (deck) => {
	for (let i = deck.length - 1; i > 0; i--) {
		// Swap positions of every card with a random other card
		var j = Math.floor(Math.random() * (i+1));
		var temp = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}
	return deck;
}

export const generate4PDeck = () => {
	let deck = [];
	let suits = ['C', 'D', 'H', 'S'];
	let ranks = ['J', '9', 'A', 'T'];
	let values = [3, 2, 1, 1];
	for (let i = 0; i < suits.length; i++) {
		for (let j = 0; j < ranks.length; j++) {
			// Add cards as objects with suits, ranks, and values
			deck.push({suit: suits[i], rank: ranks[j], value: values[j]});
			deck.push({suit: suits[i], rank: ranks[j], value: values[j]});
		}
	}
	return shuffleDeck(deck);
};

export const generate6PDeck = () => {
	let deck = [];
	let suits = ['C', 'D', 'H', 'S'];
	let ranks = ['J', '9', 'A', 'T', 'K', 'Q'];
	let values = [3, 2, 1, 1, 0, 0];
	for (let i = 0; i < suits.length; i++) {
		for (let j = 0; j < ranks.length; j++) {
			// Add cards as objects with suits, ranks, and values
			deck.push({suit: suits[i], rank: ranks[j], value: values[j]});
			deck.push({suit: suits[i], rank: ranks[j], value: values[j]});
		}
	}
	return shuffleDeck(deck);
};

export const compareRank = (first, second) => {
	return RANK_ORDER.indexOf(first.rank) - RANK_ORDER.indexOf(second.rank);
}

export const compareSuit = (first, second) => {
	return SUIT_ORDER.indexOf(first.suit) - SUIT_ORDER.indexOf(second.suit);
}

export const sortHand = (cards) => {
	cards.sort(compareRank);
	cards.sort(compareSuit);
}

// Compare earlier (first) and later (second) cards based on which wins a round
export const cardCompare = (first, second, round_suit, trump_suit) => {
	// Case 1: (if) No trump suit comparison
	// Case 2: (else) At least one card is a trump card
	if (trump_suit == null || round_suit === trump_suit ||
		(first.suit !== trump_suit && second.suit !== trump_suit)) {
		if (first.suit === round_suit && second.suit !== round_suit) {
			return 1;
		} else if (first.suit !== round_suit && second.suit === round_suit) {
			return -1;
		} else if (first.suit !== round_suit && second.suit !== round_suit) {
			return 0;
		} else {
			if (RANK_ORDER.indexOf(second.rank) < RANK_ORDER.indexOf(first.rank)) {
				return -1;
			} else {
				return 1;
			}
		}
	} else {
		if (first.suit === trump_suit && second.suit !== trump_suit) {
			return 1;
		} else if (first.suit !== trump_suit && second.suit === trump_suit) {
			return -1;
		} else {
			if (RANK_ORDER.indexOf(second.rank) < RANK_ORDER.indexOf(first.rank)) {
				return -1;
			} else {
				return 1;
			}
		}
	}
}

// Take a round and the trump_suit (can be null) and compute the winner
export const computeRoundWinner = (round, trump_suit) => {
	var current_winner = round[0].player;
	var winning_card = round[0].card;
	var round_suit = winning_card.suit;
	for (let i = 1; i < round.length; i++) {
		if (cardCompare(winning_card, round[i].card, round_suit, trump_suit) < 0) {
			winning_card = round[i].card;
			current_winner = round[i].player;
		}
	}
	return current_winner;
}
