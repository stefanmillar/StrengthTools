import React from 'react';
import './InputPanel.css';
import { API } from 'aws-amplify';
import $ from 'jquery';

const apiName = 'api58122196';

export default class InputPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			weight: null,
			reps: 1,
			rpe: 6.5
		}

		this.handleSubmitData = props.handleSubmitData;

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

	async submitData(e) {
		e.preventDefault();
		let request = this.state;
		let response = await API.get(apiName, '/rpecalculate', {queryStringParameters: request});

		if(response.error) {
			$('#weight-error').removeClass('d-none').html(response.msg);
		} else {
			$('#weight-error').addClass('d-none').html('');
			this.handleSubmitData(response);
		}
	};

	render() {
		return (
			<div className="d-flex justify-content-center">
				<div className="card col-lg-6 col-sm-12 col-12 strength-card">
					<div className="card-body">
						<h5 className="card-title">Set Details</h5>
						<hr/>
						<form id="rpeForm" onSubmit={this.submitData}>
							<label htmlFor="weight" className="d-flex justify-content-start mb-2">Weight</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-sm-1 col-2">
									<span className="input-group-text form-prepend">KG</span>
								</div>
								<input type="number" className="form-control col-sm-11 col-10" id="weight" onChange={this.handleChange}/>
								<div className="alert alert-danger d-none col-12 form-prepend" id="weight-error" role="alert">
								</div>
							</div>
							<label htmlFor="reps" className="d-flex justify-content-start mb-2">Reps</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-sm-1 col-2">
									<span className="input-group-text form-prepend">X</span>
								</div>
								<select className="custom-select col-sm-11 col-10" id="reps" defaultValue={1} onChange={this.handleChange}>
									{this.createSelectValues(1, 12, 1)}
								</select>
							</div>
							<label htmlFor="rpe" className="d-flex justify-content-start mb-2">RPE</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-sm-1 col-2">
									<span className="input-group-text form-prepend">@</span>
								</div>
								<select className="custom-select col-sm-11 col-10" id="rpe" defaultValue={6.5} onChange={this.handleChange}>
									{this.createSelectValues(6.5, 10, 0.5)}
								</select>
							</div>
							<button type="submit" className="btn rpe-button">Calculate</button>
						</form>
						<h2 className={this.props.weightTable ? 'mt-2' : 'd-none'}>One Rep Max: {this.props.weightTable ? this.props.weightTable['10'][0] : ''}</h2>
					</div>
				</div>
			</div>
		);
	}
}