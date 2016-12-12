DROP DATABASE IF EXISTS users;
CREATE DATABASE users;

\c users;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR
);

\c users;

CREATE TABLE photos (
  ID SERIAL PRIMARY KEY,
  userId INTEGER,
  photoUrl VARCHAR
);
