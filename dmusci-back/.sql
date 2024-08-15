CREATE DATABASE music_app;

USE music_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE playlists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    song VARCHAR(255),
    artist VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
