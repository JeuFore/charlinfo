const Users = require('../../assets/bdd/user')

async function getUser(req, res) {
    const username = req.params.user;
    if (!req.session.user || !username) {
        return res.status(400).send({
            text: "Requête invalide"
        });
    }
    try {
        const findEnterUser = Users[username];
        const findReqUser = Users[req.session.user];
        if (!findEnterUser || !findReqUser)
            return res.status(401).send({
                text: "L'utilisateur n'existe pas"
            });
        if (req.session.user !== username && findReqUser.information.grade < 4)
            return res.status(401).send("Vous n'avez pas les permissions")
        return res.status(200).send(findEnterUser.information);
    }
    catch (error) {
        return res.status(500).send({
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