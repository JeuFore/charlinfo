const lib = require("./changelog/lib.js");

module.exports = function (app) {
    app.get("/changelog/get", lib.getChangelog)
    app.post("/changelog/add", lib.addChangelog);
    app.post("/changelog/delete", lib.deleteChangelog)
};