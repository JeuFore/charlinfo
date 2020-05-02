const lib = require("./account/lib.js");

module.exports = function (app, websocketManager) {
    app.post("/account/login", (req, res) => lib.login(req, res, websocketManager))
    app.post("/account/signup", (req, res) => lib.signup(req, res, websocketManager));
};