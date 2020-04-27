const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const { signUp, auth, refreshTokens, getProjects, putProject, deleteProject, getTasks, putTask, deleteTask, changeTaskStatus, updateProject, updateTask, checkToken, logOut, updateTaskPriority } = require('./controllers')
const { checkAuth } = require('./middleware');

mongoose.connect('mongodb://localhost:27017/TODO', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
    if (err) {
        throw err;
    }

    console.log('Connected to DB');

});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/signup', signUp);
app.post('/signin', auth);
app.post('/refresh-tokens', refreshTokens);
app.post('/projects', checkAuth, putProject);
app.post('/tasks', checkAuth, putTask);
app.post('/task-status', checkAuth, changeTaskStatus);
app.post('/update-project', checkAuth, updateProject);
app.post('/update-task', checkAuth, updateTask);
app.post('/logout', checkAuth, logOut);
app.post('/update-priority', checkAuth, updateTaskPriority);


app.get('/projects', checkAuth, getProjects);
app.get('/tasks/:id', checkAuth, getTasks);
app.get('/check-token', checkAuth, checkToken);

app.delete('/projects/:id', checkAuth, deleteProject);
app.delete('/task/:projectId/:id', checkAuth, deleteTask);

app.listen(3000, () => console.log("Listening on port 3000"));