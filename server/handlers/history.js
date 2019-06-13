const db = require('../../db');

  const getHistoryEntryByUser = (request, response) => {
    const id = request.params.id
    db.query('SELECT * FROM "History_Entry" WHERE "User_Login" = ' + '\'' + id + '\'', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getAfflictionName = (request, response) => {
    const id = request.params.id;
    db.query('SELECT * FROM "Affliction" WHERE "History_EntryUserLogin" = ' + '\'' + id + '\'', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createHistoryEntry = (request, response) => {
    const { login, creation_date, exercises, questions, answers} = request.body
  
    db.query('INSERT INTO "History_Entry" ("User_Login", "Creation_Date") VALUES ($1, $2)', [login, creation_date], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`History_Entry added with user login: ${login}`)
    })

    db.query('INSERT INTO "Affliction" ("Name", "History_EntryUserLogin") VALUES ($1, $2)', ['scoliosis', login], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Affliction added with user login: ${login}`)
    })

    questions.forEach( (item, index) => {
      db.query('INSERT INTO "Answer" ("Question_Id", "Answer_Text") VALUES ($1, $2)', [item.QuestioId, answers[index]], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`History_Entry added with user login: ${login}`)
      })
    });
  }


  
  
  module.exports = {
    getHistoryEntryByUser,
    getAfflictionName,
    createHistoryEntry
  }