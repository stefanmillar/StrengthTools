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
						<p className="text-left">Welcome to Strength Tools! This site is mainly intended for powerlifters, but the rpe calculator can 
							be also used by bodybuilders or olympic weightlifters. The original inspiration for the
							site was from <a className="about-link" target="_blank" rel="noreferrer" href="https://www.rpecalculator.com/">www.rpecalculator.com</a> made by
							Ryaan Ahmed. After I created the RPE calculator, I decided to create the lift comparison and wilks/dots/gl calculators.
							<br/><br/>

							The lift comparison calculator uses the <a className="about-link" target="_blank" rel="noreferrer" href="https://www.openpowerlifting.org/">www.openpowerlifting.org/</a> dataset 
							of over 5 million recorded meets. Currently, the calculator only compares lifts to the International Powerlifting Assocation, 
							which makes up about 2 million of the recorded meets on openpowerlifting.org. Different federations to compare against will be added in the future.
						</p>
						<h5 className="card-title text-left">How To</h5>
						<hr/>
						<p className="text-left"><span className="fw-bolder fs-5">RPE |</span> The RPE calculator is used to calculate your estimated rate of percieved excursion based on your most recent set. Simply enter
							the weight you used, the number of reps you executed, and the percieved execurtion based on a scale from 6.5-10 (6.5 being fairly difficult and 10 being complete failure).  
							The actual RPE scale is from 1-10, but since lifters rarely do sets in RPE 6 or less this was not included. Once you click calculate, a new table will be generated with the estimated 
							weight for each RPE from 6.5-10 in 0.5 increments. Clicking on the buttons from 1-12 will show the new estimated weights for that given rep amount.
							<br/><br/>

							<span className="fw-bolder fs-5">Compare |</span> The lift comparison caluculator is used to calculate the rank of your lift's with rank 1 being the strongest. Enter your sex, age class, weight class, and equipment used. Then, enter each lift that you want 
							to compare. If you enter all three lifts, your total will also be compared. Clicking compare will calculate what percentile each lift ranks against lifters with your 
							given filters.
							<br/><br/>

							<span className="fw-bolder fs-5">Wilks/Dots/GL |</span> The wilks/dots/GL calculator is used to measure relative strength based on your bodyweight and sex. This allows lifters in different weight classes and genders 
							to compare their lifts to eachother. Most federation use either the dots or wilks score whereas the IPF uses their own GL score. To use, simply enter your 
							bodyweight, sex, and total. Select calculate and you will see the scores shown below. The formulas for calculating these scores were pulled
							 from <a className="about-link" target="_blank" rel="noreferrer" href="https://www.powerlifting.sport/fileadmin/ipf/data/ipf-formula/Models_Evaluation-I-2020.pdf">here</a>.
						</p>
					</div>
				</div>
			</div>
		);
	}

};