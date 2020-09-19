const pool = require('../index');

const createSchema = () => {
    return new Promise((resolve, reject) => {
            return pool.query('DROP DATABASE IF EXISTS greenfield_reviews;')
            .then(() => {
                return pool.query('CREATE DATABASE greenfield_reviews;');
            })
            .then(res => {
                console.log('Created database greenfield_reviews');
            })
            .catch(err => {
                console.log('Error creating database greenfield_reviews', err);
                pool.end();
            })
            .then(() => {
                return pool.query(`\c greenfield_reviews;`);
            })
            .then(res => {
                console.log('connected to greenfield_reviews');
            })
            .catch(err => {
                console.log('error connecting to greenfield_reviews', err);
                pool.end();
            })
            .then(() => {
                return pool.query('DROP TABLE IF EXISTS reviews;');
            })
            .then(res => {
                console.log('Dropped table reviews');
            })
            .catch(err => {
                console.log('Error dropping table reviews', err);
                pool.end();
            })
            .then(() => {
                return pool.query(`CREATE TABLE reviews (
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
                  );`);
            })
            .then(res => {
                console.log('Created table reviews');
            })
            .catch(err => {
                console.log('Error creating table reviews', err);
                pool.end();
            })
            .then(() => {
                return pool.query('DROP TABLE IF EXISTS characterisitics;')
            })
            .then(res => {
                console.log('Dropped table characteristics');
            })
            .catch(err => {
                console.log('Error dropping table characteristics', err);
                pool.end();
            })
            .then(() => {
                return pool.query(`CREATE TABLE characteristics (
                    id SERIAL PRIMARY KEY,
                    product_id INTEGER,
                    name VARCHAR
                  );`);
            })
            .then(res => {
                console.log('Created table characteristics');
            })
            .catch(err => {
                console.log('Error creating table characteristics');
                pool.end();
            })
            .then(client => {
                return client.query('DROP TABLE IF EXISTS characteristic_reviews;');
            })
            .then(res => {
                console.log('Dropped table characteristic_reviews');
                client.release();
            })
            .catch(err => {
                console.log('Error dropping table characteristic_reviews', err);
                client.end();
            })
            .then(client => {
                return client.query(`CREATE TABLE characteristic_reviews (
                    id SERIAL PRIMARY KEY,
                    characteristic_id INTEGER,
                    review_id INTEGER,
                    value INTEGER
                  );`)
            })
            .then(res => {
                console.log('Created table characteristic_reviews');
                client.release();
            })
            .catch(err => {
                console.log('Error creating table charactersitic_reviews');
                client.end();
            })
            .then(client => {
                return client.query('DROP TABLE IF EXISTS reviews_photos;');
            })
            .then(res => {
                console.log('Dropped table reviews_photos');
                client.release();
            })
            .catch(err => {
                console.log('Error dropping table reviews_photos');
                client.end()
            })

    }

    }
}