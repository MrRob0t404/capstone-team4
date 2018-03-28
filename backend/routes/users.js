const express = require('express');
const router = express.Router();
const {loginRequired} = require("../auth/helpers");
const passport = require("../auth/local");
const db = require("../db/queries");


router.post("/login", passport.authenticate("local"), (req, res) => {
  // console.log('this is what the DB returned', req.user);
  res.status(200).json({
    user: req.user,
    message: `${req.user.username} is logged in`
  });
  return;
});

router.get("/getLoggedinUser", loginRequired, db.getUser);
router.get("/getUserID/:usernam", db.getUserID);
router.get("/getUserProfileSolutions/:username", db.getUserProfileSolutions);

router.post("/new", db.createUser);
router.get("/logout", loginRequired, db.logoutUser);
router.get("/profile/:username", db.getUserProfile);
router.get("/getTicketFeed", db.getTicketFeed);
router.get("/getTicket/:id", db.getTicket);
// router.get("/getUserSolutionFeed/:username", db.getUserSolutionFeed);
router.get("/getUserTicketFeed/:username", db.getUserTicketFeed);


module.exports = router;

