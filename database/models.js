const pool = require('./index');


module.exports = {
    getReviews: (product_id, page, count, sort) => {
        if (sort === 'newest') sort = `date DESC`;
        if (sort === 'helpful') sort = `helpfulness DESC`
        if (sort === 'relevant') sort = 'helpfulness DESC, date DESC'
        let q = `SELECT id as review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos 
            FROM reviews WHERE product_id = $1 and reported <> true ORDER BY $2 LIMIT $3`;
        return pool.connect()
            .then(client => {
                return client.query(q, [product_id, sort, count])
                .then(res => {
                    client.release();
                    return res;
                })
                .catch(err => {
                    client.release();
                    console.log(err.stack);
                })
            })
           
    },

    getMetadata: (product_id) => {
        let q = 'SELECT rating, recommend, fit, length, comfort, quality, width, size FROM reviews where reviews.product_id = $1';
        return pool.connect()
            .then(client => {
                return client.query(q, [product_id])
                .then(res => {
                    client.release();
                    return res;
                })
                .catch(err => {
                    client.release();
                    console.log(err.stack);
                })
            })
    },

    putHelpful: (review_id) => {
        let q = 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1';
        return pool.connect()
            .then(client => {
                return client.query(q, [review_id])
                .then(res => {
                    client.release();
                    return res;
                })
                .catch(err => {
                    client.release();
                    console.log(err.stack);
                })
            })
    },

    reportReview: (review_id) => {
        let q = 'UPDATE reviews SET reported = true WHERE id = $1';
        return pool.connect()
            .then(client => {
                return client.query(q, [review_id])
                .then(res => {
                    client.release();
                    return res;
                })
                .catch(err => {
                    client.release();
                    console.log(err.stack);
                })
            })
    },

    postReview: (product_id, rating, summary, body, recommend, name, email, photos, characteristics) => {
        let q = `INSERT INTO reviews (id, product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, photos, fit, length, comfort, quality, width, size)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id`;
        let getId = `SELECT pg_catalog.setval(pg_get_serial_sequence('reviews', 'id'), (SELECT MAX(id)
        FROM reviews)+1);`;
        let fit = characteristics.Fit || null;
        let length = characteristics.Length || null;
        let comfort = characteristics.Comfort || null;
        let quality = characteristics.Quality || null;
        let width = characteristics.Width || null;
        let size = characteristics.Size || null;
        let date = new Date();
        return pool.connect()
            .then(client => {
                return client.query(getId)
                .then(res => {
                    console.log(res.rows[0].setval);
                    let id = res.rows[0].setval;
                    return client.query(q, [id, product_id, rating, date, summary, body, recommend, name, email, photos, fit, length, comfort, quality, width, size])
                })
                .then(res => {
                    client.release();
                    return res;
                })
                .catch(err => {
                    client.release();
                    console.log(err.stack);
                })
            })
    }
}