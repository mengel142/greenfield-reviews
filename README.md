# Product Reviews API for Crisp Clothing
#### A redisgned API server supporting the backend of a client retail clothing ecommerce web portal.

## Getting Started

###### Ensure docker and docker-compose are properly installed on your local and remote machines.  Change the 

###### Run docker-compose up -d to start up the database and APi in detached mode in the root directory with the docker-compose.yml file on your local machine for personal use 


## ETL Process and Cloud Deployment
##### Navigate to the ETL directory through "cd database" then "cd ETL" on your local machine.  Create an instance of a Postgres Pool on your local computer in the "index.js" file but with the configuration for your AWS instance.

#### Create Schema
###### "schema.js" declares the function "createSchema" that connects to the PostgreSQL database and creates tables for "reviews", "characteristics", "characteristic_reviews", and "reviews_photos".

#### Data Cleanup
###### "reviews-cleaner.js" streams a CSV with the reviews checking if values are the correct data types and if not transforming them.

#### Database Loading
###### The functions in "reviewsETL.js", "characteristicsETL.js", "characteristicReviewsETL.js", and "photosETL.js" load the clean CSV into the DB.

#### DB Transformation
###### "transform.js" exports the "transformDB" function which transforms the 4 table SQL schema into a a single table NoSQL schema for faster and simplier queries.

#### Cloud Deployment
###### "initializeETL" is a single function that imports and invokes the "createSchema" function, then "reviewsETL" function, "characteristicsETL" function, "characteristicReviewsETL" function, "photosETL" function, and finally the "transformDB" function.  

#### Run node in the file "initializeETL.js" on your local computer. If the configuration is set properly to your cloud deployment then the data on your local drive will be streamed to your remote VM and the rest of the functions will be executed there as well.


## API Server Endpoints

#### GET '/reviews/:product_id/list'
###### This endpoint returns a list of reviews with the requested product ID, number of pages of reviews, the number of reviews per page, and how the reviews should be sorted.  It then returns this data to the client.

#### GET '/reviews/:product_id/meta'
###### This endpoint retrieves all the review ratings data for each aspect of the product comprised of "Fit", "Length", "Comfort", "Quality", "Width", and "Size".  It then calculates the average rating for each category and returns it to the client.

#### POST '/reviews/:product_id'
######

#### PUT '/reviews/helpful/:review_id'
###### This endpoint allows users to indicate if they found a review helpful.

#### PUT '/reviews/report/:review_id'
###### This endpoint allows users to report inappropriate reviews.





