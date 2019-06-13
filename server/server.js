const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const handlers = require('./handlers/users');
const handlersQuestion = require('./handlers/questions');
const handlersExercises = require('./handlers/exercises');
const handleHistory = require('./handlers/history');


// const sqlinjection = require('sql-injection');

// app.configure(() => {
//    app.use(sqlinjection);
// });

const port = 4000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Databse Project!' });
});

app.post('/history', handleHistory.createHistoryEntry);
app.get('/history/:id', handleHistory.getHistoryEntryByUser);
app.get('/history//:id', handleHistory.getAfflictionName);
app.get('/questions/:id', handlersQuestion.getQuestionsByAffliction);
app.get('/exercises/:id', handlersExercises.getExercisesByAffliction);
app.get('/users', handlers.getUsers);
app.get('/users/:id', handlers.getUserById);
app.post('/users', handlers.createUser);
app.put('/users/:id', handlers.updateUser);
app.delete('/users/:id', handlers.deleteUser);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});