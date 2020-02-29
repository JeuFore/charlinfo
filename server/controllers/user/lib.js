const Users = require('../../assets/bdd/user')

async function getUser(req, res) {
    if (connected(req, res))
        try {
            const { user } = req.params;
            const findEnterUser = Users[user];
            if (req.session.user !== user && !permissions(req.session.user, 4))
                return res.status(403).send("You don't have permissions");
            return res.status(200).send(findEnterUser.information);
        }
        catch {
            return res.status(404).send("User not found");
        }
}

async function banUser(req, res) {
    return null
}

async function unbanUser(req, res) {
    return null
}

function permissions(user, grade) {
    return Users[user].information.grade >= grade;
}

async function disconnect(req, res) {
    req.session.user = undefined;
    return res.status(200).send("Success disconnect");
}

function connected(req, res) {
    if (!req.session.user)
        res.status(401).send("Not connected");
    return (req.session.user !== undefined);
}

exports.getUser = getUser;
exports.banUser = banUser;
exports.unbanUser = unbanUser;
exports.permissions = permissions;
exports.disconnect = disconnect;
exports.connected = connected;