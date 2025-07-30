const express = require('express');
const cors = require('cors');
const tasksRouter = require('../src/routes/task.routes');

const app = express();
app.use(cors());

app.use(express.json());

// Path for API routes
app.use('/api/tasks', tasksRouter);

module.exports = app;
