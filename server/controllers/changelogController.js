const lib = require("./changelog/lib.js");

module.exports = function (app, websocketManager) {
    app.get("/changelog/get", lib.getChangelog);
    app.post("/changelog/add/", (req, res) => lib.addChangelog(req, res, websocketManager));
    app.post("/changelog/delete/:id_changelog", lib.deleteChangelog);
};