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
            `INSERT INTO users (username, password_digest, email, profilePic, stack, Bio) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
            [req.body.username, hash, req.body.email, req.body.profilePic, req.body.stack, req.body.Bio]
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

function getSolutionByFileID(req, res, next) {
    db
        .any("SELECT * FROM solution JOIN files ON solution.fileID = files.ID WHERE files.ID = ${fileID}", { fileID: req.body.id })
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


function getSolutionByUserID(req, res, next) {
    db
        .any("SELECT * FROM solution JOIN users ON users.id = solution.problemSolverID WHERE users.id = ${userID}", { userID: req.body.user.id })
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

function getProblemByProblemID(req, res, next) {
    db
        .any("SELECT * FROM problem WHERE problem.id = problem.id")
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

function getProblemByUserID(req, res, next) {
    db
        .any("SELECT description, problem.id, problemPoster, problemSnippet, githubrepo, username FROM problem JOIN users ON users.id = problem.problemPoster WHERE problem.problemPoster = ${userID}", { userID: req.body.user.id })
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

function getTicketsByProblemID(req, res, next) {
    db
        .any("SELECT * FROM tickets JOIN problem ON problem.id = tickets.problemID WHERE problem.id = ${problemID}", { problemID: req })
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
        .any("SELECT comment FROM comments JOIN problem ON problem.id = comments.problemID WHERE problem.id = ${problemID}", { problemID: req })
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
    getSolutionByProblemID,
    getSolutionByUserID,
    getProblemByProblemID,
    getProblemByUserID,
    getTicketsByProblemID,
    getCommentsByProblemID,
    getUser
};
