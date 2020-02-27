const Changelog = require('../../assets/bdd/changelog.json')

async function getChangelog(req, res) {
    try {
        if (Changelog[0])
            return res.status(200).json({
                data: Changelog, status: "Success"
            })
            return res.status(400).json({
                status: "Aucun changelog"
            })
    } catch (error) {
        return res.status(500).json({
            error
        });
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