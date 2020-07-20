import React from 'react';

class PlayerCards extends React.Component {
	render () {
		let card_imgs = [];
		for (let i = 0; i < this.props.cards.length; i++) {
			let card_src = 'cards/' + this.props.cards[i].rank + this.props.cards[i].suit + '.svg';
			card_imgs.push(<img class='card' src={ card_src } alt={ card_src } />);
		}
		return <div className="hand hhand-compact hand-active" id="player-cards"> { card_imgs } </div>;
	}
}

export default PlayerCards;
