-- CREATE DATABASE crudb;
-- \c crudb;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE
);

INSERT INTO tasks (title) VALUES ('buy milk');
INSERT INTO tasks (title) VALUES ('Sweep the dog');
INSERT INTO tasks (title) VALUES ('milk the house');
INSERT INTO tasks (title) VALUES ('feed the store');