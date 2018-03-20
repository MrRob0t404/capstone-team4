const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/index");
const init = require("./passport");
const authHelpers = require("./helpers");

const options = {};

init();

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    console.log("trying to authenticate");
    db
      .any("SELECT * FROM users WHERE LOWER(username)=$1", [username.toLowerCase()])
      .then(rows => {
        const user = rows[0];
        if (!user) {
          return done(null, false);
        }
        if (!authHelpers.comparePass(password, user.password_digest)) {
            console.log('here')
          return done(null, false);
        } else {
            console.log('there')
          return done(null, user);
        }
      })
      .catch(err => {
        console.log("error: ", err);
        return done(err);
      });
  })
);

module.exports = passport;
