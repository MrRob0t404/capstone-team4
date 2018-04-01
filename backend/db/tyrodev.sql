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
    profile_pic VARCHAR DEFAULT 'https://image.flaticon.com/icons/svg/16/16480.svg',
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






INSERT INTO users (username, fullName, password_digest, email, stack)
  VALUES('MoMo','Monique Mojica', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'momo@tyrodev.com', 'HTML, Python'),
         ('Si-Mon', 'Simon Gaviria', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'si-mon@tyrodev.com', 'Basic, Assembly, ASCII'),
         ('Newton21', 'Newton Brooks', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'newton21@tyrodev.com', 'JS, React, Pug, HTML, CSS'),
         ('Edje-C', 'Elon Jefferson','$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'edje-c@tyrodev.com', 'Python, C++, Machine Learning'),
         ('C-Low', 'Carlo Valenti','$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'c-low@tyrodev.com', 'Python, C++, Machine Learning');


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
    VALUES (1, 3, 'app.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (2, 1, 'app.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (2, 1, 'teachers.sql', 'SQL', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (2, 1, 'router.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (3, 4, 'blog.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (3, 4, 'style.css', 'CSS', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (2, 2, 'app.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (2, 2, 'router.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (4, 2, 'app.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (4, 2, 'IOSComponents.swift', 'Swift', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (4, 2, 'AndroisComponents.java', 'Java', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (3, 2, 'blog.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (3, 2, 'style.css', 'CSS', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (5, 1, 'recursion.py', 'Python', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (1, 4, 'app.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (6, 2, 'matrix.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (6, 5, 'matrix.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (7, 3, 'binding.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (8, 5, 'server.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (8, 5, 'express.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n'),
           (7, 5, 'binding.js', 'JavaScript', 'aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsKaW1wb3J0IFJlYWN0RE9NIGZy\nb20gJ3JlYWN0LWRvbSc7CmltcG9ydCB7QnJvd3NlclJvdXRlcn0gZnJvbSAn\ncmVhY3Qtcm91dGVyLWRvbSc7CmltcG9ydCAnLi9pbmRleC5jc3MnOwppbXBv\ncnQgQXBwIGZyb20gJy4vQXBwJzsKaW1wb3J0IHJlZ2lzdGVyU2VydmljZVdv\ncmtlciBmcm9tICcuL3JlZ2lzdGVyU2VydmljZVdvcmtlcic7CgpSZWFjdERP\nTS5yZW5kZXIoCiAgICA8QnJvd3NlclJvdXRlcj4KICAgIDxBcHAvPgogICAg\nPC9Ccm93c2VyUm91dGVyPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jv\nb3QnKSk7CnJlZ2lzdGVyU2VydmljZVdvcmtlcigpOwo=\n');

INSERT INTO problems (ticketID, problem_description)
    VALUES (1, 'Ive been working on this for 3 years, I think I might be dumb T_T'),
           (2, 'I really need this to work, this assignment is due next week and I dont know how to get this to work!!!'),
           (3, 'Isnt it supposed to wrap on its own?'),
           (4, 'The components work in their respective files but when importing them Im getting an error.'),
           (5, 'You always want a recursive function to start with a base case so it can stop at some point.'),
           (6, 'I know how to make matrises (O.o) but I dont know how to recieve the data conventionally.'),
           (7, 'I just dont get it. Can one of you beautiful amazing, kind people explain it to me?'),
           (8, 'The goal is to have each server holding its own data while the data is sourcing from the same point.');

INSERT INTO solutions (ticketID, solution_userID,  solution_description, postDate)
    VALUES (2, 2, 'To have data update on when rerendering a comptonent you have to render the component through a function.', '3/21/18'),
           (3, 2, 'To break the h3 tag you can use "word-break: break-word;".', '3/22/18'),
           (1, 4, 'First, youre not dumb, this is just a challenge for you. Second, when changing the img to the back of the card you want to save the scr of the front of the card.', '3/23/18'),
           (6, 5, 'you better do this correctly now', '3/26/18'),
           (7, 5, 'i just want to know if this works', '3/30/18');
