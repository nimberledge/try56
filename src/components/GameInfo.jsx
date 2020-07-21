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
		let last_game_result = '';
		if (!!this.props.last_round_info) {
			let rinfo = this.props.last_round_info;
			let bid_team = ['Blue', 'Red'][rinfo.bid_team];
			let bid_team_total = rinfo.team_totals[rinfo.bid_team];
			last_game_result = <div id='last_game_result'>
				Last round: Team { bid_team } bid { rinfo.game_bid.bid_value } and made { bid_team_total } points
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
			game_bid = <div id='game_bid'> No bids on the table </div>;
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

		return <div id='game-info'>
			{ score_table }
			{ last_game_result }
			{ game_bid }
			{ bid_history_table }
		</div>
	}
}

export default GameInfo;
