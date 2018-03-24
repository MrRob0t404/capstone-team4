const express = require('express');
const router = express.Router();
const {loginRequired} = require("../auth/helpers");
const passport = require("../auth/local");
const db = require("../db/queries");

router.post("/new", db.checkUser, db.createUser);

router.post("/login", passport.authenticate("local"), (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
  console.log('this is what the DB returned', req.user);
  const userObject = {
    user_id: req.user.user_id,
    username: req.user.username,
    user_bio: req.user.user_bio
  }
  res
    .status(200)
    .json({user: userObject, message: `${req.user.username} is logged in`});
=======
=======
>>>>>>> a1ddfb3d4095961c698ab620dba3dccd0fe6018b
  // console.log('this is what the DB returned', req.user);
  res.status(200).json({
    user: req.user,
    message: `${req.user.username} is logged in`
  });
<<<<<<< HEAD
>>>>>>> c71a55b7e06139fd9c1db28b1099d231c54d48f9
  return;
});

<<<<<<< HEAD
=======
router.get("/getUser", loginRequired, db.getUser);
>>>>>>> c71a55b7e06139fd9c1db28b1099d231c54d48f9
=======
  return;
});

router.get("/getUser", loginRequired, db.getUser);
>>>>>>> a1ddfb3d4095961c698ab620dba3dccd0fe6018b
router.get("/", loginRequired, db.getSingleUser);
router.get("/new", db.getAllUsers);
router.post("/new", db.createUser);
router.get("/logout", loginRequired, db.logoutUser);
router.get("/profile", loginRequired, db.getSingleUser);
router.get("/")


<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> a1ddfb3d4095961c698ab620dba3dccd0fe6018b
