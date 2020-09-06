\c greenfield_reviews;

CREATE INDEX revProd_idx ON reviews (product_id);
CREATE INDEX rev_idx ON reviews (id);
CREATE INDEX charProd_idx ON characteristics (product_id);
CREATE INDEX char_idx ON charateristics (id);
CREATE INDEX char_revProd_idx ON characteristic_reviews (review_id);
CREATE INDEX char_rev_char_idx ON characteristic_reviews (characteristic_id);
CREATE INDEX char_rev_idx ON characteristic_reviews (id);
CREATE INDEX photoRev_idx ON reviews_photos (review_id);
CREATE INDEX photo_idx ON reviews_photos (id);

ALTER TABLE reviews ADD COLUMN photos text[];

UPDATE reviews SET photos = array(
SELECT reviews_photos.url
FROM reviews_photos
WHERE reviews_photos.review_id = reviews.id
);


ALTER TABLE characteristic_reviews ADD COLUMN product_id INTEGER;
ALTER TABLE characteristic_reviews ADD COLUMN characteristic_name VARCHAR;

UPDATE characteristic_reviews SET product_id = (
    SELECT characteristics.product_id
    FROM characteristics
    WHERE characteristics.id = characteristic_reviews.characteristic_id
);

UPDATE characteristic_reviews SET characteristic_name = (
    SELECT characteristics.name
    FROM characteristics
    WHERE characteristics.id = characteristic_reviews.characteristic_id
);


ALTER TABLE reviews ADD COLUMN fit INTEGER DEFAULT NULL;
ALTER TABLE reviews ADD COLUMN length INTEGER DEFAULT NULL;
ALTER TABLE reviews ADD COLUMN comfort INTEGER DEFAULT NULL;
ALTER TABLE reviews ADD COLUMN quality INTEGER DEFAULT NULL;
ALTER TABLE reviews ADD COLUMN width INTEGER DEFAULT NULL;
ALTER TABLE reviews ADD COLUMN size INTEGER DEFAULT NULL;

UPDATE reviews SET fit = (
    SELECT characteristic_reviews.value
    FROM characteristic_reviews
    WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Fit'
);

UPDATE reviews SET length = (
    SELECT characteristic_reviews.value
    FROM characteristic_reviews
    WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Length'
);

UPDATE reviews SET comfort = (
    SELECT characteristic_reviews.value
    FROM characteristic_reviews
    WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Comfort'
);

UPDATE reviews SET quality = (
    SELECT characteristic_reviews.value
    FROM characteristic_reviews
    WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Quality'
);

UPDATE reviews SET width = (
    SELECT characteristic_reviews.value
    FROM characteristic_reviews
    WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Width'
);

UPDATE reviews SET size = (
    SELECT characteristic_reviews.value
    FROM characteristic_reviews
    WHERE characteristic_reviews.review_id = reviews.id and characteristic_reviews.characteristic_name = 'Size'
);

