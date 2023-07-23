const express = require('express');
const server = express();
const cors = require('cors');
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
const todoRouter = require('./routes/todos');
const userAccountRouter = require('./routes/userAccountActions');

server.use(cors());
server.use(express.json());

// routes 
server.use('/auth', authRouter);
server.use('/dashboard', dashboardRouter);
server.use('/todo', todoRouter);
server.use('/account', userAccountRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Server has been successfully served<h1>`);
})

module.exports = { server };