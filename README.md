# Task Manager App

## Overview
This is a simple Task Management web application that supports:
- User login
- CRUD operations for tasks
- Filtering and pagination

## Features
- Add, update, and delete tasks
- Tasks include title, description, priority, and completion status
- Lightweight UI for usability

## Tech Stack
- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS, Vanilla JS
- **Deployment:** Vercel-ready

## Schema Design
| Field | Type | Description |
|------|------|-------------|
| id | UUID | Unique identifier |
| title | String | Task title |
| description | Text | Task details |
| priority | Enum | Low, Medium, High |
| isCompleted | Boolean | Task status |
| createdAt | DateTime | Creation timestamp |

## Test Plan
- Positive: Create task with valid data -> Success
- Negative: Missing title -> Error message
- Edge: Very long title -> Validation error

## Reflection
Given more time, I would add:
- Persistent database
- JWT authentication
- Unit tests

## Deployment
1. Push to GitHub
2. Import project to Vercel
3. Deploy and share live link
