import React from 'react';

class CurrentRound extends React.Component {
	render () {
		// Cards in order of SWNE
		let positions = ['south', 'west', 'north', 'east'];
		let cards_played = [null, null, null, null];
		console.log(this.props.round);
		for (let i = 0; i < this.props.round.length; i++) {
			// multiply by 1 for type casting?
			let player_position = (this.props.round[i].player*1 + (4-this.props.current_player*1)) % 4;
			console.log(player_position + positions[player_position]);
			let card_src = 'cards/' + this.props.round[i].card.rank + this.props.round[i].card.suit + '.svg';
			cards_played[player_position] = <img className='card' src={ card_src } alt={ card_src } />;
		}
		let west_card = '';
		let north_card = '';
		let east_card = '';
		let south_card = '';
		console.log(cards_played);
		if (!!cards_played[1]) {
			west_card = <div id='west-table-card'> { cards_played[1] } </div>;
		} else {
			west_card = <div id='west-table-card'> <img className='card' src='' alt='' /> </div>;
		}
		if (!!cards_played[2]) {
			north_card = <div id='north-table-card'> { cards_played[2] } </div>;
		} else {
			north_card = <div id='north-table-card'> <img className='card' src='' alt='' /> </div>;
		}
		if (!!cards_played[3]) {
			east_card = <div id='east-table-card'> { cards_played[3] } </div>;
		} else {
			east_card = <div id='east-table-card'> <img className='card' src='' alt='' /> </div>;
		}
		if (!!cards_played[0]) {
			south_card = <div id='south-table-card'> { cards_played[0] } </div>;
		} else {
			south_card = <div id='south-table-card'> <img className='card' src='' alt='' /> </div>;
		}
		// console.log(cards_played);
		return <div>
		{ west_card }
		{ north_card }
		{ east_card }
		{ south_card }
		</div>
	}
}

export default CurrentRound;
