const Task = require('../models/task.model');
const taskSchema = require('../validations/task.schema');

module.exports = {
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving tasks', error });
        }
    },
    getTaskById: async (req, res) => {
        const { id } = req.params;
        try {
            const task = await Task.getById(id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving task', error });
        }
    },
    createTask: async (req, res) => {
        const { error } = taskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Invalid task data', details: error.details });
        }
        try {
            const newTask = await Task.createTask(req.body);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: 'Error creating task', error });
        }
    },
    updateTask: async (req, res) => {
        const { id } = req.params;
        const { error } = taskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Invalid task data', details: error.details });
        }
        try {
            const updatedTask = await Task.updateTask(id, req.body);
            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json({ message: 'Error updating task', error });
        }
    },
    deleteTask: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await Task.deleteTask(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting task', error });
        }
    },
    markTaskAsCompleted: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedTask = await Task.markAsCompleted(id);
            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json({ message: 'Error marking task as completed', error });
        }
    },
};