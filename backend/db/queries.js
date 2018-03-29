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
    .any(`SELECT tickets.title, tickets.problemstatus, tickets.ticketdate, tickets.id, users.username, users.profilepic, tickets.ticket_userid, COUNT(users.id=solutions.solution_userid) AS responses
        FROM tickets JOIN users ON tickets.ticket_userid = users.id LEFT JOIN solutions ON solutions.ticketid = tickets.id
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

function getUserTicketFeed(req, res, next) {
  db
    .any("SELECT tickets.title, tickets.problemstatus, tickets.ticketdate, tickets.id, users.username, users.profilepic, tickets.ticket_userid, COUNT(users.id=solutions.solution_userid) AS responses FROM tickets JOIN users ON tickets.ticket_userid = users.id JOIN solutions ON solutions.ticketid = tickets.id WHERE users.username=${username} GROUP BY tickets.title, tickets.problemstatus, tickets.ticketdate, tickets.id, users.username, users.profilepic, tickets.ticket_userid", { username: req.params.username })
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
  console.log(`req.params`, req.params)
  db
    .one("SELECT id FROM users WHERE username=${username}", { username: req.params.username })
    .then(data => {
      db
        .any("SELECT *, COUNT(users.id=solutions.solution_userid) AS RESPONSES FROM tickets JOIN users ON " +
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








// CREATING A NEW TICKET/ISSUE
function newTicket(req, res, next) {
  db
    .none("INSERT INTO tickets(ticket_userid, ticketDate, problemStatus, title) " +
    "VALUES(${id}, ${ticketDate}, ${problemStatus}, ${title})", {
      id: req.user.id, ticketDate: req.body.ticketDate,
      problemStatus: req.body.problemStatus, title: req.body.title
    })
    .then(() => {
      res.status(200)
        .json({
          status: 'Success'
        })
    })
    .catch(err => {
      res.status(500)
        .json({
          status: `failed${err}`
        })
    })
}


function newFile(req, res, next, ticketid, file) {
  db
    .one("INSERT INTO files (code, filename, ticketid, languages)" +
    "VALUES(${code}, ${filename}, ${ticketid}, ${languages}) RETURNING id", {
      code: file.code, filename: file.filename,
      ticketid: ticketid, languages: file.languages
    })
    .then((data) => {
        newProblems(req, res, next, data.id, ticketid, file)
    })
    .catch(err => {
     
      res.status(500)
        .json({
          status: `failed${err}`
        })
    })
}


function newProblems(req, res, next, fileid, ticketid, file) {
  db
    .none("INSERT INTO problems (ticketid, problem_description, lines, fileid)" +
    "VALUES(${ticketid}, ${problem_desc}, ${lines}, ${fileid})", {
      ticketid: ticketid,
      problem_desc: file.problem_desc, lines: file.lines, fileid: fileid
    })
    .then(() => {
      res.status(200)
        .json({
          status: 'success'
        })
    })
    .catch(err => {
      res.status(500)
        .json({
          status: 'failed'
        })
    })
};






function markSolution(req, res, next) {
  db
    .none("UPDATE tickets SET problemStatus='1' WHERE ticketid={ticketid}", {
      ticketid: req.body.id
    })
    .then(() => {
      res.status(200)
        .json({
          status: 'success'
        })
    })
    .catch(err => {
      res.status(500)
        .json({
          status: 'message'
        })
    })
}


function newSolution(req, res, next, fileid, ticketid, file) {
    db
    .none("INSERT INTO solutions(ticketid, solution_userid, fileid, solution_description)" + 
    "VALUES(${ticketid}, ${userid}, ${fileid}, ${solution_desc})", {
      ticketid: ticketid, userid: req.user.id, fileid: fileid, solution_desc: file.solution_desc
    })
    .then(data => {
      res.status(200)
      .json({
        status: 'success'
      })
    })
    .catch(err => {
      res.status(500)
      .json({
        status: `failed${err}`
      })
    })
}



function newFileSolution(req, res, next, ticketid, file) {
  db
    .one("INSERT INTO files (code, filename, ticketid, languages)" +
    "VALUES(${code}, ${filename}, ${ticketid}, ${languages}) RETURNING id", {
      code: file.code, filename: file.filename,
      ticketid: ticketid, languages: file.languages
    })
    .then((data) => {
        newSolution(req, res, next, data.id, ticketid, file)
    })
    .catch(err => {
     
      res.status(500)
        .json({
          status: `failed${err}`
        })
    })
}

// submitSolution
// looking for ticket, get id, use id to create file, create solution
// loop through files, each will have one solution
// in the createnewFile add to solutions table

function submitSolution (req, res, next) {
  let parsedFiles = JSON.parse(req.body.files)
  for(var i = 0; i < parsedFiles.length; i++) {
    console.log( )
        newFileSolution(req, res, next, req.body.ticketid, parsedFiles[i])
  }
}



function submitProblem(req, res, next) {
  db
    .one("INSERT INTO tickets(ticket_userid, ticketDate, problemStatus, title) " +
    "VALUES(${id}, ${ticketDate}, ${problemStatus}, ${title}) RETURNING id", {
      id: req.user.id, ticketDate: req.body.ticketDate,
      problemStatus: req.body.problemStatus, title: req.body.title
    })
    .then(data => {
      console.log(`bodyfiles`,req.body.files)
      let parsedFiles = JSON.parse(req.body.files)
      console.log(`parsedFiles`, parsedFiles)
        for(var i = 0; i < parsedFiles.length; i++ ) {
          console.log(`i got here`, parsedFiles)
            newFile(req, res, next, data.id, parsedFiles[i])
        }
    })
}


// keep the ticket id,
// submit files
// submit problem


function getAllTicketSolutions(req, res, next) {
  db
  .any("SELECT * FROM solutions JOIN tickets ON " + 
   "solutions.ticketid = tickets.id JOIN files ON files.ticketid = tickets.id " + 
  "WHERE tickets.id=${ticketid} AND solutions.id=${solutionid}", {
    ticketid: Number(req.params.ticketid),
    solutionid: Number(req.params.solutionid)
  })
  .then(data => {
    res.status(200)
    .json({
      data: data,
      status: `success`
    })
  })
  .catch(err => {
      res.status(500)
      .json({
        messsage: `failed${err}`
      })
  })
}

function getProblem(req, res, next) {
  db
  .any("SELECT * FROM problems JOIN files ON problems.fileid=files.id WHERE problems.ticketid = ${ticketid}", {
    ticketid: Number(req.params.ticketid)
  })
  .then(data => {
    res.status(200)
    .json({
      data: data,
      status: `success`
    })
  })
  .catch(err => {
    res.status(500)
    .json({
      status: `failed${err}`
    })
  })
}



module.exports = {
  createUser,
  logoutUser,
  getUser,
  getTicketFeed,
  getUserTicketFeed,
  getUserProfile,
  getUserID,
  getUserProfileSolutions,
  submitProblem,
  submitSolution,
  getAllTicketSolutions,
  getProblem
};



