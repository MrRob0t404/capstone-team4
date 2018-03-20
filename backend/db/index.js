var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/tyrodev"
var db = pgp(connectionString)

module.exports = db;