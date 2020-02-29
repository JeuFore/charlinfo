const Changelog = require('../../assets/bdd/changelog.json');
const user = require('../user/lib');

async function getChangelog(req, res) {
    if (user.connected(req, res))
        return res.status(200).send(Changelog);
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