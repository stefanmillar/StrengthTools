import React from 'react';
import './About.css';
import { API } from 'aws-amplify';

const apiName = 'api58122196';

export default class About extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			sex: 'm',
			age: '14-18',
			equipment: 'Raw',
			squat: null,
			bench: null,
			deadlift: null
		}

		this.handleSubmitData = props.handleSubmitData;

		this.handleChange = this.handleChange.bind(this);
		this.submitData = this.submitData.bind(this);
		this.handleEmailClick = this.handleEmailClick.bind(this);
	}

	handleEmailClick(e) {
		e.preventDefault();

		window.open('mailto:strength.tools.improvements@gmail.com?subject=User%20Improvement&body=')
	}

	handleChange(e) {
		let target = e.target;

		this.setState({
			[target.id]: target.value
		});
	}

	async submitData(e) {
		e.preventDefault();
		let request = this.state;
		let response = await API.get(apiName, '/liftcompare', {queryStringParameters: request});

		//if(response.error) {
		//	$('#weight-error').removeClass('d-none').html(response.msg);
		//} else {
		//	$('#weight-error').addClass('d-none').html('');
		//	this.handleSubmitData(response);
		//}
		console.log(response);
	};

	render() {
		return (
			<div className="justify-content-center">
				<h5 className="row d-flex justify-content-center mb-3">
					Compare your lifts to over 1,000,000 recorded powerlifting meets!
				</h5>
				<div className="row d-flex justify-content-center">
					<div className="card col-lg-6 col-sm-12 col-12 strength-card">
						<div className="card-body">
							<h5 className="card-title">Compare</h5>
							<form id="rpeForm" onSubmit={this.submitData}>
							<div className="row">
								<div className="col-4">
									<label htmlFor="sex" className="d-flex justify-content-start mb-2">Sex</label>
									<div className="input-group mb-3">
										<select className="custom-select col-sm-11 col-10 p-2" id="sex" defaultValue={1} onChange={this.handleChange}>
											<option key="M" value="M">Male</option>
											<option key="F" value="F">Female</option>
										</select>
									</div>
								</div>
								<div className="col-4">
									<label htmlFor="age" className="d-flex justify-content-start mb-2">Age Class</label>
									<div className="input-group mb-3">
										<select className="custom-select col-sm-11 col-10 p-2" id="age" defaultValue={1} onChange={this.handleChange}>
											<option key="14-18" value="14-18">14 - 18</option>
											<option key="19-23" value="19-23">19 - 23</option>
											<option key="24-39" value="24-39">24 - 39</option>
											<option key="40-49" value="40-49">40 - 49</option>
											<option key="50-59" value="50-59">50 - 59</option>
											<option key="60-69" value="60-69">60 - 69</option>
											<option key="70-74" value="70-74">70+</option>
										</select>
									</div>
								</div>
								<div className="col-4">
									<label htmlFor="equipment" className="d-flex justify-content-start mb-2">Equipment</label>
									<div className="input-group mb-3">
										<select className="custom-select col-sm-11 col-10 p-2" id="equipment" defaultValue={1} onChange={this.handleChange}>
											<option key="Raw" value="Raw">Raw</option>
											<option key="Single-ply" value="Single-ply">Single Ply</option>
										</select>
									</div>
								</div>
							</div>
							<label htmlFor="squat" className="d-flex justify-content-start mb-2">Squat</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-sm-1 col-2">
									<span className="input-group-text form-prepend">KG</span>
								</div>
								<input type="number" className="form-control col-sm-11 col-10" id="squat" onChange={this.handleChange}/>
							</div>
							<label htmlFor="bench" className="d-flex justify-content-start mb-2">Bench</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-sm-1 col-2">
									<span className="input-group-text form-prepend">KG</span>
								</div>
								<input type="number" className="form-control col-sm-11 col-10" id="bench" onChange={this.handleChange}/>
							</div>
							<label htmlFor="deadlift" className="d-flex justify-content-start mb-2">Deadlift</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-sm-1 col-2">
									<span className="input-group-text form-prepend">KG</span>
								</div>
								<input type="number" className="form-control col-sm-11 col-10" id="deadlift" onChange={this.handleChange}/>
							</div>
							<p>Note: Lifts are only compared to the International Powerlifting Association. Different federations will be available in the future.</p>
							<button type="submit" className="btn rpe-button">Compare</button>
							<div className="alert alert-danger d-none col-12 form-prepend input-error" role="alert">
							</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}

};