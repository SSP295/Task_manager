const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory data store
let tasks = [];
const USER = { username: 'admin', password: 'password123' };

// Authentication Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: 'Invalid username or password' });
});

// Create Task
app.post('/api/tasks', (req, res) => {
  const { title, description, priority, isCompleted } = req.body;
  if (!title || !priority) {
    return res.status(400).json({ error: 'Title and priority fields are required' });
  }
  const newTask = {
    id: uuidv4(),
    title,
    description: description || '',
    priority,
    isCompleted: !!isCompleted,
    createdAt: new Date()
  };
  tasks.push(newTask);
  res.json(newTask);
});

// Fetch Tasks with filter and pagination
app.get('/api/tasks', (req, res) => {
  let { page = 1, limit = 5, priority } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  let filteredTasks = priority ? tasks.filter(t => t.priority === priority) : tasks;
  const start = (page - 1) * limit;
  const end = start + limit;
  res.json({ total: filteredTasks.length, tasks: filteredTasks.slice(start, end) });
});

// Update Task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
});

// Delete Task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== id);
  res.json({ success: true });
});

app.listen(3000, () => console.log('Server running locally on http://localhost:3000'));
