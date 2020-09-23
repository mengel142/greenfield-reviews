const { Pool, Client } = require('pg');
require('dotenv').config();


var pool = new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'greenfield_reviews',
    password: 'pawscat',
    port: 5432
})
// .connect()
// .then(console.log('connected to greenfield'))
// .catch(err => console.log(err));

module.exports = pool;
