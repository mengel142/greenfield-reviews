
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const pool = require('../index.js');


        


fs.createReadStream('reviews-cleaned.csv')
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.log(error))
    .on('data', row => {
        if (row.body !== row.body.trim()) console.log(row.id);
    })
    .on('end', () => console.log('finished'));

// fs.createReadStream(reviews)
//     .pipe(csv.parse({ headers: true }))
//     .pipe(csv.format({headers: true}))
//     .on('error', error => console.log(error))
//     .transform((row) => {
//         return {
//             id: Number(row.id),
//             product_id: Number(row.product_id),
//             rating: Number(row.rating),
//             date: row.date ? row.date : null,
//             summary: row.summary ? row.summary : '',
//             body: row.body ? row.body : '',
//             recommend: !isNaN(row.recommend) ? Number(row.recommend) : 0,
//             reported: !isNaN(row.reported) ? Number(row.reported) : 0,
//             reviewer_name: row.reviewer_name ? row.reviewer_name : '',
//             reviewer_email: row.reviewer_email ? row.reviewer_email : '',
//             response: row.response && (row.response !== 'null') ? row.response : null,
//             helpfulness: Number(row.helpfulness)
//         }
//     })
//     .pipe(fs.createWriteStream('reviews-cleaned.csv'))
//     .on('end', () => {
//         console.log('finished');
//     });


// var stream = client.query(copyFrom(`COPY reviews FROM STDIN DELIMITERS ',' CSV header`));
// var fileStream = fs.createReadStream(reviews);

// fileStream.on('error', (error) =>{
//     console.log(`Error in creating read stream ${error}`)
// })
// stream.on('error', (error) => {
//     console.log(`Error in creating stream ${error}`)
// })
// stream.on('end', () => {
//     console.log(`Completed loading data into reviews`)
//     client.end()
// })
// fileStream.pipe(stream);

 