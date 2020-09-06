const models = require('../database/models');

module.exports = {

    getReviews: (req, res) => {
        const product_id = req.params.product_id;
        const page = req.query.page || 1;
        const count = req.query.count || 5;
        const sort = req.query.sort || 'featured';
        models
        .getReviews(product_id, page, count, sort)
        .then(data => {
            let response = {
                product_id: product_id,
                page: page,
                count: count,
                results: data.rows
            };
            console.log(response);
            res.send(response);
        })
        .catch(err => {
            console.log('Error getting reviews: ', err);
            res.sendStatus(500);
        })
    },

    getMetadata: (req, res) => {
        let { product_id } = req.params;
        models
        .getMetadata(product_id)
        .then(data => {
            let ratings = data.rows.reduce((acc, cur) => {
                let rating = cur.rating;
                if (!acc[rating]) acc[rating] = 1;
                else acc[rating] += 1;
                return acc;
            }, {});
            let recommended = data.rows.reduce((acc, cur) => {
                let recommend = cur.recommend;
                if (recommend === true) acc[1] += 1;
                if (recommend === false) acc[0] += 1
                return acc;
            }, { 0: 0, 1: 0})
            let response = {
                product_id: product_id,
                ratings: ratings,
                recommended: recommended
            };
            let characteristics = {};
            let fit = data.rows.reduce((acc, cur) => {
                if (cur.fit !== null) acc += cur.fit;
                return acc;
            }, 0)
            let fitLen = data.rows.filter(ele => ele.fit !== null).length;
            if (fit > 0) characteristics.Fit = { value: fit/fitLen };
            let length = data.rows.reduce((acc, cur) => {
                if (cur.length !== null) acc += cur.length;
                return acc;
            }, 0)
            let lenLen = data.rows.filter(ele => ele.length !== null).length;
            if (length > 0) characteristics.Length = { value: length / lenLen };
            let comfort = data.rows.reduce((acc, cur) => {
                if (cur.comfort !== null) acc += cur.comfort;
                return acc;
            }, 0)
            let comfortLen = data.rows.filter(ele => ele.comfort !== null).length;
            if (comfort > 0) characteristics.Comfort = { value: comfort / comfortLen };
            let quality = data.rows.reduce((acc, cur) => {
                if (cur.quality !== null) acc += cur.quality
                return acc;
            }, 0)
            let qualityLen = data.rows.filter(ele => ele.quality !== null).length;
            if (quality > 0) characteristics.Quality = { value: quality / qualityLen };
            let width = data.rows.reduce((acc, cur) => {
                if (cur.width !== null) acc += cur.width;
                return acc;
            }, 0)
            let widthLen = data.rows.filter(ele => ele.width !== null).length;
            if (width > 0) characteristics.Width = { value: width / widthLen };
            let size = data.rows.reduce((acc, cur) => {
                if (cur.size !== null) acc += cur.size;
                return acc;
            }, 0)
            let sizeLen = data.rows.filter(ele => ele.size !== null).length;
            if (size > 0) characteristics.Size = { value: size / sizeLen };
            response.characteristics = characteristics;
            res.send(response);
        })
        .catch(err => {
            console.log(err);
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
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    },

    reportReview: (req, res) => {
        let { review_id } = req.params;
        models
        .reportReview(review_id)
        .then(() => res.sendStatus(204))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    },

    postReview: (req, res) => {
        let { product_id } = req.params;
        let { rating, summary, body, recommend, name, email, photos, characteristics } = req.body;
        models
        .postReview(product_id, rating, summary, body, recommend, name, email, photos, characteristics)
        .then(() => res.sendStatus(201))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    }
};