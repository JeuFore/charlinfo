const { request } = require('../requestController');
const passwordHash = require('password-hash');

async function signup(req, res, websocketManager) {
  try {
    let { username, first_name, name, formation, password } = req.body;
    if (!username || !first_name || !name || !formation || !password)
      return errorMessage(res, "InvalidRequest", username, websocketManager);
    const findUser = (await request("select id, motdepasse as password from compte where id LIKE $1", [username]))[0];
    if (!findUser)
      return errorMessage(res, "Vous n'êtes pas référencé", username, websocketManager);
    if (findUser.password)
      return errorMessage(res, "Vous êtes déjà inscrit", username, websocketManager);

    first_name = first_name.toLowerCase();
    let firstLetter = first_name.charAt(0);
    first_name = first_name.replace(firstLetter.toLowerCase(), firstLetter.toUpperCase());
    name = name.toUpperCase();

    await request("UPDATE compte SET nom = $1, prenom = $2, motdepasse = $3, idformation = $4, datecreation = $5 WHERE id LIKE $6", [first_name, name, passwordHash.generate(password), formation, new Date(), username]);

    req.session.idformation = formation;
    req.session.user = username;
    res.status(200).send({
      token: username,
      text: "Inscription réussite"
    });
    return NotificationConnection(websocketManager, username);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Server Error");
  }
}

async function login(req, res, websocketManager) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return errorMessage(res, "InvalidRequest", username, websocketManager);
    }
    const findUser = (await request("select id, motdepasse as password, idformation from compte where id LIKE $1", [username]))[0];
    if (!findUser)
      return errorMessage(res, "UserNotExist", username, websocketManager);
    if (!findUser.password)
      return errorMessage(res, "AccountNotCreate", username, websocketManager);
    if (!passwordHash.verify(password, findUser.password))
      return errorMessage(res, "PasswordError", username, websocketManager);
    req.session.idformation = findUser.idformation;
    req.session.user = username;

    res.status(200).send({
      token: username,
      text: "Authentification réussi"
    });

    return NotificationConnection(websocketManager, username);
  }
  catch (e) {
    console.log(e);
    return res.status(500).send("Server Error");
  }
}

function errorMessage(res, message, user, websocketManager) {
  websocketManager.userDisconnected(user)
  return res.status(400).send(message);
}

function NotificationConnection(websocketManager, user) {
  websocketManager.sendMessageUser(user, { type: 0, message: { title: "Nouvelle notification", description: "Desormais connecté" } });
}

exports.login = login;
exports.signup = signup;