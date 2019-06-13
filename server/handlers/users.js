const db = require('../../db');

const getUsers = (request, response) => {
    db.query('SELECT * FROM "User" ORDER BY "Login" ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getUserById = (request, response) => {
    const id = request.params.id
    console.log(id);
    db.query('SELECT * FROM "User" WHERE "Login" = ' + '\'' + id + '\'', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createUser = (request, response) => {
    console.log(request.body);
    const { name, surname, password, login, creation_date, last_login_date } = request.body
  
    db.query('INSERT INTO "User" ("Login", "Creation_Date", "Name", "Password", "Surname", "Last_Login_Date") VALUES ($1, $2, $3, $4, $5, $6)', [login, creation_date, name, password, surname, last_login_date], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with login: ${login}`)
    })
  }
  
  const updateUser = (request, response) => {
    const id = request.params.id
    const { Name, Surname, Password, Login, Creation_Date, Last_Login_Date } = request.body
    db.query(
      'UPDATE "User" SET "Login" = $1, "Creation_Date" = $2, "Name" = $3, "Password" = $4, "Surname" = $5, "Last_Login_Date" = $6 WHERE "Login" = ' + '\'' + id + '\'',
      [Login, Creation_Date, Name, Password, Surname, Last_Login_Date],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with login: ${Login}`)
      }
    )
  }
  
  const deleteUser = (request, response) => {
    const id = request.params.id
  
    db.query('DELETE FROM "User" WHERE "Login" = ' + '\'' + id + '\'', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with login: ${id}`)
    })
  }
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }