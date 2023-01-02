let run = async () => {
const connection = require('serverless-mysql')({
  config: {
    host     : 'strength-tools-data.clhsj3dpvgnv.ca-central-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'Keek159753',
    port     : 3306
  }
});

let req = {query: {sex: 'm', age: '19-23', equipment: 'Raw', squat: 150, bench: 150, deadlift: 150}};

let sex = req.query.sex;
let age = req.query.age;
let equipment = req.query.equipment;
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
    Best3SquatKg: squat,
    Best3BenchKg: bench,
    Best3DeadliftKg: deadlift,
    TotalKg: total
  }
  
  let result = await connection.query('INSERT INTO `open-powerlifting-data`.`open-powerlifting-data` SET ?', table_data);
      let query = `WITH t AS (SELECT
        ${squat ? 'RANK() over ( order by Best3SquatKg ) squat_rank,' : ''}
        ${bench ? 'RANK() over ( order by Best3BenchKg ) bench_rank,' : ''}
        ${deadlift ? 'RANK() over ( order by Best3DeadliftKg ) deadlift_rank,' : ''}
        ${total ? 'RANK() over ( order by TotalKg ) total_rank,' : ''}
        id
        FROM \`open-powerlifting-data\`.\`open-powerlifting-data\`
        WHERE Sex = '${sex}' AND BirthYearClass = '${age}' AND Equipment = '${equipment}')
        SELECT * FROM(
        SELECT ${('' + (squat ? 'squat_rank,' : '') + (bench ? 'bench_rank,' : '') + (deadlift ? 'deadlift_rank,' : '') + (total ? 'total_rank,' : '')).slice(0, -1)} FROM t
        WHERE
          id = ${result.insertId}) as A
        JOIN
        (SELECT COUNT(*) FROM t) as B`; 
    
      let rows = await connection.query(query);
  
        query = `SELECT COUNT(*) as count
          FROM \`open-powerlifting-data\`.\`open-powerlifting-data\`
          WHERE Sex = '${sex}' AND BirthYearClass = '${age}' AND Equipment = '${equipment}'`;
  
          if(err) {
            connection.end();
            throw err;
          }
          let ranksObject = rows[0];
          let totalRows = rows[0].count;
  
          let test = {
            squat: squat ? Math.floor((ranksObject.squat_rank / totalRows) * 100) : null,
            bench: bench ? Math.floor((ranksObject.bench_rank / totalRows) * 100) : null,
            deadlift: deadlift ? Math.floor((ranksObject.deadlift_rank / totalRows) * 100) : null,
            total: total ? Math.floor((ranksObject.total_rank / totalRows) * 100) : null
          };
          connection.end();
};

run();