const API = import.meta.env.VITE_API_URL;
const TASKS_URL = `${API}/tasks`;

export const getTasks = async () => {
    try {
        const response = await fetch(TASKS_URL);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

export const getTaskById = async (taskId) => {
    try {
        const response = await fetch(`${TASKS_URL}/${taskId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        throw error;
    }
}

export const createTask = async (task) => {
    try {
        const response = await fetch(TASKS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

export const updateTask = async (taskId, task) => {    
    try {
        const response = await fetch(`${TASKS_URL}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}

export const completeTask = async (taskId) => {
    try {
        const response = await fetch(`${TASKS_URL}/${taskId}/complete`, {
            method: 'PATCH',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error completing task:', error);
        throw error;
    }
}

export const deleteTask = async (taskId) => {
    try {
        const response = await fetch(`${TASKS_URL}/${taskId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}

export const getTasksByStatus = async (status) => {
    try {
        const response = await fetch(`${TASKS_URL}?completed=${status}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks by status:', error);
        throw error;
    }
}

export const searchTasks = async (text) => {    
    try {
        const response = await fetch(`${TASKS_URL}?search=${encodeURIComponent(text)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching tasks:', error);
        throw error;
    }
}