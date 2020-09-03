
DROP DATABASE IF EXISTS greenfield_reviews;

CREATE DATABASE greenfield_reviews;

\c greenfield_reviews;


CREATE TABLE IF NOT EXISTS reviews (
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
  fit INTEGER DEFAULT NULL,
  length INTEGER DEFAULT NULL,
  comfort INTEGER DEFAULT NULL,
  quality INTEGER DEFAULT NULL,
  width INTEGER DEFAULT NULL,

);


CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR
);


CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER,
  review_id INTEGER,
  value INTEGER
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER,
  url VARCHAR
);

CREATE INDEX revProd_idx ON reviews (product_id);
CREATE INDEX rev_idx ON reviews (id);
CREATE INDEX charProd_idx ON characteristics (product_id);
CREATE INDEX char_idx ON charateristics (id);
CREATE INDEX char_revProd_idx ON characteristic_reviews (review_id);
CREATE INDEX char_rev_char_idx ON characteristic_reviews (characteristic_id);
CREATE INDEX char_rev_idx ON characteristic_reviews (id);
CREATE INDEX photoRev_idx ON reviews_photos (review_id);
CREATE INDEX photo_idx ON reviews_photos (idx);
