-- Creating table
CREATE TABLE users(
    id CHAR(36),
    name VARCHAR(40) NOT NULL,
    email VARCHAR(40) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    photo VARCHAR(100) NOT NULL
);