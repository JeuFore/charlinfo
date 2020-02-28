const lib = require("./fileClass/lib.js");

module.exports = function(app) {
  app.get("/file/:semester/:class_e/get", lib.getClass);
  app.post("/file/:semester/:class_e/add", lib.addClass);
  app.post("/file/:semester/:class_e/delete", lib.deleteClass);
};