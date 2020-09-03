
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const pool = require('../index.js');
const copyFrom = require('pg-copy-streams').from;
const file = path.resolve(__dirname, '../../review-data/characteristic_reviews.csv');

return pool.connect((err, client, done) => {
    var stream = client.query(copyFrom(`COPY characteristic_reviews FROM STDIN DELIMITERS ',' CSV header`))
    var fileStream = fs.createReadStream(file)
    fileStream.on('error', err => {
        console.log(err);;
        done();
    })
    stream.on('error', err => {
        console.log(err);
        done();
    })
    stream.on('finish', () => {
        done();
        console.log('finished');
    })
    fileStream.pipe(stream)
})


// fs.createReadStream(file)
//     .pipe(csv.parse({ headers: true }))
//     .on('data', row => {
//         pool.query('INSERT INTO review_characteristic (id, characteristic_id, review_id, value) VALUES ($1, $2, $3, $4)', 
//         [row.id, row.characteristic_id, row.review_id, row.value])
//     })
//     .on('error', error => {
//         console.log(error);
//     })
//     .on('end', () => {
//         console.log('finished uploading characteristic_reviews');
//     });


