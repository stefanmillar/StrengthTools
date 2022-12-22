import React from 'react';
import './InputPanel.css';
import axios from 'axios';

export default class InputPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			weight: null,
			reps: 1,
			rpe: 6.5
		}

		this.handleChange = this.handleChange.bind(this);
		this.submitData = this.submitData.bind(this);
	}

	handleChange(e) {
		let target = e.target;

		this.setState({
			[target.id]: target.value
		});
	}

	createSelectValues(start, end, step) {
		let htmlArray = [];
		for(var i = start; i <= end; i += step) {
			htmlArray.push(<option key={i} value={i}>{i}</option>);
		}
		return htmlArray;
	};

	submitData(e) {
		e.preventDefault();
		let request = this.state;
		axios.get('/calculate',
			{params: request});
	};

	render() {
		return (
			<div className="d-flex justify-content-center">
				<div className="card col-5">
					<div className="card-body">
						<h5 className="card-title">Set Details</h5>
						<form id="rpeForm" onSubmit={this.submitData}>
							<label htmlFor="weight" className="d-flex justify-content-start mb-2">Weight</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-1">
									<span className="input-group-text">lbs</span>
								</div>
								<input type="number" className="form-control col-11" id="weight" onChange={this.handleChange}/>
							</div>
							<label htmlFor="reps" className="d-flex justify-content-start mb-2">Reps</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-1">
									<span className="input-group-text">X</span>
								</div>
								<select className="custom-select col-11" id="reps" defaultValue={1} onChange={this.handleChange}>
									{this.createSelectValues(1, 12, 1)}
								</select>
							</div>
							<label htmlFor="rpe" className="d-flex justify-content-start mb-2">RPE</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-1">
									<span className="input-group-text">@</span>
								</div>
								<select className="custom-select col-11" id="rpe" defaultValue={6.5} onChange={this.handleChange}>
									{this.createSelectValues(6.5, 10, 0.5)}
								</select>
							</div>
							<button type="submit" className="btn btn-primary">Calculate</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}