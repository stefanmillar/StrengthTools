import React from 'react';
import './RpeTable.css';

export default class RpeTable extends React.Component {
	constructor(props) {
		super(props);

		this.renderTableRows = this.renderTableRows.bind(this);
        this.handleRepClick = this.handleRepClick.bind(this);
        this.handleRepChange = props.handleRepChange;
	}

    handleRepClick(e) {
        e.preventDefault();
        this.handleRepChange(e.target.value);
    }

    renderRepButtons() {
        let htmlArray = [];

        for(let i = 1; i <= 12; i++) {
            htmlArray.push(
                <div className="col">
                    <button value={i} onClick={this.handleRepClick}>{i}</button>
                </div>
            );
        }

        return htmlArray;
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
						<th scope="col">{table[key][this.props.reps - 1]}</th>
			  		</tr>
				);
			}
		}

		return htmlArray;
	}

	render() {
		return (
            <>
            <div className="row">
				<h2>One Rep Max: {this.props.weightTable ? this.props.weightTable['10'][0] : ''}</h2>
            </div>
            <div className="row">
                <div className="col">
                    <h4>REPS</h4>
                </div>
                {this.renderRepButtons()}
            </div>
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
            </>
		);
	}
}