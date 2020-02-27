const lib = require("./fileSemester/lib.js");

module.exports = function(app) {
  app.get("/file/:semester", lib.getSemester);
  app.post("/file/:semester/add", lib.addSemester);
  app.post("/file/:semester/delete", lib.deleteSemester);
};