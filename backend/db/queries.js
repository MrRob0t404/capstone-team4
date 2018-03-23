const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

const getAllUsers = (req, res, next) => {
    db
        .any("SELECT * FROM users")
        .then(function (data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Retrieved ALL users"
            });
        })
        .catch(function (err) {
            return (err);
        });
}

const checkUser = (req, res, next) => {
    db.any("SELECT username FROM users WHERE username=${username}", { username: req.body.username })
        .then(users => {
            if (users.length === 0) {
                return;
            }
            res.status(400).json({ message: "user already exists" });
            return;
        })
        .catch((err) => {
            console.log("err:", err);
            res.status(500).json({ message: "error creating user" });
        });
};

function createUser(req, res, next) {
    const hash = authHelpers.createHash(req.body.password);
    console.log("create user hash:", hash);
    db
        .none(
            `INSERT INTO users (firstName, lastName, username, password_digest, email) 
      VALUES ($1, $2, $3)`,
            [req.body.firstName, req.body.lastName, req.body.username, hash, req.body.email]
        )
        .then(() => {
            console.log("req.body.username", req.body.username)
            res.send(`created user: ${req.body.username}`);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error creating user");
        });
}

function logoutUser(req, res, next) {
    req.logout();
    res.status(200).send("log out success");
};

function getUser(req, res, next) {
  db
    .one("SELECT * FROM users WHERE username=${username}", {
      username: req.user.username
    })
    .then(data => {
      res.status(200).json({ user: data });
    });
}

function getSingleUser(req, res, next) {
    console.log("req", req)
    db
        .any("SELECT * FROM users WHERE username = ${username}", { username: req })
        .then(function (data) {
            console.log("data", data)
            res.status(200).json({
                status: "success",
                data: data,
                message: "Fetched one user"
            });
        })
        .catch(function (err) {
            return (err);
        });
}

function updateProfilePage(req, res, next) {
    db
        .any("UPDATE users SET profilePic=${imgURL}, stack=${stack} WHERE users.id = ${userID}", { imgURL: req.body.stack, profilePic: req.body.imgURL, userID: req.user.id } )
        .then(function (data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Fetched user profile"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error uploading user info");
        });
}

function getSolutionByTicketID(req, res, next) {
    db
        .any("", { userID: req.body.users.id })
        .then(function (data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Fetched solution"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error creating user");
        });
}

function getSolutionSnippetByFileID(req, res, next) {
    db
        .any("SELECT * FROM files INNER JOIN solution ON solution.fileID = files.ID WHERE solution.fileID = ${fileID}", { fileID: req.body.files.id })
        .then(function (data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Fetched solution"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error creating user");
        });
}

function getProblemByTicketID(req, res, next) {
    db
        .any("", { fileID: req.body.files.id })
        .then(function (data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Fetched problem"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error creating user");
        });
}

function getProblemSnippetByFileID(req, res, next) {
    db
        .any("SELECT description, problem.id, problemPoster, problemSnippet, githubrepo, username FROM problem JOIN users ON users.id = problem.problemPoster WHERE problem.problemPoster = ${userID}", { userID: req.body.users.id })
        .then(function (data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Fetched problem"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error creating user");
        });
}

function getTicketByUserID(req, res, next) {
    db
        .any("", { userID: req.body.user.id })
        .then(function (data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Fetched problem"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error creating user");
        });
}

function getTicketByDate(req, res, next) {
    db
        .any("", { })
        .then(function (data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Fetched problem"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error creating user");
        });
}

function getTicketByProblemStatus(req, res, next) {
    db
        .any("", { })
        .then(function (data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Fetched problem"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error creating user");
        });
}

function getTicketByTitle(req, res, next) {
    db
        .any("", { })
        .then(function (data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Fetched problem"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error creating user");
        });
}

function getCommentsByProblemID(req, res, next) {
    db
        .any("SELECT comment FROM comments JOIN problem ON problem.id = comments.problemID WHERE problem.id = ${problemID}", { problemID: req.body.problem.id })
        .then(function (data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Fetched problem"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error creating user");
        });
}

module.exports = {
    checkUser,
    createUser,
    logoutUser,
    getSingleUser,
    getAllUsers,
    updateProfilePage,
    getSolutionByTicketID,
    getSolutionSnippetByFileID,
    getProblemByTicketID,
    getProblemSnippetByFileID,
    getTicketByUserID,
    getTicketByDate,
    getTicketByProblemStatus,
    getTicketByTitle,
    getCommentsByProblemID,
    getUser
};
