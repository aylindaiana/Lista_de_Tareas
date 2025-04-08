import { Link } from 'react-router-dom';

function TaskItem({ task, onUpdate }) {
  const handleDelete = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/tareas/${task.id}`, {
        method: 'DELETE',
      });
      onUpdate();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/tareas/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>} 
      <p>Creado: {new Date(task.createdAt).toLocaleDateString()}</p>
      <p>Estado: {task.completed ? 'Completada' : 'Pendiente'}</p>
      <button onClick={handleToggleComplete}>
        {task.completed ? 'Marcar como Pendiente' : 'Marcar como Completada'}
      </button>
      <Link to={`/editar/${task.id}`} className="btn">Editar</Link>
      <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
    </div>
  );
}

export default TaskItem;