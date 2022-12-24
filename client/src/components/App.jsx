import React from 'react';
import './App.css';
import InputPanel from './InputPanel';
import RpeTable from './RpeTable';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			weightTable: null,
			reps: 1
		}

		this.handleSubmitData = this.handleSubmitData.bind(this);
	}

	handleSubmitData(weightTable) {
		this.setState({weightTable});

		console.log(this.state);
	}

	render() {
		return (
			<div className="App container">
				<div className="row">
					<h1>RPE Calculator</h1>
				</div>
				<div className="row">
					<div className="links">Link1 | Link2 | Link3 | Link4</div>
				</div>
				<div className="row">
					<InputPanel handleSubmitData={this.handleSubmitData} />
				</div>
				<div className="row">
					<RpeTable weightTable={this.state.weightTable} reps={this.state.reps}/>
				</div>
    		</div>
  		);
	}
}
