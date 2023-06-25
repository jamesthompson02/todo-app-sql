DROP DATABASE IF EXISTS todoapp;

CREATE DATABASE todoapp;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name_of_user VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    user_password VARCHAR(60) NOT NULL
);

CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    todo_title VARCHAR(500) NOT NULL,
    todo_description VARCHAR(1000),
    todo_timestamp VARCHAR(100) NOT NULL,
    user_id int REFERENCES users(id),
);