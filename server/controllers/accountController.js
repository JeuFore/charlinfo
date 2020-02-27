const lib = require("./account/lib.js");

module.exports = function (app) {
    app.post("/account/login", lib.login)
    app.post("/account/signup", lib.signup);
};