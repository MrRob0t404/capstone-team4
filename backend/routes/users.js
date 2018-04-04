const express = require('express');
const router = express.Router();
const {loginRequired} = require("../auth/helpers");
const passport = require("../auth/local");
const db = require("../db/queries");

// USER LOGIN ROUTES
router.post("/login", passport.authenticate("local"), (req, res) => {
  // console.log('this is what the DB returned', req.user);
  res.status(200).json({
    user: req.user,
    message: `${req.user.username} is logged in`
  });
  return;
});
router.get("/getLoggedinUser", loginRequired, db.getUser);
router.post("/new", db.createUser);
router.get("/logout", loginRequired, db.logoutUser);


router.get("/getUserID/:username", db.getUserID);
router.get("/getUserProfileSolutions/:username", db.getUserProfileSolutions);
router.get("/profile/:username", db.getUserProfile);
router.get("/getTicketFeed", db.getTicketFeed);
router.get("/getUserTicketFeed/:username", db.getUserTicketFeed);
router.post('/submitProblem', loginRequired, db.submitProblem )
router.post('/submitSolution', loginRequired, db.submitSolution)
router.patch('/profile/edit', db.editUserProfile);
router.get('/getAllTicketSolutions/ticket/:ticketid/solution/:solutionid', db.getAllTicketSolutions)
router.get('/getProblem/:ticketid', db.getProblem);
router.get('/getSolutions/:ticketid', db.getSolutions);
router.post('/addComments', loginRequired, db.addComments);
router.get('/getComments/:ticketid', db.getComments);
router.patch('/updateTicketProblemStatus/:ticketid', db.UpdateTicketProblemStatus);


module.exports = router;
