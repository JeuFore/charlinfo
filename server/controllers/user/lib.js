const UploadingData = require('../../assets/bdd/uploadingData.json');
const { request } = require('../requestController');

async function getUser(req, res) {
    if (connected(req, res))
        try {
            const { user } = req.params;
            if (req.session.user !== user && !await permissions(req, undefined, 4))
                return res.status(403).send("You don't have permissions");
            const findEnterUser = (await request("SELECT nom as first_name, prenom as name, idformation, grade, datecreation FROM compte where id LIKE $1", [user]))[0]
            return res.status(200).send(findEnterUser);
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

async function permissions(req, res, grade) {
    if (connected(req, res))
        try {
            let user = (await request("SELECT grade FROM compte where id LIKE $1", [req.session.user]))[0];
            if (!res)
                return user.grade >= grade;
            return res.status(200).send(user.grade >= req.body.grade);
        }
        catch {
            return res.status(404).send("User not found");
        }
}

async function disconnect(req, res, websocketManager) {
    websocketManager.userDisconnected(req.session.user);
    req.session.user = undefined;
    return res.status(200).send("Success disconnect");
}

function connected(req, res) {
    if (!req.session.user)
        res.status(401).send("Not connected");
    return (req.session.user !== undefined);
}

async function upload(req, res) {
    const { user } = req.params;

    let first_tab = Object.keys(UploadingData);
    let secondtab = [];

    let test;

    const result = first_tab.map((key) => {
        secondtab = Object.keys(UploadingData[key]);
        secondtab.map((key2) => {
            test = UploadingData[key][key2]
            if (test !== undefined) {
                if (test.filter(data => data.creator === "jeufore") !== undefined)
                    testbis += test.filter(data => data.creator === "jeufore");
            }
        })
    })
    return res.status(200).send(result)
}

exports.getUser = getUser;
exports.banUser = banUser;
exports.unbanUser = unbanUser;
exports.permissions = permissions;
exports.disconnect = disconnect;
exports.connected = connected;
exports.upload = upload;