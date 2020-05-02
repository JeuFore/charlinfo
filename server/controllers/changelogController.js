const lib = require("./changelog/lib.js");

module.exports = function (app, websocketManager) {
    app.get("/changelog/get", (req, res) => lib.getChangelog(req, res, websocketManager));
    app.post("/changelog/add/", lib.addChangelog);
    app.post("/changelog/delete/:id_changelog", lib.deleteChangelog);
};