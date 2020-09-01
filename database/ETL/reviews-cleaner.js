
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const pool = require('../index.js');
const reviews = path.resolve(__dirname, '../../review-data/reviews.csv');

        

let ws = fs.createWriteStream('clean_reviews.csv');
// fs.createReadStream('test.csv')
//     .pipe(csv.parse({ headers: true }))
//     .on('error', error => console.log(error))
//     .on('data', row => {
//         if ()
//     })
//     .on('end', () => console.log('finished'));

fs.createReadStream(reviews)
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.log(error))
    .transform((row) => {
        return {
            id: Number(row.id),
            product_id: Number(row.product_id),
            rating: Number(row.rating),
            date: row.date ? row.date : "",
            summary: row.summary ? row.summary : "",
            body: row.body ? String(row.body) : "",
            recommend: !isNaN(row.recommend) ? row.recommend : 0,
            reported: !isNaN(row.reported) ? row.reported : 0,
            reviewer_name: row.reviewer_name ? row.reviewer_name : "",
            reviewer_email: row.reviewer_email ? row.reviewer_email : "",
            response: row.response && (row.response !== 'null') ? row.response : "",
            helpfulness: row.helpfulness ? Number(row.helpfulness) : 0
        }
    })
    .pipe(csv.format({ headers: true }))
    .pipe(ws)
    .on('finish', () => {
        console.log('finished');
    });
    