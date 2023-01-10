import React from 'react';
import './About.css';

export default class About extends React.Component {

	constructor(props) {
		super(props);

		this.handleEmailClick = this.handleEmailClick.bind(this);
	}

	handleEmailClick(e) {
		e.preventDefault();

		window.open('mailto:strength.tools.improvements@gmail.com?subject=User%20Improvement&body=')
	}

	render() {
		return (
			<div className="d-flex justify-content-center">
				<div className="card col-lg-6 col-sm-12 col-12 strength-card">
					<div className="card-body">
						<h5 className="card-title text-left">About</h5>
						<hr/>
						<p className="text-left">Welcome to strength tools! This site is mainly intended for powerlifters, but the rpe calculator can 
							be also used by bodybuilders or olympic weightlifters. The original inspiration for the
							site was from <a className="about-link" href="https://www.rpecalculator.com/">www.rpecalculator.com</a> made by
							Ryaan Ahmed. After I created the RPE calculator, I decided to create the lift comparison calculator.
							<br/><br/>

							The lift comparison calculator uses the <a className="about-link" href="https://www.openpowerlifting.org/">www.openpowerlifting.org/</a> dataset 
							of over 5 million recorded meets. Currently, the calculator only compares lifts to the International Powerlifting Assocation, 
							which makes up about 2 million of the recorded meets on openpowerlifting.org. Different federations to compare against will be added in the future.
							<br/><br/>

							To contact me about improvements to the app or bugs send an email <a className="about-link" onClick={this.handleEmailClick} href="/">here</a>. Checkout my 
							linkedin <a className="about-link" href="https://www.linkedin.com/in/stefan-millar-1506b6176/">here</a>.
						</p>
						<h5 className="card-title text-left">How To</h5>
						<hr/>
						<p className="text-left">The RPE calculator is used to calculate your estimated rate of percieved excursion based on your most recent set. Simply enter
							the weight you used, the number of reps you executed, and the percieved execurtion based on a scale from 6.5-10 (6.5 being fairly difficult and 10 being complete failure).  
							The actual RPE scale is from 1-10, but since lifters rarely do sets in RPE 6 or less this was not included. Once you click calculate, a new table will be generated with the estimated 
							weight for each RPE from 6.5-10 in 0.5 increments. Clicking on the buttons from 1-12 will show the new estimated weights for that given rep amount.
							<br/><br/>

							The lift comparison caluculator is similarly used. Enter your sex, age class, weight class, and equipment used. Then, enter each lift that you want 
							to compare. If you enter all three lifts, your total will also be compared. Clicking compare will calculate what percentile each lift ranks against lifters with your 
							given filters.
						</p>
					</div>
				</div>
			</div>
		);
	}

};