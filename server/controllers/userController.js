const lib = require("./user/lib.js");

module.exports = function(app) {
  app.get("/user/get/:user", lib.getUser);
  app.post("/user/ban/:user", lib.banUser);
  app.post("/user/unban/:user", lib.unbanUser);
  app.post("/user/disconnect/", lib.disconnect);
  app.get('/user/get/:user/upload', lib.upload);
  app.post('/user/permission', lib.permissions);
};
