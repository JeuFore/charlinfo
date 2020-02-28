//Définition des modules
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
var session = require('express-session')

//On définit notre objet express nommé app
const app = express();
app.use(cors({
  origin:['http://localhost:3000', 'http://192.168.1.14:3000'],
  credentials: true // enable set cookie
}));

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());

app.use(session({
  secret: 'quiela',
  resave: false,
  saveUninitialized: true
}))

//Définition du routeur
const router = express.Router();
app.use("/api", router);
require(__dirname + "/controllers/userController")(router);
require(__dirname + "/controllers/accountController")(router);
require(__dirname + "/controllers/fileClassController")(router);
require(__dirname + "/controllers/changelogController")(router);

module.exports = app;
