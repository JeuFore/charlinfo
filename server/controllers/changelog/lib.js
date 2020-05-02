const user = require('../user/lib');
const { request } = require('../requestController');

async function getChangelog(req, res, websocketManager) {
  if (user.connected(req, res))
    try {
      let changelog = await request("SELECT nom, date FROM changelog ORDER BY date DESC");
      for (let index = 0; index < changelog.length; index++)
        changelog[index].description = await request("select description as des from changelog inner join description_changelog dc on changelog.nom = dc.nomchangelog where nomchangelog LIKE $1", [changelog[index].nom]);

      return res.status(200).send(changelog);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Server Error");
    }
}

async function addChangelog(req, res) {
  return null
}

async function deleteChangelog(req, res) {
  return null
}

exports.getChangelog = getChangelog;
exports.addChangelog = addChangelog;
exports.deleteChangelog = deleteChangelog;