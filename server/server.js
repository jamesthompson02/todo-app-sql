const express = require('express');
const server = express();
const cors = require('cors');
const auth = require('./routes/auth');

server.use(cors());
server.use(express.json());
server.use('/', auth);

server.get('/', (req, res) => {
    res.send(`<h1>Server has been successfully served<h1>`);
})

module.exports = { server };