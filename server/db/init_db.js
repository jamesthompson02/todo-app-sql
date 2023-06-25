const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: 'todoapp'
});

module.exports = pool