\c greenfield_reviews

CREATE INDEX revProd_idx ON reviews (product_id);
CREATE INDEX rev_idx ON reviews (id);
CREATE INDEX charProd_idx ON characteristics (product_id);
CREATE INDEX char_idx ON charateristics (id);
CREATE INDEX char_revProd_idx ON characteristic_reviews (review_id);
CREATE INDEX char_rev_char_idx ON characteristic_reviews (characteristic_id);
CREATE INDEX char_rev_idx ON characteristic_reviews (id);
CREATE INDEX photoRev_idx ON reviews_photos (review_id);
CREATE INDEX photo_idx ON reviews_photos (review_id);
CREATE INDEX cbr_idx ON characteristics_combined (review_id);
CREATE INDEX cbp_idx ON characteristics_combined (product_id);
CREATE INDEX cb_idx ON charactersitics_combined (id);