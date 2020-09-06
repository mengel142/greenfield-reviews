const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const pool = require('../database/index.js');
const router = require('./router');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

// let q = 'INSERT INTO reviews (id, product_id, rating) VALUES ($1, $2, $3)';
//         return pool.connect()
//             .then(client => {
//                 return client.query(q, [1, 1, 5])
//                 .then(res => {
//                     client.release();
//                     return res;
//                 })
//                 .catch(err => {
//                     client.release();
//                     console.log(err.stack);
//                 })
//             })