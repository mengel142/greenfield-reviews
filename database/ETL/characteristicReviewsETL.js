
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const pool = require('../index.js');
const file = path.resolve(__dirname, '../../review-data/characteristic_reviews.csv');


fs.createReadStream(file)
    .pipe(csv.parse({ headers: true }))
    .on('data', row => {
        pool.query('INSERT INTO review_characteristic (id, characteristic_id, review_id, value) VALUES ($1, $2, $3, $4)', 
        [row.id, row.characteristic_id, row.review_id, row.value])
    })
    .on('error', error => {
        console.log(error);
    })
    .on('end', () => {
        console.log('finished uploading characteristic_reviews');
    });


