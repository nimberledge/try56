import React from 'react';

class HiddenTrumpCard extends React.Component {
	processTrumpRequest() {
		this.props.moves.requestTrump();
	}

	render () {
		// Cards in order of SWNE
		let bidder_position = -1;
		if (!!this.props.game_bid) {
			bidder_position = (this.props.game_bid.player*1 + (4-this.props.current_player*1)) % 4;
		}

		let west_card = '';
		let north_card = '';
		let east_card = '';
		let south_card = '';

		if (bidder_position === 1) {
			if (this.props.bid_phase) {
				west_card = <div id='west-trump-card'> <img className='card' src='' alt='' /> </div>;
			} else if (!this.props.trump_revealed) {
				west_card = <div id='west-trump-card'>
					<img className='card' src='cards/Red_Back.svg' alt='' onClick={ () => this.processTrumpRequest() } />
				</div>;
			} else if (this.props.imminent_trump_request) {
				let card_src = 'cards/' + this.props.trump_card.rank + this.props.trump_card.suit + '.svg';
				west_card = <div id='west-trump-card'> <img className='card' src={ card_src } alt={ card_src } /> </div>;
			}
		} else {
				west_card = <div id='west-trump-card'> <img className='card' src='' alt='' /> </div>;
		}

		if (bidder_position === 2) {
			if (this.props.bid_phase) {
				north_card = <div id='north-trump-card'> <img className='card' src='' alt='' /> </div>;
			} else if (!this.props.trump_revealed) {
				north_card = <div id='north-trump-card'>
					<img className='card' src='cards/Red_Back.svg' alt='' onClick={ () => this.processTrumpRequest() } />
				</div>;
			} else if (this.props.imminent_trump_request) {
				let card_src = 'cards/' + this.props.trump_card.rank + this.props.trump_card.suit + '.svg';
				north_card = <div id='north-trump-card'> <img className='card' src={ card_src } alt={ card_src } /> </div>;
			}
		} else {
			north_card = <div id='north-trump-card'> <img className='card' src='' alt='' /> </div>;
		}

		if (bidder_position === 3) {
			if (this.props.bid_phase) {
				east_card = <div id='east-trump-card'> <img className='card' src='' alt='' /> </div>;
			} else if (!this.props.trump_revealed) {
				east_card = <div id='east-trump-card'>
					<img className='card' src='cards/Red_Back.svg' alt='' onClick={ () => this.processTrumpRequest() } />
				</div>;
			} else if (this.props.imminent_trump_request) {
				let card_src = 'cards/' + this.props.trump_card.rank + this.props.trump_card.suit + '.svg';
				east_card = <div id='east-trump-card'> <img className='card' src={ card_src } alt={ card_src } /> </div>;
			}
		} else {
			east_card = <div id='east-trump-card'> <img className='card' src='' alt='' /> </div>;
		}

		if (bidder_position === 0) {
			if (this.props.bid_phase) {
				south_card = <div id='south-trump-card'> <img className='card' src='' alt='' /> </div>;
			} else if (!this.props.trump_revealed) {
				south_card = <div id='south-trump-card'>
					<img className='card' src='cards/Red_Back.svg' alt='' onClick={ () => this.processTrumpRequest() } />
				</div>;
			} else if (this.props.imminent_trump_request) {
				let card_src = 'cards/' + this.props.trump_card.rank + this.props.trump_card.suit + '.svg';
				south_card = <div id='south-trump-card'> <img className='card' src={ card_src } alt={ card_src } /> </div>;
			}
		} else {
			south_card = <div id='south-trump-card'> <img className='card' src='' alt='' /> </div>;
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

export default HiddenTrumpCard;
