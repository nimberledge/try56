import React from 'react';

class OpponentCards extends React.Component {
	render () {
		let card_imgs = [];
		console.log(this.props.cards.length + " opp cards");
		for (let i = 0; i < this.props.cards.length; i++) {
			card_imgs.push(<img class='card' src='cards/Blue_Back.svg' alt='rip' />);
		}
		return <div className="hand hhand-compact"> { card_imgs } </div>;
	}
}

export default OpponentCards;
