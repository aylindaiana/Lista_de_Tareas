const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const Port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let tareas = [];

app.get('/api/tareas', (req, res) => {
  res.json(tareas);
});

app.get('/api/tareas/:id', (req, res) => {
  const { id } = req.params;
  const tarea = tareas.find(task => task.id === id);
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  res.json(tarea);
});

app.post('/api/tareas', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'El titulo es requerido para completar.' });
  }

  const nuevo = {
    id: String(Date.now()), 
    title,
    description: description || '',
    completed: false,
    createdAt: new Date(),
  };
  tareas.push(nuevo);
  res.status(201).json(nuevo);
});

app.put('/api/tareas/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const indexTarea = tareas.findIndex(task => task.id === id);
  if (indexTarea === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tareas[indexTarea] = {
    ...tareas[indexTarea],
    title: title || tareas[indexTarea].title,
    description: description !== undefined ? description : tareas[indexTarea].description,
    completed: completed !== undefined ? completed : tareas[indexTarea].completed,
  };
  res.json(tareas[indexTarea]);
});

app.delete('/api/tareas/:id', (req, res) => {
  const { id } = req.params;
  const indexTarea = tareas.findIndex(task => task.id === id);
  if (indexTarea === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tareas = tareas.filter(task => task.id !== id);
  res.status(204).send();
});

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});