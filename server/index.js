const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const { pool, client } = require('../database/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    return pool.query('SELECT * FROM characteristics;')
        .then(({rows}) => {
            res.json(rows[0].name);
        });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
