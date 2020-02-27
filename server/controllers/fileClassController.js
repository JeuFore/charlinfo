const lib = require("./fileClass/lib.js");

module.exports = function(app) {
  app.get("/file/:semester/:class/get", lib.getClass);
  app.post("/file/:semester/:class/add", lib.addClass);
  app.post("/file/:semester/:class/delete", lib.deleteClass);
};