
DROP DATABASE IF EXISTS greenfield_reviews;

CREATE DATABASE greenfield_reviews;

\c greenfield_reviews;


CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  rating INTEGER,
  date timestamp,
  summary VARCHAR,
  body VARCHAR,
  recommend BOOLEAN,
  reported BOOLEAN DEFAULT FALSE,
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR DEFAULT '',
  helpfulness INTEGER DEFAULT 0
);


CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR
);


CREATE TABLE IF NOT EXISTS review_characteristic (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER,
  review_id INTEGER,
  value INTEGER
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER,
  url VARCHAR
);

INSERT INTO characteristics (product_id, name) VALUES (1000, 'Hello World!');