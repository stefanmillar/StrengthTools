import React from 'react';
import './RpeTable.css';

export default class RpeTable extends React.Component {
	constructor(props) {
		super(props);

		this.renderTableRows = this.renderTableRows.bind(this);

	}

	renderTableRows() {
		let table = this.props.weightTable;
		let htmlArray = [];
		if(table) {
			for(let i = 10; i >= 6.5; i -= 0.5) {
				let key = i.toString();
				htmlArray.push(
					<tr>
						<th scope="col">{key}</th>
						<th scope="col">{table[key][this.props.reps]}</th>
			  		</tr>
				);
			}
		}

		return htmlArray;
	}

	render() {
		return (
			<table className="table">
  				<thead>
    				<tr>
      					<th scope="col">RPE</th>
      					<th scope="col">Weight</th>
    				</tr>
  				</thead>
  				<tbody>
					{this.renderTableRows()}
  				</tbody>
			</table>
		);
	}
}