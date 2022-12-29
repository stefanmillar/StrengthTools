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
			<div className="justify-content-center">
				<h5 className="row d-flex justify-content-center">
					Compare your strength to over 1,000,000 recorded powerlifting meets!
				</h5>
				<div className="row d-flex justify-content-center">
					<div className="card col-lg-6 col-sm-12 col-12 strength-card">
						<div className="card-body">
							<h5 className="card-title">Compare</h5>
						</div>
					</div>
				</div>
			</div>
		);
	}

};