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
    todo_title VARCHAR(300) NOT NULL,
    todo_description VARCHAR(1500),
    todo_creation_date VARCHAR(30),
    todo_deadline_date VARCHAR(30),
    todo_deadline_time VARCHAR(30),
    user_id VARCHAR(120) REFERENCES users(email)
);