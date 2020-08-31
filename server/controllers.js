

module.exports = {

    getReviews: (req, res) => {
        let { product_id } = req.params;
        let { count } = req.query;
        let { page } = req.query;
        let { sort } = req.query || 'newest';

    }
};