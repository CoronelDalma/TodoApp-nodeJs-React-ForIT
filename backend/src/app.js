const express = require('express');
const tasksRouter = require('../src/routes/task.routes');

const app = express();
app.use(express.json());

// Path for API routes
app.use('/api/tasks', tasksRouter);

module.exports = app;
