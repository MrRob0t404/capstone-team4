const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");
const nodemailer = require('nodemailer');
const notifications = require('./Email/email')




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'TyroDevTeam@gmail.com',
    pass: 'pusheenthelimits'
  }
})

function welcomeNotification(user) {
  const Mail = {
    from: 'TyroDevTeam@gmail.com',
  }
  Mail.to = user.email
  Mail.html = notifications.welcome(user)
  Mail.subject = 'Welcome to Tyro Dev!'
  transporter.sendMail(Mail, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`email has been sent`)
    }
  })
}

function solutionNotification(problemPoster, problemSolver) {
  const Mail = {
    from: 'TyroDevTeam@gmail.com',
  }
  Mail.to = problemPoster.email
  Mail.html = notifications.solutionNotification(problemPoster, problemSolver)
  Mail.subject = `${problemSolver.username} solved your problem!`
  transporter.sendMail(Mail, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`email has been sent`)
    }
  })
}




function createUser(req, res, next) {
  const hash = authHelpers.createHash(req.body.password);
  console.log("create user hash:", hash);
  db
    .any(
    `INSERT INTO users (username, password_digest, email, fullName) 
      VALUES ($1, $2, $3, $4) RETURNING users.username, users.email, users.fullName`,
    [req.body.username, hash, req.body.email, req.body.fullName]
    )
    .then((data) => {
      res.status(200)
        .json({
          data: data[0]
        })
      welcomeNotification(data[0])
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json({
          message: `failed${err}`
        })
    })
}




function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
};


  function getUser(req, res, next) {
    db
      .one("SELECT * FROM users WHERE username=${username}", {username: req.user.username})
      .then(data => {
        res
          .status(200)
          .json({user: data});
      })
  };

  function getTicketFeed(req, res, next) {
    db
      .any(`SELECT tickets.title, tickets.problemstatus, tickets.ticketdate, tickets.id, users.username, users.profile_pic, tickets.ticket_userid, problems.problem_description, COUNT(users.id=solutions.solution_userid) AS responses
    FROM tickets JOIN users ON tickets.ticket_userid = users.id LEFT JOIN solutions ON solutions.ticketid = tickets.id JOIN problems ON problems.ticketid = tickets.id
    GROUP BY tickets.title, tickets.problemstatus, tickets.ticketdate, tickets.id, users.username, users.profile_pic, tickets.ticket_userid, problems.problem_description
    ORDER BY tickets.id DESC`)
      .then(function (data) {
        res
          .status(200)
          .json({status: "success", data: data, message: "Fetched ticket feed"})
      })
      .catch(err => {
        console.log(`err in getTicketFeed`, err)
        res
          .status(500)
          .json({message: "FAILED: couldnt getTicketFeed"});
      })
  }

  // user Profile functions

  function editUserProfile(req, res, next) {
    db
      .none("UPDATE users SET email=${email}, fullname=${fullName}, stack=${stack}, username=" +
        "${username} WHERE users.id=${userID}", {
      email: req.body.email,
      fullName: req.body.fullName,
      username: req.body.username,
      stack: req.body.stack,
      links: req.body.links,
      userID: req.user.id
    })
      .then(() => {
        res
          .status(200)
          .json({message: "successfully updated user"})
      })
      .catch(err => {
        console.log(`err in editUserProfile`, err)
        res
          .status(500)
          .json({message: `FAILED: editUserProfile`})
      })
  }

  function getUserProfile(req, res, next) {
    db
      .any("SELECT * FROM users WHERE username=${username}", {username: req.params.username})
      .then(data => {
        res
          .status(200)
          .json({status: 'success', data: data, message: 'Fetched user Profile'})
      })
      .catch(err => {
        console.log(`err in getUserProfile`, err)
        res
          .status(500)
          .json({message: `FAILED: getUserProfile`})
      })
  }

  function getUserTicketFeed(req, res, next) {
    db
      .any("SELECT tickets.title, tickets.problemstatus, tickets.ticketdate, tickets.id, use" +
          "rs.username, users.profile_pic, tickets.ticket_userid, COUNT(users.id=solutions." +
          "solution_userid) AS responses FROM tickets JOIN users ON tickets.ticket_userid =" +
          " users.id LEFT JOIN solutions ON solutions.ticketid = tickets.id WHERE users.use" +
          "rname=${username} GROUP BY tickets.title, tickets.problemstatus, tickets.ticketd" +
          "ate, tickets.id, users.username, users.profile_pic, tickets.ticket_userid ORDER " +
          "BY tickets.id DESC", {username: req.params.username})
      .then(function (data) {
        res
          .status(200)
          .json({status: 'Success', data: data, message: 'Fetched User Ticket feed'})
      })
      .catch(err => {
        console.log(`err in getUserTicketFeed`, err)
        res
          .status(500)
          .json({message: "FAILED: getUserTicketFeed"});
      })
  }

  function getUserID(req, res, next) {
    db.catch(err => {
      console.log(`err fetching userID`, err)
      res
        .status(500)
        .json({message: `error getting userid`})
    })
  }

  function getUserProfileSolutions(req, res, next) {
    console.log(`req.params`, req.params)
    db
      .one("SELECT id FROM users WHERE username=${username}", {username: req.params.username})
      .then(data => {
        db
          .any("SELECT username, tickets.ticketdate, tickets.title, tickets.id, users.profile_pi" +
            "c, tickets.problemstatus, COUNT(users.id=solutions.solution_userid) AS RESPONSES" +
            " FROM tickets JOIN users ON tickets.ticket_userid = users.id JOIN solutions ON s" +
            "olutions.ticketid = tickets.id WHERE solutions.solution_userid = ${id} GROUP BY " +
            "tickets.id, users.id, solutions.id ORDER BY tickets.id DESC", {id: data.id})
          .then(data => {
            res
              .status(200)
              .json({data: data})
          })
      })
      .catch(err => {
        console.log('err fetching profile solutions', err)
        res
          .status(500)
          .json({message: 'error fethcing profile solutions', err})
      })
  }

  // CREATING A NEW TICKET/ISSUE
  function newTicket(req, res, next) {
    db
      .none("INSERT INTO tickets(ticket_userid, ticketDate, problemStatus, title) VALUES(${id" +
        "}, ${ticketDate}, ${problemStatus}, ${title})", {
      id: req.user.id,
      ticketDate: req.body.ticketDate,
      problemStatus: req.body.problemStatus,
      title: req.body.title
    })
      .then(() => {
        res
          .status(200)
          .json({status: 'Success'})
      })
      .catch(err => {
        res
          .status(500)
          .json({status: `failed${err}`})
      })
  }

  function newFile(req, res, next, ticketid, file) {
    db
      .none("INSERT INTO files (code, filename, ticketid, language, file_userid)VALUES(${code" +
        "}, ${filename}, ${ticketid}, ${language}, ${userid})", {
      code: file.code,
      filename: file.filename,
      ticketid: ticketid,
      language: file.language,
      userid: req.user.id
    })
      .then(() => {
        res
          .status(200)
          .json({status: `success`})
      })
      .catch(err => {

        res
          .status(500)
          .json({status: `failed${err}`})
      })
  }

  function newProblems(req, res, next, ticketid, file) {
    db
      .none("INSERT INTO problems (ticketid, problem_description, lines)VALUES(${ticketid}, $" +
        "{problem_desc}, ${lines})", {
      ticketid: ticketid,
      problem_desc: req.body.problem_desc,
      lines: req.body.lines
    })
      .then(() => {
        res
          .status(200)
          .json({status: 'success'})
      })
      .catch(err => {
        console.log(`checkerrnewProblems`, err)
        res
          .status(500)
          .json({status: 'failed'})
      })
  };

function newSolution(req, res, next, ticketid, file) {
  db
    .none("INSERT INTO solutions(ticketID, solution_userid, solution_description, postDate) " +
    "VALUES(${ticketid}, ${userid}, ${solution_desc}, ${postDate})", {
      ticketid: Number(ticketid), userid: req.user.id, solution_desc: req.body.solution_desc, postDate: req.body.postDate
    })
    .then(() => {
      db
        .one("SELECT tickets.id, problem_description, problems.lines, tickets.ticket_userid, " +
        "ticketdate, problemstatus, tickets.title, users.username, users.profile_pic, users.fullName, users.email " +
        "FROM problems JOIN tickets ON tickets.id = problems.ticketid " +
        "JOIN users ON users.id=tickets.ticket_userid " +
        "WHERE problems.ticketid = ${ticketid}", { ticketid: Number(ticketid) })
        .then(data => {
          console.log(`ProblemPoster`,data)
          console.log(`ProblemSovler`, req.user)
          solutionNotification(data, req.user)
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(`newSolutionerr${err}`)
      res
        .status(500)
        .json({status: `NewSolutionfailed${err} `})
    })
  }


function newFileSolution(req, res, next, ticketid, file) {
  db
    .one("INSERT INTO files (code, filename, ticketid, language, file_userid)" +
    "VALUES(${code}, ${filename}, ${ticketid}, ${language}, ${userid}) RETURNING id", {
      code: file.code, filename: file.filename,
      ticketid: Number(ticketid), language: file.language, userid: req.user.id
    })
    .then((data) => {
      res.status(200)
        .json({
          status: `success`
        })

    })
    .catch(err => {

      console.log(`newFileSolution${err}`)
      res
        .status(500)
        .json({status: `NewFIleSolutionfailed${err}`})
    })

  }





function submitProblem(req, res, next) {
  db
    .one("INSERT INTO tickets(ticket_userid, ticketDate, problemStatus, title) " +
    "VALUES(${id}, ${ticketDate}, ${problemStatus}, ${title}) RETURNING id", {
      id: req.user.id, ticketDate: req.body.ticketDate,
      problemStatus: req.body.problemStatus, title: req.body.title
    })
    .then(data => {
      let parsedFiles = JSON.parse(req.body.files)
      newProblems(req, res, next, data.id, parsedFiles)
      for (var i = 0; i < parsedFiles.length; i++) {
        newFile(req, res, next, data.id, parsedFiles[i])
      }
    })
}

  // submitSolution looking for ticket, get id, use id to create file, create
  // solution loop through files, each will have one solution in the createnewFile
  // add to solutions table

  function submitSolution(req, res, next) {
    let parsedFiles = JSON.parse(req.body.files)
    newSolution(req, res, next, req.body.ticketid, parsedFiles)
    for (var i = 0; i < parsedFiles.length; i++) {
      console.log(`submitSolution`)
      newFileSolution(req, res, next, Number(req.body.ticketid), parsedFiles[i])
    }
  }

  function submitProblem(req, res, next) {
    db
      .one("INSERT INTO tickets(ticket_userid, ticketDate, problemStatus, title) VALUES(${id" +
        "}, ${ticketDate}, ${problemStatus}, ${title}) RETURNING id", {
      id: req.user.id,
      ticketDate: req.body.ticketDate,
      problemStatus: req.body.problemStatus,
      title: req.body.title
    })
      .then(data => {
        let parsedFiles = JSON.parse(req.body.files)
        newProblems(req, res, next, data.id, parsedFiles)
        for (var i = 0; i < parsedFiles.length; i++) {
          newFile(req, res, next, data.id, parsedFiles[i])
        }
      })
  }

  // keep the ticket id, submit files submit problem

  function getAllTicketSolutions(req, res, next) {
    db.any("SELECT * FROM solutions JOIN tickets ON solutions.ticketid = tickets.id JOIN fil" +
        "es ON files.ticketid = tickets.id WHERE tickets.id=${ticketid} AND solutions.id=" +
        "${solutionid}", {
      ticketid: Number(req.params.ticketid),
      solutionid: Number(req.params.solutionid)
    }).then(data => {
      res
        .status(200)
        .json({data: data, status: `success`})
    }).catch(err => {
      res
        .status(500)
        .json({messsage: `failed${err}`})
    })
  }

  function getProblem(req, res, next) {
    db
      .any("SELECT tickets.id, problem_description, problems.lines, files.id, code, files.fi" +
        "lename, tickets.ticket_userid, ticketdate, problemstatus, tickets.title, users.u" +
        "sername, users.profile_pic FROM problems JOIN files ON problems.ticketid=files.t" +
        "icketid JOIN tickets ON tickets.id = problems.ticketid JOIN users ON users.id=ti" +
        "ckets.ticket_userid WHERE problems.ticketid = ${ticketid} AND files.file_userid " +
        "= (SELECT ticket_userid FROM tickets WHERE tickets.id = ${ticketid})", {
      ticketid: Number(req.params.ticketid)
    })
      .then(data => {
        res
          .status(200)
          .json({data: data, status: `success`})
      })
      .catch(err => {
        res
          .status(500)
          .json({status: `failed${err}`})
      })
  }

  function getSolutions(req, res, next) {
    db
      .any("SELECT code, filename, files.ticketid, files.filename, files.language, files.fil" +
        "e_userid, users.username, solutions.solution_description, solutions.postdate, us" +
        "ers.profile_pic, solutions.solution_userid FROM files JOIN users ON users.id = f" +
        "iles.file_userid JOIN solutions ON solutions.solution_userid = files.file_userid" +
        " WHERE files.ticketid = ${ticketid} AND solutions.ticketid = ${ticketid} AND fil" +
        "es.file_userid != (SELECT ticket_userid FROM tickets WHERE tickets.id = ${ticket" +
        "id}) ORDER BY solutions.id DESC", {ticketid: req.params.ticketid})
      .then(data => {
        res
          .status(200)
          .json({data: data, status: `success`})
      })
      .catch(err => {
        res
          .status(500)
          .json({status: `failed`})
      })

  }

  function markSolution(req, res, next) {
    db
      .none("UPDATE tickets SET problemStatus='1' WHERE ticketid={ticketid}", {ticketid: req.body.id})
      .then(() => {
        res
          .status(200)
          .json({status: 'success'})
      })
      .catch(err => {
        res
          .status(500)
          .json({status: 'message'})
      })
  }

  function getComments(req, res, next) {
    db
      .any("SELECT comment, comments.ticketid, users.username, users.profile_pic, comments.c" +
        "ommenter_id, commentDate FROM comments JOIN users ON comments.commenter_id=users" +
        ".id JOIN tickets ON tickets.id = comments.ticketid WHERE tickets.id=${ticketid}", {
      ticketid: Number(req.params.ticketid)
    })
      .then(data => {
        res
          .status(200)
          .json({data: data, status: `success`})
      })
      .catch(err => {
        console.log(`err`, err)
        res
          .status(500)
          .json({status: `failed${err}`})
      })
  }

  function addComments(req, res, next) {
    db
      .none("INSERT INTO comments (ticketid, commenter_id, comment, commentDate) VALUES(${tic" +
        "ketid}, ${userid}, ${comment}, ${commentDate})", {
      ticketid: req.body.ticketid,
      userid: req.user.id,
      comment: req.body.comment,
      commentDate: req.body.commentDate
    })
    .then(data => {
      res.status(200)
        .json({
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


function UpdateTicketProblemStatus(req, res, next) {
  db
    .none("UPDATE tickets SET problemStatus = ${status} WHERE tickets.id=${ticketid}", {
      ticketid: Number(req.params.ticketid),
      status: req.params.status
    })
    .then(() => {
      res.status(200)
        .json({
          status: `success`
        })
    })
    .catch(err => {
      res.status(500)
        .json({
          status: `failed`
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
  editUserProfile,
  getUserID,
  getUserProfileSolutions,
  submitProblem,
  submitSolution,
  getAllTicketSolutions,
  getProblem,
  getSolutions,
  getComments,
  addComments,
  UpdateTicketProblemStatus
};







