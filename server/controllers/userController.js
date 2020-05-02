const lib = require("./user/lib.js");

module.exports = function(app, websocketManager) {
  app.get("/user/get/:user", lib.getUser);
  app.post("/user/ban/:user", lib.banUser);
  app.post("/user/unban/:user", lib.unbanUser);
  app.post("/user/disconnect/", (req, res) => lib.disconnect(req, res, websocketManager));
  app.get('/user/promotion/:user', (req, res) => lib.promotion(req, res, websocketManager));
  app.post('/user/permission', lib.permissions);
};
