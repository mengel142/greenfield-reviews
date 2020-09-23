const pool = require('./index.js');

const createSchema = () => {
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(client => {
                console.log('connected to greenfield_reviews');
                client.release();
                pool.end();
            })
            .catch(err => {
                console.log('error connecting to greenfield_reviews', err);
                pool.end();
                reject(err);
            })
            .then(() => {
                return pool.connect()
                .then(client => {
                    return client.query('DROP TABLE IF EXISTS reviews;')
                    .then(res => {
                        client.release();
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .then(res => {
                console.log('Dropped table reviews');
            })
            .catch(err => {
                console.log('Error dropping table reviews', err);
                pool.end();
                reject(err);
            })
            .then(() => {
                return pool.connect()
                .then(client => {
                    return client.query(`CREATE TABLE reviews (
                        id SERIAL PRIMARY KEY,
                        product_id INTEGER,
                        rating INTEGER,
                        date DATE,
                        summary VARCHAR,
                        body VARCHAR,
                        recommend BOOLEAN,
                        reported BOOLEAN DEFAULT FALSE,
                        reviewer_name VARCHAR,
                        reviewer_email VARCHAR,
                        response VARCHAR DEFAULT NULL,
                        helpfulness INTEGER DEFAULT 0
                      );`)
                    .then(res => {
                        client.release();
                    })
                    .catch(err => {
                        client.release()
                        throw err;
                    })
                })
                
            })
            .then(res => {
                console.log('Created table reviews');
            })
            .catch(err => {
                console.log('Error creating table reviews', err);
                pool.end();
                reject(err);
            })
            .then(() => {
                return pool.connect()
                .then(client => {
                    return client.query('DROP TABLE IF EXISTS characteristics;')
                    .then(res => {
                        client.release();
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
            })
            .then(res => {
                console.log('Dropped table characteristics');
            })
            .catch(err => {
                console.log('Error dropping table characteristics', err);
                pool.end();
                reject(err);
            })
            .then(() => {
                return pool.connect()
                .then(client => {
                    return client.query(`CREATE TABLE characteristics (
                        id SERIAL PRIMARY KEY,
                        product_id INTEGER,
                        name VARCHAR
                      );`)
                      .then(res => {
                        client.release();
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .then(res => {
                console.log('Created table characteristics');
            })
            .catch(err => {
                console.log('Error creating table characteristics');
                pool.end();
                reject(err);
            })
            .then(() => {
                return pool.connect()
                .then(client => {
                    return client.query('DROP TABLE IF EXISTS characteristic_reviews;')
                    .then(res => {
                        client.release();
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .then(res => {
                console.log('Dropped table characteristic_reviews');
            })
            .catch(err => {
                console.log('Error dropping table characteristic_reviews', err);
                pool.end();
                reject(err);
            })
            .then(() => {
                return pool.connect()
                .then(client => {
                    return client.query(`CREATE TABLE characteristic_reviews (
                        id SERIAL PRIMARY KEY,
                        characteristic_id INTEGER,
                        review_id INTEGER,
                        value INTEGER
                      );`)
                    .then(res => {
                        client.release()
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
            })
            .then(res => {
                console.log('Created table characteristic_reviews');
            })
            .catch(err => {
                console.log('Error creating table charactersitic_reviews', err);
                pool.end();
            })
            .then(() => {
                return pool.connect()
                .then(client => {
                    return client.query('DROP TABLE IF EXISTS reviews_photos;')
                    .then(res => {
                        client.release();
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
                
            })
            .then(res => {
                console.log('Dropped table reviews_photos');
            })
            .catch(err => {
                console.log('Error dropping table reviews_photos');
                pool.end()
            })
            .then(() => {
                return pool.connect()
                .then(client => {
                    return client.query(`CREATE TABLE reviews_photos (
                        id SERIAL PRIMARY KEY,
                        review_id INTEGER,
                        url VARCHAR
                      );`)
                      .then(res => {
                        client.release();
                    })
                    .catch(err => {
                        client.release();
                        throw err;
                    })
                })
            })
            .then(res => {
                console.log('Created reviews_photos;')
            })
            .catch(err => {
                console.log('Error creating reviews_photos', err);
                pool.end();
                reject(err);
            })
            .then(() => {
                resolve('Finished database creation');
            });
    })
};

module.exports = createSchema;