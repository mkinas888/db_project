const db = require('../../db');

  const getQuestionsByAffliction = (request, response) => {
    const id = request.params.id
    console.log(id);
    db.query('SELECT * FROM "Question" JOIN "Affliction_Question" ON "Affliction_Question"."QuestionId" = "Id" WHERE "AfflictionName" = ' + '\'' + id + '\'', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  


  
  module.exports = {
    getQuestionsByAffliction
  }