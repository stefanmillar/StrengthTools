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
			if(parseInt(this.props.reps) === i) {
				htmlArray.push(
					<div key={i} className="col-lg-1 col-sm-3 col-3 my-1">
						<button value={i} onClick={this.handleRepClick} className="btn rpe-button-selected">{i}</button>
					</div>
				);
			} else {
				htmlArray.push(
					<div key={i} className="col-lg-1 col-sm-3 col-3 my-1">
						<button value={i} onClick={this.handleRepClick} className="btn rpe-button">{i}</button>
					</div>
				);
			}
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
					<tr key={i} className="rpe-table-row">
						<td>{key}</td>
						<td>{table[key][this.props.reps - 1]}</td>
			  		</tr>
				);
			}
		}

		return htmlArray;
	}

	render() {
		return (
            <div className={this.props.weightTable ? 'd-flex justify-content-center mb-5' : 'd-none'}>
				<div className="card col col-sm-12 col-12 strength-card">
					<div className="card-body">
            			<div className="row mb-2">
                			<div className="col-lg-1 col-sm-12 col-12 p-0">
                    			<h4>REPS</h4>
                			</div>
							<div className='col-lg-11 col-sm-12 col-12'>
								<div className="row">
									{this.renderRepButtons()}
								</div>
							</div>
            			</div>
						<table className="table rpe-table">
  							<thead>
    							<tr>
      								<th className="rpe-column" scope="col">RPE</th>
      								<th className="rpe-column">Weight</th>
    							</tr>
  							</thead>
  							<tbody>
								{this.renderTableRows()}
  							</tbody>
						</table>
					</div>
				</div>
            </div>
		);
	}
}