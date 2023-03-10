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

const connection = require('serverless-mysql')({
  config: {
    host     : process.env.DB_HOSTNAME,
    user     : 'admin',
    password : process.env.DB_PASSWORD,
    port     : 3306
  }
});

app.get('/liftcompare', async (req, res) => {
  let sex = req.query.sex;
	let age = req.query.age;
	let equipment = req.query.equipment;
  let weight = req.query.weight;
  let squat = req.query.squat ? parseFloat(req.query.squat) : null;
  let bench = req.query.bench ? parseFloat(req.query.bench) : null;
  let deadlift = req.query.deadlift ? parseFloat(req.query.deadlift) : null;
  let total = squat && bench && deadlift ? squat + bench + deadlift : null;

  if(!squat && !bench && !deadlift) {
    res.json({
      error: 1,
      msg: 'At least one lift must be entered.'
    });

    return
  }

  if((squat && squat < 0) || (bench && bench < 0) || (deadlift && deadlift < 0)) {
		res.json({
			error: 1,
			msg: 'Weights must be greater then 0.'
		});

		return;
	}

  let table_data = {
    Sex: sex,
    BirthYearClass: age,
    Equipment: equipment,
    WeightClassKg: weight,
    Best3SquatKg: squat,
    Best3BenchKg: bench,
    Best3DeadliftKg: deadlift,
    TotalKg: total
  }

  let query;

  try {
  
    let result = await connection.query('INSERT INTO `open-powerlifting-data`.`open-powerlifting-data` SET ?', table_data);
    query = `WITH t AS (SELECT
      ${squat ? 'RANK() over ( order by Best3SquatKg ) squat_rank,' : ''}
      ${bench ? 'RANK() over ( order by Best3BenchKg ) bench_rank,' : ''}
      ${deadlift ? 'RANK() over ( order by Best3DeadliftKg ) deadlift_rank,' : ''}
      ${total ? 'RANK() over ( order by TotalKg ) total_rank,' : ''}
      id
      FROM \`open-powerlifting-data\`.\`open-powerlifting-data\`
      WHERE Sex = '${sex}' AND BirthYearClass = '${age}' AND Equipment = '${equipment}' AND WeightClassKg = '${weight}'
      ${squat ? 'AND Best3SquatKg > 0 AND Best3SquatKg IS NOT NULL' : ''}
      ${bench ? 'AND Best3BenchKg > 0 AND Best3BenchKg IS NOT NULL' : ''}
      ${deadlift ? 'AND Best3DeadliftKg > 0 AND Best3DeadliftKg IS NOT NULL' : ''}
      )
      SELECT * FROM(
      SELECT ${('' + (squat ? 'squat_rank,' : '') + (bench ? 'bench_rank,' : '') + (deadlift ? 'deadlift_rank,' : '') + (total ? 'total_rank,' : '')).slice(0, -1)} FROM t
      WHERE
        id = ${result.insertId}) as A
      JOIN
      (SELECT COUNT(*) as count FROM t) as B`; 
    
    let rows = await connection.query(query);

    let ranksObject = rows[0];
    let totalRows = rows[0].count;
  
    res.json({
      squat: total ? totalRows - ranksObject.squat_rank : null,
      bench: total ? totalRows - ranksObject.bench_rank : null,
      deadlift: total ? totalRows - ranksObject.deadlift_rank : null,
      total: total ? totalRows - ranksObject.total_rank : null,
      meets: totalRows
    });

    query = `DELETE FROM \`open-powerlifting-data\`.\`open-powerlifting-data\` WHERE id = ${result.insertId}`;

    await connection.query(query);
    await connection.end();
    connection.quit();
  } catch(err) {
    res.json({
      error: 1,
      msg: 'An unexpected error occured.'
    });
    await connection.end();
    connection.quit();
  }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
