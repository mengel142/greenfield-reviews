
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const reviews = path.resolve(__dirname, '../../review-data/reviews.csv');

        

// let ws = fs.createWriteStream('clean_reviews2.csv');

// fs.createReadStream(reviews)
//     .pipe(csv.parse({ headers: true }))
//     .on('error', error => console.log(error))
//     .transform((row) => {
//         return {
//             id: Number(row.id),
//             product_id: Number(row.product_id),
//             rating: Number(row.rating),
//             date: row.date ? String(row.date) : '',
//             summary: row.summary ? String(row.summary) : '',
//             body: row.body ? String(row.body) : '',
//             recommend: !isNaN(row.recommend) ? Number(row.recommend) : 0,
//             reported: !isNaN(row.reported) ? Number(row.reported) : 0,
//             reviewer_name: row.reviewer_name ? String(row.reviewer_name) : '',
//             reviewer_email: row.reviewer_email ? String(row.reviewer_email) : '',
//             response: row.response && (row.response !== 'null') ? row.response : null,
//             helpfulness: row.helpfulness ? Number(row.helpfulness) : 0
//         }
//     })
//     .on('data', row => {
//         if (row.product_id + '' ==='1') {
//             console.log(row.product_id + '');
//         };
//     })
//     .on('end', () => console.log('count: ', count));
//     .pipe(csv.format({ headers: true }))
//     .pipe(ws)
//     .on('finish', () => {
//         console.log('finished');
//     });
const file = path.resolve(__dirname, './clean_reviews.csv');
let count = 0;
fs.createReadStream(reviews)
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.log(error))
    .on('data', row => {
        if (row.product_id === 1) {
            console.log(row.product_id);
        };
    })
    .on('end', () => console.log('count: ', count));