
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const pool = require('../index.js');
const file = path.resolve(__dirname, '../../review-data/characteristics.csv');

const characteristicsETL = () => {
    return new Promise((res, rej) => {
        fs.createReadStream(file)
        .pipe(csv.parse({ headers: true }))
        .on('data', row => {
            pool.query('INSERT INTO characteristics (id, product_id, name) VALUES ($1, $2, $3)', 
            [row.id, row.product_id, row.name])
            .catch(err => console.log(err));
        })
        .on('error', error => {
            console.log(error);
            rej(error);
        })
        .on('end', () => {
            res('Success');
            console.log('finished uploading characteristics');
        });
    })
};

module.exports = characteristicsETL;