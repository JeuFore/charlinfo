const lib = require("./user/lib.js");

module.exports = function(app) {
  app.get("/user/get/:user", lib.getUser);
  app.post("/user/ban/:user", lib.banUser);
  app.post("/user/unban/:user", lib.unbanUser);
};
