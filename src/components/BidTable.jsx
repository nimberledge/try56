import React from 'react';
import { INVALID_MOVE } from 'boardgame.io/core';

class BidTable extends React.Component {
	processBid(button_id) {
		if (this.props.ctx.phase !== 'bid_phase') {
			alert("How did you manage this??!!111");
			return;
		}
		let bid_value = button_id.slice(10);
		if (this.props.moves.makeBid(bid_value*1) === INVALID_MOVE) {
			alert("Illegal bid");
		};
	}

	render () {
		let button_rows = [];
		let row0_bids = [28, 29, 30, 31, 32, 33, 34];
		let row1_bids = [35, 36, 37, 38, 39];
		let row2_bids = [40, 41, 42, 43, 44, 45, 46];
		let row3_bids = [47, 48, 49, 50, 51, 52, 53];
		let row4_bids = [54, 55, 56];
		let row5_bids = [0];
		let bid_rows = [row0_bids, row1_bids, row2_bids, row3_bids, row4_bids, row5_bids];
		for (let i = 0; i < bid_rows.length; i++) {
			let button_row = [];
			for (let j = 0; j < bid_rows[i].length; j++) {
				let button_id = 'bid_button' + bid_rows[i][j];

				if (bid_rows[i][j] === 0) {
					button_row.push(<td>
						<button id={ button_id } onClick={ () => this.processBid(button_id) }>
						{ "Pass" }
						</button>
					</td>);
					continue;
				}

				if (!!this.props.game_bid && this.props.game_bid.bid_value >= bid_rows[i][j]) {
					button_row.push(<td>
						<button id={ button_id } disabled={ true } >
							{ bid_rows[i][j] }
						</button>
						</td>);
				} else {
					button_row.push(<td>
						<button id={ button_id } onClick={ () => this.processBid(button_id) }>
						{ bid_rows[i][j] }
						</button>
					</td>);
				}
			}
			let row_id = 'row_' + (i+1);
			button_rows.push(<tr id={ row_id }> { button_row } </tr>);
		}
		return <table id='bid_table'>
			{ button_rows }
		</table>
	}
}

export default BidTable;
