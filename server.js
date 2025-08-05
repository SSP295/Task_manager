const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Allow any login for demo
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    return res.json({ success: true });
  }
  return res.status(400).json({ success: false, message: 'Invalid credentials' });
});

// In-memory tasks
let tasks = [];

// Create Task
app.post('/api/tasks', (req, res) => {
  const { title, description, priority, isCompleted } = req.body;
  if (!title || !priority) {
    return res.status(400).json({ error: 'Title and Priority are required' });
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

// Get Tasks
app.get('/api/tasks', (req, res) => {
  res.json({ tasks });
});

// Delete Task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id);
  res.json({ success: true });
});

// Export for Vercel
module.exports = app;
