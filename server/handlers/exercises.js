const db = require('../../db');

  const getExercisesByAffliction = (request, response) => {
    const id = request.params.id
    db.query('SELECT * FROM "Exercise" JOIN "Affliction_Exercise" ON "Affliction_Exercise"."Exercise_Id" = "Id" WHERE "AfflictionName" = ' + '\'' + id + '\'', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  


  
  module.exports = {
    getExercisesByAffliction
  }