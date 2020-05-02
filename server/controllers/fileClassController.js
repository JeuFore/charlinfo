const lib = require("./fileClass/lib.js");

module.exports = function (app, websocketManager) {
  app.get("/file/:semester/:idclass/get", lib.getClass);
  app.post("/file/:semester/:idclass/add", (req, res) => lib.addClass(req, res, websocketManager));
  app.post("/file/:semester/:idclass/delete", lib.deleteClass);
  app.get("/file/:semester/:idclass/download", lib.downloadClass);
  app.get("/file/:semester/:idclass/getTitle", lib.getClassTitle);
};