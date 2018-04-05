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
    profile_Pic VARCHAR DEFAULT 'https://image.flaticon.com/icons/svg/16/16480.svg',
    stack VARCHAR,
    links VARCHAR
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
    fileName VARCHAR,
    ticketID INTEGER REFERENCES tickets(ID),
    language VARCHAR,
    file_userID INTEGER REFERENCES users(ID)
);

CREATE TABLE problems (
    ID SERIAL PRIMARY KEY,
    ticketID INTEGER REFERENCES tickets(ID),
    problem_description VARCHAR,
    lines VARCHAR DEFAULT NULL
);


CREATE TABLE solutions (
    ID SERIAL PRIMARY KEY,
    ticketID INTEGER REFERENCES tickets(ID),
    solution_userID INTEGER REFERENCES users(ID),
    solution_description VARCHAR,
    postDate VARCHAR
);

CREATE TABLE comments (
    ID SERIAL PRIMARY KEY,
    ticketID INTEGER REFERENCES tickets(ID),
    commenter_id INTEGER REFERENCES users(ID),
    comment VARCHAR,
    commentDate VARCHAR
);





INSERT INTO users (username, fullName, password_digest, email, profile_pic, stack, links)
  VALUES('MoMo','Monique Mojica', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'newtonbrooks@ac.c4q.nyc', 'https://media.licdn.com/dms/image/C5603AQH4BiE3sUUIWQ/profile-displayphoto-shrink_800_800/0?e=1527746400&v=alpha&t=T_1KJr52ctP68HOtsmfnTMkfsVcLWXoInOGkTp3SzSQ', 'HTML, Python', 'https://github.com/mon33k, https://www.linkedin.com/in/moniquemojica/'),
         ('Si-Mon', 'Simon Gaviria', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'newtonbrooks@ac.c4q.nyc', 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/13728904_10157222653865646_727791143406575721_n.jpg?_nc_cat=0&oh=2c89431678d5fb663a0e898e175ee0b0&oe=5B2C7F6B', 'Basic, Assembly, ASCII', 'https://github.com/simongaviria1, https://www.linkedin.com/in/simon-gaviria/'),
         ('Newton21', 'Newton Brooks', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'newtonbrooks@ac.c4q.nyc','https://media.licdn.com/dms/image/C4E03AQFb_xBYxIBS3Q/profile-displayphoto-shrink_200_200/0?e=1527746400&v=alpha&t=c2C4u-ogTjALQ_5Ad7Uyjb40OW1Wsqw1s8RNkcJZua4', 'JS, React, Pug, HTML, CSS', 'https://github.com/newton-brooks, https://www.linkedin.com/in/newtonbrooks/'),
         ('Edje-C', 'Elon Jefferson','$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'newtonbrooks@ac.c4q.nyc', 'https://media.licdn.com/dms/image/C5603AQEYfXhxT_WETA/profile-displayphoto-shrink_800_800/0?e=1527746400&v=alpha&t=sdz-WQUsI62007v4nAFwMdNm_bl6jrUEitIVaE1E5PI', 'Python, C++, Machine Learning', 'https://github.com/Edje-C, https://www.linkedin.com/in/elonjefferson/'),
         ('C-Low', 'Carlo Valenti','$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'newtonbrooks@ac.c4q.nyc', 'https://image.flaticon.com/icons/svg/16/16480.svg', 'Python, C++, Machine Learning', 'https://github.com/cval-c4q, https://www.linkedin.com/in/carlo-valenti-79b892153/');


INSERT INTO tickets (ticket_userID, ticketDate, problemStatus, title)
    VALUES (3, '3/17/18', '1', 'I really cant figure out this Concentration game.'),
           (1, '3/20/18', '1', 'I cant get my data to update when I rerender.'),
           (4, '3/20/18', '1', 'This h3 tag wont wrap.'),
           (2, '3/21/18', '0', 'Im new to React Native and I dont know to since the native parts of this code.'),
           (1, '3/22/18', '0', 'Can someone explain how recursion works?'),
           (2, '3/25/18', '1', 'I dont know the proper way to grab data from this matrix.'),
           (3, '3/26/18', '1', 'Binding DX'),
           (5, '3/29/18', '0', 'Does anyone know how to unsync servers?');





INSERT INTO files (ticketID, file_userID, fileName, language, code)
    VALUES (1, 3, 'app.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (2, 1, 'app.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (2, 1, 'teachers.sql', 'SQL', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (2, 1, 'router.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (3, 4, 'blog.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (3, 4, 'style.css', 'CSS', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (2, 2, 'app.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (2, 2, 'router.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (4, 2, 'app.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (4, 2, 'IOSComponents.swift', 'Swift', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (4, 2, 'AndroisComponents.java', 'Java', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (3, 2, 'blog.js', 'JavaScript', 'Y29uc3QgPGJsb2c+PC9ibG9nPg=='),
           (3, 2, 'style.css', 'CSS', 'ZGlzcGxheTogaW5saW5lLWJsb2Nr'),
           (5, 1, 'recursion.py', 'Python', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (1, 4, 'app.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (6, 2, 'matrix.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (6, 5, 'matrix.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (7, 3, 'binding.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (3, 3, 'style.css', 'CSS', 'd29yZC13cmFwOiBicmVhay13b3Jk'),
           (8, 5, 'server.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (8, 5, 'express.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw=='),
           (7, 5, 'binding.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBvcnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdvcmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERPTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAgPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOw==');

INSERT INTO problems (ticketID, problem_description)
    VALUES (1, 'Ive been working on this for 3 years, I think I might be dumb T_T'),
           (2, 'I really need this to work, this assignment is due next week and I dont know how to get this to work!!!'),
           (3, 'Isnt it supposed to wrap on its own?'),
           (4, 'The components work in their respective files but when importing them Im getting an error.'),
           (5, 'I dont get why this doesnt work!'),
           (6, 'I know how to make matrises (O.o) but I dont know how to recieve the data conventionally.'),
           (7, 'I just dont get it. Can one of you beautiful amazing, kind people explain it to me?'),
           (8, 'The goal is to have each server holding its own data while the data is sourcing from the same point.');

INSERT INTO solutions (ticketID, solution_userID,  solution_description, postDate)
    VALUES (2, 2, 'To have data update on when rerendering a comptonent you have to render the component through a function.', '3/21/18'),
           (3, 2, 'To break the h3 tag you can use "word-break: break-word;".', '3/22/18'),
           (1, 4, 'First, youre not dumb, this is just a challenge for you. Second, when changing the img to the back of the card you want to save the src of the front of the card.', '3/23/18'),
           (6, 5, 'Heres an example of how this can be done.', '3/26/18'),
           (3, 3, 'You can set the display to inline-block.', '3/29/18'),
           (7, 5, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind', '3/30/18');

INSERT INTO comments (ticketID, commenter_id, comment, commentDate)
VALUES (1, 2, 'this is common problem among new devs, recursion is hard', '12/10/2018'),
        (4, 3, 'loops are very difficult', '12/05/2019'),
        (3, 4, 'next time phrase your question like this', '09/20/2018');
