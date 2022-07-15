
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const pool = require('./index.js');
const copyFrom = require('pg-copy-streams').from;
const file = path.resolve(__dirname, '../../review-data/characteristic_reviews.csv');

const characteristicReviewsETL = () => {
    return new Promise((res, rej) => {
        return pool.connect((err, client, done) => {
            var stream = client.query(copyFrom(`COPY characteristic_reviews FROM STDIN DELIMITERS ',' CSV header`))
            var fileStream = fs.createReadStream(file)
            fileStream.on('error', err => {
                console.log(err);;
                done();
            })
            stream.on('error', err => {
                console.log(err);
                rej(err);
                done();
            })
            stream.on('finish', () => {
                done();
                res('finished finished characteristic reviews ETL')
                console.log('finished characteristic reviews ETL');
            })
            fileStream.pipe(stream)
        })
    })

};

module.exports = characteristicReviewsETL;



