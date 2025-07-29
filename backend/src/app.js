const express = require('express');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(express.json());

// Path for API routes
app.use('/api/tasks', tasksRouter);

module.exports = app;
