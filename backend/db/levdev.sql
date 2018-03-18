DROP DATABASE IF EXISTS levdev;
CREATE DATABASE levdev;

\c levdev;

DROP TABLE IF EXISTS users, problem, issue, solution;


CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    username VARCHAR,
    password_digest VARCHAR,
    email VARCHAR,
    profilePic VARCHAR,
    stack VARCHAR,
    Bio VARCHAR
);

CREATE TABLE problem (
    ID SERIAL PRIMARY KEY,
    description VARCHAR,
    problemPoster INTEGER REFERENCES users(ID),
    problemSnippet VARCHAR,
    githubRepo VARCHAR
);



CREATE TABLE solution (
    ID SERIAL PRIMARY KEY,
    problemSolverID INTEGER REFERENCES users(ID),
    problemID INTEGER REFERENCES problem(ID),
    solutionSnippet VARCHAR
);

CREATE TABLE comments (
    ID SERIAL PRIMARY KEY,
    comment VARCHAR,
    problemID INTEGER REFERENCES problem(ID)
);

CREATE TABLE issue (
    ID SERIAL PRIMARY KEY,
    title VARCHAR,
    issueDate VARCHAR,
    solved BIT,
    solutionID INTEGER REFERENCES solution(ID),
    problemID INTEGER REFERENCES problem(ID),
    comments INTEGER REFERENCES comments(ID)
);



