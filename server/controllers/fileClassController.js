const lib = require("./fileClass/lib.js");

module.exports = function(app) {
  app.get("/file/:semester/:idclass/get", lib.getClass);
  app.post("/file/:semester/:idclass/add", lib.addClass);
  app.post("/file/:semester/:idclass/delete", lib.deleteClass);
  app.get("/file/:semester/:idclass/download", lib.downloadClass);
  app.get("/file/:semester/:idclass/getTitle", lib.getClassTitle);
};