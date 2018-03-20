var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/levdev"
var db = pgp(connectionString)

module.exports = db;