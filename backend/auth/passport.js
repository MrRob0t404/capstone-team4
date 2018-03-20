const passport = require("passport");
const db = require("../db/index");

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.username);
    })
}

passport.deserializeUser((username, done) => {
    console.log("deserialize")
    db
    .one("SELECT * FROM users WHERE username=$1", [username])
    .then(user => {
        done(null, user);
    })
    .catch(err => {
        done(err, null);
    });
});

