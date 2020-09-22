const pool = require('../index.js');
const wait = require('util').promisify(setTimeout);



    return pool.connect()
        .then(client => {
            console.log('connected to greenfield_reviews, adding indexes');
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
                return client.query('CREATE INDEX revProd_idx ON reviews (product_id);')
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
                return client.query('CREATE INDEX charProd_idx ON characteristics (product_id);')
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
                return client.query('CREATE INDEX char_rev_idx ON characteristic_reviews (id);')
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
        .catch(err => {
            console.log('error creating indexes', err);
            pool.end();
            reject(err);
        })
        .then((res) => {
            (async () => {
                console.log('Created indexes.');
                await wait(5000);
                console.log('Adding photos to reviews...');
            })(); 
        })
        .then((res) => {
            return pool.query('ALTER TABLE reviews ADD COLUMN photos text[];');
        })
        .then((res) => {
            return pool.connect()
            .then(client => {
                return client.query(`UPDATE reviews SET photos = array(
                    SELECT reviews_photos.url
                    FROM reviews_photos
                    WHERE reviews_photos.review_id = reviews.id
                    );`)
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
        .then(res => {
            console.log('Dropping photos table...');
        })
        .then((res) => {
            return pool.connect()
            .then(client => {
                return client.query('DROP TABLE IF EXISTS reviews_photos;')
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
        .catch(err => {
            console.log('Error adding photo table to reviews reviews', err);
            pool.end();
            reject(err);
        })
        .then((res) => {
            (async () => {
                console.log('Dropped photos table.');
                await wait(5000);
                console.log('Altering characterisitics_reviews tables...');
            })();
        })
        .then((res) => {
            return pool.connect()
            .then(client => {
                return client.query('ALTER TABLE characteristic_reviews ADD COLUMN product_id INTEGER;')
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
                return client.query('ALTER TABLE characteristic_reviews ADD COLUMN characteristic_name VARCHAR;')
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
            (async () => {
                console.log('Altered characteristic_reviews table.');
                await wait(5000);
                console.log('Combining characterisitics tables...');
            })();
        })
        .then((res) => {
            return pool.connect()
            .then(client => {
                return client.query(`UPDATE characteristic_reviews SET product_id = (
                    SELECT characteristics.product_id
                    FROM characteristics
                    WHERE characteristics.id = characteristic_reviews.characteristic_id
                );`)
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
                return client.query(`UPDATE characteristic_reviews SET characteristic_name = (
                    SELECT characteristics.name
                    FROM characteristics
                    WHERE characteristics.id = characteristic_reviews.characteristic_id
                );`)
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
            (async () => {
                console.log('Combined characteristics and characteristic_reviews table.');
                await wait(5000);
                console.log('Dropping characteristics table...');
            })();
        })
        .then((res) => {
            return pool.connect()
            .then(client => {
                return client.query('DROP TABLE IF EXISTS characteristics;')
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
        .catch(err => {
            console.log('Error combining characteristics', err);
            pool.end();
            reject(err);
        })
        .then((res) => {
            (async () => {
                console.log('Dropped characteristics table.');
                await wait(5000);
                console.log('Adding characteristics columns to reviews table...');
            })();
        })
        .then((res) => {
            return pool.connect()
            .then(client => {
                return client.query('ALTER TABLE reviews ADD COLUMN fit INTEGER DEFAULT NULL;')
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
                return client.query('ALTER TABLE reviews ADD COLUMN length INTEGER DEFAULT NULL;')
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
                return client.query('ALTER TABLE reviews ADD COLUMN comfort INTEGER DEFAULT NULL;')
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
                return client.query('ALTER TABLE reviews ADD COLUMN quality INTEGER DEFAULT NULL;')
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
                return client.query('ALTER TABLE reviews ADD COLUMN width INTEGER DEFAULT NULL;')
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
                return client.query('ALTER TABLE reviews ADD COLUMN size INTEGER DEFAULT NULL;')
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
        .catch(err => {
            console.log('Error adding characteristics', err);
            pool.end();
            reject(err);
        })
        .then((res) => {
            (async () => {
                console.log('Added characteristic columns to reviews.');
                await wait(10000);
                console.log('Now adding fit values to reviews table...');
            })();
        })
        .then((res) => {
            return pool.connect()
            .then(client => {
                return client.query(`UPDATE reviews SET fit = (
                    SELECT characteristic_reviews.value
                    FROM characteristic_reviews
                    WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Fit'
                );`)
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
        .catch(err => {
            console.log('Error adding fit values to reviews', err);
            pool.end();
            reject(err);
        })
        .then((res) => {
            (async () => {
                console.log('Added fit values to reviews table.');
                await wait(10000);
                console.log('Now adding length values to reviews table...');
            })();
        })
        .then((res) => {
            return pool.connect()
            .then(client => {
                return client.query(`UPDATE reviews SET length = (
                    SELECT characteristic_reviews.value
                    FROM characteristic_reviews
                    WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Length'
                );`)
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
        .catch(err => {
            console.log('Error adding length values to reviews', err);
            pool.end();
            reject(err);
        })
        .then((res) => {
            (async () => {
                console.log('Added length values to reviews table.');
                await wait(10000);
                console.log('Now adding comfort values to reviews table...');
            })();
        })
        .then((res) => {
            return pool.connect()
            .then(client => {
                return client.query(`UPDATE reviews SET comfort = (
                    SELECT characteristic_reviews.value
                    FROM characteristic_reviews
                    WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Comfort'
                );`)
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
        .catch(err => {
            console.log('Error adding comfort values to reviews', err);
            pool.end();
            reject(err);
        })
        .then((res) => {
            (async () => {
                console.log('Added comfort values to reviews table.');
                await wait(10000);
                console.log('Now adding quality values to reviews table...');
            })();
        })
        .then((res) => {
            return pool.connect()
            .then(client => {
                return client.query(`UPDATE reviews SET quality = (
                    SELECT characteristic_reviews.value
                    FROM characteristic_reviews
                    WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Quality'
                );`)
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
        .catch(err => {
            console.log('Error adding quality values to reviews', err);
            pool.end();
            reject(err);
        })
        .then((res) => {
            (async () => {
                console.log('Added quality values to reviews table.');
                await wait(10000);
                console.log('Now adding width values to reviews table...');
            })();
        })
        .then((res) => {
            return pool.connect()
            .then(client => {
                return client.query(`UPDATE reviews SET width = (
                    SELECT characteristic_reviews.value
                    FROM characteristic_reviews
                    WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Width'
                );`)
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
        .catch(err => {
            console.log('Error adding width values to reviews', err);
            pool.end();
            reject(err);
        })
        .then((res) => {
            (async () => {
                console.log('Added width values to reviews table.');
                await wait(10000);
                console.log('Now adding size values to reviews table...');
            })();
        })
        .then((res) => {
            return pool.connect()
            .then(client => {
                return client.query(`UPDATE reviews SET size = (
                    SELECT characteristic_reviews.value
                    FROM characteristic_reviews
                    WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Size'
                );`)
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
            (async () => {
                console.log('Added size values to reviews table.');
                await wait(5000);
                console.log('Added characteristics to reviews table, dropping characteristics...');
            })();
        })
        .then(res => {
            return pool.connect()
            .then(client => {
                return client.query('DROP TABLE IF EXISTS characteristic_reviews;')
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
        .catch(err => {
            console.log('Error adding characteristics to reviews table', err);
            pool.end();
            reject(err);
        })
        .then((res) => {
            console.log('finished');
            resolve('Database transformation complete');
        });

