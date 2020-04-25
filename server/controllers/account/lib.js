const passwordHash = require('password-hash');
const { request } = require('../requestController');

async function signup(req, res) {
  try {
    let { username, first_name, name, formation, password } = req.body;
    if (!username || !first_name || !name || !formation || !password)
      return res.status(400).send("Requête invalite");
    const findUser = (await request("select id, motdepasse as password from compte where id LIKE $1", [username]))[0];
    if (!findUser)
      return res.status(400).send("Vous n'êtes pas référencé")
    if (findUser.password)
      return res.status(400).send("Vous êtes déjà inscrit")

    first_name = first_name.toLowerCase();
    let firstLetter = first_name.charAt(0);
    first_name = first_name.replace(firstLetter.toLowerCase(), firstLetter.toUpperCase());
    name = name.toUpperCase();

    await request("UPDATE compte SET nom = $1, prenom = $2, motdepasse = $3, idformation = $4, datecreation = $5 WHERE id LIKE $6", [first_name, name, passwordHash.generate(password), formation, new Date(), username]);

    req.session.user = username;
    return res.status(200).send({
      token: username,
      text: "Inscription réussite"
    });
  } catch {
    return res.status(500).send("Server Error");
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("InvalidRequest");
    }
    const findUser = (await request("select id, motdepasse as password from compte where id LIKE $1", [username]))[0];
    if (!findUser)
      return res.status(400).send("UserNotExist");
    if (!findUser.password)
      return res.status(400).send("AccountNotCreate");
    if (!passwordHash.verify(password, findUser.password))
      return res.status(400).send("PasswordError");
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