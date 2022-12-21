import React from 'react';
import './InputPanel.css';

export default class InputPanel extends React.Component {
	createSelectValues = (start, end, step) => {
		let htmlArray = [];
		for(var i = start; i <= end; i += step) {
			if(i === start) {
				htmlArray.push(<option value={i} selected>{i}</option>);
			} else {
				htmlArray.push(<option value={i}>{i}</option>);
			}
		}
		return htmlArray;
	};

	render() {
	return (
		<div className="d-flex justify-content-center">
			<div className="card col-5">
				<div className="card-body">
					<h5 className="card-title">Set Details</h5>
					<label htmlFor="weight" className="d-flex justify-content-start mb-2">Weight</label>
					<div className="input-group mb-3">
						<div className="input-group-prepend col-1">
							<span class="input-group-text">lbs</span>
						</div>
						<input type="text" className="form-control col-11" id="weight"/>
					</div>
					<label htmlFor="reps" className="d-flex justify-content-start mb-2">Reps</label>
					<div className="input-group mb-3">
						<div className="input-group-prepend col-1">
							<span class="input-group-text">X</span>
						</div>
						<select class="custom-select col-11" id="reps">
							{this.createSelectValues(1, 12, 1)}
  						</select>
					</div>
					<label htmlFor="rpe" className="d-flex justify-content-start mb-2">RPE</label>
					<div className="input-group mb-3">
						<div className="input-group-prepend col-1">
							<span class="input-group-text">@</span>
						</div>
						<select class="custom-select col-11" id="rpe">
							{this.createSelectValues(6.5, 10, 0.5)}
  						</select>
					</div>
				</div>
			</div>
    	</div>
  	);
	}
}