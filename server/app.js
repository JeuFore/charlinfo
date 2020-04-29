//Définition des modules
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
var session = require('express-session');
var fileUpload = require('express-fileupload')

//On définit notre objet express nommé app
const app = express();
app.use(cors({
  origin:['http://localhost:3000', 'http://192.168.1.12:3000', 'http://glafore.ddns.net', '78.47.196.197:3000'],
  credentials: true // enable set cookie
}));

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());

app.use(fileUpload());

app.use(session({
  secret: 'quiela',
  resave: false,
  saveUninitialized: true
}))

//Définition du routeur
const router = express.Router();
app.use("/api", router);
require(__dirname + "/controllers/accountController")(router);
require(__dirname + "/controllers/changelogController")(router);
require(__dirname + "/controllers/fileClassController")(router);
require(__dirname + "/controllers/fileSemesterController")(router);
require(__dirname + "/controllers/userController")(router);

module.exports = app;
