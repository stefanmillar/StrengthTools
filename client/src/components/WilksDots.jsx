import React from 'react';
import $ from 'jquery';

export default class WilksDots extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			bodyweight: null,
			sex: 'M',
			total: null,
			scale: 'lbs',
            wilks: null,
            dots: null,
            gl: null
		}

		this.handleChange = this.handleChange.bind(this);
        this.radioClick = this.radioClick.bind(this);
        this.submitData = this.submitData.bind(this);
	}

	handleChange(e) {
		let target = e.target;

		this.setState({
			[target.id]: target.value
		});
	}

    radioClick(e) {
		this.setState({scale: e.target.id});
	}

    submitData(e) {
        e.preventDefault();

        if(!this.state.bodyweight || !this.state.total) {
            $('.input-error').removeClass('d-none').html('All input values must be filled out.');
            return;
        }

        if(this.state.bodyweight <= 0 || this.state.total <= 0) {
            $('.input-error').removeClass('d-none').html('Input must be greater then 0.');
            return;
        }

        $('.input-error').addClass('d-none').html('');

        let total = this.state.scale === 'lbs' ? parseFloat(this.state.total) / 2.205 : parseFloat(this.state.total);

        // Calculate Wilks
        let maleCoeff = [47.4617885411949, 8.47206137941125, 0.073694103462609, -1.39583381094385e-3, 7.07665973070743e-6, -1.20804336482315e-8];
        let femaleCoeff = [-125.425539779509, 13.7121941940668, -0.0330725063103405, -1.0504000506583e-3, 9.38773881462799e-6, -2.3334613884954e-8];
        let isFemale = this.state.sex === 'F';
        let denominator = isFemale ? femaleCoeff[0] : maleCoeff[0];
        let coeff = isFemale ? femaleCoeff : maleCoeff;
        let bw = this.state.scale === 'lbs' ? parseFloat(this.state.bodyweight) / 2.205 : parseFloat(this.state.bodyweight);

        for (let i = 1; i < coeff.length; i++) {
            denominator += coeff[i] * Math.pow(bw, i);
        }

        let wilks = 600 / denominator * total;

        // Calculate Dots
        maleCoeff = [-307.75076, 24.0900756, -0.1918759221, 0.0007391293, -0.000001093];
        femaleCoeff = [-57.96288, 13.6175032, -0.1126655495, 0.0005158568, -0.0000010706];
        coeff = isFemale ? femaleCoeff : maleCoeff;
        denominator = isFemale ? femaleCoeff[0] : maleCoeff[0];

        for (let i = 1; i < coeff.length; i++) {
            denominator += coeff[i] * Math.pow(bw, i);
        }
        
        let dots = 500 / denominator * total;

        // Calculate GL
        maleCoeff = [1199.72839, 1025.18162, 0.00921];
        femaleCoeff = [610.32796, 1045.59282, 0.03048];
        coeff = isFemale ? femaleCoeff : maleCoeff;

        let power = -coeff[2] * bw;
        var gl = total * (100 / (coeff[0] - coeff[1] * Math.pow(Math.E, power)));

        this.setState({wilks: wilks.toFixed(2), dots: dots.toFixed(2), gl: gl.toFixed(2)});
    }

	render() {
		return (
			<div className="d-flex justify-content-center">
				<div className="card col-lg-6 col-sm-12 col-12 strength-card">
					<div className="card-body">
						<h5 className="card-title">Wilks/Dots/GL Calculator</h5>
						<hr/>
						<form id="rpeForm" onSubmit={this.submitData}>
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
							<label htmlFor="bodyweight" className="d-flex justify-content-start mb-2">Bodyweight</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-sm-1 col-2">
									<span className="input-group-text form-prepend">{this.state.scale.toUpperCase()}</span>
								</div>
								<input type="number" className="form-control col-sm-11 col-10" id="bodyweight" onChange={this.handleChange}/>
							</div>
							<label htmlFor="sex" className="d-flex justify-content-start mb-2">Sex</label>
							<div className="input-group mb-3">
								<select className="custom-select col-12 p-2" id="sex" defaultValue={1} onChange={this.handleChange}>
									<option key="M" value="M">Male</option>
									<option key="F" value="F">Female</option>
								</select>
							</div>
							<label htmlFor="total" className="d-flex justify-content-start mb-2">Total</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend col-sm-1 col-2">
									<span className="input-group-text form-prepend">{this.state.scale.toUpperCase()}</span>
								</div>
								<input type="number" className="form-control col-sm-11 col-10" id="total" onChange={this.handleChange}/>
							</div>
							<button type="submit" className="btn rpe-button">Calculate</button>
                            <div className="alert alert-danger d-none col-12 form-prepend input-error mt-2" role="alert"></div>
                            {this.state.wilks && this.state.dots ?
                            <>
                                <h5 className="mt-3">Wilks: {this.state.wilks}</h5>
                                <h5>Dots: {this.state.dots}</h5>
                                <h5>IPF GL: {this.state.gl}</h5>
                            </>
                            :
                                ''
                            }
						</form>
					</div>
				</div>
			</div>
		);
	}
}