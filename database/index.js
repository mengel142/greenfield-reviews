const { Pool, Client } = require('pg');
const CONFIG = require('./config.js');
require('dotenv').config();

const pool = new Pool(CONFIG);

module.exports.pool = pool;
