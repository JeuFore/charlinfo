const user = require('../user/lib');
const { request } = require('../requestController');

async function getChangelog(req, res) {
  if (user.connected(req, res))
    try {
      let value = {};
      value.permission = await user.permissions(req, undefined, 4);
      value.changelog = await request("SELECT nom, date FROM changelog ORDER BY date DESC");
      for (let index = 0; index < value.changelog.length; index++)
        value.changelog[index].description = await request("select description as des from changelog inner join description_changelog dc on changelog.nom = dc.nomchangelog where nomchangelog LIKE $1", [value.changelog[index].nom]);

      return res.status(200).send(value);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Server Error");
    }
}

async function addChangelog(req, res, websocketManager) {
  return null
  websocketManager.sendMessageAllUsers({ type: 1, message: { title: "Ajout d'un changelog", description: `Nom du changelog : ${nom}` } });
}

async function deleteChangelog(req, res) {
  return null
}

exports.getChangelog = getChangelog;
exports.addChangelog = addChangelog;
exports.deleteChangelog = deleteChangelog;