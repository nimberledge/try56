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
