const express = require('express');
const router = express.Router();
const { loginRequired } = require("../auth/helpers");
const passport = require("../auth/local");
const db = require("../db/queries");

<<<<<<< HEAD
router.post("/new", db.checkUser, db.createUser);
=======
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.end('respond with a resource');
});
>>>>>>> 9a0a10dae31f1bdff2a7b0be258cd1b8284bd27a

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log('this is what the DB returned', req.user);
  const userObject = {
    user_id: req.user.user_id,
    username: req.user.username,
    user_bio: req.user.user_bio
  }
  res.status(200).json({
    user: userObject,
    message: `${req.user.username} is logged in`
  });
  return;
}); 

router.get("/", loginRequired, db.getSingleUser,   );
router.get("/new", db.getAllUsers);
router.post("/new", db.createUser);
router.get("/logout", loginRequired, db.logoutUser);
router.get("/profile", loginRequired, db.getSingleUser);
router.get("/")


module.exports = router;