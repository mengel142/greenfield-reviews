const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const pool = require('../index.js');
const throttle = require('throttle');
const file = path.resolve(__dirname, '../../review-data/reviews_photos.csv');


let stream = fs.createReadStream(file)

    stream
    .pipe(new throttle({bps: 1000 * 1024}))
    .pipe(csv.parse({ headers: true }))
    .on('data', row => {
        pool.query('INSERT INTO photos (id, review_id, url) VALUES ($1, $2, $3)', 
        [row.id, row.review_id, row.url])
        .then(res => { return;})
        .catch(err => console.log(err));
    })
    .on('error', error => {
        console.log(error);
    })
    .on('end', () => {
        console.log('finished uploading photos');
    });

