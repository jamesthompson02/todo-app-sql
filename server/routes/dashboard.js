const dashboardRouter = require('express').Router();
const Todo = require('../models/todo');
const { authoriseAccess } = require('../middleware/authorisation');

dashboardRouter.get('/', authoriseAccess, async (req, res) => {
    try {
        const email = req.email;
        
        const todos = await Todo.getTodosForUser(email);

        res.status(200).json({ todos });
    } catch(err) {
        res.status(500).send(err.message);
    }
})

module.exports = dashboardRouter









