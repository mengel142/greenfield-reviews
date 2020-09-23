const { Pool, Client } = require('pg');



var pool = new Pool({
    user: 'postgres',
    host: '18.189.170.255',
    database: 'greenfield_reviews',
    password: 'pawscat',
    port: 5432
    // idleTimeoutMillis: 30000,
    // connectionTimeoutMillis: 2000,
    // max: 20
})

module.exports = pool;