'use strict';

const express = require('express');
const rpeCalculator = require('./scripts/rpeCalculator');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.post("/calculate", (req, res) => {
	let weight = req.body.data.weight;
	let reps = req.body.data.reps;
	let rpe = req.body.data.rpe;

	if(parseFloat(weight) == NaN) {
		res.json({
			error: 1,
			msg: 'Please enter a valid weight.'
		});

		return;
	}

	if(weight < 0) {
		res.json({
			error: 1,
			msg: 'Weight must be greater then 0.'
		});

		return;
	}

	let weightTable = rpeCalculator.calculateWeights(weight, reps, rpe);

	res.json(weightTable);
});

app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
});