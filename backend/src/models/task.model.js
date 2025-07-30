const db = require('../db');

module.exports = {
    getAllTasks: () => db('tasks').select('*'),
    getById: (id) => db('tasks').where({ id }).first(),
    createTask: async(task) => {
        const [newTask] = await db('tasks').insert(task).returning('*');
        return newTask;
    },
    updateTask: async(id, data) => {
        const [updatedTask] = await db('tasks').where({ id }).update(data).returning('*');
        return updatedTask;
    },
    deleteTask: async(id) => {
        const task = await db('tasks').where({ id }).first();
        if (!task) return null;
        await db('tasks').where({ id }).del();
        return task;
    },
    markAsCompleted: async(id) => {
        const [updatedTask] = await db('tasks').where({ id }).update({ completed: true }).returning('*');
        return updatedTask;
    }

};
