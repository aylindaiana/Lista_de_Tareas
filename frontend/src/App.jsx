import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './tareas/TaskList';
import TaskForms from './tareas/TaskForm';
import './style.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <h1>Lista de Tareas</h1>
          <Link to="/">Inicio</Link> 
          <Link to="/nueva">Nueva Tarea</Link>
        </nav>

        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/nueva" element={<TaskForms />} />
          <Route path="/editar/:id" element={<TaskForms />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
