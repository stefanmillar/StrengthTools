const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


const rpeCalculator = require('./scripts/rpeCalculator');

app.get('/rpecalculate', function(req, res) {
  let weight = req.query.weight;
	let reps = req.query.reps;
	let rpe = req.query.rpe;

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

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
