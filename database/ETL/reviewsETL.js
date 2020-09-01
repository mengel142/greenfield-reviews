const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const pool = require('../index.js');
const throttle = require('throttle');
const copyFrom = require('pg-copy-streams').from
const reviews = path.resolve(__dirname, './reviews-cleaned.csv');


// fs.createReadStream(reviews)
//     .pipe(new throttle({bps: 100 * 1024}))
//     .pipe(csv.parse({ headers: true }))
//     .on('data', (row) => {
//         pool.query('INSERT INTO reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', 
//             [row.id, row.product_id, row.rating, row.date, row.summary, row.body, row.recommend, row.reported, row.reviewer_name, row.reviewer_email, row.response, row.helpfulness])
//             .catch(err => console.log(err));
//     })
//     .on('error', error => {
//         console.log(error);
//     })
//     .on('end', () => {
//         console.log('finished');
//     });


pool.connect((err, client, done) => {
    var stream = client.query(copyFrom(`COPY reviews FROM STDIN DELIMITERS ',' CSV header`));
    var fileStream = fs.createReadStream(reviews);
    fileStream.on('error', done)
    stream.on('error', done)
    fileStream.pipe(stream)
})
