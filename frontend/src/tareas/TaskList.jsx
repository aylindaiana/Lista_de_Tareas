import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TaskItem from './TaskItem';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const location = useLocation(); 

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tareas`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [location]); 

  return (
    <div>
      <Link to="/nueva" className="btn">Agregar Tarea</Link>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No hay tareas aún.</p>
        ) : (
          tasks.map(task => (
            <TaskItem key={task.id} task={task} onUpdate={fetchTasks} />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;