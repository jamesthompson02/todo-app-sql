const todoRouter = require('express').Router();
const Todo = require('../models/todo');
const { authoriseAccess } = require('../middleware/authorisation');

todoRouter.post('/create', authoriseAccess, async (req, res) => {
    try {
        const { email, title, description, deadlineDate, deadlineTime } = req.body;
        
        const todo = await Todo.createTodo(email, title, description, deadlineDate, deadlineTime);

        res.status(201).send('Todo successfully created.');
    } catch(err) {
        res.status(500).send(err.message);
    }
});

todoRouter.put('/update', authoriseAccess, async (req, res) => {
    try {
        const { id, title, description, deadlineDate, deadlineTime } = req.body;

        const updatedTodo = await Todo.updateTodo(id, title, description, deadlineDate, deadlineTime);

        res.status(204).send('Todo updated successfully.');
    } catch(err) {
        res.status(500).send(err.message);
    }
});

todoRouter.delete('/delete', authoriseAccess, async (req, res) => {
    try {
        const { id } = req.body;
        
        const deletedTodo = await Todo.deleteTodo(id);

        res.status(204).send('Todo deleted successfully');
    } catch(err) {
        res.status(500).send(err.message);
    }
});

module.exports = todoRouter