const { Pool, Client } = require('pg');

const pool = new Pool({
    user: "postgres", 
    host: "localhost",
    database: "greenfield_reviews",
    password: "pawscat",
    port: 5432
});

const client = pool.connect();


module.exports.pool = pool;
module.exports.client = client;