const { Pool, Client } = require('pg');



var pool = new Pool({
    user: 'postgres',
    host: '18.222.196.218',
    database: 'greenfield_reviews',
    password: 'pawscat',
    port: 5432,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 3000,
    max: 50
})

module.exports = pool;