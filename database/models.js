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
    }
}