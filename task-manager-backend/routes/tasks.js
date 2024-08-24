const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../models/Task');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Create a task
router.post('/', authenticateToken, async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const task = await createTask(title, description, status, req.user.id);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get all tasks with pagination
router.get('/', authenticateToken, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const tasks = await getTasks(req.user.id, page, limit);
        res.json(tasks);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update a task
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const result = await updateTask(id, title, description, status);
        if (result.changes === 0) {
            return res.status(404).send('Task not found');
        }
        res.json({ id, title, description, status });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteTask(id);
        if (result.changes === 0) {
            return res.status(404).send('Task not found');
        }
        res.status(204).send();
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
