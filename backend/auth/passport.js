const passport = require("passport");
const db = require("../db/index");
const debug = require("debug")("auth:passport");

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.username);
    })
}

passport.deserializeUser((username, done) => {
    debug("deserializeUser")
    db
    .one("SELECT * FROM users WHERE username=$1", [username])
    .then(user => {
        done(null, user);
    })
    .catch(err => {
        done(err, null);
    });
});

