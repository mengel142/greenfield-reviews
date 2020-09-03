\c greenfield_reviews;

-- ALTER TABLE reviews ADD COLUMN photos text[];

-- UPDATE reviews SET photos = array(
-- SELECT reviews_photos.url
-- FROM reviews_photos
-- WHERE reviews_photos.review_id = reviews.id
-- );


-- ALTER TABLE characteristics ADD COLUMN review_id INTEGER;
-- ALTER TABLE characteristics ADD COLUMN value INTEGER;

-- ALTER TABLE characteristic_reviews ADD COLUMN product_id INTEGER;
-- ALTER TABLE characteristic_reviews ADD COLUMN characteristic_name VARCHAR;

-- UPDATE characteristic_reviews SET product_id = (
--     SELECT characteristics.product_id
--     FROM characteristics
--     WHERE characteristics.id = characteristic_reviews.characteristic_id
-- );

-- UPDATE characteristic_reviews SET characteristic_name = (
--     SELECT characteristics.name
--     FROM characteristics
--     WHERE characteristics.id = characteristic_reviews.characteristic_id
-- );
-- 1 - Fit
-- 2 - Length
-- 3 - Comfort
-- 4 - Quality
-- Width
-- Size

-- CREATE TABLE IF NOT EXISTS characteristics_combined (
--     id SERIAL PRIMARY KEY,
--     review_id INTEGER UNIQUE,
--     product_id INTEGER,
--     Fit INTEGER DEFAULT NULL,
--     Length INTEGER DEFAULT NULL,
--     Comfort INTEGER DEFAULT NULL,
--     Quality INTEGER DEFAULT NULL,
--     Width INTEGER DEFAULT NULL,
--     Size INTEGER DEFAULT NULL
-- );

-- INSERT INTO characteristics_combined (review_id, product_id)
-- SELECT id, product_id
-- FROM reviews;

-- UPDATE characteristics_combined SET fit = (
--     SELECT characteristic_reviews.value
--     FROM characteristic_reviews
--     WHERE characteristic_reviews.review_id = characteristics_combined.review_id and characteristic_reviews.characteristic_name = 'Fit'
-- );

-- UPDATE characteristics_combined SET length = (
--     SELECT characteristic_reviews.value
--     FROM characteristic_reviews
--     WHERE characteristic_reviews.review_id = characteristics_combined.review_id and characteristic_reviews.characteristic_name = 'Length'
-- );

-- UPDATE characteristics_combined SET comfort = (
--     SELECT characteristic_reviews.value
--     FROM characteristic_reviews
--     WHERE characteristic_reviews.review_id = characteristics_combined.review_id and characteristic_reviews.characteristic_name = 'Comfort'
-- );

-- UPDATE characteristics_combined SET quality = (
--     SELECT characteristic_reviews.value
--     FROM characteristic_reviews
--     WHERE characteristic_reviews.review_id = characteristics_combined.review_id and characteristic_reviews.characteristic_name = 'Quality'
-- );

-- UPDATE characteristics_combined SET width = (
--     SELECT characteristic_reviews.value
--     FROM characteristic_reviews
--     WHERE characteristic_reviews.review_id = characteristics_combined.review_id and characteristic_reviews.characteristic_name = 'Width'
-- );

-- UPDATE characteristics_combined SET size = (
--     SELECT characteristic_reviews.value
--     FROM characteristic_reviews
--     WHERE characteristic_reviews.review_id = characteristics_combined.review_id and characteristic_reviews.characteristic_name = 'Size'
-- );
