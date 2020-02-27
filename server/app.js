//Définition des modules
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const mongoose = require("mongoose"); 

//On définit notre objet express nommé app
const app = express();
app.use(cors());

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());

//Définition du routeur
const router = express.Router();
app.use("/api", router);
require(__dirname + "/controllers/userController")(router);
require(__dirname + "/controllers/fileClassController")(router);
require(__dirname + "/controllers/changelogController")(router);

module.exports = app;
