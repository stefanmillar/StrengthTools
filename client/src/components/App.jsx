import React from 'react';
import './App.css';
import InputPanel from './InputPanel';
import RpeTable from './RpeTable';
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

		if(page === 'calculator') {
			this.setState({page: e.target.id, weightTable: null, reps: 1});
		} else {
			this.setState({page: e.target.id});
		}
	}

	renderPage() {
		if(this.state.page === 'calculator') {
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
				<div></div>
			);
		}
	}

	render() {
		return (
			<div className="App container">
				<div className="row my-5 align-items-center">
					<div className="col"></div>
					<h1 className="header col">
						<span>
							<GiWeightLiftingUp/> RPE Calculator
						</span>
					</h1>
					<div className="col">
						<a href="/calculator" id="calculator" onClick={this.handlePageChange}>Calculator</a>
						<a href="/about" id="about" onClick={this.handlePageChange}>About</a>
					</div>
				</div>
				{this.renderPage()}
    		</div>
  		);
	}
}
