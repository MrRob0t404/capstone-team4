const bcrypt = require("bcryptjs")
const db = require("../db/index")

function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword)
}

function createHash(password) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function loginRequired(req, res, next) {
    if(!req.user) {
        res.status(401)
        .json({
            status: "Please log in."
        });
        return;
    }
    next()
}

module.exports = {
    comparePass,
    createHash,
    loginRequired
};