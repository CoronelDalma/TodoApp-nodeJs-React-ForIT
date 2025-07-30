function TaskItem({ task, onDelete, onToggle }) {
    const handleDelete = () => {
        onDelete(task.id);
    };

    const handleToggle = () => {
        onToggle(task.id);
    };

    const handleEdit = () => {
        const updatedTask = {
            ...task,
            title: prompt('Edit task title:', task.title),
            description: prompt('Edit task description:', task.description),
        };
        console.log('Editing task:', updatedTask);
        //onEdit(task.id, updatedTask);
    };

    return (
        <li className="task-item">
            <h3>{task.title}</h3>
            <span className="task-date">
                {new Date(task.createdAt).toLocaleDateString()}
            </span>
            <p>{task.description}</p>
            <input type="checkbox" checked={task.completed} onChange={handleToggle} />
            <button onClick={handleEdit}>Editar</button>
            <button onClick={handleDelete}>Eliminar</button>
        </li>
    );
}

export default TaskItem;