const express = require('express');
const router = express.Router();
const { loginRequired } = require("../auth/helpers");
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

router.get("/getUser", loginRequired, db.getUser);
router.post("/new", db.createUser);
router.get("/logout", loginRequired, db.logoutUser);

router.get("/profile/:username", db.getUserProfile);
router.get("/getTicketFeed", db.getTicketFeed);
router.get("/getTicket/:id", db.getTicket);
router.get("/getUserSolutionFeed/:username", db.getUserSolutionFeed);
router.get("/getUserTicketFeed/:username", db.getUserTicketFeed);



// router.get("/solution/:problemID", db.getSolutionByProblemID);
// router.get("/solution/:userID", db.getSolutionByUserID);
// router.get("/problem/:problemID", db.getProblemByProblemID);
// router.get("/problem/:userID", db.getProblemByUserID);
// router.get("/ticket/:problemID", db.getTicketsByProblemID);
// router.get("/comments/:problemID", db.getCommentsByProblemID);

module.exports = router;

















// const express = require('express');
// const router = express.Router();
// const { loginRequired } = require("../auth/helpers");
// const passport = require("../auth/local");
// const db = require("../db/queries");

// router.post("/new", db.checkUser, db.createUser);

// router.post("/login", passport.authenticate("local"), (req, res) => {
//   // console.log('this is what the DB returned', req.user);
//   res.status(200).json({
//     user: req.user,
//     message: `${req.user.username} is logged in`
//   });
//   return;
// }); 

// router.get("/getUser", loginRequired, db.getUser);
// router.get("/", loginRequired, db.getSingleUser);
// router.get("/all", db.getAllUsers);
// router.post("/new", db.createUser);
// router.get("/logout", loginRequired, db.logoutUser);
// router.get("/profile", loginRequired, db.getSingleUser);
// router.get("/solution/:problemID", db.getSolutionByProblemID);
// router.get("/solution/:userID", db.getSolutionByUserID);
// router.get("/problem/:problemID", db.getProblemByProblemID);
// router.get("/problem/:userID", db.getProblemByUserID);
// router.get("/ticket/:problemID", db.getTicketsByProblemID);
// router.get("/comments/:problemID", db.getCommentsByProblemID);

// module.exports = router;