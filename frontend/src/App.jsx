import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'
import ModalContainer from './components/ModalContainer'

function App() {
  const { tasks, addTask, editTask, removeTask, toggleTaskCompletion } = useTasks();
  const [showForm, setShowForm] = useState(false);
  //const [searchText, setSearchText] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCreateTask = () => {
    setShowForm(true);
    setSelectedTask(null);
  }

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowForm(true);
  }

  const handleFormSubmit = async (task) => {
    if (selectedTask) {
      await editTask(selectedTask.id, task);
    } else {
      await addTask(task);
    }
    setShowForm(false);
    setSelectedTask(null);
  }

  const handleRemoveTask = async (taskId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      await removeTask(taskId);
    }
  }

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
        <div>
          <h1>📝 Lista de Tareas</h1>
          <button onClick={handleCreateTask}>{showForm ? 'Cancelar' : 'Agregar Tarea'}</button>
        </div>

        {showForm && <ModalContainer title={selectedTask ? 'Editar' : 'Agregar'} onClose={() => setShowForm(false)}>
            <TaskForm onSubmit={handleFormSubmit} task={selectedTask} onClose={() => setShowForm(false)} />
          </ModalContainer>}
        <TaskList tasks={tasks} onDelete={handleRemoveTask} onToggle={toggleTaskCompletion} onEdit={handleEditTask} />
      </div>
    </>
  )
}

export default App