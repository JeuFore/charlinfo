const lib = require("./fileSemester/lib.js");

module.exports = function(app) {
  app.get("/file/:semester/get", lib.getSemester);
  app.post("/file/:semester/add", lib.addSemester);
  app.post("/file/:semester/delete", lib.deleteSemester);
  app.get("/file/getallprofessor", lib.getAllProfessor);
};