const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

const getAllUsers = (req, res, next) => {
  db
    .any("SELECT * FROM users")
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL users"
      });
    })
    .catch(function(err) {
      return (err);
    });
}

const checkUser = (req, res, next) => {
  db.any("SELECT username FROM users WHERE username=${username}", {username: req.body.username})
    .then(users => {
        if(users.length === 0) {
          return;
        }
        res.status(400).json({message: "user already exists"});
        return;
    })
    .catch((err) => {
      console.log("err:", err);
      res.status(500).json({message: "error creating user"});
    });
};

function createUser(req, res, next) {
  const hash = authHelpers.createHash(req.body.password);
  console.log("create user hash:", hash);
  db
    .none(
      `INSERT INTO users (username, password_digest, email, profilePic, stack, Bio) 
      VALUES ($1, $2, $3, $4)`,
      [ req.body.username, hash, req.body.email, req.body.profilePic, req.body.stack, req.body.Bio ]
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

function getSingleUser(req, res, next) {
    console.log("req", req)
  db
    .any("SELECT * FROM users WHERE username = ${username}", {username: req})
    .then(function(data) {
        console.log("data", data)
      res.status(200).json({
        status: "success",
        data: data,
        message: "Fetched one user"
      });
    })
    .catch(function(err) {
      return (err);
    });
}

function getSolution(req, res, next) {
    db
        .any("SELECT * FROM solution JOIN problem ON problem.id = solution.problemID WHERE solution.problemID = ${problemID}", {problemID: req})
        .then(function(data){
            res.status(200).json({
                status: "success",
                data: data,
                message: "Fetched solution"
            })
        })
}


module.exports = {
    checkUser,
    createUser,
    logoutUser,
    getSingleUser,
    getAllUsers,
    
  };
  