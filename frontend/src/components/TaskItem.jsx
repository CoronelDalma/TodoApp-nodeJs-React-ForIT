function TaskItem({ task, onDelete, onToggle, onEdit }) {
    const handleDelete = () => {
        onDelete(task.id);
    };

    const handleToggle = () => {
        onToggle(task.id);
    };

    const handleEdit = (task) => {
        /*const updatedTask = {
            ...task,
            title: prompt('Edit task title:', task.title),
            description: prompt('Edit task description:', task.description),
        };*/
        console.log('Editing task:', task);
        onEdit(task.id, task);
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