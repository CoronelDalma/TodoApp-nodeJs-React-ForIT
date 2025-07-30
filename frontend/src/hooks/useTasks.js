import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (task) => {
        try {
            const newTask = await createTask(task);
            setTasks((prevTasks) => [...prevTasks, newTask]);
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const editTask = async (taskId, updatedTask) => {
        try {
            const response = await updateTask(taskId, updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? response : task))
            );
        } catch (error) {
            console.error('Failed to edit task:', error);
        }
    };

    const removeTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    return { tasks, addTask, editTask, removeTask };
};


