const pool = require('./index.js');
const wait = require('util').promisify(setTimeout);


const transformDB = () => {
    return new Promise((resolve, reject) => {
        return pool.connect()
            .then(client => {
                console.log('connected to greenfield_reviews. Adding photos to reviews...');
                client.release();
            })
            .catch(err => {
                console.log('error connecting to greenfield_reviews', err);
                pool.end();
                reject(err);
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('CREATE INDEX photoRev_idx ON reviews_photos (review_id);')
                    .then(res => {
                        client.release();
                        return;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('CREATE INDEX photo_idx ON reviews_photos (id);')
                    .then(res => {
                        client.release();
                        return;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('ALTER TABLE reviews ADD COLUMN photos text[];')
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query(`UPDATE reviews SET photos = array(
                        SELECT url
                        FROM reviews_photos
                        WHERE reviews_photos.review_id = reviews.id
                        );`)
                        .then(res => {
                            client.release();
                            return res;
                        })
                        .catch(err => {
                            client.release();
                            throw err;
                        })
                })
            })
            .then(res => {
                console.log('Dropping photos table...');
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('DROP TABLE IF EXISTS reviews_photos;')
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .catch(err => {
                console.log('Error adding photo table to reviews', err);
                pool.end();
                reject(err);
            })
            .then((res) => {
                (async () => {
                    console.log('Dropped photos table.');
                    await wait(10000);
                    console.log('Adding product_ids to characterisitic_reviews table...');
                })();
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('CREATE INDEX char_idx ON characteristics (id);')
                    .then(res => {
                        client.release();
                        return;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                }) 
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('CREATE INDEX char_rev_char_idx ON characteristic_reviews (characteristic_id);')
                    .then(res => {
                        client.release();
                        return;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('ALTER TABLE characteristic_reviews ADD COLUMN product_id INTEGER;')
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query(`UPDATE characteristic_reviews SET product_id = (
                            SELECT product_id
                            FROM characteristics
                            WHERE characteristics.id = characteristic_reviews.characteristic_id
                            );`)
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
            })
            .then((res) => {
                (async () => {
                    console.log('Added product_id to characteristic_reviews.');
                    await wait(10000);
                    console.log('Adding characteristic_name to characterisitic_reviews table...');
                })();
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('ALTER TABLE characteristic_reviews ADD COLUMN characteristic_name VARCHAR;')
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                }) 
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query(`UPDATE characteristic_reviews SET characteristic_name = (
                        SELECT name
                        FROM characteristics
                        WHERE characteristics.id = characteristic_reviews.characteristic_id
                    );`)
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .then((res) => {
                (async () => {
                    console.log('Combined characteristics and characteristic_reviews table.');
                    await wait(10000);
                    console.log('Dropping characteristics table...');
                })();
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('DROP TABLE IF EXISTS characteristics;')
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .catch(err => {
                console.log('Error combining characteristics', err);
                pool.end();
                reject(err);
            })
            .then((res) => {
                (async () => {
                    console.log('Dropped characteristics table.');
                    await wait(10000);
                    console.log('Adding fit to reviews table...');
                })();
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('CREATE INDEX rev_idx ON reviews (id);')
                    .then(res => {
                        client.release();
                        return;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('CREATE INDEX char_revProd_idx ON characteristic_reviews (review_id);')
                    .then(res => {
                        client.release();
                        return;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('ALTER TABLE reviews ADD COLUMN fit INTEGER DEFAULT NULL;')
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query(`UPDATE reviews SET fit = (
                        SELECT value
                        FROM characteristic_reviews
                        WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Fit'
                        );`)
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                    
                })
                
            })
            .then((res) => {
                (async () => {
                    console.log('Added fit to reviews table.');
                    await wait(20000);
                    console.log('Adding comfort to reviews table...');
                })();
            })
            .catch(err => {
                console.log('Error adding fit values to reviews', err);
                pool.end();
                reject(err);
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('ALTER TABLE reviews ADD COLUMN comfort INTEGER DEFAULT NULL;')
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })    
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query(`UPDATE reviews SET comfort = (
                        SELECT value
                        FROM characteristic_reviews
                        WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Comfort'
                        );`)
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
            })
            .then((res) => {
                (async () => {
                    console.log('Added comfort to reviews table.');
                    await wait(10000);
                    console.log('Now adding length to reviews table...');
                })();
            })
            .catch(err => {
                console.log('Error adding comfort values to reviews', err);
                pool.end();
                reject(err);
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('ALTER TABLE reviews ADD COLUMN length INTEGER DEFAULT NULL;')
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query(`UPDATE reviews SET length = (
                        SELECT value
                        FROM characteristic_reviews
                        WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Length'
                        );`)
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })

            })
            .then((res) => {
                (async () => {
                    console.log('Added length to reviews table.');
                    await wait(10000);
                    console.log('Now adding quality to reviews table...');
                })();
            })
            .catch(err => {
                console.log('Error adding length values to reviews', err);
                pool.end();
                reject(err);
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('ALTER TABLE reviews ADD COLUMN quality INTEGER DEFAULT NULL;')
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query(`UPDATE reviews SET quality = (
                        SELECT value
                        FROM characteristic_reviews
                        WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Quality'
                        );`)
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
            })
            .then((res) => {
                (async () => {
                    console.log('Added quality to reviews table.');
                    await wait(10000);
                    console.log('Now adding width to reviews table...');
                })();
            })
            .catch(err => {
                console.log('Error adding quality values to reviews', err);
                pool.end();
                reject(err);
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('ALTER TABLE reviews ADD COLUMN width INTEGER DEFAULT NULL;')
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query(`UPDATE reviews SET width = (
                        SELECT value
                        FROM characteristic_reviews
                        WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Width'
                        );`)
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
            })
            .then((res) => {
                (async () => {
                    console.log('Added width to reviews table.');
                    await wait(10000);
                    console.log('Now adding size to reviews table...');
                })();
            })
            .catch(err => {
                console.log('Error adding width values to reviews', err);
                pool.end();
                reject(err);
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query('ALTER TABLE reviews ADD COLUMN size INTEGER DEFAULT NULL;')
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
            })
            .then((res) => {
                return pool.connect()
                .then(client => {
                    return client.query(`UPDATE reviews SET size = (
                        SELECT value
                        FROM characteristic_reviews
                        WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Size'
                        );`)
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })

            })
            .then((res) => {
                (async () => {
                    console.log('Added size values to reviews table.');
                    await wait(20000);
                    console.log('Added characteristics to reviews table, dropping characteristics...');
                })();
            })
            .then(res => {
                return pool.connect()
                .then(client => {
                    return client.query('DROP TABLE IF EXISTS characteristic_reviews;')
                    .then(res => {
                        client.release();
                        return res;
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .catch(err => {
                console.log('Error adding characteristics to reviews table', err);
                pool.end();
                reject(err);
            })
            .then((res) => {
                console.log('finished');
                resolve('Database transformation complete');
            });
    })
};

module.exports = transformDB;

// .then((res) => {
//     return pool.connect()
//     .then(client => {
//         return client.query('CREATE INDEX revProd_idx ON reviews (product_id);')
//         .then(res => {
//             client.release();
//             return;
//         })
//         .catch(err => {
//             client.release();
//             throw err;
//         })
//     })
    
// })

    
// })
// .then((res) => {
//     return pool.connect()
//     .then(client => {
//         return client.query('CREATE INDEX charProd_idx ON characteristics (product_id);')
//         .then(res => {
//             client.release();
//             return;
//         })
//         .catch(err => {
//             client.release();
//             throw err;
//         })
//     })
    
// })



// .then((res) => {
//     return pool.connect()
//     .then(client => {
//         return client.query('CREATE INDEX char_rev_idx ON characteristic_reviews (id);')
//         .then(res => {
//             client.release();
//             return;
//         })
//         .catch(err => {
//             client.release();
//             throw err;
//         })
//     })
    
// })

// .catch(err => {
//     console.log('error creating indexes', err);
//     pool.end();
//     reject(err);
// })