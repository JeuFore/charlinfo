const Users = require('../../assets/bdd/user.json');
const fs = require('fs');

async function signup(req, res) {
  let { username, first_name, name, formation, password } = req.body;
  if (!username || !first_name || !name || !formation || !password)
    return res.status(400).send("Requête invalite");
  let findUser = Users[username];
  if (!findUser)
    return res.status(400).send("Vous n'êtes pas référencé")
  if (findUser.password !== null)
    return res.status(400).send("Vous êtes déjà inscrit")

  first_name = first_name.toLowerCase();
  let firstLetter = first_name.charAt(0);
  first_name = first_name.replace(firstLetter.toLowerCase(), firstLetter.toUpperCase());
  name = name.toUpperCase();

  findUser.password = password;
  findUser.information.first_name = first_name;
  findUser.information.name = name;
  findUser.information.formation = formation;
  findUser.information.dateCreation = new Date().toISOString();
  findUser.information.type = "Visiteur"
  findUser.information.grade = 1;
  fs.writeFileSync('assets/bdd/user.json', JSON.stringify(Users));
  req.session.user = username;
  return res.status(200).send({
    token: username,
    text: "Inscription réussite"
  });
}

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Requête invalide");
  }
  try {
    const findUser = Users[username];
    if (!findUser)
      return res.status(400).send("L'utilisateur n'existe pas");
    if (findUser.password === null)
      return res.status(400).send("Le compte n'a pas été crée");
    if (findUser.password !== password)
      return res.status(400).send("Mot de passe incorrect");
    req.session.user = username;
    return res.status(200).send({
      token: username,
      text: "Authentification réussi"
    });
  }
  catch {
    return res.status(500).send("Server Error");
  }
}

exports.login = login;
exports.signup = signup;