import { useEffect, useState } from "react";
import './styles/TaskForm.css';

function TaskForm({ onSubmit, task = null, onClose }) {
    const [title, setTitle] = useState(task ? task.title : "");
    const [description, setDescription] = useState(task ? task.description : "");

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        if (!description || description.trim() == "") {
            onSubmit({title});
            return;
        };
        onSubmit({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="form-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => { setTitle(""); setDescription(""); onClose(); }}>Cancelar</button>
            </div>
        </form>
    );
}

export default TaskForm;
