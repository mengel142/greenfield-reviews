const { Pool, Client } = require('pg');
const CONFIG = require('./config.js');
require('dotenv').config();

var client = new Client({
    user: "postgres",
    host: 'localhost',
    database: "greenfield_reviews",
    password: "pawscat",
    port: 5432
})
// .connect()
// .then(console.log('connected to greenfield'))
// .catch(err => console.log(err));
client.connect();

module.exports = client;
