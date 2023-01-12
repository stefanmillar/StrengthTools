import React from 'react';
import './App.css';
import { Amplify, API } from 'aws-amplify';
import awsconfigstage from '../aws-exports-stage';
import awsconfigprod from '../aws-exports-prod';
import InputPanel from './InputPanel';
import RpeTable from './RpeTable';
import About from './About';
import Compare from'./Compare';
import WilksDots from './WilksDots';
import { GiWeightLiftingUp } from "react-icons/gi";
import { AiFillLinkedin, AiFillGithub, AiFillBug } from "react-icons/ai";

const BUILD_ENV = process.env.REACT_APP_BUILD_ENV;
Amplify.configure(BUILD_ENV === 'prod' ? awsconfigprod : awsconfigstage);
API.configure(BUILD_ENV === 'prod' ? awsconfigprod : awsconfigstage);

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			weightTable: null,
			reps: 1,
			page: 'about'
		}

		this.handleSubmitData = this.handleSubmitData.bind(this);
		this.handleRepChange = this.handleRepChange.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleEmailClick = this.handleEmailClick.bind(this);
	}

	handleSubmitData(weightTable) {
		this.setState({weightTable});
	}

	handleRepChange(reps) {
		this.setState({reps});
	}

	handlePageChange(e) {
		e.preventDefault();
		let page = e.target.id;

		if(page === 'rpe') {
			this.setState({page: e.target.id, weightTable: null, reps: 1});
		} else {
			this.setState({page: e.target.id});
		}
	}

	handleEmailClick(e) {
		e.preventDefault();

		window.open('mailto:strength.tools.improvements@gmail.com?subject=User%20Improvement&body=')
	}

	renderPage() {
		if(this.state.page === 'rpe') {
			return (
				<>
				<div className="row mb-5">
					<InputPanel handleSubmitData={this.handleSubmitData} weightTable={this.state.weightTable} />
				</div>
				<div className="row">
					<RpeTable weightTable={this.state.weightTable} reps={this.state.reps} handleRepChange={this.handleRepChange}/>
				</div>
				</>
			);
		} else if(this.state.page === 'about') {
			return (
				<About/>
			);
		} else if(this.state.page === 'compare') {
			return (
				<Compare/>
			);
		} else if(this.state.page === 'wilksdots') {
			return (
				<WilksDots/>
			);
		}
	}

	render() {
		return (
			<div className="App container mb-5">
				<div className="row my-5 align-items-center">
					<h1 className="header my-3 col-lg-4 col-sm-12 col-12 offset-lg-4">
						<span>
							<GiWeightLiftingUp/> Strength Tools
						</span>
					</h1>
					<div className="col-lg-4 col-sm-12 col-12 links">
						<a className="strength-nav-link" href="/wilksdots" id="wilksdots" onClick={this.handlePageChange}>Wilks/Dots/GL</a>
						<a className="strength-nav-link" href="/compare" id="compare" onClick={this.handlePageChange}>Compare</a>
						<a className="strength-nav-link" href="/rpe" id="rpe" onClick={this.handlePageChange}>RPE</a>
						<a className="strength-nav-link" href="/about" id="about" onClick={this.handlePageChange}>About</a>
					</div>
				</div>
				{this.renderPage()}
				<div className="footer mt-5">
					<hr/>
					<span>Click the links below to see my linkedin, code for the project, or email about bugs.<br/></span>
					<a className="icon-links mx-1" href="https://www.linkedin.com/in/stefan-millar-1506b6176/" target="_blank" rel="noreferrer"><AiFillLinkedin size={70}/></a>
					<a className="icon-links mx-1" href="https://github.com/stefanmillar/StrengthTools" target="_blank" rel="noreferrer"><AiFillGithub size={70}/></a>
					<a className="icon-links mx-1" onClick={this.handleEmailClick} href="https://www.linkedin.com/in/stefan-millar-1506b6176/" target="_blank" rel="noreferrer"><AiFillBug size={70}/></a>
				</div>
    		</div>
  		);
	}
}
