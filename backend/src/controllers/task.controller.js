const { get, search } = require('../app');
const Task = require('../models/task.model');
const taskSchema = require('../validations/task.schema');

const taskController = {
    getAllTasks: async (req, res) => {
        const { completed } = req.query;
        const { search } = req.query;

        if (search) {
            return taskController.searchTasks(req, res);
        }

        if (completed !== undefined) {
            return taskController.getAllTasksByStatus(req, res);
        }
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
    getAllTasksByStatus: async (req, res) => {
        const { completed } = req.query;
        if (completed !== 'true' && completed !== 'false') {
            return res.status(400).json({ message: 'Invalid status query parameter' });
        }
        try {
            const tasks = await Task.getAllByStatus(completed === 'true');
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving tasks by status', error });
        }
    },
    searchTasks: async (req, res) => {
        const { search } = req.query;

        if (!search || search.trim() === '') {
            return res.status(400).json({ message: 'Search query cannot be empty' });
        }
        try {
            const tasks = await Task.searchTasks(search);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error searching tasks', error });
        }
    }
};

module.exports = taskController;