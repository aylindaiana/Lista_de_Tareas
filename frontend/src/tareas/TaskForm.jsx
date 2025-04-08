import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tareas/${id}`);
      if (!response.ok) {
        throw new Error('Error al cargar la tarea');
      }
      const data = await response.json();
      setTask({ title: data.title, description: data.description || '' });
    } catch (error) {
      console.error('Error al buscar la tarea:', error);
      setError('No se pudo cargar la tarea. Intente de nuevo.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = id
        ? `${import.meta.env.VITE_API_URL}/tareas/${id}`
        : `${import.meta.env.VITE_API_URL}/tareas`;
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la tarea');
      }

      navigate('/'); 
    } catch (error) {
      console.error('Error saving task:', error);
      setError('No se pudo guardar la tarea. Intente de nuevo.');
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{id ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Título:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
         // required
        />
      </div>
      <button type="submit" className="btn">Guardar</button>
    </form>
  );
}

export default TaskForm;