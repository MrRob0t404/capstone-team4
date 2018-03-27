DROP DATABASE IF EXISTS tyrodev;
CREATE DATABASE tyrodev;

\c tyrodev;

DROP TABLE IF EXISTS users, tickets, files, problems, problem, solutions, comments, tickets, solution;

CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    fullName VARCHAR,
    username VARCHAR UNIQUE,
    password_digest VARCHAR,
    email VARCHAR,
    profilePic VARCHAR,
    stack VARCHAR
);

CREATE TABLE tickets (
    ID SERIAL PRIMARY KEY,
    ticket_userID INTEGER REFERENCES users(ID),
    ticketDate VARCHAR,
    problemStatus BIT,
    title VARCHAR
);

CREATE TABLE files (
    ID SERIAL PRIMARY KEY,
    code VARCHAR,
    ticketID INTEGER REFERENCES tickets(ID),
    languages VARCHAR,
    files_userID INTEGER REFERENCES users(ID)
);

CREATE TABLE problems (
    ID SERIAL PRIMARY KEY,
    ticketID INTEGER REFERENCES tickets(ID),
    problem_description VARCHAR,
    lines VARCHAR,
    fileID INTEGER REFERENCES files(ID)
);


CREATE TABLE solutions (
    ID SERIAL PRIMARY KEY,
    ticketID INTEGER REFERENCES tickets(ID),
    solution_userID INTEGER REFERENCES users(ID),
    fileID INTEGER REFERENCES files(ID),
    solution_description VARCHAR
);

CREATE TABLE comments (
    ID SERIAL PRIMARY KEY,
    comment VARCHAR,
    problemID INTEGER REFERENCES problems(ID)
);




INSERT INTO users (username, fullName, password_digest, email, profilePic, stack)
    VALUES ('Newton21', 'Newton Brooks', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'https://media.licdn.com/dms/image/C4E03AQFb_xBYxIBS3Q/profile-displayphoto-shrink_200_200/0?e=1527278400&v=alpha&t=hHwItVBYuqAODErCwQ6Aqre7OkySZz7V05uSwXmh8-Q', 'JS, React, Pug, HTML, CSS'),
         ('Edje-C', 'Elon Jefferson','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'https://media.licdn.com/dms/image/C5603AQEYfXhxT_WETA/profile-displayphoto-shrink_800_800/0?e=1527278400&v=alpha&t=mN0gF1Ykq3vDj50Jkahsiz6xVL6djtpOB9MJQWH02ds', 'Python, C++, Machine Learning'),
         ('MoMo','Monique Mojica', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'https://media.licdn.com/dms/image/C5603AQH4BiE3sUUIWQ/profile-displayphoto-shrink_800_800/0?e=1527278400&v=alpha&t=KnJgy6kfHob4bQ_VouARSWoX-Gjh5lWvD4fM6_bUg3o', 'HTML'),
         ('Si-Mon', 'Simon Gaviria', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'https://media.licdn.com/dms/image/C4E00AQFMBuHG5_gS8w/profile-displayphoto-shrink_800_800/0?e=1522180800&v=alpha&t=wI6A5HUQanxRc2ztffl0RKU2b9pJRJMAMYvQXa9pDUM', 'Basic, Assembly, ASCII'),
         ('Keithest', 'Keith Aple', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'JS, Angular, Ruby'),
         ('Benny', 'Ben Profit', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'React Native, WEBGL, #C'),
         ('SplashBro', 'Stephen Curry', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'Ruby'),
         ('fart', 'Fartaroni', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'email@email.com', 'https://fthmb.tqn.com/YnBILVoVG067htv3xoSnm7XPZQY=/768x0/filters:no_upscale()/165720348-56a12f6c3df78cf772683b39.jpg', 'Ruby');


INSERT INTO tickets (ticket_userID, ticketDate, problemStatus, title)
    VALUES (4, '2/30/17', '0', 'My for loops and functions dont work'),
           (2, '3/5/17', '0', 'Cant import font'),
           (3, '4/10/17', '1', 'Cant get route to work'),
           (1, '5/20/17', '0', 'Toaster Speech Enable');

INSERT INTO files (code, ticketID, languages, files_userID)
    VALUES ('forvar i  0 i < arr.length i++){ fail }', 1, 'Python', 4),
           ('function amirite(bool){ if(bool === true){ return "okay" else "yea" }}', 1, 'Python', 4),
           ('@import comic sans ERR', 2, 'Javascript', 2),
           ('@import comic-sans', 2, 'Javascript', 2),
           ('<Link exact path= />', 2, 'React', 3),
           ('01010101010101010101010000111101010101001010100', 4, 'C++', 1),
           ('for(var i = 100; i > arr.length; i--){}', 1, 'Python', 4),
           ('<Switch> <Home render(this.renderHomepage) /> </Switch>', 3, 'React', 3),
           ('0000011110101010101010101010101010101010101010101010101011100', 4, 'C++', 1);


INSERT INTO problems (ticketID, problem_description, lines, fileID)
    VALUES (1, 'Problem with for loop, its not incrementing', '1, 2', 2),
           (1, 'Problem with function', '5, 6, 7, 8', 2),
           (2, 'I cant import this font, I just want to use this font.. omg', '5', 1),
           (3, 'Whenever I rerender my routes dont work', '15', 4),
           (4, 'I just want to talk to my toaster', '5', 3);

INSERT INTO solutions (ticketID, solution_userID, fileID, solution_description)
    VALUES (2, 1, 4, 'You should try this'),
           (1, 3, 7, 'This is dumb, try this '),
           (3, 2, 8, 'you better do this correctly now'),
           (4, 3, 9, 'i just want to know if this works');


INSERT INTO comments (comment, problemID)
    VALUES ('no you solve it this way', 1),
           ('dont solve it this way you should use recursion', 2),
           ('Nice I wouldve solved it diff', 3),
           ('beep boop boop beeep', 4);


