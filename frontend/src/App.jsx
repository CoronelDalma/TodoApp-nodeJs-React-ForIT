import { useTasks } from './hooks/useTasks'
//import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const { tasks, removeTask } = useTasks();

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
        <h1>📝 Lista de Tareas</h1>
        {/* <TaskForm onAdd={addTask} /> */}
        <TaskList tasks={tasks} onDelete={removeTask} />
      </div>
    </>
  )
}

export default App
