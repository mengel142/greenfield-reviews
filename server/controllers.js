const models = require('../database/models');

module.exports = {

    getReviews: (req, res) => {
        let { product_id } = req.params;
        let { page } = req.query || 0;
        let { count } = req.query || 5;
        let { sort } = req.query || 'featured';
        models
        .getReviews(product_id, page, count, sort)
        .then(data => {
            let response = {
                product_id: product_id,
                page: page,
                count: count,
                results: data.rows
            };
            res.send(response);
        })
        .catch(err => {
            console.log('Error getting reviews: ', err);
            res.sendStatus(500);
        })
    },

    putHelpful: (req, res) => {
        let { review_id } = req.params;
        models
        .putHelpful(review_id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => {})
    }
};