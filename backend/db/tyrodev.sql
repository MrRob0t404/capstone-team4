DROP DATABASE IF EXISTS tyrodev;
CREATE DATABASE tyrodev;

\c tyrodev;

DROP TABLE IF EXISTS users, problem, files, solution, comments, tickets;


CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    firstName VARCHAR,
    lastName VARCHAR,
    username VARCHAR,
    password_digest VARCHAR,
    email VARCHAR,
    profilePic VARCHAR,
    stack VARCHAR
);

CREATE TABLE tickets (
    ID SERIAL PRIMARY KEY,
    userID INTEGER REFERENCES users(ID),
    ticketDate VARCHAR,
    problemStatus BIT,
    title VARCHAR
);

CREATE TABLE files (
    ID SERIAL PRIMARY KEY,
    code VARCHAR,
    ticketID INTEGER REFERENCES tickets(ID),
    languages VARCHAR,
    userID INTEGER REFERENCES users(ID)
);

CREATE TABLE problem (
    ID SERIAL PRIMARY KEY,
    ticketID INTEGER REFERENCES tickets(ID),
    description VARCHAR,
    lines VARCHAR,
    fileID INTEGER REFERENCES files(ID)
);


CREATE TABLE solution (
    ID SERIAL PRIMARY KEY,
    ticketID INTEGER REFERENCES tickets(ID),
    userID INTEGER REFERENCES users(ID),
    fileID INTEGER REFERENCES files(ID)
);

CREATE TABLE comments (
    ID SERIAL PRIMARY KEY,
    comment VARCHAR,
    problemID INTEGER REFERENCES problem(ID)
);




INSERT INTO users (username, password_digest, email, profilePic, stack)
    VALUES ('Tyler', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'JS, React, Pug, HTML, CSS'),
         ('Chancellor', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'Python, C++, Machine Learning'),
         ('Victoria', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'HTML'),
         ('Josephine', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'Basic, Assembly, ASCII'),
         ('Keith', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'JS, Angular, Ruby'),
         ('Ben', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'React Native, WEBGL, #C'),
         ('Stephen', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'Ruby'),
         ('fart', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'Ruby');


INSERT INTO tickets (userID, ticketDate, problemStatus, title)
    VALUES (4, '2/30/17', '0', 'My for loops and functions dont work'),
           (2, '3/5/17', '0', 'Cant import font'),
           (3, '4/10/17', '1', 'Cant get route to work'),
           (1, '5/20/17', '0', 'Toaster Speech Enable');

INSERT INTO files (code, ticketID, languages, userID)
    VALUES ('forvar i  0 i < arr.length i++){ fail }', 1, 'Python', 4),
           ('function amirite(bool){ if(bool === true){ return "okay" else "yea" }}', 1, 'Python', 4),
           ('@import comic sans ERR', 2, 'Javascript', 2),
           ('@import comic-sans', 2, 'Javascript', 2),
           ('<Link exact path= />', 2, 'React', 3),
           ('01010101010101010101010000111101010101001010100', 4, 'C++', 1),
           ('for(var i = 100; i > arr.length; i--){}', 1, 'Python', 4),
           ('<Switch> <Home render(this.renderHomepage) /> </Switch>', 3, 'React', 3),
           ('0000011110101010101010101010101010101010101010101010101011100', 4, 'C++', 1);


INSERT INTO problem (ticketID, description, lines, fileID)
    VALUES (1, 'Problem with for loop', '1, 2', 2),
           (1, 'Problem with function', '5, 6, 7, 8', 2),
           (2, 'I cant import this font, I just want to use this font.. omg', '5', 1),
           (3, 'Whenever I rerender my routes dont work', '15', 4),
           (4, 'I just want to talk to my toaster', '5', 3);

INSERT INTO solution (ticketID, userID, fileID)
    VALUES (2, 2, 4),
           (1, 4, 7),
           (3, 3, 8),
           (4, 1, 9);


INSERT INTO comments (comment, problemID)
    VALUES ('no you solve it this way', 1),
           ('dont solve it this way you should use recursion', 2),
           ('Nice I wouldve solved it diff', 3),
           ('beep boop boop beeep', 4);


