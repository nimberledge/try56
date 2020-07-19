import React from 'react';

class ScoreBoard extends React.Component {
	render () {
		let score_div = <div id='scoreboard-title'> Score </div>;
		let teams_div = <div id='team-names'> 1 2 </div>;
		let scores_div = <div id='team-scores'> { this.props.score[0] } { this.props.score[1] } </div>;
		return <div>
			{ score_div }
			{ teams_div }
			{ scores_div }
		</div>
	}
}

export default ScoreBoard;
