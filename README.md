# Face-Recognition-API
REST API Server for the [Face-Recognition web app](https://github.com/Chocotunda/Face-Recognition).

Server uses PostgreSQL for database. It holds data of the registered users and hashes the passwords using Bcrypt. It also keeps count of the number of entries of each user.

Server is deployed using Heroku

## Resources:
- Express.js
- Body-Parser
- Knex
- Bcrypt
- Clarifai


## API resource:
- [Clairifai API](https://clarifai.com/)
 to find faces in images.

## Routing endpoints:
- GET('/')
- POST('/register')
- PUT('/image')
- POST('/imageurl')

## PostgreSQL tables:
- Users


CREATE TABLE users (
	id serial PRIMARY KEY,
	name VARCHAR(100),
	email text UNIQUE NOT NULL,
	entries BIGINT DEFAULT 0,
	joined TIMESTAMP NOT NULL
);


- Login


CREATE TABLE login (
	id serial PRIMARY KEY,
	hash VARCHAR(100) NOT NULL,
	email text UNIQUE NOT NULL
);


## To use:
- Clone repository
- npm install
- npm start
