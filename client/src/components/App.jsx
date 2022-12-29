import React from 'react';
import './App.css';
import InputPanel from './InputPanel';
import RpeTable from './RpeTable';
import About from './About';
import Compare from'./Compare';
import { GiWeightLiftingUp } from "react-icons/gi";

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			weightTable: null,
			reps: 1,
			page: 'calculator'
		}

		this.handleSubmitData = this.handleSubmitData.bind(this);
		this.handleRepChange = this.handleRepChange.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
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
		}
	}

	render() {
		return (
			<div className="App container">
				<div className="row my-5 align-items-center">
					<h1 className="header col-4 offset-4">
						<span>
							<GiWeightLiftingUp/> Strength Tools
						</span>
					</h1>
					<div className="col-4 links">
						<a className="strength-nav-link" href="/compare" id="compare" onClick={this.handlePageChange}>Compare Strength</a>
						<a className="strength-nav-link" href="/rpe" id="rpe" onClick={this.handlePageChange}>RPE Calculator</a>
						<a className="strength-nav-link" href="/about" id="about" onClick={this.handlePageChange}>About</a>
					</div>
				</div>
				{this.renderPage()}
    		</div>
  		);
	}
}
