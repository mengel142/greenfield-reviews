const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const pool = require('../index.js');
const file = path.resolve(__dirname, '../../review-data/characteristics.csv');

const photosETL = () => {
    return new Promise ((res, rej) => {
        fs.createReadStream(photos)
        .pipe(fastcsv.parse({ headers: true }))
        .on('data', row => {
            pool.query('INSERT INTO photos (id, review_id, url) VALUES ($1, $2, $3)', 
            [row.id, row.review_id, row.url])
        })
        .on('error', error => {
            console.log(err);
            rej(err);
        })
        .on('end', () => {
            res('Success');
            console.log('finished uploading photos');
        });
    })
}

module.exports = photosETL;
