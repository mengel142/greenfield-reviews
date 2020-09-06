const { Pool, Client } = require('pg');
require('dotenv').config();


var pool = new Pool({
    user: 'postgres',
    database: 'greenfield_reviews',
    password: 'pawscat',
    port: 5432,
    host: 'postgres',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000
})
// .connect()
// .then(console.log('connected to greenfield'))
// .catch(err => console.log(err));

module.exports = pool;
