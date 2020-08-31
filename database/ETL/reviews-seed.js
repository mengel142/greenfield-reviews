const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const client = require('../index.js');
const throttle = require('throttle');
const copyFrom = require('pg-copy-streams').from
const reviews = path.resolve(__dirname, './reviews-cleaned.csv');

// const reviewETL = () => {
//     return new Promise((res, rej) => {
//         fs.createReadStream(reviews)
//         .pipe(new throttle(1000000))
//         .pipe(csv.parse({ headers: true }))
//         .transform((row) => {
//             return {
//                 id: Number(row.id),
//                 product_id: Number(row.product_id),
//                 rating: Number(row.rating),
//                 date: row.date ? row.date : null,
//                 summary: row.summary ? row.summary : '',
//                 body: row.body ? row.body : '',
//                 recommend: !isNaN(row.recommend) ? Number(row.recommend) : 0,
//                 reported: !isNaN(row.reported) ? Number(row.reported) : 0,
//                 reviewer_name: row.reviewer_name ? row.reviewer_name : '',
//                 reviewer_email: row.reviewer_email ? row.reviewer_email : '',
//                 response: row.response && (row.response !== 'null') ? row.response : null,
//                 helpfulness: Number(row.helpfulness)
//             }
//         })
//         .on('data', (row) => {
//             pool.query('INSERT INTO reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', 
//                 [row.id, row.product_id, row.rating, row.date, row.summary, row.body, row.recommend, row.reported, row.reviewer_name, row.reviewer_email, row.response, row.helpfulness])
//                 .catch(err => console.log(err));

//         })
//         .on('error', error => {
//             console.log(error);
//             rej(err);
//         })
//         .on('end', () => {
//             res('Success');
//             console.log('finished');
//         });
//     })
// };

// reviewETL();

var stream = client.query(copyFrom(`COPY reviews FROM STDIN DELIMITERS ',' CSV header`));
var fileStream = fs.createReadStream(reviews);

fileStream.on('error', (error) =>{
    console.log(`Error in creating read stream ${error}`)
})
stream.on('error', (error) => {
    console.log(`Error in creating stream ${error}`)
})
stream.on('end', () => {
    console.log(`Completed loading data into reviews`)
    client.end()
})
fileStream.pipe(stream);
