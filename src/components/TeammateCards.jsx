import React from 'react';

class TeammateCards extends React.Component {
	render () {
		let card_imgs = [];
		for (let i = 0; i < this.props.cards.length; i++) {
			card_imgs.push(<img class='card' src='cards/Blue_Back.svg' alt='rip' />);
		}
		return <div className="hand hhand-compact"> { card_imgs } </div>;
	}
}

export default TeammateCards;
