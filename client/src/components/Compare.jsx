import React from 'react';
import './About.css';
import { API } from 'aws-amplify';
import $ from 'jquery';
import { Dna } from  'react-loader-spinner';

const apiName = 'api58122196';

export default class About extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			sex: 'M',
			age: '14-18',
			equipment: 'Raw',
			weight: '53',
			squat: null,
			bench: null,
			deadlift: null,
			responseData: null,
			loading: false,
			scale: 'lbs'
		}

		this.handleSubmitData = props.handleSubmitData;

		this.handleChange = this.handleChange.bind(this);
		this.submitData = this.submitData.bind(this);
		this.handleEmailClick = this.handleEmailClick.bind(this);
		this.renderData = this.renderData.bind(this);
		this.radioClick = this.radioClick.bind(this);
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

	renderData() {
		let htmlArray = [];
		if(this.state.responseData) {
			let data = this.state.responseData;
			htmlArray.push(<hr className="mt-2"/>);
			htmlArray.push(<h5 className="mb-3">Lifts were compared against {data['meets']} recorded meets in the IPF.</h5>)
			for(let key in data) {
				if(data[key] && key !== 'meets') {
					if(data[key] > 80) {
						htmlArray.push(<p>Your {key} ranks in the {data[key]}th percentile, Wow!</p>)
					} else {
						htmlArray.push(<p>Your {key} ranks in the {data[key]}th percentile.</p>)
					}
				}
			}
		}

		return htmlArray;
	}

	radioClick(e) {
		this.setState({scale: e.target.id});
	}

	async submitData(e) {
		e.preventDefault();
		let request = this.state;
		$('.input-error').addClass('d-none').html('');

		if(this.state.scale === 'lbs') {
			this.setState({
				bench: this.state.bench ? this.state.bench / 2.26796185 : null,
				squat: this.state.squat ? this.state.squat / 2.26796185 : null,
				deadlift: this.state.deadlift ? this.state.deadlift / 2.26796185 : null
			});
		}

		this.setState({loading: true, responseData: null});

		$(document).scrollTop($(document).height());
		let responseData = await API.get(apiName, '/liftcompare', {queryStringParameters: request});
		this.setState({loading: false});

		if(responseData.error) {
			$('.input-error').removeClass('d-none').html(responseData.msg);
		} else {
			this.setState({responseData});
		}

	};

	render() {
		return (
			<div className="justify-content-center">
				<div className="d-flex justify-content-center">
					<div className="card col-lg-6 col-sm-12 col-12 strength-card">
						<div className="card-body">
							<h5 className="card-title">Lift Details</h5>
							<hr/>
							<form id="rpeForm" onSubmit={this.submitData}>
							<div className="row">
								<div className="col-6">
									<label htmlFor="sex" className="d-flex justify-content-start mb-2">Sex</label>
									<div className="input-group mb-3">
										<select className="custom-select col-12 p-2" id="sex" defaultValue={1} onChange={this.handleChange}>
											<option key="M" value="M">Male</option>
											<option key="F" value="F">Female</option>
										</select>
									</div>
								</div>
								<div className="col-6">
									<label htmlFor="age" className="d-flex justify-content-start mb-2">Age Class</label>
									<div className="input-group mb-3">
										<select className="custom-select col-12 p-2" id="age" defaultValue={1} onChange={this.handleChange}>
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
							</div>
							<div className="row">
								<div className="col-6">
									<label htmlFor="equipment" className="d-flex justify-content-start mb-2">Equipment</label>
									<div className="input-group mb-3">
										<select className="custom-select col-12 p-2" id="equipment" defaultValue={1} onChange={this.handleChange}>
											<option key="Raw" value="Raw">Raw</option>
											<option key="Single-ply" value="Single-ply">Single Ply</option>
										</select>
									</div>
								</div>
								<div className="col-6">
									<label htmlFor="weight" className="d-flex justify-content-start mb-2">Weight Class</label>
									<div className="input-group mb-3">
										<select className="custom-select col-12 p-2" id="weight" defaultValue={1} onChange={this.handleChange}>
											{this.state.sex === 'M' ?
											(<>
												{this.state.age === '14-18' ? <option key="53" value="53">53 Kg</option> : ''}
												<option key="59" value="59">59 Kg</option>
												<option key="66" value="66">66 Kg</option>
												<option key="74" value="74">74 Kg</option>
												<option key="83" value="83">83 Kg</option>
												<option key="93" value="93">93 Kg</option>
												<option key="105" value="105">105 Kg</option>
												<option key="120" value="120">120 Kg</option>
												<option key="120+" value="120+">120 Kg+</option>
											</>)
											:
											(<>
												<option key="43" value="43">43 Kg</option>
												<option key="47" value="47">47 Kg</option>
												<option key="52" value="52">52 Kg</option>
												<option key="57" value="57">57 Kg</option>
												<option key="63" value="63">63 Kg</option>
												<option key="84" value="84">84 Kg</option>
												<option key="84+" value="84+">84 Kg+</option>
											</>)
											}
										</select>
									</div>
								</div>
							</div>
							<div className="row">
								<div class="col-6 d-flex justify-content-center">
  									<input class="mx-1" type="radio" name="lbs" id="lbs" onClick={this.radioClick} checked={this.state.scale === 'lbs'}/>
  									<label class="form-check-label mx-1" for="lbs">
    									LBS
  									</label>
								</div>
								<div class="col-6 d-flex justify-content-center">
  									<input class="mx-1" type="radio" name="kg" id="kg" onClick={this.radioClick} checked={this.state.scale === 'kg'}/>
  									<label class="form-check-label mx-1" for="kg">
    									KG
  									</label>
								</div>
							</div>
							<label htmlFor="squat" className="d-flex justify-content-start mb-2">Squat</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-sm-1 col-2">
									<span className="input-group-text form-prepend">{this.state.scale.toUpperCase()}</span>
								</div>
								<input type="number" className="form-control col-sm-11 col-10" id="squat" onChange={this.handleChange}/>
							</div>
							<label htmlFor="bench" className="d-flex justify-content-start mb-2">Bench</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-sm-1 col-2">
									<span className="input-group-text form-prepend">{this.state.scale.toUpperCase()}</span>
								</div>
								<input type="number" className="form-control col-sm-11 col-10" id="bench" onChange={this.handleChange}/>
							</div>
							<label htmlFor="deadlift" className="d-flex justify-content-start mb-2">Deadlift</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-sm-1 col-2">
									<span className="input-group-text form-prepend">{this.state.scale.toUpperCase()}</span>
								</div>
								<input type="number" className="form-control col-sm-11 col-10" id="deadlift" onChange={this.handleChange}/>
							</div>
							<button type="submit" className="btn rpe-button">Compare</button>
							<div className="alert alert-danger d-none col-12 form-prepend input-error mt-2" role="alert">
							</div>
							</form>
							<Dna
								visible={true}
								height="100"
  								width="100"
								ariaLabel="dna-loading"
								wrapperStyle={{}}
								wrapperClass={this.state.loading ? 'loader' : 'd-none'}
							/>
							<div className={this.state.responseData ? 'row mt-2' : 'd-none'}>
								{this.renderData()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

};