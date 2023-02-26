CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    fullname VARCHAR,
    photo VARCHAR,
    verif INT DEFAULT 0,
    OTP VARCHAR,
    created_at TIMESTAMP,
    roles VARCHAR NOT NULL DEFAULT 'user'
);
-- register -> activated email
CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);
INSERT INTO category(name) VALUES('main course');
CREATE TABLE recipes(
    id SERIAL,
    title VARCHAR NOT NULL,
    ingredients TEXT NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP NOT NULL,
    users_id VARCHAR REFERENCES users(id)
);
ALTER TABLE recipes add category_id INT;
ALTER TABLE recipes add Foreign Key (category_id) REFERENCES category(id);