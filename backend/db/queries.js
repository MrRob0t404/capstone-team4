const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");



function createUser(req, res, next) {
  const hash = authHelpers.createHash(req.body.password);
  console.log("create user hash:", hash);
  db
    .none(
    `INSERT INTO users (username, password_digest, email) 
      VALUES ($1, $2, $3)`,
    [req.body.username, hash, req.body.email]
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
    })
};

function getTicketFeed(req, res, next) {
  db
    .any(`SELECT tickets.title, tickets.problemstatus, tickets.ticketdate, tickets.id, users.username, users.profilepic, tickets.ticket_userid, COUNT(users.id) AS responses
        FROM tickets JOIN users ON tickets.ticket_userid = users.id JOIN solutions ON solutions.ticketid = tickets.id
        GROUP BY tickets.title, tickets.problemstatus, tickets.ticketdate, tickets.id, users.username, users.profilepic, tickets.ticket_userid ORDER BY tickets.id DESC`)
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Fetched ticket feed"
      })
    })
    .catch(err => {
      console.log(`err in getTicketFeed`, err)
      res.status(500).json({
        message: "FAILED: couldnt getTicketFeed"
      });
    })
}














// user Profile functions

function editUserProfile(req, res, next) {
  const hash = authHelpers.createHashPassword(req.body.password);
  db
    .none(
    "UPDATE users SET email = ${email}, fullName=${fullName}, password_digest=${password}, profilepic=${profilepic}, stack={stack} WHERE id=${id}",
    {
      email: req.body.email,
      fullName: req.body.fullName,
      password: hash,
      profilepic: req.body.profilepic,
      id: req.body.id,
      stack: req.body.stack
    }
    )
    .then(() => {
      res.status(200).json({
        message: "successfully updated user"
      });
    });
}


function getUserTicketFeed(req, res, next) {
  db
    .any("SELECT tickets.title, tickets.problemstatus, tickets.ticketdate, tickets.id, users.username, users.profilepic, tickets.ticket_userid, COUNT(users.id) AS responses FROM tickets JOIN users ON tickets.ticket_userid = users.id JOIN solutions ON solutions.ticketid = tickets.id WHERE users.username=${username} GROUP BY tickets.title, tickets.problemstatus, tickets.ticketdate, tickets.id, users.username, users.profilepic, tickets.ticket_userid", { username: req.params.username })
    .then(function (data) {
      res.status(200).json({
        status: 'Success',
        data: data,
        message: 'Fetched User Ticket feed'
      })
    })
    .catch(err => {
      console.log(`err in getUserTicketFeed`, err)
      res.status(500).json({
        message: "FAILED: getUserTicketFeed"
      });
    })
}




// function getUserSolutionFeed(req, res, next) {
//   db
//     .any("SELECT *, COUNT(users.id) AS RESPONSES FROM tickets JOIN users ON tickets.ticket_userid = users.id JOIN solutions ON solutions.ticketid = tickets.id WHERE solutions.solution_userid=${userid} GROUP BY tickets.id, users.id, solutions.id", { userid: req.params.userid})
//     .then(function (data) {
//       res.status(200).json({
//         status: 'Success',
//         data: data,
//         message: 'Fetched User Solution feed'
//       })
//     })
//     .catch(err => {
//       console.log(`err in getUserSolutionFeed`, err)
//       res.status(500).json({
//         message: "FAILED: getUserSolutionFeed"
//       });
//     })
// }


function getTicket(req, res, next) {
  db
    .any("SELECT * FROM tickets JOIN users ON tickets.userid = users.id JOIN solutions ON solutions.ticketid = tickets.id JOIN files ON solutions.fileid = files.id JOIN problem ON problem.ticketid = tickets.id JOIN comments ON comments.problemid = problem.id WHERE tickets.id=${id}", { id: req.params.id })
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Fetched Ticket'
        })
    })
    .catch(err => {
      console.log(`err in getTicket`, err)
      res.status(500).json({
        message: `FAILED: getTicket`
      })
    })
}


function getUserProfile(req, res, next) {
  db
    .any("SELECT * FROM users WHERE username=${username}", { username: req.params.username })
    .then(data => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Fetched user Profile'
        })
    })
    .catch(err => {
      console.log(`err in getUserProfile`, err)
      res.status(500).json({ message: `FAILED: getUserProfile` })
    })
}




function getUserID(req, res, next) {
  db

    .catch(err => {
      console.log(`err fetching userID`, err)
      res.status(500)
        .json({
          message: `error getting userid`
        })
    })
}

function getUserProfileSolutions(req, res, next) {
  console.log(`req.params`,req.params)
  db
    .one("SELECT id FROM users WHERE username=${username}", { username: req.params.username })
    .then(data => {
      db
        .any("SELECT *, COUNT(users.id) AS RESPONSES FROM tickets JOIN users ON " +
        "tickets.ticket_userid = users.id JOIN solutions ON solutions.ticketid = tickets.id WHERE solutions.solution_userid = ${id} " +
        "GROUP BY tickets.id, users.id, solutions.id", { id: data.id })
        .then(data => {
          res.status(200)
            .json({
              data: data
            })
        })
    })
    .catch(err => {
      console.log('err fetching profile solutions', err)
      res.status(500)
        .json({
          message: 'error fethcing profile solutions', err
        })
    })
}




module.exports = {
  createUser,
  logoutUser,
  getUser,
  getTicketFeed,
  getUserTicketFeed,
  getTicket,
  getUserProfile,
  getUserID,
  getUserProfileSolutions
};




// getUserSolutionFeed,
