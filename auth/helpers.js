const bcrypt = require("bcryptjs");
const db = require("../db/index");

function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

function createHash(password) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function createUser(req) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    return db.none(
      "INSERT INTO users (username, password_digest, email, fullName) VALUES (${username}, ${password}, ${email}, ${fullName})",
      {
        username: req.body.username,
        password: hash,
        email: req.body.email,
        fullName: req.body.fullName
      }
    );
  } 


function loginRequired(req, res, next) {
    
    if(!req.user) {
        res.status(401)
        .json({
            status: "Please log in."
        });
        return;
    }
    next();
}

module.exports = {
    comparePass,
    createHash,
    loginRequired, 
    createUser
};
