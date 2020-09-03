const { Pool, Client } = require('pg');
const CONFIG = require('./config.js');
require('dotenv').config();

var pool = new Pool({
    user: "postgres",
    host: 'localhost',
    database: "greenfield_reviews",
    password: "pawscat",
    port: 5432,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000
})
// .connect()
// .then(console.log('connected to greenfield'))
// .catch(err => console.log(err));

module.exports = pool;
