import React from 'react';

class CurrentPlayerInfo extends React.Component {
	render() {
		let team_colors = ['blue', 'red'];
		let current_player_color = team_colors[((this.props.playerID*1) % 2)];
		let current_player_info = <div id='current-player-info' style={{color:current_player_color}}> Player { this.props.playerID } </div>
		let opp_player_color = team_colors[((this.props.playerID*1 + 1) % 2)];

		let west_player = (this.props.playerID*1 + 1) % 4;
		let west_player_info = <div id='west-player-info' style={{color:opp_player_color}}> Player { west_player } </div>;

		let north_player = (this.props.playerID*1 + 2) % 4;
		let north_player_info = <div id='north-player-info' style={{color:current_player_color}}> Player { north_player } </div>;

		let east_player = (this.props.playerID*1 + 3) % 4;
		let east_player_info = <div id='east-player-info' style={{color:opp_player_color}}> Player { east_player } </div>;

		return <div>
			{ current_player_info }
			{ west_player_info }
			{ north_player_info }
			{ east_player_info }
		</div>;
	}
}

export default CurrentPlayerInfo;
