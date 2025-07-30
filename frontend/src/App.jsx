import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const { tasks, addTask, removeTask, toggleTaskCompletion } = useTasks();
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (task) => {
    addTask(task);
    setShowForm(false);
  }

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
        <div>
          <h1>📝 Lista de Tareas</h1>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : 'Agregar Tarea'}
          </button>
        </div>

        {showForm && <TaskForm onSubmit={handleFormSubmit} />}
        <TaskList tasks={tasks} onDelete={removeTask} onToggle={toggleTaskCompletion} />
      </div>
    </>
  )
}

export default App
