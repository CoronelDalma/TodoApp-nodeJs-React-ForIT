import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask, getTasksByStatus, searchTasks } from '../services/api';
import { useDebounce } from './useDebounce';

export const useTasks = (filter = 'all', searchText = '') => {
    const [tasks, setTasks] = useState([]);
    const debouncedSearch = useDebounce(searchText, 500);

    const fetchTasks = useCallback(async () => {
        let data;
        try {
            if (debouncedSearch.trim()) {
                data = await searchTasks(debouncedSearch);
            } else if (filter === 'completed' || filter === 'pending') {
                data = await getTasksByStatus(filter === 'completed');
            } else {
                data = await getTasks();
            }
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    }, [filter, debouncedSearch]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

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
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
            await deleteTask(taskId);
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const toggleTaskCompletion = async (taskId) => {
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
            const updatedTask = {
                title: task.title,
                description: task.description,
                completed: !task.completed,
                createdAt: task.createdAt,
            }
            console.log('changing task:', task.completed, 'to', !task.completed);
            await editTask(taskId, updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, completed: updatedTask.completed } : task
                )
            );
            console.log('Tasks updated:', tasks);
        }

    };

    return { tasks, addTask, editTask, removeTask, toggleTaskCompletion };
};


