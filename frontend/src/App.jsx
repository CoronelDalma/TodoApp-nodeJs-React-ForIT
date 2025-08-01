import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'
import ModalContainer from './components/ModalContainer'
import ThemeToggle from './components/ThemeToggle'

import './icons/icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TaskFilters from './components/TaskFilters'

function App() {
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const { tasks, addTask, editTask, removeTask, toggleTaskCompletion } = useTasks(currentFilter, searchText);

  const handleCreateTask = () => {
    setShowForm(true);
    setSelectedTask(null);
  }

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowForm(true);
  }

  const handleFormSubmit = async (task) => {
    selectedTask 
      ? await editTask(selectedTask.id, task)
      : await addTask(task);
  
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
      <header className='header'>
        <h1>Todo App</h1>
        <ThemeToggle />
      </header>

      <main style={{ maxWidth: '600px', margin: '0rem auto', padding: '1rem' }}>
        <div className='title-app'>
          <h1>📝 Lista de Tareas</h1>
          <button onClick={handleCreateTask}><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
        </div>

        <TaskFilters onFilterChange={setCurrentFilter} currentFilter={currentFilter} onSearch={setSearchText} />

        {showForm && (
          <ModalContainer title={selectedTask ? 'Editar' : 'Nueva Tarea'} onClose={() => setShowForm(false)}>
            <TaskForm onSubmit={handleFormSubmit} task={selectedTask} onClose={() => setShowForm(false)} />
          </ModalContainer>
        )}

        <TaskList 
          tasks={tasks} 
          onDelete={handleRemoveTask} 
          onToggle={toggleTaskCompletion} 
          onEdit={handleEditTask} 
        />
      </main>

      <footer>
        <p>&copy; 2025 Coronel Dalma</p>
      </footer>

    </>
  )
}

export default App