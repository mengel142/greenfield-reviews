
const fs = require('fs');
const path = require('path');
const pool = require('../index.js');
const copyFrom = require('pg-copy-streams').from;
const file = path.resolve(__dirname, '../../review-data/characteristics.csv');


return pool.connect((err, client, done) => {
    var stream = client.query(copyFrom(`COPY characteristics FROM STDIN DELIMITERS ',' CSV header`))
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

