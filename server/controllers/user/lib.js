const Users = require('../../assets/bdd/user')

async function getUser(req, res) {
    const username = req.params.user;
    if (!username) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    }
    try {
        const findUser = Users[username];
        if (!findUser)
            return res.status(401).json({
                text: "L'utilisateur n'existe pas"
            });
        return res.status(200).json(findUser.information);
    }
    catch (error) {
        return res.status(500).json({
            error
        });
    }
}

async function banUser(req, res) {
    return null
}

async function unbanUser(req, res) {
    return null
}

exports.getUser = getUser;
exports.banUser = banUser;
exports.unbanUser = unbanUser;