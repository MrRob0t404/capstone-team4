DROP DATABASE IF EXISTS tyrodev;
CREATE DATABASE tyrodev;

\c tyrodev;

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


INSERT INTO users (username, password_digest, email, profilePic, stack, bio)
    VALUES ("Tyler", "$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq", "email@email.com", "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png", "JS, React, Pug, HTML, CSS", "I like to code"),
         ('Chancellor', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'Python, C++, Machine Learning', "I like to code it's fun"),
         ('Victoria', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', "HTML"),
         ('Josephine', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', "Basic, Assembly, ASCII", "I like to code yeahh"),
         ('Keith', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', "JS, Angular, Ruby", "I like to code, whwat whatt"),
         ('Ben', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'React Native, WEBGL, #C', "I like to code, yeahhh"),
         ('Stephen', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', "Ruby", "I like to code, OH YEAHHH"),
         ('fart', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'email@email.com', 'I enjoy farting around, when I can I try to fart as much as I can');
         
INSERT INTO problem (description, problemPoster, problemSnippet, githubRepo)
    VALUES ("Problem with for loop", 2, `for(var i = 0; i < arr.length; i++){ fail }`, "https://github.com/mon33k"),
           ("I can't import this font", 3, `@import comic sans ERR`, "https://github.com/mon33k"),
           ("Whenever I rerender my routes don't work", 4, `<Link exact path="" />`, "https://github.com/mon33k" ),
           ("I just want to talk to my toaster", 1, `01010101010101010101010000111101010101001010100`, "https://github.com/mon33k");

INSERT INTO solution (problemSolverID, problemID, solutionSnippet)
    VALUES (5, 2, `@import comic-sans`),
           (6, 1, `for(var i = 100; i > arr.length; i--){}`),
           (7, 3, `<Switch> <Home render(this.renderHomepage) /> </Switch>`),
           (8, 4, `0000011110101010101010101010101010101010101010101010101011100`);

INSERT INTO comments (comment, problemID)
    VALUES ("no you solve it this way", 1),
           ("Oh no baby Daniel son what is you doing?", 2),
           ("Nice I would've solved it diff", 3),
           ("beep boop boop beeep", 4);


