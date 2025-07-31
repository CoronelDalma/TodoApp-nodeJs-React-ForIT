import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/TaskItem.css';

function TaskItem({ task, onDelete, onToggle, onEdit }) {
    const [showDetails, setShowDetails] = useState(false);

    const handleDelete = () => {
        onDelete(task.id);
    };

    const handleToggle = () => {
        onToggle(task.id);
    };

    const handleEdit = (task) => {
        onEdit(task.id, task);
    };

    return (
        <li className="task-item">
            <div className='item-header'>
                <span className="task-date"> 
                    { new Date(task.createdAt).toLocaleDateString()}
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='item-title'>
                        <input className="completed" type="checkbox" checked={task.completed} onChange={handleToggle} />
                        <h3 className={task.completed ? "completed" : ""}>{task.title}</h3>
                    </div>
                    <button className="details-toggle" onClick={() => setShowDetails(!showDetails)}>
                        <FontAwesomeIcon icon={showDetails ? "chevron-up" : "chevron-down"} />
                    </button>
                </div>
            </div>

            {showDetails && (
                <div className="task-details">
                    <p>{task.description}</p>
                </div>
            )}

            <div className="task-actions">
                <button onClick={handleEdit}><FontAwesomeIcon icon="edit" /></button>
                <button onClick={handleDelete}><FontAwesomeIcon icon="trash" /></button>
            </div>


        </li>
    );
}

export default TaskItem;