import React from 'react';



class PlayerCards extends React.Component {

	justAlert() {
		alert("yipee");
	}

	playCard() {
		console.log(this.id);
	}

	render () {
		let card_imgs = [];
		for (let i = 0; i < this.props.cards.length; i++) {
			let card_src = 'cards/' + this.props.cards[i].rank + this.props.cards[i].suit + '.svg';
			let card_key = 'player_cards' + i;
			let elem = <img className='card' id={ card_key } src={ card_src } alt={ card_src } onClick={this.playCard()} />;
			elem.addEventListener('click', this.justAlert());
			card_imgs.push(elem);
		}
		return <div className="hand hhand-compact hand-active" id="player-cards"> { card_imgs } </div>;
	}
}

export default PlayerCards;
