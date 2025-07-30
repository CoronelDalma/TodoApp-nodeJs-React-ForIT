import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggle }) {
    if (!tasks || tasks.length === 0) {
        return <p>No tasks available.</p>;
    }
    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
            ))}
        </ul>
    );
}
export default TaskList;