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
						<h5 className="card-title">About</h5>
						<p className="text-left">Welcome to strength tools! This site is mainly intended for powerlifters but rpe calculator can 
							be used by bodybuilders or olympic weightlifters as well. The original inspiration for the
							site was from <a className="about-link" href="https://www.rpecalculator.com/">www.rpecalculator.com</a> made by
							Ryaan Ahmed. After I created the rpe calculator I decided to create the lift compare caluculator.
							<br/><br/>

							The lift compare calculator uses the <a className="about-link" href="https://www.openpowerlifting.org/">www.openpowerlifting.org/</a>
							dataset of over 5 million recorded meets. Currently, the calculator only compares lifts to the International Powerlifting Assocation, 
							which has about 2 million recorded meets on openpowerlifting.org. Different federations to compare against will be added in the future.
							<br/><br/>

							To contact me about improvements to the app or bugs send an email <a className="about-link" onClick={this.handleEmailClick} href="/">here</a>.
						</p>
					</div>
				</div>
			</div>
		);
	}

};