const { Pool, Client } = require('pg');
require('dotenv').config();


var pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})
// .connect()
// .then(console.log('connected to greenfield'))
// .catch(err => console.log(err));

module.exports = pool;
