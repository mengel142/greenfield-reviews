const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

const characteristicsCSV = path.resolve(__dirname, 'review-data', 'characteristics.csv');

fs.createReadStream(characteristicsCSV)
