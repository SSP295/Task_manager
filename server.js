const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tasks = [];
const USER = { username: 'admin', password: 'password123' };

// API Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// CRUD APIs
app.post('/api/tasks', (req, res) => {
  const { title, description, priority, isCompleted } = req.body;
  if (!title || !priority) return res.status(400).json({ error: 'Title and Priority are required' });
  const newTask = { id: uuidv4(), title, description, priority, isCompleted: !!isCompleted, createdAt: new Date() };
  tasks.push(newTask);
  res.json(newTask);
});

app.get('/api/tasks', (req, res) => {
  res.json({ tasks });
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== id);
  res.json({ success: true });
});

module.exports = app;
