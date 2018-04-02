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
    profilePic VARCHAR DEFAULT 'https://image.flaticon.com/icons/svg/16/16480.svg',
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
           (5, 'I dont get why this doesnt work!'),
           (6, 'I know how to make matrises (O.o) but I dont know how to recieve the data conventionally.'),
           (7, 'I just dont get it. Can one of you beautiful amazing, kind people explain it to me?'),
           (8, 'The goal is to have each server holding its own data while the data is sourcing from the same point.');

INSERT INTO solutions (ticketID, solution_userID,  solution_description, postDate)
    VALUES (2, 2, 'To have data update on when rerendering a comptonent you have to render the component through a function.', '3/21/18'),
           (3, 2, 'To break the h3 tag you can use "word-break: break-word;".', '3/22/18'),
           (1, 4, 'First, youre not dumb, this is just a challenge for you. Second, when changing the img to the back of the card you want to save the scr of the front of the card.', '3/23/18'),
           (6, 5, 'you better do this correctly now', '3/26/18'),
           (7, 5, 'i just want to know if this works', '3/30/18');


























-- DROP DATABASE IF EXISTS tyrodev;
-- CREATE DATABASE tyrodev;

-- \c tyrodev;

-- DROP TABLE IF EXISTS users, tickets, files, problems, problem, solutions, comments, tickets, solution;

-- CREATE TABLE users (
--     ID SERIAL PRIMARY KEY,
--     fullName VARCHAR,
--     username VARCHAR UNIQUE,
--     password_digest VARCHAR,
--     email VARCHAR,
--     profilePic VARCHAR,
--     stack VARCHAR
-- );

-- CREATE TABLE tickets (
--     ID SERIAL PRIMARY KEY,
--     ticket_userID INTEGER REFERENCES users(ID),
--     ticketDate VARCHAR,
--     problemStatus BIT,
--     title VARCHAR
-- );

-- CREATE TABLE files (
--     ID SERIAL PRIMARY KEY,
--     code VARCHAR,
--     fileName VARCHAR,
--     ticketID INTEGER REFERENCES tickets(ID),
--     language VARCHAR,
--     file_userid INTEGER REFERENCES users(ID)
-- );

-- CREATE TABLE problems (
--     ID SERIAL PRIMARY KEY,
--     ticketID INTEGER REFERENCES tickets(ID),
--     problem_description VARCHAR,
--     lines VARCHAR
-- );


-- CREATE TABLE solutions (
--     ID SERIAL PRIMARY KEY,
--     ticketID INTEGER REFERENCES tickets(ID),
--     solution_userID INTEGER REFERENCES users(ID),
--     solution_description VARCHAR
-- );






-- INSERT INTO users (username, fullName, password_digest, email, profilePic, stack)
--     VALUES ('Newton21', 'Newton Brooks', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'email@email.com', 'https://media.licdn.com/dms/image/C4E03AQFb_xBYxIBS3Q/profile-displayphoto-shrink_200_200/0?e=1527278400&v=alpha&t=hHwItVBYuqAODErCwQ6Aqre7OkySZz7V05uSwXmh8-Q', 'JS, React, Pug, HTML, CSS'),
--          ('Edje-C', 'Elon Jefferson','$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'email@email.com', 'https://media.licdn.com/dms/image/C5603AQEYfXhxT_WETA/profile-displayphoto-shrink_800_800/0?e=1527278400&v=alpha&t=mN0gF1Ykq3vDj50Jkahsiz6xVL6djtpOB9MJQWH02ds', 'Python, C++, Machine Learning'),
--          ('MoMo','Monique Mojica', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'email@email.com', 'https://media.licdn.com/dms/image/C5603AQH4BiE3sUUIWQ/profile-displayphoto-shrink_800_800/0?e=1527278400&v=alpha&t=KnJgy6kfHob4bQ_VouARSWoX-Gjh5lWvD4fM6_bUg3o', 'HTML'),
--          ('Si-Mon', 'Simon Gaviria', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'email@email.com', 'https://media.licdn.com/dms/image/C4E00AQFMBuHG5_gS8w/profile-displayphoto-shrink_800_800/0?e=1522342800&v=alpha&t=RqOAVRun-Wxf6oOzdhOUfjUOOW_zKna7mReN-DbqnQY', 'Basic, Assembly, ASCII'),
--          ('Keithest', 'Keith Aple', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'JS, Angular, Ruby'),
--          ('Benny', 'Ben Profit', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'React Native, WEBGL, #C'),
--          ('SplashBro', 'Stephen Curry', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'email@email.com', 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png', 'Ruby'),
--          ('fart', 'Fartaroni', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'email@email.com', 'https://fthmb.tqn.com/YnBILVoVG067htv3xoSnm7XPZQY=/768x0/filters:no_upscale()/165720348-56a12f6c3df78cf772683b39.jpg', 'Ruby');


-- INSERT INTO tickets (ticket_userID, ticketDate, problemStatus, title)
--     VALUES (4, '2/30/17', '0', 'My for loops and functions dont work'),
--            (2, '3/5/17', '0', 'Cant import font'),
--            (3, '4/10/17', '1', 'Cant get route to work'),
--            (1, '5/20/17', '0', 'Toaster Speech Enable');

-- INSERT INTO files (code, ticketID, language, file_userid)
--     VALUES ('forvar i  0 i < arr.length i++){ fail }', 1, 'Python', 1),
--            ('function amirite(bool){ if(bool === true){ return "okay" else "yea" }}', 1, 'Python', 2),
--            ('@import comic sans ERR', 2, 'Javascript', 3),
--            ('@import comic-sans', 2, 'Javascript', 2),
--            ('<Link exact path= />', 2, 'React', 1),
--            ('01010101010101010101010000111101010101001010100', 4, 'C++', 4),
--            ('for(var i = 100; i > arr.length; i--){}', 1, 'Python', 5),
--            ('<Switch> <Home render(this.renderHomepage) /> </Switch>', 3, 'React', 7),
--            ('0000011110101010101010101010101010101010101010101010101011100', 4, 'C++', 8);


-- INSERT INTO problems (ticketID, problem_description, lines)
--     VALUES (1, 'Problem with for loop, its not incrementing', '1, 2'),
--            (1, 'Problem with function', '5, 6, 7, 8'),
--            (2, 'I cant import this font, I just want to use this font.. omg', '5'),
--            (3, 'Whenever I rerender my routes dont work', '15'),
--            (4, 'I just want to talk to my toaster', '5');

-- INSERT INTO solutions (ticketID, solution_userID,  solution_description)
--     VALUES (2, 4, 'You should try this'),
--            (1, 7, 'This is dumb, try this '),
--            (3, 8, 'you better do this correctly now'),
--            (4, 7, 'i just want to know if this works');














