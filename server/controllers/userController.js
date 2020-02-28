const lib = require("./user/lib.js");

module.exports = function(app) {
  app.get("/user/get/:user", lib.getUser);
  app.get("/user/ban/:user", lib.banUser);
  app.get("/user/unban/:user", lib.unbanUser);
};
