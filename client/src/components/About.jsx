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
						<p className="text-left">Welcome to strength tools! This site is mainly intended for powerlifters but can be
							used by bodybuilders or olympic weightlifters as well. The original inspiration for the
							site was from <a className="about-link" href="https://www.rpecalculator.com/">www.rpecalculator.com</a> made by
							Ryaan Ahmed. After I created the rpe calculator I decided to create the strength compare
							caluculator as well!<br/><br/>

							To contact me about improvements to the app or bugs send an email <a className="about-link" onClick={this.handleEmailClick} href="/">here</a>.
							Checkout the code for the app on my github <a className="about-link" href="https://github.com/stefanmillar/StrengthTools">here</a>!
						</p>
					</div>
				</div>
			</div>
		);
	}

};