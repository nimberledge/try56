import React from 'react';

class GameInfo extends React.Component {
	render() {
		let score_table = <table id='score_table'>
			<th id='score_table_header'> Score </th>
			<tr>
			<td id='team0_cell'> Blue </td> <td id='team1_cell'> Red </td>
			</tr>
			<tr>
			<td id='team0_score'> { this.props.score[0] } </td> <td id='team1_score'> { this.props.score[1] } </td>
			</tr>
		</table>;
		let team_names = ['Blue', 'Red'];
		let team_colors = ['blue', 'red'];
		let last_game_result = '';
		if (!!this.props.last_round_info) {
			let rinfo = this.props.last_round_info;
			let bid_team = team_names[rinfo.bid_team];
			let bid_team_total = rinfo.team_totals[rinfo.bid_team];
			last_game_result = <div id='last_game_result'>
				Last game: Team { bid_team } bid { rinfo.game_bid.bid_value } and made { bid_team_total } points
			</div>
		} else {
			last_game_result = <div id='last_game_result'>
				No previous games
			</div>
		}

		let game_bid = '';
		if (!!this.props.game_bid) {
			game_bid = <div id='game_bid'> Current game bid: { this.props.game_bid.bid_value } by { this.props.game_bid.player } </div>;
		} else {
			game_bid = <div id='game_bid'> No bids on the table, { this.props.starting_player } to start  </div>;
		}

		let bid_history_table = '';
		if (this.props.bids.length > 0) {
			let bids = [];
			for (let i = 0; i < this.props.bids.length; i++) {
				let temp_bid = '';
				if (this.props.bids[i].bid_value === 0) {
					temp_bid = <td> Pass by { this.props.bids[i].player } </td>;
				} else {
					temp_bid = <td> { this.props.bids[i].bid_value } by { this.props.bids[i].player } </td>;
				}
				bids.push(<tr> { temp_bid } </tr>);
			}
			bid_history_table = <table id='bid_history_table'> <th> Bids: </th> { bids } </table>;
		} else {
			bid_history_table = <table id='bid_history_table'> </table>;
		}
		let round_history_table = '';
		if (this.props.round_winners.length > 0) {
			let rounds = [];
			for (let i = 0; i < this.props.round_winners.length; i++) {
				let round_color = team_colors[(this.props.round_winners[i]*1) % 2];
				rounds.push(<tr> <td style={{color: round_color}}> Round { i+1 } won by { this.props.round_winners[i] } </td> </tr>);
			}
			round_history_table = <table id='round-history-table'> <th> Rounds: </th> { rounds } </table>;
		} else {
			round_history_table = <table id='round-history-table'> </table>;
		}

		let bids_and_round_table = <table id='bid/round-table'> <tr>
		<td> { bid_history_table } </td>
		<td> { round_history_table } </td>
		</tr>
		</table>;

		return <div id='game-info'>
			{ score_table }
			{ last_game_result }
			{ game_bid }
			{ bids_and_round_table }
		</div>
	}
}

export default GameInfo;
